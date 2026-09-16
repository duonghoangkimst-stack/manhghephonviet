import { useState, type FormEvent } from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3D0505] text-[#F4EBD0] border-t-4 border-[#C5B358] relative overflow-hidden">
      {/* Background ambient watermark */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-[320px]">temple_buddhist</span>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand story */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('trangchu');
                scrollToTop();
              }}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            >
              <img
                src="logovang(1).png"
                alt="Logo Manh Ghep Hon Viet"
                className="h-12 w-auto object-contain filter brightness-110"
              />
              <div className="flex flex-col pt-1 overflow-visible">
                <span className="font-serif text-[22px] font-bold text-[#D4AF37] uppercase leading-[1.35] whitespace-nowrap overflow-visible">
                  Mảnh Ghép Hồn Việt
                </span>
                <span className="font-serif italic text-sm text-[#F4EBD0]/85">
                  Khơi nguồn di sản, thắp sáng sử vàng.
                </span>
              </div>
            </button>
            <p
              className="text-sm text-[#D4AF37] font-bold uppercase tracking-wider leading-relaxed mt-1 max-w-sm text-justify"
              style={{ textAlign: 'justify' }}
            >
              Mỗi mảnh ghép kể một câu chuyện, muôn mảnh ghép dệt nên hồn nước non.
            </p>
            <p
              className="text-sm text-[#F4EBD0]/85 leading-relaxed max-w-sm text-justify"
              style={{ textAlign: 'justify' }}
            >
              Nơi lịch sử không chỉ được đọc trong sách vở mà được sống lại qua hành trình nhập vai, tương tác và bảo tồn di sản cho thế hệ tương lai.
            </p>

            {/* Social Media Links: Circular golden icons only */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/profile.php?id=61593680177977&mibextid=wwXIfr&rdid=II84TigoDw0kMv8e&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FFWbNeaS2%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Mảnh Ghép Hồn Việt"
                className="w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-black/25 text-[#D4AF37] hover:text-[#3D0505] hover:bg-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/manhghephonviet.project/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Mảnh Ghép Hồn Việt"
                className="w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-black/25 text-[#D4AF37] hover:text-[#3D0505] hover:bg-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@manh_ghep_hon_viet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Mảnh Ghép Hồn Việt"
                className="w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-black/25 text-[#D4AF37] hover:text-[#3D0505] hover:bg-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.83-4.47V8.01a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.83-.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Khám Phá */}
          <div>
            <h4 className="font-sans font-bold text-[#D4AF37] uppercase tracking-wider text-base mb-5 pb-1 border-b border-[#D4AF37]/30 inline-block">
              Khám Phá
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('trochoi');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Trò chơi tương tác
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('baiviet');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Bài viết & Di sản
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('cuahang');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Cửa hàng quà tặng
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('vechungtoi');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Về chúng tôi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hỗ Trợ & Liên Kết */}
          <div>
            <h4 className="font-sans font-bold text-[#D4AF37] uppercase tracking-wider text-base mb-5 pb-1 border-b border-[#D4AF37]/30 inline-block">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('lienhe');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Đóng góp di tích
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('lienhe');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Hướng dẫn trải nghiệm
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('lienhe');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Câu hỏi thường gặp
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('lienhe');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Chính sách & Bảo mật
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Đăng Ký Nhận Tin */}
          <div>
            <h4 className="font-sans font-bold text-[#D4AF37] uppercase tracking-wider text-base mb-3 pb-1 border-b border-[#D4AF37]/30 inline-block">
              Bản Tin Di Sản
            </h4>
            <p className="text-sm text-[#F4EBD0]/75 mb-4 leading-relaxed">
              Nhận thông báo về câu chuyện di sản và sự kiện mới nhất.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="w-full bg-white/10 border border-[#D4AF37]/40 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#D4AF37] hover:bg-white text-[#3D0505] rounded-full text-sm font-bold transition-all flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#C5B358] animate-fadeIn">
                  Cảm ơn bạn đã đăng ký nhận tin!
                </p>
              )}
            </form>
            <div className="mt-4 pt-3 border-t border-white/10 text-sm space-y-2 text-[#F4EBD0]/85">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#D4AF37]">call</span>
                <span>0338 343 697</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#D4AF37]">mail</span>
                <span>lienhe@manhghephonviet.vn</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/70">
            <div className="space-y-1 text-center sm:text-left">
              <p>© 2026 MẢNH GHÉP HỒN VIỆT.</p>
              <p className="font-semibold text-[#D4AF37] uppercase tracking-wider">
                ĐÂY LÀ DỰ ÁN GIẢ ĐỊNH CỦA NHÓM SINH VIÊN UEH PHỤC VỤ MỤC ĐÍCH HỌC TẬP.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1 font-bold text-xs"
              >
                <span>Lên đầu trang</span>
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
              </button>
            </div>
          </div>
      </div>
    </footer>
  );
}
