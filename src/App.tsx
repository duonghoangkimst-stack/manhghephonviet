import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TabType, CartItem, Product, UserProfile, Article } from './types';
import { ARTICLES } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import CheckoutModal from './components/CheckoutModal';
import TrangChuView from './views/TrangChuView';
import VeChungToiView from './views/VeChungToiView';
import BaiVietView from './views/BaiVietView';
import ChiTietBaiVietView from './views/ChiTietBaiVietView';
import TroChoiView from './views/TroChoiView';
import CuaHangView from './views/CuaHangView';
import LienHeView from './views/LienHeView';
import LoginView from './views/LoginView';

// Component wrapper hỗ trợ route chi tiết bài viết theo URL :id / :slug
function ChiTietBaiVietRoute({
  articles,
  setActiveTab,
  user,
  onLikeArticle,
  onSelectArticle
}: {
  articles: Article[];
  setActiveTab: (tab: TabType) => void;
  user: UserProfile | null;
  onLikeArticle: (id: string) => void;
  onSelectArticle: (article: Article) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Decode URI và làm sạch chuỗi id từ URL
  const targetId = id ? decodeURIComponent(id).trim() : '';

  // Tìm bài viết theo id HOẶC slug
  const currentArticle = articles.find(
    (a) => String(a.id).trim() === targetId || String((a as any).slug).trim() === targetId
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!currentArticle) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-20 px-4 text-center">
        <p className="text-gray-500 mb-4">Không tìm thấy bài viết này.</p>
        <button
          onClick={() => navigate('/bai-viet')}
          className="px-4 py-2 bg-[#8C1010] text-white rounded-lg hover:bg-[#6e0c0c] transition-colors"
        >
          Quay lại danh sách bài viết
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentArticle.title} | Mảnh Ghép Hồn Việt</title>
        <meta name="description" content={currentArticle.description || (currentArticle as any).excerpt} />
        <meta property="og:title" content={currentArticle.title} />
        <meta property="og:description" content={currentArticle.description || (currentArticle as any).excerpt} />
        <meta property="og:image" content={currentArticle.image} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://manhghephonviet.com/#/bai-viet/${currentArticle.id}`} />
      </Helmet>
      <ChiTietBaiVietView
        article={currentArticle}
        setActiveTab={setActiveTab}
        user={user}
        onBack={() => {
          navigate('/bai-viet');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLike={onLikeArticle}
        allArticles={articles}
        onSelectArticle={onSelectArticle}
      />
    </>
  );
}

function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Xác định activeTab dựa theo path thực tế của URL
  const getActiveTabFromPath = (path: string): TabType => {
    if (path.startsWith('/ve-chung-toi')) return 'vechungtoi';
    if (path.startsWith('/bai-viet/')) return 'chitietbaiviet';
    if (path.startsWith('/bai-viet')) return 'baiviet';
    if (path.startsWith('/tro-choi')) return 'trochoi';
    if (path.startsWith('/cua-hang')) return 'cuahang';
    if (path.startsWith('/lien-he')) return 'lienhe';
    if (path.startsWith('/tai-khoan')) return 'login';
    return 'trangchu';
  };

  const activeTab = getActiveTabFromPath(location.pathname);

  // Khởi tạo và TỰ ĐỘNG ĐỒNG BỘ mảng ARTICLES từ mockData với localStorage
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('vietnam_heritage_articles_list');
      if (saved) {
        const parsed: Article[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Lấy tất cả bài viết từ mockData
          const mockIds = new Set(ARTICLES.map((a) => String(a.id)));
          // Giữ lại các bài viết do người dùng tự thêm mới
          const userCreated = parsed.filter((a) => !mockIds.has(String(a.id)));
          // Ưu tiên mảng ARTICLES từ mockData chuẩn + bài do người dùng tạo
          return [...userCreated, ...ARTICLES];
        }
      }
    } catch (e) {
      console.error('Error loading articles from localStorage', e);
    }
    return ARTICLES;
  });

  // Tự động lưu articles vào localStorage khi có sự thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('vietnam_heritage_articles_list', JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving articles to localStorage', e);
    }
  }, [articles]);

  // Điều hướng bằng URL thay vì chỉ đổi state
  const handleTabChange = (tab: TabType) => {
    const routeMap: Record<TabType, string> = {
      trangchu: '/',
      vechungtoi: '/ve-chung-toi',
      baiviet: '/bai-viet',
      chitietbaiviet: '/bai-viet',
      trochoi: '/tro-choi',
      cuahang: '/cua-hang',
      lienhe: '/lien-he',
      login: '/tai-khoan',
    };
    navigate(routeMap[tab] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    const articleIdentifier = (article as any).slug || article.id;
    try {
      localStorage.setItem('vietnam_heritage_selected_article_id', articleIdentifier);
    } catch (e) {
      console.error(e);
    }
    navigate(`/bai-viet/${articleIdentifier}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    showToast(`Đã xuất bản bài viết "${newArticle.title.slice(0, 32)}..." thành công!`);
  };

  const handleLikeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAwardXp = (earnedXp: number, earnedLotus?: number) => {
    if (user) {
      const lotusToAdd = earnedLotus !== undefined ? earnedLotus : 20;
      setUser((prev) =>
        prev
          ? {
              ...prev,
              xp: prev.xp + earnedXp,
              completedGames: prev.completedGames + 1,
              discoveredStories: prev.discoveredStories + 1,
              starsCount: prev.starsCount + 50,
              lotusPoints: (prev.lotusPoints || 0) + lotusToAdd,
            }
          : null
      );
      showToast(`+${earnedXp} XP & +${lotusToAdd} Sen! Chúc mừng bạn đã hoàn thành thử thách!`);
    }
  };

  const handleApplyReferralCode = (code: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        lotusPoints: (prev.lotusPoints || 0) + 50,
        starsCount: (prev.starsCount || 0) + 200,
      };
    });
    showToast(`Áp dụng mã "${code}" thành công! Nhận +50 Sen & +200 điểm thưởng.`);
  };

  const handleApplyBonus = (lotus: number, coins: number, code: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        lotusPoints: (prev.lotusPoints || 0) + lotus,
        starsCount: (prev.starsCount || 0) + coins,
      };
    });
    showToast(`Kích hoạt mã [${code}] thành công! +${lotus} Sen & +${coins} Xu.`);
  };

  // Cập nhật thẻ Title chuẩn SEO theo trang
  useEffect(() => {
    const titles: Record<TabType, string> = {
      trangchu: 'Mảnh Ghép Hồn Việt - Sống lại di sản, viết tiếp sử xanh',
      vechungtoi: 'Về Chúng Tôi - Mảnh Ghép Hồn Việt',
      baiviet: 'Bài Viết & Tư Liệu Di Sản - Mảnh Ghép Hồn Việt',
      chitietbaiviet: 'Chi Tiết Bài Viết - Mảnh Ghép Hồn Việt',
      trochoi: 'Trò Chơi Di Sản - Khám phá 34 Tỉnh Thành',
      cuahang: 'Cửa Hàng Quà Tặng NFC - Mảnh Ghép Hồn Việt',
      lienhe: 'Liên Hệ & Đóng Góp Di Tích - Mảnh Ghép Hồn Việt',
      login: 'Tài Khoản & Hồ Sơ - Mảnh Ghép Hồn Việt',
    };
    if (activeTab !== 'chitietbaiviet') {
      document.title = titles[activeTab] || 'Mảnh Ghép Hồn Việt';
    }
  }, [activeTab]);

  return (
    <div
      className="w-full min-h-screen bg-[#FAF7F0] m-0 p-0 overflow-x-hidden flex flex-col font-sans antialiased text-[#261816]"
      style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0, overflowX: 'hidden', backgroundColor: '#FAF7F0' }}
    >
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
        user={user}
        onApplyReferralCode={handleApplyReferralCode}
        onApplyBonus={handleApplyBonus}
      />

      <main
        className="w-full flex-grow pt-[72px] m-0 p-0 flex flex-col overflow-x-hidden bg-[#FAF7F0]"
        style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0, overflowX: 'hidden', backgroundColor: '#FAF7F0' }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <TrangChuView
                setActiveTab={handleTabChange}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  handleTabChange('cuahang');
                }}
              />
            }
          />
          <Route path="/ve-chung-toi" element={<VeChungToiView setActiveTab={handleTabChange} />} />
          <Route
            path="/bai-viet"
            element={
              <BaiVietView
                setActiveTab={handleTabChange}
                articles={articles}
                onSelectArticle={handleSelectArticle}
                onAddArticle={handleAddArticle}
                onLikeArticle={handleLikeArticle}
              />
            }
          />
          <Route
            path="/bai-viet/:id"
            element={
              <ChiTietBaiVietRoute
                articles={articles}
                setActiveTab={handleTabChange}
                user={user}
                onLikeArticle={handleLikeArticle}
                onSelectArticle={handleSelectArticle}
              />
            }
          />
          <Route
            path="/tro-choi"
            element={
              <TroChoiView
                setActiveTab={handleTabChange}
                user={user}
                onAwardXp={handleAwardXp}
              />
            }
          />
          <Route
            path="/cua-hang"
            element={
              <CuaHangView
                setActiveTab={handleTabChange}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
              />
            }
          />
          <Route path="/lien-he" element={<LienHeView setActiveTab={handleTabChange} />} />
          <Route
            path="/tai-khoan"
            element={
              <LoginView
                setActiveTab={handleTabChange}
                user={user}
                onLogin={(u) => setUser(u)}
                onLogout={() => setUser(null)}
              />
            }
          />
        </Routes>
      </main>

      <Footer setActiveTab={handleTabChange} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
        user={user}
        onOrderSuccess={(orderCode) => {
          showToast(`Đặt hàng thành công! Mã đơn: ${orderCode}`);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveTab={handleTabChange}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[150] bg-[#570000] text-[#F4EBD0] border-2 border-[#C5B358] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[#D4AF37] text-xl">
            info
          </span>
          <span className="text-xs font-bold font-sans">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <MainContent />
    </HashRouter>
  );
}