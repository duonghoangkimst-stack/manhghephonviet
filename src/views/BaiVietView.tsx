import { useState, useRef, type MouseEvent, type FormEvent, type DragEvent, type ChangeEvent } from 'react';
import { Article, TabType } from '../types';
import { ARTICLES, LEADERBOARD } from '../data/mockData';
import heritageEmptyStateImg from '../assets/images/heritage_empty_state_1788596925182.jpg';

interface BaiVietViewProps {
  setActiveTab: (tab: TabType) => void;
}

const GROUP_LEADERBOARD = [
  {
    rank: 1,
    name: 'Chi hội Sử Học Thăng Long',
    avatar: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=200',
    xp: 45200,
    badge: '128 thành viên'
  },
  {
    rank: 2,
    name: 'CLB Di Sản Cố Đô Huế',
    avatar: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=200',
    xp: 38600,
    badge: '95 thành viên'
  },
  {
    rank: 3,
    name: 'Nhóm Sử Trẻ Sài Gòn',
    avatar: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=200',
    xp: 29400,
    badge: '82 thành viên'
  },
  {
    rank: 4,
    name: 'Hội Bảo Tồn Ký Ức Thành Cổ',
    avatar: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=200',
    xp: 24100,
    badge: '64 thành viên'
  },
  {
    rank: 5,
    name: 'Liên Chi Hội Sử Học Trẻ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    xp: 18500,
    badge: '50 thành viên'
  }
];

export default function BaiVietView({ setActiveTab: _setActiveTab }: BaiVietViewProps) {
  const [feedFilter, setFeedFilter] = useState<'everyone' | 'mine'>('everyone');
  const [sortOption, setSortOption] = useState<'newest' | 'popular' | 'comments'>('newest');
  const [leaderboardTab, setLeaderboardTab] = useState<'individual' | 'friends' | 'groups'>('individual');
  const [showFullLeaderboard, setShowFullLeaderboard] = useState<boolean>(false);

  const [articlesList, setArticlesList] = useState<Article[]>(ARTICLES);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);

  // Leaderboard Friends State
  const [friendSearchQuery, setFriendSearchQuery] = useState('');
  const [friendConnectMessage, setFriendConnectMessage] = useState('');
  const [friendsList, setFriendsList] = useState<Array<{
    rank: number;
    name: string;
    avatar: string;
    xp: number;
    badge: string;
    code: string;
  }>>([
    {
      rank: 1,
      name: 'Lê Quỳnh Trang',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
      xp: 8450,
      badge: 'Nhà Nghiên Cứu Sử',
      code: 'HV-7788'
    },
    {
      rank: 2,
      name: 'Trần Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
      xp: 7620,
      badge: 'Sử gia Ký ức',
      code: 'HV-3355'
    },
    {
      rank: 3,
      name: 'Nguyễn Văn An (Tôi)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      xp: 6250,
      badge: 'Người Giữ Sử',
      code: 'HV-9999'
    },
    {
      rank: 4,
      name: 'Phạm Hải Đăng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
      xp: 4890,
      badge: 'Đại sứ Di sản',
      code: 'HV-5522'
    },
    {
      rank: 5,
      name: 'Hoàng Kim Chi',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
      xp: 3420,
      badge: 'Tập sự Khám phá',
      code: 'HV-3311'
    }
  ]);

  // Group Notice Modal State
  const [showGroupNotice, setShowGroupNotice] = useState<boolean>(false);

  const handleConnectFriend = () => {
    const q = friendSearchQuery.trim();
    if (!q) {
      setFriendConnectMessage('Vui lòng nhập tên hoặc Mã giới thiệu để kết nối!');
      return;
    }
    const already = friendsList.find(
      (f) =>
        f.name.toLowerCase() === q.toLowerCase() ||
        f.code.toLowerCase() === q.toLowerCase()
    );
    if (already) {
      setFriendConnectMessage(`Bạn và "${already.name}" đã là bạn bè từ trước!`);
      return;
    }
    const newFriend = {
      rank: friendsList.length + 1,
      name: q.toUpperCase().startsWith('HV-') ? `Bạn kết nối (${q.toUpperCase()})` : q,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
      xp: Math.floor(Math.random() * 2500) + 1500,
      badge: 'Bạn mới kết nối',
      code: q.toUpperCase().startsWith('HV-') ? q.toUpperCase() : `HV-${Math.floor(1000 + Math.random() * 9000)}`
    };
    const updated = [...friendsList, newFriend]
      .sort((a, b) => b.xp - a.xp)
      .map((item, idx) => ({
        ...item,
        rank: idx + 1
      }));
    setFriendsList(updated);
    setFriendConnectMessage(`Đã kết nối thành công với ${newFriend.name}!`);
    setFriendSearchQuery('');
  };

  const filteredFriends = friendsList.filter(
    (f) =>
      f.name.toLowerCase().includes(friendSearchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(friendSearchQuery.toLowerCase())
  );

  // New comment state for article reader
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState<{ [articleId: string]: Array<{ author: string; avatar: string; time: string; text: string }> }>({
    'bai-viet-01': [
      { author: 'Trần Hoàng Nam', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200', time: '1 giờ trước', text: 'Bài viết rất xúc động và hào hùng! Từng tấc đất Thành Cổ thực sự là máu xương của thế hệ cha anh.' },
      { author: 'Lê Quỳnh Trang', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', time: '30 phút trước', text: 'Cảm ơn tác giả đã chia sẻ tư liệu vô cùng quý giá này.' }
    ]
  });

  // New article form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<string>('Dấu ấn Lịch sử');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [isDraggingImage, setIsDraggingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setImageLoadError(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewImageUrl(reader.result);
        setImageLoadError(false);
      }
    };
    reader.onerror = () => {
      setImageLoadError(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFileChange(e.target.files[0]);
    }
  };

  const handleUrlChange = (val: string) => {
    setNewImageUrl(val);
    setImageLoadError(false);
  };

  const handleUrlBlur = () => {
    const trimmed = newImageUrl.trim();
    if (trimmed && !trimmed.startsWith('data:')) {
      try {
        const parsed = new URL(trimmed);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          setImageLoadError(true);
        }
      } catch {
        setImageLoadError(true);
      }
    }
  };

  const handleRemoveImage = () => {
    setNewImageUrl('');
    setImageLoadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLikeArticle = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setArticlesList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
    if (activeArticle && activeArticle.id === id) {
      setActiveArticle((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const handleAddComment = (articleId: string, e: FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      author: 'Nguyễn Văn An (Tôi)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      time: 'Vừa xong',
      text: commentInput.trim()
    };

    setCommentsList((prev) => ({
      ...prev,
      [articleId]: [newComment, ...(prev[articleId] || [])]
    }));

    setArticlesList((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, commentsCount: a.commentsCount + 1 } : a))
    );

    if (activeArticle && activeArticle.id === articleId) {
      setActiveArticle((prev) =>
        prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null
      );
    }

    setCommentInput('');
  };

  const handleCreateArticle = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: Article = {
      id: `art-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: {
        name: newAuthor.trim() || 'Nguyễn Văn An (Tôi)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        role: 'Người Giữ Sử'
      },
      date: 'Hôm nay',
      timeAgo: 'Vừa xong',
      views: '1',
      readTime: '4 phút đọc',
      excerpt: newExcerpt.trim() || newContent.slice(0, 120) + '...',
      content: newContent.trim(),
      image:
        newImageUrl.trim() ||
        'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=800',
      likes: 1,
      commentsCount: 0,
      tags: ['Cộng đồng', 'Di sản Việt']
    };

    setArticlesList([created, ...articlesList]);
    setIsWriteModalOpen(false);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setNewAuthor('');
    setNewImageUrl('');
    setImageLoadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setNewCategory('Dấu ấn Lịch sử');
  };

  // Filter & sort logic
  const displayedArticles = articlesList
    .filter((a) => {
      if (feedFilter === 'mine') {
        return a.author.name.includes('(Tôi)') || a.author.name === 'Nguyễn Văn An';
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'popular') return b.likes - a.likes;
      if (sortOption === 'comments') return b.commentsCount - a.commentsCount;
      return 0; // default order ('newest')
    });

  // Top 3 bài viết được yêu thích nhất (tự động lọc và sắp xếp giảm dần theo lượt tim thực tế từ articlesList)
  const topLikedArticles = [...articlesList]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  const getTagBadgeStyle = (category: string) => {
    switch (category) {
      case 'Dấu ấn Lịch sử':
      case 'Lịch sử':
        return 'bg-[#FFE9E6] text-[#580E0E] border-[#580E0E]/30';
      case 'Văn hóa & Phong tục':
      case 'Văn hóa':
        return 'bg-[#EBF5EE] text-[#1B5E20] border-[#1B5E20]/30';
      case 'Con người & Ký ức':
      case 'Đời sống':
        return 'bg-[#FDF4E3] text-[#8C6B1B] border-[#8C6B1B]/30';
      case 'Di tích & Thắng cảnh':
      case 'Danh lam thắng cảnh':
        return 'bg-[#E1F5FE] text-[#0277BD] border-[#0277BD]/30';
      default:
        return 'bg-[#F4EBD0] text-[#580E0E] border-[#C5B358]/50';
    }
  };

  return (
    <div className="w-full flex-grow bg-[#FAF5EB] text-[#261816]">
      {/* Header Banner */}
      <section className="relative bg-[#570000] text-[#F4EBD0] py-12 px-6 border-b-2 border-[#C5B358] overflow-hidden">
      <img 
    src="/NenBaiViet.jpg" 
    alt="Banner Background" 
    className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none" 
  />
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <span
            className="text-xs bg-[#D4AF37] text-[#570000] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-xs"
            style={{ marginBottom: '16px' }}
          >
            DIỄN ĐÀN & KHO TƯ LIỆU LỊCH SỬ
          </span>
          <h1 
        className="hero-title text-[#D4AF37]"
        style={{ color: "#C5B358" }}
        >
            BÀI VIẾT DI SẢN
          </h1>
          <p className="font-sans text-sm md:text-base text-[#F4EBD0]/90 max-w-2xl mx-auto leading-relaxed">
            Nơi ghi chép những trang sử hào hùng, chia sẻ ký ức di tích và kết nối tâm hồn người trẻ yêu nước.
          </p>
        </div>
      </section>

      {/* Main 2-Column Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* CỘT TRÁI (BẢNG TIN BÀI VIẾT - 65% CHIỀU RỘNG: lg:col-span-8) */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Header Bảng Tin */}
            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#C5B358]/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#580E0E]">
                  newspaper
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#580E0E] uppercase tracking-wide">
                  BẢNG TIN
                </h2>
              </div>

              {/* Filter Tabs & Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Filter buttons: "CỦA MỌI NGƯỜI", "CỦA TÔI" */}
                <div className="flex bg-[#F4EBD0] p-1 rounded-full border border-[#C5B358]/40">
                  <button
                    type="button"
                    onClick={() => setFeedFilter('everyone')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                      feedFilter === 'everyone'
                        ? 'bg-[#580E0E] text-white shadow-xs'
                        : 'text-[#580E0E] hover:bg-[#FAF5EB]'
                    }`}
                  >
                    Của mọi người
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedFilter('mine')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                      feedFilter === 'mine'
                        ? 'bg-[#580E0E] text-white shadow-xs'
                        : 'text-[#580E0E] hover:bg-[#FAF5EB]'
                    }`}
                  >
                    Của tôi
                  </button>
                </div>

                {/* Dropdown Sort */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) =>
                      setSortOption(e.target.value as 'newest' | 'popular' | 'comments')
                    }
                    aria-label="Sắp xếp bài viết"
                    className="bg-[#FFFDF9] border border-[#C5B358] text-[#580E0E] text-xs font-bold rounded-full px-3 py-1.5 pr-7 focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="popular">Xem nhiều nhất</option>
                    <option value="comments">Nhiều bình luận</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 text-[#580E0E] text-sm pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* Button "+ Viết bài" */}
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(true)}
                  className="bg-[#580E0E] hover:bg-[#781414] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  <span>+ Viết bài</span>
                </button>
              </div>
            </div>

            {/* 2. Danh sách bài viết dạng Card nằm ngang (Ảnh bìa bên trái, Nội dung bên phải) */}
            <div className="space-y-5">
              {displayedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className="bg-[#FFFDF9] rounded-2xl border border-[#C5B358]/50 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row cursor-pointer group hover:border-[#580E0E]/60"
                >
                  {/* Left: Khung hình ảnh bìa bài viết */}
                  <div className="w-full sm:w-64 md:w-72 h-52 sm:h-auto sm:min-h-[220px] shrink-0 relative overflow-hidden bg-[#FAF5EB]">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden"></div>
                    <span
                      className={`absolute top-3 left-3 z-10 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs ${getTagBadgeStyle(
                        art.category
                      )}`}
                    >
                      {art.category}
                    </span>
                  </div>

                  {/* Right: Nội dung bên phải */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="hidden sm:flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getTagBadgeStyle(
                            art.category
                          )}`}
                        >
                          {art.category}
                        </span>
                        <span className="text-[11px] text-stone-400">•</span>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {art.timeAgo || art.date}
                        </span>
                      </div>

                      {/* Tiêu đề */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#580E0E] group-hover:text-[#8B1818] transition-colors leading-snug mb-2 line-clamp-2">
                        {art.title}
                      </h3>

                      {/* Tóm tắt */}
                      <p className="font-sans text-xs sm:text-sm text-[#5A413D] leading-relaxed line-clamp-2 mb-4">
                        {art.excerpt}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-3 border-t border-[#C5B358]/30 flex items-center justify-between text-xs text-[#5A413D]">
                      {/* Author */}
                      <div className="flex items-center gap-2">
                        <img
                          src={art.author.avatar}
                          alt={art.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#C5B358]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-[#261816] block text-xs leading-none">
                            {art.author.name}
                          </span>
                          <span className="text-[10px] text-stone-500 block leading-tight mt-0.5 sm:hidden">
                            {art.timeAgo || art.date}
                          </span>
                        </div>
                      </div>

                      {/* Stats: Views, Comments, Likes */}
                      <div className="flex items-center gap-4 text-stone-500">
                        <span className="flex items-center gap-1 text-[11px]" title="Lượt xem">
                          <span className="material-symbols-outlined text-sm text-[#D4AF37]">
                            visibility
                          </span>
                          <span>{art.views || '1.2k'}</span>
                        </span>

                        <span className="flex items-center gap-1 text-[11px]" title="Bình luận">
                          <span className="material-symbols-outlined text-sm text-stone-400">
                            chat_bubble
                          </span>
                          <span>{art.commentsCount}</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleLikeArticle(art.id, e)}
                          className="flex items-center gap-1 text-[11px] text-[#580E0E] hover:scale-110 transition-transform cursor-pointer"
                          title="Yêu thích"
                        >
                          <span className="material-symbols-outlined text-sm text-[#580E0E]">
                            favorite
                          </span>
                          <span className="font-bold">{art.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {displayedArticles.length === 0 && (
                <div className="text-center py-14 px-6 bg-[#FFFDF9] rounded-2xl border border-[#C5B358]/60 shadow-xs space-y-4">
                  {/* Hình ảnh minh họa di sản sắc nét đặt ở vị trí trung tâm */}
                  <div className="flex justify-center">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-2 border-[#C5B358]/50 bg-[#FAF5EB] p-2">
                      <img
                        src={heritageEmptyStateImg}
                        alt="Sổ tay và mảnh ghép di sản"
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#C5B358]/30 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Tiêu đề & Thông điệp */}
                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#580E0E]">
                      Chưa có bài viết nào
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#5A413D] leading-relaxed">
                      Bạn chưa xuất bản câu chuyện di sản nào. Hãy chia sẻ góc nhìn và cảm nhận của bạn để góp phần lan tỏa nét đẹp văn hóa Việt!
                    </p>
                  </div>

                  {/* Nút hành động (CTA Button) dạng bo tròn pill-shape màu đỏ đô */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#580E0E] hover:bg-[#781414] text-white shadow-md hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-base group-hover:rotate-12 transition-transform">
                        edit_note
                      </span>
                      <span>Bắt đầu viết mảnh ghép đầu tiên của bạn</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* CỘT PHẢI (SIDEBAR - 35% CHIỀU RỘNG: lg:col-span-4) */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Widget BẢNG XẾP HẠNG */}
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#C5B358]/70 shadow-sm p-5 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#C5B358]/40">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-[#D4AF37]">
                    trophy
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#580E0E] uppercase tracking-wide">
                    BẢNG XẾP HẠNG
                  </h3>
                </div>
              </div>

              {/* Tabs: "CÁ NHÂN" (đỏ đô), "BẠN BÈ", "HỘI NHÓM" */}
              <div className="flex bg-[#F4EBD0] p-1 rounded-full border border-[#C5B358]/40">
                <button
                  type="button"
                  onClick={() => setLeaderboardTab('individual')}
                  className={`flex-1 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    leaderboardTab === 'individual'
                      ? 'bg-[#580E0E] text-white shadow-xs'
                      : 'text-[#580E0E] hover:bg-[#FAF5EB]'
                  }`}
                >
                  Cá nhân
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardTab('friends')}
                  className={`flex-1 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    leaderboardTab === 'friends'
                      ? 'bg-[#580E0E] text-white shadow-xs'
                      : 'text-[#580E0E] hover:bg-[#FAF5EB]'
                  }`}
                >
                  Bạn bè
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardTab('groups')}
                  className={`flex-1 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    leaderboardTab === 'groups'
                      ? 'bg-[#580E0E] text-white shadow-xs'
                      : 'text-[#580E0E] hover:bg-[#FAF5EB]'
                  }`}
                >
                  Hội nhóm
                </button>
              </div>

              {/* ======================================================== */}
              {/* TAB 1: CÁ NHÂN */}
              {/* ======================================================== */}
              {leaderboardTab === 'individual' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Top 3 Podium */}
                  <div className="grid grid-cols-3 gap-2 pt-2 items-end text-center bg-[#FAF5EB] p-4 rounded-xl border border-[#C5B358]/30">
                    {/* Top 2: Trần Hoàng Nam (9.850 điểm) */}
                    <div className="flex flex-col items-center space-y-1 order-1">
                      <div className="relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg" title="Hạng 2">
                          🥈
                        </span>
                        <img
                          src={LEADERBOARD[1].avatar}
                          alt={LEADERBOARD[1].name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-stone-300 shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-stone-500 text-white text-[9px] font-bold px-1.5 rounded-full">
                          2
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[85px] mt-1">
                        {LEADERBOARD[1].name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#8C6B1B]">
                        {LEADERBOARD[1].xp.toLocaleString('vi-VN')} điểm
                      </span>
                    </div>

                    {/* Top 1: Nguyễn Minh Anh (12.560 điểm) */}
                    <div className="flex flex-col items-center space-y-1 order-2 -mt-3">
                      <div className="relative">
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-bounce" title="Quán quân">
                          👑
                        </span>
                        <img
                          src={LEADERBOARD[0].avatar}
                          alt={LEADERBOARD[0].name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-[#D4AF37] shadow-md ring-2 ring-[#580E0E]/20"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#3D0505] text-[10px] font-bold px-2 rounded-full shadow-xs">
                          1
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[95px] mt-1">
                        {LEADERBOARD[0].name}
                      </h4>
                      <span className="text-[11px] font-bold text-[#580E0E]">
                        {LEADERBOARD[0].xp.toLocaleString('vi-VN')} điểm
                      </span>
                    </div>

                    {/* Top 3: Lê Quỳnh Trang (8.450 điểm) */}
                    <div className="flex flex-col items-center space-y-1 order-3">
                      <div className="relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg" title="Hạng 3">
                          🥉
                        </span>
                        <img
                          src={LEADERBOARD[2].avatar}
                          alt={LEADERBOARD[2].name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-[#CD7F32] shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-white text-[9px] font-bold px-1.5 rounded-full">
                          3
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[85px] mt-1">
                        {LEADERBOARD[2].name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#8C6B1B]">
                        {LEADERBOARD[2].xp.toLocaleString('vi-VN')} điểm
                      </span>
                    </div>
                  </div>

                  {/* Danh sách Top 4 đến 10 bên dưới với số điểm chi tiết */}
                  <div className="space-y-2 pt-1">
                    {(showFullLeaderboard ? LEADERBOARD.slice(3) : LEADERBOARD.slice(3, 7)).map((user) => (
                      <div
                        key={user.rank}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#FAF5EB] hover:bg-[#F4EBD0] transition-colors border border-[#C5B358]/20 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 text-center font-bold text-stone-500 text-xs">
                            #{user.rank}
                          </span>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-7 h-7 rounded-full object-cover border border-[#C5B358]/60"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold text-[#261816] text-xs leading-none">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                              {user.badge}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-[#580E0E] text-xs">
                          {user.xp.toLocaleString('vi-VN')} điểm
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Nút "Xem đầy đủ bảng xếp hạng ->" */}
                  <button
                    type="button"
                    onClick={() => setShowFullLeaderboard(!showFullLeaderboard)}
                    className="w-full text-center text-xs font-bold text-[#580E0E] hover:text-[#781414] py-2 flex items-center justify-center gap-1 transition-colors cursor-pointer group"
                  >
                    <span>{showFullLeaderboard ? 'Thu gọn bảng xếp hạng' : 'Xem đầy đủ bảng xếp hạng'}</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 2: BẠN BÈ */}
              {/* ======================================================== */}
              {leaderboardTab === 'friends' && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Search and Quick Connect Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative flex items-center flex-grow">
                        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none select-none flex items-center justify-center leading-none">
                          search
                        </span>
                        <input
                          type="text"
                          value={friendSearchQuery}
                          onChange={(e) => {
                            setFriendSearchQuery(e.target.value);
                            setFriendConnectMessage('');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleConnectFriend();
                            }
                          }}
                          placeholder="Tìm bạn qua tên hoặc Mã giới thiệu..."
                          className="w-full pl-9 pr-7 py-1.5 bg-white border border-[#C5B358]/70 rounded-full text-xs text-[#261816] placeholder:text-stone-400 focus:outline-none focus:border-[#580E0E] shadow-2xs transition-all"
                        />
                        {friendSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setFriendSearchQuery('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleConnectFriend}
                        className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-[#580E0E] hover:bg-[#781414] text-white rounded-full text-[11px] font-bold uppercase tracking-wider shadow-2xs transition-all cursor-pointer"
                        title="Thêm bạn mới"
                      >
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        <span>Kết nối</span>
                      </button>
                    </div>

                    {friendConnectMessage && (
                      <div className="text-[11px] font-medium text-[#1B5E20] bg-[#EBF5EE] px-3 py-1 rounded-lg border border-[#A5D6A7] flex items-center justify-between animate-fadeIn">
                        <span>{friendConnectMessage}</span>
                        <button onClick={() => setFriendConnectMessage('')} className="cursor-pointer">
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Friends Ranking or Empty State */}
                  {filteredFriends.length === 0 ? (
                    <div className="py-8 px-4 text-center bg-[#FAF5EB] rounded-xl border border-dashed border-[#C5B358] space-y-2.5">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FFE9E6] flex items-center justify-center text-[#580E0E]">
                        <span className="material-symbols-outlined text-2xl">person_search</span>
                      </div>
                      <p className="font-serif font-bold text-xs text-[#580E0E]">
                        Chưa tìm thấy bạn bè nào
                      </p>
                      <p className="text-[11px] text-[#5A413D] max-w-[220px] mx-auto leading-relaxed">
                        Hãy tìm kiếm tên/mã để kết nối bạn bè ngay!
                      </p>
                    </div>
                  ) : filteredFriends.length >= 3 ? (
                    <>
                      {/* Top 3 Podium Friends */}
                      <div className="grid grid-cols-3 gap-2 pt-2 items-end text-center bg-[#FAF5EB] p-4 rounded-xl border border-[#C5B358]/30">
                        {/* Top 2 */}
                        <div className="flex flex-col items-center space-y-1 order-1">
                          <div className="relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg" title="Hạng 2">
                              🥈
                            </span>
                            <img
                              src={filteredFriends[1].avatar}
                              alt={filteredFriends[1].name}
                              className="w-13 h-13 rounded-full object-cover border-2 border-stone-300 shadow-xs"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-stone-500 text-white text-[9px] font-bold px-1.5 rounded-full">
                              2
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[85px] mt-1" title={filteredFriends[1].name}>
                            {filteredFriends[1].name}
                          </h4>
                          <span className="text-[10px] font-bold text-[#8C6B1B]">
                            {filteredFriends[1].xp.toLocaleString('vi-VN')} điểm
                          </span>
                        </div>

                        {/* Top 1 */}
                        <div className="flex flex-col items-center space-y-1 order-2 -mt-3">
                          <div className="relative">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-bounce" title="Quán quân">
                              👑
                            </span>
                            <img
                              src={filteredFriends[0].avatar}
                              alt={filteredFriends[0].name}
                              className="w-16 h-16 rounded-full object-cover border-3 border-[#D4AF37] shadow-md ring-2 ring-[#580E0E]/20"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#3D0505] text-[10px] font-bold px-2 rounded-full shadow-xs">
                              1
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[95px] mt-1" title={filteredFriends[0].name}>
                            {filteredFriends[0].name}
                          </h4>
                          <span className="text-[11px] font-bold text-[#580E0E]">
                            {filteredFriends[0].xp.toLocaleString('vi-VN')} điểm
                          </span>
                        </div>

                        {/* Top 3 */}
                        <div className="flex flex-col items-center space-y-1 order-3">
                          <div className="relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg" title="Hạng 3">
                              🥉
                            </span>
                            <img
                              src={filteredFriends[2].avatar}
                              alt={filteredFriends[2].name}
                              className="w-13 h-13 rounded-full object-cover border-2 border-[#CD7F32] shadow-xs"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-white text-[9px] font-bold px-1.5 rounded-full">
                              3
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[85px] mt-1" title={filteredFriends[2].name}>
                            {filteredFriends[2].name}
                          </h4>
                          <span className="text-[10px] font-bold text-[#8C6B1B]">
                            {filteredFriends[2].xp.toLocaleString('vi-VN')} điểm
                          </span>
                        </div>
                      </div>

                      {/* Ranks 4+ */}
                      {filteredFriends.length > 3 && (
                        <div className="space-y-2 pt-1">
                          {filteredFriends.slice(3).map((friend) => (
                            <div
                              key={friend.code}
                              className="flex items-center justify-between p-2 rounded-xl bg-[#FAF5EB] hover:bg-[#F4EBD0] transition-colors border border-[#C5B358]/20 text-xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 text-center font-bold text-stone-500 text-xs">
                                  #{friend.rank}
                                </span>
                                <img
                                  src={friend.avatar}
                                  alt={friend.name}
                                  className="w-7 h-7 rounded-full object-cover border border-[#C5B358]/60"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <p className="font-bold text-[#261816] text-xs leading-none">
                                    {friend.name}
                                  </p>
                                  <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                                    {friend.badge} • {friend.code}
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-[#580E0E] text-xs">
                                {friend.xp.toLocaleString('vi-VN')} điểm
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {filteredFriends.map((friend) => (
                        <div
                          key={friend.code}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF5EB] hover:bg-[#F4EBD0] transition-colors border border-[#C5B358]/20 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 text-center font-bold text-stone-500 text-xs">
                              #{friend.rank}
                            </span>
                            <img
                              src={friend.avatar}
                              alt={friend.name}
                              className="w-8 h-8 rounded-full object-cover border border-[#C5B358]/60"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-bold text-[#261816] text-xs leading-none">
                                {friend.name}
                              </p>
                              <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                                {friend.badge} • {friend.code}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-[#580E0E] text-xs">
                            {friend.xp.toLocaleString('vi-VN')} điểm
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 3: HỘI NHÓM */}
              {/* ======================================================== */}
              {leaderboardTab === 'groups' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-bold text-[#580E0E] uppercase tracking-wider">
                      Top Hội Nhóm Tích Cực
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowGroupNotice(true)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#580E0E] hover:bg-[#781414] text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-2xs transition-all cursor-pointer"
                      title="Tạo hội nhóm mới"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      <span>Tạo hội nhóm</span>
                    </button>
                  </div>

                  {/* Top 3 Podium Groups */}
                  <div className="grid grid-cols-3 gap-2 pt-2 items-end text-center bg-[#FAF5EB] p-4 rounded-xl border border-[#C5B358]/30">
                    {/* Top 2 */}
                    <div className="flex flex-col items-center space-y-1 order-1">
                      <div className="relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg" title="Hạng 2">
                          🥈
                        </span>
                        <img
                          src={GROUP_LEADERBOARD[1].avatar}
                          alt={GROUP_LEADERBOARD[1].name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-stone-300 shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-stone-500 text-white text-[9px] font-bold px-1.5 rounded-full">
                          2
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[85px] mt-1" title={GROUP_LEADERBOARD[1].name}>
                        {GROUP_LEADERBOARD[1].name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#8C6B1B]">
                        {GROUP_LEADERBOARD[1].xp.toLocaleString('vi-VN')} điểm
                      </span>
                    </div>

                    {/* Top 1 */}
                    <div className="flex flex-col items-center space-y-1 order-2 -mt-3">
                      <div className="relative">
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-bounce" title="Quán quân">
                          👑
                        </span>
                        <img
                          src={GROUP_LEADERBOARD[0].avatar}
                          alt={GROUP_LEADERBOARD[0].name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-[#D4AF37] shadow-md ring-2 ring-[#580E0E]/20"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#3D0505] text-[10px] font-bold px-2 rounded-full shadow-xs">
                          1
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[95px] mt-1" title={GROUP_LEADERBOARD[0].name}>
                        {GROUP_LEADERBOARD[0].name}
                      </h4>
                      <span className="text-[11px] font-bold text-[#580E0E]">
                        {GROUP_LEADERBOARD[0].xp.toLocaleString('vi-VN')} điểm
                      </span>
                    </div>

                    {/* Top 3 */}
                    <div className="flex flex-col items-center space-y-1 order-3">
                      <div className="relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg" title="Hạng 3">
                          🥉
                        </span>
                        <img
                          src={GROUP_LEADERBOARD[2].avatar}
                          alt={GROUP_LEADERBOARD[2].name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-[#CD7F32] shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-white text-[9px] font-bold px-1.5 rounded-full">
                          3
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] truncate max-w-[85px] mt-1" title={GROUP_LEADERBOARD[2].name}>
                        {GROUP_LEADERBOARD[2].name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#8C6B1B]">
                        {GROUP_LEADERBOARD[2].xp.toLocaleString('vi-VN')} điểm
                      </span>
                    </div>
                  </div>

                  {/* Ranks 4+ */}
                  <div className="space-y-2 pt-1">
                    {GROUP_LEADERBOARD.slice(3).map((group) => (
                      <div
                        key={group.rank}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#FAF5EB] hover:bg-[#F4EBD0] transition-colors border border-[#C5B358]/20 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 text-center font-bold text-stone-500 text-xs">
                            #{group.rank}
                          </span>
                          <img
                            src={group.avatar}
                            alt={group.name}
                            className="w-7 h-7 rounded-full object-cover border border-[#C5B358]/60"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold text-[#261816] text-xs leading-none">
                              {group.name}
                            </p>
                            <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                              {group.badge}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-[#580E0E] text-xs">
                          {group.xp.toLocaleString('vi-VN')} điểm
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <button
                    type="button"
                    onClick={() => setShowGroupNotice(true)}
                    className="w-full text-center text-xs font-bold text-[#580E0E] hover:text-[#781414] py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">add_circle</span>
                    <span>Tạo hội nhóm mới để cùng leo hạng</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Widget BÀI VIẾT ĐƯỢC YÊU THÍCH NHẤT */}
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#C5B358]/70 shadow-sm p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#C5B358]/40">
                <span className="material-symbols-outlined text-xl text-[#C8102E]">
                  favorite
                </span>
                <h3 className="font-serif text-base font-bold text-[#580E0E] uppercase tracking-wide">
                  BÀI VIẾT ĐƯỢC YÊU THÍCH NHẤT
                </h3>
              </div>

              <div className="space-y-3">
                {topLikedArticles.map((feat, idx) => (
                  <div
                    key={feat.id}
                    onClick={() => {
                      setActiveArticle(feat);
                    }}
                    className="flex gap-3 p-2.5 rounded-xl bg-[#FAF5EB] hover:bg-[#F4EBD0] transition-colors border border-[#C5B358]/30 cursor-pointer group relative"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={feat.image}
                        alt={feat.title}
                        className="w-16 h-16 object-cover rounded-lg border border-[#C5B358]/50 group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs border ${
                        idx === 0
                          ? 'bg-[#D4AF37] text-[#3D0505] border-[#B89628]'
                          : idx === 1
                          ? 'bg-stone-300 text-stone-800 border-stone-400'
                          : 'bg-[#CD7F32] text-white border-[#B06B26]'
                      }`}>
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <h4 className="font-serif font-bold text-xs text-[#580E0E] group-hover:text-[#8B1818] line-clamp-2 leading-snug">
                        {feat.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                        <span>{feat.date}</span>
                        <span className="flex items-center gap-1 font-bold text-[#C8102E]">
                          <span className="material-symbols-outlined text-xs text-[#C8102E]">
                            favorite
                          </span>
                          <span>{feat.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Banner Call-to-action cổ kính bên dưới */}
            <div className="relative bg-[#FAF5EB] rounded-2xl border-2 border-[#C5B358] p-6 text-center shadow-md overflow-hidden space-y-4">
              {/* Ornate corner decor */}
              <div className="absolute top-2 left-2 text-[#C5B358]/40">
                <span className="material-symbols-outlined text-2xl">history_edu</span>
              </div>
              <div className="absolute bottom-2 right-2 text-[#C5B358]/40">
                <span className="material-symbols-outlined text-2xl">auto_stories</span>
              </div>

              <div className="w-14 h-14 mx-auto rounded-full bg-[#F4EBD0] border-2 border-[#C5B358] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-3xl text-[#580E0E]">
                  ink_pen
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#580E0E] uppercase tracking-wide leading-snug">
                  CHIA SẺ KIẾN THỨC, LAN TỎA NIỀM TỰ HÀO
                </h4>
                <p className="font-sans text-xs text-[#5A413D] mt-2 leading-relaxed">
                  Mỗi bài viết của bạn là một viên gạch gìn giữ và làm giàu thêm kho tàng ký ức di sản Việt Nam.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsWriteModalOpen(true)}
                className="w-full bg-[#580E0E] hover:bg-[#781414] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">edit_note</span>
                <span>+ Viết bài ngay</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* FULL ARTICLE DETAIL READER MODAL */}
      {/* ======================================================== */}
      {activeArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div
            className="bg-[#FAF5EB] rounded-2xl border-2 border-[#C5B358] w-full max-w-3xl shadow-2xl overflow-hidden my-8 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full z-20 transition-all cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 w-full shrink-0">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block border ${getTagBadgeStyle(
                    activeArticle.category
                  )}`}
                >
                  {activeArticle.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4EBD0] leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Article Content & Comments Area */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
              {/* Author bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#C5B358]/40">
                <div className="flex items-center gap-3">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C5B358]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#580E0E]">
                      {activeArticle.author.name}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {activeArticle.author.role || 'Cộng tác viên'} • {activeArticle.timeAgo || activeArticle.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleLikeArticle(activeArticle.id, e)}
                    className="bg-[#FFE9E6] text-[#580E0E] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-[#FDE2DE] transition-colors cursor-pointer border border-[#580E0E]/30"
                  >
                    <span className="material-symbols-outlined text-sm">favorite</span>
                    <span>{activeArticle.likes} Yêu thích</span>
                  </button>
                </div>
              </div>

              {/* Main Text */}
              <div className="font-sans text-sm md:text-base leading-relaxed text-[#261816] whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#C5B358]/40">
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F4EBD0] text-[#580E0E] border border-[#C5B358]/40 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t border-[#C5B358]/40 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#580E0E] flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">forum</span>
                  <span>Bình luận ({activeArticle.commentsCount})</span>
                </h4>

                {/* Comment input form */}
                <form onSubmit={(e) => handleAddComment(activeArticle.id, e)} className="flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Viết cảm nghĩ của bạn về bài viết..."
                    className="flex-grow p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                  />
                  <button
                    type="submit"
                    className="bg-[#580E0E] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#781414] transition-colors cursor-pointer shrink-0"
                  >
                    Gửi
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-3 pt-2">
                  {(commentsList[activeArticle.id] || []).map((c, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-[#C5B358]/30 flex gap-3">
                      <img
                        src={c.avatar}
                        alt={c.author}
                        className="w-8 h-8 rounded-full object-cover border border-[#C5B358] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#580E0E]">{c.author}</span>
                          <span className="text-[10px] text-stone-400">{c.time}</span>
                        </div>
                        <p className="text-[#5A413D] leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                  {(!commentsList[activeArticle.id] || commentsList[activeArticle.id].length === 0) && (
                    <p className="text-xs text-stone-500 italic py-2 text-center">
                      Chưa có bình luận nào. Hãy là người đầu tiên nêu cảm nghĩ!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* WRITE POST MODAL */}
      {/* ======================================================== */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div
            className="bg-[#FAF5EB] rounded-2xl border-2 border-[#C5B358] w-full max-w-xl shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setIsWriteModalOpen(false);
                setImageLoadError(false);
              }}
              className="absolute top-4 right-4 text-stone-500 hover:text-[#580E0E] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-2xl text-[#580E0E]">
                history_edu
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#580E0E]">
                Viết Bài Chia Sẻ Di Sản
              </h3>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#580E0E] mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Ký ức thăm di tích Thành cổ Quảng Trị..."
                  className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#580E0E] mb-1">
                    Chủ đề
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                  >
                    <option value="Dấu ấn Lịch sử">Dấu ấn Lịch sử</option>
                    <option value="Di tích & Thắng cảnh">Di tích & Thắng cảnh</option>
                    <option value="Văn hóa & Phong tục">Văn hóa & Phong tục</option>
                    <option value="Con người & Ký ức">Con người & Ký ức</option>
                    <option value="Trống">Trống</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#580E0E] mb-1">
                    Tên người viết
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Nguyễn Văn An"
                    className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                  />
                </div>
              </div>

              {/* Hybrid Image Upload & URL Input */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#580E0E] mb-1.5 flex items-center justify-between">
                  <span>Ảnh bìa bài viết</span>
                  {newImageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-[11px] font-bold text-[#C62828] hover:text-[#580E0E] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Xóa ảnh</span>
                    </button>
                  )}
                </label>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Dropzone & Browse Button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageFileChange(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`border-2 border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all ${
                    isDraggingImage
                      ? 'border-[#580E0E] bg-[#FFE9E6]'
                      : 'border-[#C5B358] bg-[#FFFDF9] hover:bg-[#FFE9E6]/40'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 text-[#580E0E]">
                    <span className="material-symbols-outlined text-2xl text-[#D4AF37]">
                      cloud_upload
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Kéo thả hoặc Chọn ảnh từ máy
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A413D] mt-0.5">
                    Hỗ trợ định dạng PNG, JPG, JPEG, WEBP hoặc GIF
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 my-2 text-[10px] font-bold text-[#A26D2B] uppercase">
                  <span className="flex-grow h-px bg-[#C5B358]/40"></span>
                  <span>Hoặc dán link ảnh trực tiếp (URL)</span>
                  <span className="flex-grow h-px bg-[#C5B358]/40"></span>
                </div>

                {/* URL Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={newImageUrl.startsWith('data:') ? '' : newImageUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    onBlur={handleUrlBlur}
                    placeholder={
                      newImageUrl.startsWith('data:')
                        ? 'Đang dùng ảnh tải lên từ máy (nhập link mới để thay thế)'
                        : 'Ví dụ: https://images.unsplash.com/... hoặc link ảnh bất kỳ'
                    }
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-stone-400 text-base">
                    link
                  </span>
                </div>

                {/* Image Preview Box */}
                {newImageUrl.trim() && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-[#C5B358] shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#580E0E] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-[#D4AF37]">
                          image
                        </span>
                        <span>Xem trước ảnh bìa</span>
                        {newImageUrl.startsWith('data:') && (
                          <span className="text-[10px] text-stone-500 font-normal lowercase">
                            (tải từ thiết bị)
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-stone-500 hover:text-[#580E0E] px-2 py-0.5 rounded-full hover:bg-stone-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Xóa ảnh"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                        <span>Xóa ảnh</span>
                      </button>
                    </div>

                    {imageLoadError ? (
                      <div className="p-3 bg-[#FFEBEE] border border-[#EF9A9A] rounded-lg text-[#C62828] text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg shrink-0">
                          broken_image
                        </span>
                        <span>Link ảnh không khả dụng hoặc bị chặn truy cập</span>
                      </div>
                    ) : (
                      <div className="relative w-full h-44 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
                        <img
                          src={newImageUrl}
                          alt="Xem trước ảnh bìa"
                          className="w-full h-full object-cover"
                          onError={() => setImageLoadError(true)}
                          onLoad={() => setImageLoadError(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#580E0E] mb-1">
                  Tóm tắt ngắn
                </label>
                <input
                  type="text"
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="1-2 câu tóm tắt nội dung chính..."
                  className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#580E0E] mb-1">
                  Nội dung chi tiết *
                </label>
                <textarea
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Kể lại cảm nghĩ, tư liệu hoặc câu chuyện di sản bạn muốn lan tỏa..."
                  className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#580E0E]"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsWriteModalOpen(false);
                    setImageLoadError(false);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase border border-stone-300 text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase bg-[#580E0E] hover:bg-[#781414] text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">publish</span>
                  <span>Đăng bài ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Popup thông báo "Tính năng Tạo hội nhóm đang được phát triển" */}
      {showGroupNotice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#FFFDF9] rounded-2xl max-w-sm w-full p-6 border-2 border-[#C5B358] shadow-2xl text-center space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowGroupNotice(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-[#580E0E] cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="w-14 h-14 mx-auto rounded-full bg-[#FFE9E6] border border-[#C5B358]/40 flex items-center justify-center text-[#580E0E]">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-base font-bold text-[#580E0E] uppercase">
                Tính Năng Đang Phát Triển
              </h3>
              <p className="text-xs text-[#5A413D] leading-relaxed">
                Tính năng <strong className="text-[#580E0E]">Tạo hội nhóm đang được phát triển</strong>. Hệ thống sẽ sớm ra mắt không gian sinh hoạt và thi đua tập thể cho các chi hội di sản trong bản cập nhật kế tiếp!
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowGroupNotice(false)}
                className="w-full py-2.5 px-4 bg-[#580E0E] hover:bg-[#781414] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
