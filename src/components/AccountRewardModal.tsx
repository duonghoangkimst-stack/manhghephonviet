import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AccountRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onApplyBonus?: (lotus: number, coins: number, codeName: string) => void;
}

interface PromoCode {
  code: string;
  bonusLotus: number;
  bonusCoins: number;
  desc: string;
}

const AVAILABLE_PROMOS: PromoCode[] = [
  {
    code: 'HONVIET2026',
    bonusLotus: 50,
    bonusCoins: 200,
    desc: 'Tân hội viên'
  },
  {
    code: 'DISANVIET',
    bonusLotus: 40,
    bonusCoins: 180,
    desc: 'Khám phá 34 tỉnh'
  },
  {
    code: 'BANBE',
    bonusLotus: 25,
    bonusCoins: 120,
    desc: 'Kết nối đồng môn'
  }
];

export default function AccountRewardModal({
  isOpen,
  onClose,
  user,
  onApplyBonus
}: AccountRewardModalProps) {
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [appliedCodes, setAppliedCodes] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentLotus = user?.lotusPoints ?? 120;
  const currentCoins = user?.starsCount ?? 500;

  const handleApply = (codeToApply?: string) => {
    const code = (codeToApply || inputCode).trim().toUpperCase();

    if (!code) {
      setFeedback({
        type: 'error',
        message: 'Vui lòng nhập mã quà tặng hoặc chọn mã ưu đãi bên dưới.'
      });
      return;
    }

    if (appliedCodes.includes(code)) {
      setFeedback({
        type: 'error',
        message: `Mã "${code}" đã được kích hoạt trên tài khoản này trước đó.`
      });
      return;
    }

    const matchedPromo = AVAILABLE_PROMOS.find((p) => p.code === code);
    const lotus = matchedPromo ? matchedPromo.bonusLotus : 30;
    const coins = matchedPromo ? matchedPromo.bonusCoins : 100;

    if (onApplyBonus) {
      onApplyBonus(lotus, coins, code);
    }

    setAppliedCodes((prev) => [...prev, code]);
    setInputCode(code);
    setFeedback({
      type: 'success',
      message: `Kích hoạt thành công mã [${code}]! +${lotus} Sen & +${coins} Xu.`
    });
  };

  const handleCopyReferral = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText('HONVIET88');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="account-reward-modal-backdrop"
      className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
        margin: 0,
        padding: 0
      }}
      onClick={onClose}
    >
      <div
        id="account-reward-modal-card"
        className="modal-popup popup-container bg-[#FDFBF7] rounded-2xl border-2 border-[#C5B358] max-w-lg w-[calc(100%-2rem)] p-5 sm:p-6 shadow-2xl text-stone-800 box-border"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          zIndex: 9999,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TIÊU ĐỀ POP-UP (HEADER) */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#C5B358]/40">
          <div className="flex items-center gap-3">
            {/* Icon bông hoa sen màu hồng */}
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-rose-50 border border-rose-300/80 flex items-center justify-center shrink-0 shadow-xs"
              title="Hoa Sen Hồn Việt"
            >
              <svg
                viewBox="0 0 48 48"
                className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500 fill-current drop-shadow-xs"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized Lotus Flower */}
                <path d="M24 6c-1.5 5.2-4.8 12.5-4.8 17.2 0 4.2 2.3 7.8 4.8 8.8 2.5-1 4.8-4.6 4.8-8.8C28.8 18.5 25.5 11.2 24 6z" opacity="0.9" />
                <path d="M19.2 13.5c-3.2 4-8.2 10.8-7.2 15.5 1 4.5 5.5 6.5 8.2 5.5-2.2-2.5-3.2-6.5-2.5-10.2.8-4.2 3.8-8 5.2-9.8-1.5-.4-2.7-.1-3.7-1z" opacity="0.8" />
                <path d="M28.8 13.5c1.5 1.8 4.5 5.6 5.2 9.8.7 3.7-.3 7.7-2.5 10.2 2.7 1 7.2-1 8.2-5.5 1-4.7-4-11.5-7.2-15.5-1 .9-2.2 1.2-3.7 1z" opacity="0.8" />
                <path d="M13 22.5c-4.2 3.5-7.5 9.2-5.8 13.2 1.8 4.2 7 4.5 9.8 2.5-3.2-1.5-5-5-4.5-8.8.4-2.8 1.8-5.2 3.2-7-1.2-.2-2-.1-2.7.1z" opacity="0.65" />
                <path d="M35 22.5c-1.2-.2-2-.3-3.2-.1 1.4 1.8 2.8 4.2 3.2 7 .5 3.8-1.3 7.3-4.5 8.8 2.8 2 8 1.7 9.8-2.5 1.7-4-1.6-9.7-5.3-13.2z" opacity="0.65" />
                <path d="M17 35.5c4 2 10 2 14 0 3-1.5 5.5.5 4.5 2.5-2.5 3.5-12.5 4.5-19 1-2.2-1.2-1.5-3 0.5-3.5z" opacity="0.85" />
              </svg>
            </div>

            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-tight text-[#570000]">
                TÀI KHOẢN & ĐIỂM THƯỞNG
              </h2>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#C5B358] uppercase">
                TÍCH LŨY SEN XANH, ĐONG ĐẦY SỬ VÀNG
              </p>
            </div>
          </div>

          {/* Nút đóng (X) ở góc trên bên phải */}
          <button
            type="button"
            id="account-reward-modal-close-btn"
            onClick={onClose}
            className="text-stone-400 hover:text-[#570000] p-1.5 rounded-full hover:bg-stone-200/50 cursor-pointer transition-colors"
            aria-label="Đóng pop-up"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* 2. KHUNG THÔNG TIN ĐIỂM SỐ (2 CỘT) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 my-4">
          {/* Ô trái: Icon giọt nước hồng + "ĐIỂM SEN HIỆN CÓ" + Giá trị "120 Sen" (Sen màu đỏ) */}
          <div className="bg-[#FFF5F5] rounded-xl border border-[#F2D6D3] p-3 sm:p-3.5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-rose-500 mb-1">
              <span className="material-symbols-outlined text-base">water_drop</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#7D524B]">
                ĐIỂM SEN HIỆN CÓ
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#570000] tracking-tight">
                {currentLotus}
              </span>
              <span className="text-base sm:text-lg font-bold text-red-600">
                Sen
              </span>
            </div>
          </div>

          {/* Ô phải: Icon đồng xu vàng + "ĐIỂM XU TÍCH LŨY" + Giá trị "500 Điểm" */}
          <div className="bg-[#FFFDF3] rounded-xl border border-[#EADBBD] p-3 sm:p-3.5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-500 mb-1">
              <span className="material-symbols-outlined text-base">monetization_on</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#7D6B42]">
                ĐIỂM XU TÍCH LŨY
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#8B5E14] tracking-tight">
                {currentCoins}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#A26D2B]">
                Điểm
              </span>
            </div>
          </div>
        </div>

        {/* 3. KHUNG NHẬP VÀ CHỌN MÃ ƯU ĐÃI (KHUNG TRẮNG VIỀN BO TẬP TRUNG) */}
        <div className="bg-white rounded-xl border border-[#E3D7BF] p-3.5 sm:p-4 shadow-xs mb-4">
          {/* Tiêu đề khung */}
          <div className="flex items-center gap-2 mb-2.5 text-[#570000]">
            <span className="material-symbols-outlined text-lg text-[#C5B358]">redeem</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              NHẬP MÃ GIỚI THIỆU / MÃ QUÀ TẶNG
            </span>
          </div>

          {/* Hàng nhập mã: Input + Nút "ÁP DỤNG ✓" */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApply();
            }}
            className="flex items-center gap-2 mb-3"
          >
            <input
              type="text"
              id="gift-code-input"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value.toUpperCase());
                setFeedback(null);
              }}
              placeholder="VD: HONVIET2026, BANBE..."
              className="flex-1 px-3.5 py-2 bg-[#FCFAF7] border border-[#C5B358] rounded-lg text-xs sm:text-sm font-mono uppercase font-bold text-[#570000] placeholder:text-stone-400 focus:outline-none focus:border-[#570000] focus:ring-1 focus:ring-[#570000]/20"
            />
            <button
              type="submit"
              id="apply-gift-code-btn"
              className="bg-[#570000] hover:bg-[#780000] active:scale-98 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0 whitespace-nowrap"
            >
              ÁP DỤNG ✓
            </button>
          </form>

          {/* Phản hồi trạng thái khi nhập mã */}
          {feedback && (
            <div
              className={`text-xs px-3 py-2 rounded-lg mb-3 font-medium flex items-center gap-1.5 animate-fadeIn ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm shrink-0">
                {feedback.type === 'success' ? 'check_circle' : 'info'}
              </span>
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Danh sách mã ưu đãi sẵn có */}
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold uppercase text-[#8B6E32] tracking-wider mb-2">
              MÃ ƯU ĐÃI ĐANG ÁP DỤNG (BẤM ĐỂ KÍCH HOẠT):
            </div>

            <div className="flex flex-col gap-2 w-full">
              {AVAILABLE_PROMOS.map((promo) => {
                const isUsed = appliedCodes.includes(promo.code);
                return (
                  <button
                    key={promo.code}
                    type="button"
                    onClick={() => handleApply(promo.code)}
                    disabled={isUsed}
                    className={`w-full flex flex-row items-center justify-start gap-2 px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer shadow-2xs text-left ${
                      isUsed
                        ? 'bg-stone-100 border-stone-200 text-stone-400 opacity-60 cursor-not-allowed'
                        : 'bg-[#FFFDF8] hover:bg-[#FFF5E6] border-[#DFCE9B] hover:border-[#C5B358] text-stone-800'
                    }`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    <span className="font-mono font-bold text-[#570000]">
                      [{promo.code}]
                    </span>
                    <span className="font-bold text-[#D9531E] whitespace-nowrap">
                      +{promo.bonusLotus} Sen & +{promo.bonusCoins} Xu
                    </span>
                    <span className="text-stone-500 text-xs font-normal">
                      ({promo.desc})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. KHUNG MÃ GIỚI THIỆU CỦA BẠN (DƯỚI CÙNG) */}
        <div className="bg-[#FAF5EC] rounded-xl border border-[#DFCE9B] p-3 sm:p-3.5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
          <div>
            <div className="text-xs font-bold text-[#570000] uppercase tracking-wider">
              MÃ GIỚI THIỆU CỦA BẠN
            </div>
            <p className="text-[11px] text-[#6E5549] mt-0.5">
              Chia sẻ cho bạn bè cùng nhận +30 Sen và +100 Xu
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
            <div className="bg-white border border-[#C5B358] px-2.5 py-1 rounded font-mono font-black text-xs sm:text-sm text-[#570000] tracking-wider select-all shadow-2xs">
              HONVIET88
            </div>
            <button
              type="button"
              id="copy-referral-code-btn"
              onClick={handleCopyReferral}
              className="bg-[#A26D2B] hover:bg-[#86571F] active:scale-95 text-white px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0"
              title="Sao chép mã giới thiệu"
            >
              {copied ? 'ĐÃ CHÉP' : 'SAO CHÉP'}
            </button>
          </div>
        </div>

        {/* 5. FOOTER */}
        <div className="pt-2.5 border-t border-[#C5B358]/30 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 italic">
            * Điểm Sen và Xu được bảo lưu vĩnh viễn trên tài khoản.
          </span>
          <button
            type="button"
            id="account-reward-modal-footer-close"
            onClick={onClose}
            className="text-xs font-semibold text-[#570000] hover:text-[#800000] hover:underline cursor-pointer px-2 py-1 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
