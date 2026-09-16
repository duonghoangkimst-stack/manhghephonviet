import { useState } from 'react';
import { TabType, UserProfile } from '../types';
import AccountRewardModal from './AccountRewardModal';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  openCart: () => void;
  openSearch: () => void;
  user: UserProfile | null;
  onApplyReferralCode?: (code: string) => void;
  onApplyBonus?: (lotus: number, coins: number, code: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openSearch,
  user,
  onApplyReferralCode,
  onApplyBonus
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'trangchu', label: 'Trang chủ' },
    { id: 'vechungtoi', label: 'Về chúng tôi' },
    { id: 'baiviet', label: 'Bài viết' },
    { id: 'trochoi', label: 'Trò chơi' },
    { id: 'cuahang', label: 'Cửa hàng' },
    { id: 'lienhe', label: 'Liên hệ' },
  ];

  return (
    <header
      id="main-app-header"
      className="bg-[#FDFBF7]/95 dark:bg-[#2A1613]/95 backdrop-blur-md border-b border-[#C5B358]/40 shadow-xs transition-colors"
      style={{
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '8px 16px',
      }}
    >
      <div
        className="w-full flex items-center justify-between"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* 1. CỤM TRÁI (LOGO): flex-shrink: 0; min-width: max-content; */}
        <div
          id="header-logo-container"
          className="flex items-center shrink-0 flex-shrink-0"
          style={{
            flexShrink: 0,
            minWidth: 'max-content',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('trangchu')}
            className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
            style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logodo.png"
              alt="Mảnh Ghép Hồn Việt Logo"
              className="h-8 sm:h-9 xl:h-10 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
              style={{ flexShrink: 0 }}
            />
            <div className="flex flex-col justify-center" style={{ whiteSpace: 'nowrap' }}>
            <span
  className="text-sm md:text-base font-bold text-[#58080A] uppercase tracking-wide leading-tight"
  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Mảnh Ghép Hồn Việt
              </span>
              <span
                className="text-[9px] sm:text-[10px] text-[#A26D2B] font-sans font-bold uppercase tracking-widest leading-none hidden sm:block"
                style={{ whiteSpace: 'nowrap' }}
              >
                Khơi nguồn di sản, thắp sáng sử vàng
              </span>
            </div>
          </button>
        </div>

        {/* 2. CỤM GIỮA (NAVIGATION MENU): flex: 1; display: flex; justify-content: center; align-items: center; gap: 8px-12px; margin: 0 16px */}
        <nav
          id="header-nav-menu"
          className="no-scrollbar hidden md:flex items-center justify-center"
          style={{
            flex: '1 1 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginLeft: '16px',
            marginRight: '16px',
            minWidth: 0,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`font-sans font-bold uppercase transition-all relative py-1 px-1.5 cursor-pointer ${
                  isActive
                    ? 'text-[#7A1C1C] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#7A1C1C]'
                    : 'text-[#5A413D] hover:text-[#7A1C1C]'
                }`}
                style={{
                  fontSize: '13px',
                  letterSpacing: '0px',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* 3. CỤM PHẢI (BADGE SEN/ĐIỂM, KÍNH LÚP, GIỎ HÀNG, AVATAR): flex-shrink: 0; display: flex; align-items: center; gap: 10px; min-width: max-content; */}
        <div
          id="header-actions-container"
          className="shrink-0 flex-shrink-0"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: 'max-content',
            visibility: 'visible',
          }}
        >
          {/* Badge Sen & Xu - Thu gọn padding và font size */}
          <button
            id="header-rewards-btn"
            type="button"
            onClick={() => setShowReferralModal(true)}
            className="bg-[#FFF8F6] hover:bg-[#FDECE8] border border-[#C5B358] rounded-full font-bold text-[#570000] shadow-2xs transition-all cursor-pointer group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              visibility: 'visible',
            }}
            title="Tài khoản & điểm thưởng (Bấm để xem và nhập mã quà tặng)"
          >
            <div className="flex items-center gap-1" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
              <span className="text-xs select-none">🪷</span>
              <span className="font-serif font-black text-[#800000]" style={{ fontSize: '12px' }}>
                {user?.lotusPoints ?? 0}
              </span>
              <span className="text-[#A26D2B] font-semibold" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                Sen
              </span>
            </div>

            <span className="w-px h-3 bg-[#C5B358]/60 mx-0.5"></span>

            <div className="flex items-center gap-1" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
              <span className="text-xs select-none">🪙</span>
              <span className="font-serif font-black text-[#800000]" style={{ fontSize: '12px' }}>
                {user?.starsCount ?? 0}
              </span>
              <span className="text-[#A26D2B] font-semibold" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                điểm
              </span>
            </div>
          </button>

          {/* Kính lúp (Tìm kiếm) */}
          <button
            id="header-search-btn"
            type="button"
            onClick={openSearch}
            className="p-1.5 text-[#7A1C1C] hover:bg-[#FDE2DE] rounded-full transition-colors cursor-pointer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              visibility: 'visible',
            }}
            title="Tìm kiếm"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* Giỏ hàng (Cart) */}
          <button
            id="header-cart-btn"
            type="button"
            onClick={openCart}
            className="p-1.5 text-[#7A1C1C] hover:bg-[#FDE2DE] rounded-full transition-colors relative cursor-pointer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              visibility: 'visible',
            }}
            title="Giỏ hàng"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-[#C5B358] text-[#570000] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                style={{ fontSize: '10px', whiteSpace: 'nowrap' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Avatar / Đăng nhập */}
          {user ? (
            <button
              id="header-avatar-btn"
              type="button"
              onClick={() => setActiveTab('login')}
              className="rounded-full p-0.5 border-2 border-[#C5B358] hover:border-[#7A1C1C] hover:opacity-90 hover:scale-105 transition-all cursor-pointer shadow-xs focus:outline-none"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                visibility: 'visible',
              }}
              title={`Tài khoản: ${user.name}`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover shrink-0"
                style={{ flexShrink: 0 }}
              />
            </button>
          ) : (
            <button
              id="header-login-btn"
              type="button"
              onClick={() => setActiveTab('login')}
              className="bg-[#800000] hover:bg-[#570000] text-white px-2.5 sm:px-3 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                visibility: 'visible',
                fontSize: '12px',
              }}
            >
              <span className="material-symbols-outlined text-base">person</span>
              <span style={{ whiteSpace: 'nowrap' }}>Đăng nhập</span>
            </button>
          )}

          {/* Nút Hamburger menu - ẨN TRÊN MÁY TÍNH DESKTOP (md:!hidden), CHỈ HIỂN THỊ TRÊN MOBILE */}
          <button
            id="header-mobile-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:!hidden flex items-center justify-center p-1 text-[#7A1C1C] hover:bg-[#FDE2DE] rounded-lg transition-colors cursor-pointer"
            style={{
              flexShrink: 0,
            }}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Pop-up TÀI KHOẢN & ĐIỂM THƯỞNG */}
      <AccountRewardModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        user={user}
        onApplyBonus={(lotus, coins, codeName) => {
          if (onApplyBonus) {
            onApplyBonus(lotus, coins, codeName);
          } else if (onApplyReferralCode) {
            onApplyReferralCode(codeName);
          }
        }}
      />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#C5B358] px-6 py-4 space-y-2 shadow-xl animate-fadeIn">
          {/* Mobile Sen & Xu display */}
          <button
            type="button"
            onClick={() => {
              setShowReferralModal(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 mb-2 bg-[#FFF8F6] hover:bg-[#FDECE8] rounded-xl border border-[#C5B358] transition-colors cursor-pointer text-left"
            title="Tài khoản & điểm thưởng"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🪷</span>
              <span className="font-bold text-xs text-[#570000]">{user?.lotusPoints ?? 0} Sen</span>
              <span className="w-px h-3 bg-[#C5B358]"></span>
              <span className="text-base">🪙</span>
              <span className="font-bold text-xs text-[#570000]">{user?.starsCount ?? 0} điểm</span>
            </div>
            <span className="material-symbols-outlined text-stone-400 text-base">chevron_right</span>
          </button>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-sans font-bold uppercase text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#800000] text-white'
                    : 'text-[#5A413D] hover:bg-[#FDE2DE]'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-sm">
                  {isActive ? 'check' : 'chevron_right'}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
