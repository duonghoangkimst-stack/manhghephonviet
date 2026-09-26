import React, { useState, useEffect } from 'react';
import { db, ref, onValue, push, runTransaction } from '../firebase';

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: number;
}

interface InteractionProps {
  articleId: string; // ID của bài viết (ví dụ: 'faq' hoặc 'ban-do-go')
}

export const InteractionSection: React.FC<InteractionProps> = ({ articleId }) => {
  const [likes, setLikes] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!articleId) return;

    // 1. Tăng lượt xem (Views) khi vào trang
    const viewsRef = ref(db, `articles/${articleId}/views`);
    runTransaction(viewsRef, (currentViews) => (currentViews || 0) + 1);

    // 2. Lắng nghe dữ liệu Likes & Views thời gian thực
    const articleRef = ref(db, `articles/${articleId}`);
    const unsubscribeArticle = onValue(articleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLikes(data.likes || 0);
        setViews(data.views || 0);
      }
    });

    // 3. Lắng nghe danh sách Bình luận thời gian thực
    const commentsRef = ref(db, `articles/${articleId}/comments`);
    const unsubscribeComments = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedComments: Comment[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setComments(loadedComments.reverse()); // Hiện bình luận mới nhất lên đầu
      } else {
        setComments([]);
      }
    });

    return () => {
      unsubscribeArticle();
      unsubscribeComments();
    };
  }, [articleId]);

  // Xử lý bấm Tim
  const handleLike = () => {
    const likesRef = ref(db, `articles/${articleId}/likes`);
    runTransaction(likesRef, (currentLikes) => {
      if (hasLiked) {
        setHasLiked(false);
        return (currentLikes || 1) - 1;
      } else {
        setHasLiked(true);
        return (currentLikes || 0) + 1;
      }
    });
  };

  // Xử lý gửi Bình luận
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const commentsRef = ref(db, `articles/${articleId}/comments`);
    push(commentsRef, {
      author: authorName.trim() || 'Người dùng ẩn danh',
      text: commentText.trim(),
      createdAt: Date.now(),
    });

    setCommentText('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Thanh Tương tác: Tim & Views */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <button
          onClick={handleLike}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: hasLiked ? '#ff4d4f' : '#f0f0f0',
            color: hasLiked ? '#fff' : '#333',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
        >
          ❤️ {likes} Thích
        </button>

        <span style={{ color: '#666', fontSize: '14px' }}>
          👁️ {views} Lượt xem
        </span>
      </div>

      {/* Form viết bình luận */}
      <div style={{ marginTop: '25px' }}>
        <h3 style={{ marginBottom: '15px' }}>Bình luận ({comments.length})</h3>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Tên của bạn (không bắt buộc)..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <textarea
            placeholder="Viết bình luận của bạn..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' }}
            required
          />
          <button
            type="submit"
            style={{
              alignSelf: 'flex-end',
              padding: '8px 20px',
              backgroundColor: '#8B0000', // Tone màu đỏ đậm hợp giao diện Hồn Việt
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Gửi bình luận
          </button>
        </form>
      </div>

      {/* Danh sách bình luận */}
      <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {comments.length === 0 ? (
          <p style={{ color: '#888', italic: 'true' }}>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        ) : (
          comments.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#f9f9f9', padding: '12px 16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong style={{ color: '#333' }}>{item.author}</strong>
                <small style={{ color: '#999' }}>{new Date(item.createdAt).toLocaleString('vi-VN')}</small>
              </div>
              <p style={{ margin: 0, color: '#444' }}>{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};