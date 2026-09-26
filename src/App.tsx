import { useState, useEffect } from 'react';
import { TabType, CartItem, Product, UserProfile, Article } from './types';
import { INITIAL_USER, ARTICLES } from './data/mockData';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('trangchu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lưu trữ danh sách bài viết tập trung kèm đồng bộ localStorage
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('vietnam_heritage_articles_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading articles from localStorage', e);
    }
    return ARTICLES;
  });

  // Bài viết đang được chọn xem chi tiết
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    try {
      const savedId = localStorage.getItem('vietnam_heritage_selected_article_id');
      if (savedId) {
        const found = ARTICLES.find((a) => a.id === savedId);
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    return ARTICLES[0] || null;
  });

  // Tự động lưu articles vào localStorage mỗi khi cập nhật
  useEffect(() => {
    try {
      localStorage.setItem('vietnam_heritage_articles_list', JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving articles to localStorage', e);
    }
  }, [articles]);

  // Điều hướng và chuyển sang trang chi tiết bài viết
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    try {
      localStorage.setItem('vietnam_heritage_selected_article_id', article.id);
    } catch (e) {
      console.error(e);
    }
    setActiveTab('chitietbaiviet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Thêm bài viết mới vào danh sách
  const handleAddArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    showToast(`Đã xuất bản bài viết "${newArticle.title.slice(0, 32)}..." thành công!`);
  };

  // Thả tim bài viết
  const handleLikeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, likes: a.likes + 1 } : a))
    );
    setSelectedArticle((prev) =>
      prev && prev.id === articleId ? { ...prev, likes: prev.likes + 1 } : prev
    );
  };

  // Scroll to top on tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              lotusPoints: (prev.lotusPoints || 0) + lotusToAdd
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

  // Sync title
  useEffect(() => {
    const titles: Record<TabType, string> = {
      trangchu: 'Mảnh Ghép Hồn Việt - Sống lại di sản, viết tiếp sử xanh',
      vechungtoi: 'Về Chúng Tôi - Mảnh Ghép Hồn Việt',
      baiviet: 'Bài Viết & Tư Liệu Di Sản - Mảnh Ghép Hồn Việt',
      chitietbaiviet: selectedArticle
        ? `${selectedArticle.title} - Mảnh Ghép Hồn Việt`
        : 'Chi Tiết Bài Viết - Mảnh Ghép Hồn Việt',
      trochoi: 'Trò Chơi Di Sản - Khám phá 34 Tỉnh Thành',
      cuahang: 'Cửa Hàng Quà Tặng NFC - Mảnh Ghép Hồn Việt',
      lienhe: 'Liên Hệ & Đóng Góp Di Tích - Mảnh Ghép Hồn Việt',
      login: 'Tài Khoản & Hồ Sơ - Mảnh Ghép Hồn Việt'
    };
    document.title = titles[activeTab] || 'Mảnh Ghép Hồn Việt';
  }, [activeTab, selectedArticle]);

  return (
    <div
      className="w-full min-h-screen bg-[#FAF7F0] m-0 p-0 overflow-x-hidden flex flex-col font-sans antialiased text-[#261816]"
      style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0, overflowX: 'hidden', backgroundColor: '#FAF7F0' }}
    >
      {/* Header with button-based tab navigation */}
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

      {/* Main View Container */}
      <main
        className="w-full flex-grow pt-[72px] m-0 p-0 flex flex-col overflow-x-hidden bg-[#FAF7F0]"
        style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0, overflowX: 'hidden', backgroundColor: '#FAF7F0' }}
      >
        {activeTab === 'trangchu' && (
          <TrangChuView
            setActiveTab={handleTabChange}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setActiveTab('cuahang');
            }}
          />
        )}

        {activeTab === 'vechungtoi' && (
          <VeChungToiView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'baiviet' && (
          <BaiVietView
            setActiveTab={handleTabChange}
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onAddArticle={handleAddArticle}
            onLikeArticle={handleLikeArticle}
          />
        )}

        {activeTab === 'chitietbaiviet' && (
          <ChiTietBaiVietView
            article={selectedArticle || articles[0]}
            setActiveTab={handleTabChange}
            onBack={() => {
              handleTabChange('baiviet');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLike={handleLikeArticle}
            allArticles={articles}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {activeTab === 'trochoi' && (
          <TroChoiView
            setActiveTab={handleTabChange}
            user={user}
            onAwardXp={handleAwardXp}
          />
        )}

        {activeTab === 'cuahang' && (
          <CuaHangView
            setActiveTab={handleTabChange}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'lienhe' && (
          <LienHeView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'login' && (
          <LoginView
            setActiveTab={handleTabChange}
            user={user}
            onLogin={(u) => setUser(u)}
            onLogout={() => setUser(null)}
          />
        )}
      </main>

      {/* Footer with button-based SPA links */}
      <Footer setActiveTab={handleTabChange} />

      {/* Cart Drawer */}
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

      {/* Checkout Modal */}
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveTab={handleTabChange}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Toast Notification */}
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
