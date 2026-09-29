import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  userName: string;
  avatar?: string;
  content: string;
  createdAt: number | string;
}

interface InteractionSectionProps {
  articleId: string;
  currentUser?: any;
  initialLikes?: number;
}

// Hàm chuyển đổi thời gian sang dạng thời gian thực ("Vừa xong", "5 phút trước",...)
const getTimeAgo = (createdAt: number | string): string => {
  if (!createdAt) return 'Vừa xong';

  let timestamp: number;

  if (typeof createdAt === 'number') {
    timestamp = createdAt;
  } else {
    const parsedDate = new Date(createdAt).getTime();
    if (isNaN(parsedDate)) {
      return createdAt;
    }
    timestamp = parsedDate;
  }

  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 30) return 'Vừa xong';
  if (seconds < 60) return `${seconds} giây trước`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;

  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const InteractionSection: React.FC<InteractionSectionProps> = ({
  articleId,
  currentUser,
  initialLikes = 0,
}) => {
  const userId = currentUser?.id || currentUser?.uid || currentUser?.email || 'guest';
  const storageLikeKey = `article_liked_${articleId}_${userId}`;
  const storageLikesCountKey = `article_likes_count_${articleId}`;
  const storageCommentsKey = `article_comments_${articleId}`;

  // State Likes: Khởi tạo từ localStorage nếu có, nếu không lấy initialLikes
  const [likes, setLikes] = useState<number>(() => {
    const savedLikes = localStorage.getItem(storageLikesCountKey);
    return savedLikes !== null ? parseInt(savedLikes, 10) : initialLikes;
  });

  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // Khôi phục trạng thái đã thả tim và tổng số tim
  useEffect(() => {
    const savedLikes = localStorage.getItem(storageLikesCountKey);
    if (savedLikes !== null) {
      setLikes(parseInt(savedLikes, 10));
    }

    if (userId && userId !== 'guest') {
      const liked = localStorage.getItem(storageLikeKey) === 'true';
      setHasLiked(liked);
    } else {
      setHasLiked(false);
    }
  }, [userId, storageLikeKey, storageLikesCountKey]);

  // Lưu tổng số tim vào localStorage mỗi khi biến likes thay đổi
  useEffect(() => {
    localStorage.setItem(storageLikesCountKey, likes.toString());
  }, [likes, storageLikesCountKey]);

  // State Comments
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(storageCommentsKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (c: any) =>
              c.userName !== 'Trần Minh Tâm' &&
              c.author !== 'Trần Minh Tâm' &&
              c.user?.name !== 'Trần Minh Tâm'
          );
        }
      } catch (e) {
        console.error('Lỗi parse bình luận:', e);
      }
    }
    return [];
  });

  const [newComment, setNewComment] = useState('');
  const [, setTicker] = useState(0);

  // Tự động re-render mỗi 30 giây để cập nhật thời gian "x phút trước" liên tục
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Lưu bình luận vào localStorage mỗi khi danh sách bình luận thay đổi
  useEffect(() => {
    localStorage.setItem(storageCommentsKey, JSON.stringify(comments));
  }, [comments, storageCommentsKey]);

  // Xử lý Thả tim
  const handleLike = () => {
    if (!currentUser) {
      alert('Vui lòng đăng nhập để thả tim bài viết!');
      return;
    }

    if (hasLiked) {
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setHasLiked(false);
      localStorage.removeItem(storageLikeKey);
      localStorage.setItem(storageLikesCountKey, newLikes.toString());
    } else {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      localStorage.setItem(storageLikeKey, 'true');
      localStorage.setItem(storageLikesCountKey, newLikes.toString());
    }
  };

  // Xử lý gửi Bình luận mới
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Vui lòng đăng nhập để tham gia bình luận!');
      return;
    }
    if (!newComment.trim()) return;

    const commentObj: Comment = {
      id: Date.now().toString(),
      userName: currentUser.name || currentUser.fullName || currentUser.email || 'Người dùng',
      avatar: currentUser.avatar,
      content: newComment.trim(),
      createdAt: Date.now(),
    };

    setComments([commentObj, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      {/* Khung Thả tim */}
      <div className="flex items-center justify-between bg-red-50 p-4 rounded-xl mb-8 border border-red-100">
        <div>
          <h4 className="font-bold text-gray-800 text-lg">Yêu thích bài viết này?</h4>
          <p className="text-sm text-gray-600">Thả tim để lan tỏa di sản đến cộng đồng</p>
        </div>
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
            hasLiked
              ? 'bg-red-700 text-white shadow-md scale-105'
              : 'bg-white text-red-700 border border-red-300 hover:bg-red-100'
          }`}
        >
          <svg
            className={`w-6 h-6 ${hasLiked ? 'fill-current' : 'fill-none stroke-current'}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes} {hasLiked ? 'Đã tim' : 'Thả tim'}</span>
        </button>
      </div>

      {/* Khung Bình luận */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Bình luận ({comments.length})
        </h3>

        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              currentUser
                ? 'Viết cảm nghĩ của bạn về bài viết...'
                : 'Vui lòng đăng nhập để tham gia bình luận...'
            }
            disabled={!currentUser}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!currentUser || !newComment.trim()}
              className="px-6 py-2 bg-red-800 text-white rounded-lg font-medium hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Gửi bình luận
            </button>
          </div>
        </form>

        {/* Danh sách bình luận */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{comment.userName}</span>
                  <span className="text-xs text-gray-500">{getTimeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-gray-700 text-sm md:text-base">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-sm text-gray-500 italic">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};