import { useState, useEffect } from 'react';
import { TabType, CartItem, Product, UserProfile } from './types';
import { INITIAL_USER } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import CheckoutModal from './components/CheckoutModal';
import TrangChuView from './views/TrangChuView';
import VeChungToiView from './views/VeChungToiView';
import BaiVietView from './views/BaiVietView';
import TroChoiView from './views/TroChoiView';
import CuaHangView from './views/CuaHangView';
import LienHeView from './views/LienHeView';
import LoginView from './views/LoginView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('trangchu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null; // Mặc định là null nếu chưa từng đăng nhập
  });
  
  // Hàm xử lý Đăng nhập
  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem('current_user', JSON.stringify(newUser));
  };
  
  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleAwardXp = (earnedXp: number) => {
    if (user) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              xp: prev.xp + earnedXp,
              completedGames: prev.completedGames + 1,
              discoveredStories: prev.discoveredStories + 1,
              starsCount: prev.starsCount + 50,
              lotusPoints: prev.lotusPoints + 20
            }
          : null
      );
      showToast(`+${earnedXp} XP! Chúc mừng bạn đã hoàn thành thử thách!`);
    }
  };

  const handleAwardQuizRewards = (xp: number, lotus: number, title: string = 'Đồi A1') => {
    setUser((prev) => {
      if (!prev) return prev;
      const newXp = (prev.xp || 0) + xp;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        lotusPoints: (prev.lotusPoints || 0) + lotus,
        completedGames: (prev.completedGames || 0) + 1,
        discoveredStories: (prev.discoveredStories || 0) + 1,
      };
    });
    showToast(`🎉 Xuất sắc! Nhận +${xp} XP & +${lotus} Sen từ Thử thách ${title}!`);
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
      trochoi: 'Trò Chơi Di Sản - Khám phá 34 Tỉnh Thành',
      cuahang: 'Cửa Hàng Quà Tặng NFC - Mảnh Ghép Hồn Việt',
      lienhe: 'Liên Hệ & Đóng Góp Di Tích - Mảnh Ghép Hồn Việt',
      login: 'Tài Khoản & Hồ Sơ - Mảnh Ghép Hồn Việt'
    };
    document.title = titles[activeTab];
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#261816] font-sans antialiased selection:bg-[#FFE9E6] selection:text-[#570000]">
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
      <main className="flex-grow flex flex-col">
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
          <BaiVietView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'trochoi' && (
          <TroChoiView
            setActiveTab={handleTabChange}
            user={user}
            onAwardXp={handleAwardXp}
            onAwardQuizRewards={handleAwardQuizRewards}
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
