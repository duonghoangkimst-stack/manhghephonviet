import { TabType, Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import heroBannerBg from '../assets/images/bia_trang_chu.jpg';

interface TrangChuViewProps {
  setActiveTab: (tab: TabType) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function TrangChuView({
  setActiveTab,
  onAddToCart,
  onBuyNow,
  onSelectProduct
}: TrangChuViewProps) {
  const handleBuyNow = (product: Product) => {
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
    }
  };
  return (
    <div className="w-full flex-grow">
      {/* Hero Section */}
      <section
        id="hero-banner-section"
        className="relative w-full min-h-[580px] md:min-h-[720px] flex items-center border-b border-[#C5B358]"
        style={{
          backgroundImage: `url(${heroBannerBg}), url('Bìa trang chủ.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Soft overlay to ensure high contrast for typography while keeping Dong Son drum pattern visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE]/80 via-[#FAF6EE]/40 to-transparent pointer-events-none"></div>

        {/* Cụm văn bản ở phía BÊN TRÁI của Banner (text-align: left; max-width: 50%; padding-left: 5%) */}
        <div
          id="hero-banner-text-container"
          className="w-full relative z-10 py-16 md:py-24"
          style={{
            textAlign: 'left',
            maxWidth: '50%',
            paddingLeft: '5%',
          }}
        >
          <div className="w-full max-w-xl">
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#7A1C1C] mb-2 font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              Chào mừng bạn đến với
            </h2>
            <h1 
        className="hero-title text-[#D4AF37]"
        style={{ color: "#58080A", textShadow: "none", filter: "none", lineHeight: "1.35" }}
        >
              MẢNH GHÉP 
              <br/>
              HỒN VIỆT
            </h1>
            <div className="bg-[#3A4A38] text-white inline-block px-5 py-2.5 rounded-full mb-6 shadow-md border border-[#C5B358]/50">
              <h3 className="font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.2em]">
                KHƠI NGUỒN DI SẢN, THẮP SÁNG SỬ VÀNG
              </h3>
            </div>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#2C1C19] mb-8 leading-relaxed font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Lịch sử không chỉ để đọc trong sách vở, mà để được{' '}
              <strong className="text-[#5B0E0E] font-bold">cảm nhận</strong> và đồng hành qua từng trải nghiệm thực tế.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('trochoi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#5B0E0E] hover:bg-[#800000] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold transition-all"
>
  <span>BẮT ĐẦU HÀNH TRÌNH</span>
  <span className="material-symbols-outlined text-xl">arrow_forward</span>
</button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('vechungtoi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white/90 hover:bg-white text-[#5B0E0E] border-2 border-[#5B0E0E] px-6 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 cursor-pointer hover:bg-[#FFF8F6]"
              >
                <span>Về Chúng Tôi</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-[#4A0808] py-20 relative border-y-4 border-[#C5B358] text-white">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-20 bg-[#C5B358]"></div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37] uppercase tracking-widest">
                CỘNG ĐỒNG
              </h2>
              <div className="h-px w-20 bg-[#C5B358]"></div>
            </div>
            <p className="font-sans text-[#F4EBD0]/80 text-sm italic">
              Hòa sắc riêng – dệt hồn chung
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-12">
            {/* Card 1 */}
            <div className="bg-black/35 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center border border-[#C5B358]/40 hover:border-[#C5B358] transition-all group">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
              </div>
              <h4 className="font-bold text-[#D4AF37] text-sm mb-2">Check-in di tích</h4>
              <p className="text-xs text-gray-200">Ghi lại hành trình khám phá di sản</p>
            </div>

            {/* Card 2 */}
            <div className="bg-black/35 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center border border-[#C5B358]/40 hover:border-[#C5B358] transition-all group">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">rate_review</span>
              </div>
              <h4 className="font-bold text-[#D4AF37] text-sm mb-2">Chia sẻ cảm nhận</h4>
              <p className="text-xs text-gray-200">Kể câu chuyện với cộng đồng</p>
            </div>

            {/* Card 3 */}
            <div className="bg-black/35 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center border border-[#C5B358]/40 hover:border-[#C5B358] transition-all group">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">emoji_events</span>
              </div>
              <h4 className="font-bold text-[#D4AF37] text-sm mb-2">Bảng xếp hạng</h4>
              <p className="text-xs text-gray-200">Thử thách bản thân, vinh danh sử xanh</p>
            </div>

            {/* Card 4 */}
            <div className="bg-black/35 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center border border-[#C5B358]/40 hover:border-[#C5B358] transition-all group">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">local_florist</span>
              </div>
              <h4 className="font-bold text-[#D4AF37] text-sm mb-2">Tích Sao & Sen</h4>
              <p className="text-xs text-gray-200">Tích lũy điểm, đổi quà tri ân</p>
            </div>

            {/* Card 5 */}
            <div className="bg-black/35 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center border border-[#C5B358]/40 hover:border-[#C5B358] transition-all group col-span-2 md:col-span-1">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <h4 className="font-bold text-[#D4AF37] text-sm mb-2">Sự kiện giao lưu</h4>
              <p className="text-xs text-gray-200">Kết nối các bạn trẻ yêu sử Việt</p>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setActiveTab('baiviet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4A0808] px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>KHÁM PHÁ CỘNG ĐỒNG BÀI VIẾT</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Game Overview Section */}
      <section className="py-20 bg-[#FAF5EB] border-b border-[#D8CBB4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#5B0E0E] uppercase mb-2 tracking-wide">
              TỔNG QUAN VỀ TRÒ CHƠI
            </h2>
            <p className="font-sans text-gray-700 text-sm">
              Trải nghiệm lịch sử theo cách tương tác hoàn toàn mới
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Steps */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-[#F5EDE1] p-5 rounded-xl border border-[#D8CBB4] shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#5B0E0E] text-white flex items-center justify-center font-bold mb-3 shadow-md">
                  1
                </div>
                <h4 className="font-bold text-[#5B0E0E] text-sm uppercase mb-1">
                  Chọn địa danh
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Khám phá các di tích lịch sử Bắc - Trung - Nam trên bản đồ trực quan.
                </p>
              </div>

              <div className="bg-[#F5EDE1] p-5 rounded-xl border border-[#D8CBB4] shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#5B0E0E] text-white flex items-center justify-center font-bold mb-3 shadow-md">
                  2
                </div>
                <h4 className="font-bold text-[#5B0E0E] text-sm uppercase mb-1">
                  Hóa thân nhân vật
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Trở thành người trong cuộc, cảm nhận câu chuyện từ góc nhìn thực tế.
                </p>
              </div>

              <div className="bg-[#F5EDE1] p-5 rounded-xl border border-[#D8CBB4] shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#5B0E0E] text-white flex items-center justify-center font-bold mb-3 shadow-md">
                  3
                </div>
                <h4 className="font-bold text-[#5B0E0E] text-sm uppercase mb-1">
                  Chinh phục thử thách
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Trực tiếp giải mã các câu đố, xử lý tình huống hóc búa và đưa ra quyết định sinh tử
                </p>
              </div>

              <div className="bg-[#F5EDE1] p-5 rounded-xl border border-[#D8CBB4] shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#5B0E0E] text-white flex items-center justify-center font-bold mb-3 shadow-md">
                  4
                </div>
                <h4 className="font-bold text-[#5B0E0E] text-sm uppercase mb-1">
                  Mở khóa ký ức
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Thu thập tư liệu lịch sử, nhận điểm XP và vinh danh trên Bảng vàng.
                </p>
              </div>
            </div>

            {/* Featured Game Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5B358] min-h-[460px] flex items-center group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0WZp3ODsQbEv7ZFMtUihkgaPZ5yRUckbDO_enHLl3zYw6LWeFgFaeRTOWBYg67YkO5PIRIqg9V5ungAvP0i4QM6gLxxfAe2AHr7VoYBA6wJUPCMXXtERtwsp3ZtuwJ-vwra9UI6tD7TNYNZqAeKy4Wpeb2F2qKk3yPRZhPm0Q5RoKvqcskb2wddLrY6NZsUqTkUrEXUmE6w4dfo9SDcANRBNheHNcIB9k8rQdoTwtSEkHQ6CnyAzVaFbdZ8XmDT5vHYY"
                  alt="Thành cổ Quảng Trị"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
                <div className="relative z-10 p-8 md:p-10 max-w-xl text-white">
                  <span className="text-[10px] bg-[#800000] text-white font-bold uppercase tracking-widest px-3 py-1 rounded inline-block mb-3">
                    TRẢI NGHIỆM NỔI BẬT
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-[#F4EBD0]">
                    Thành cổ Quảng Trị
                  </h3>
                  <p className="text-sm font-semibold italic text-[#D4AF37] mb-4">
                    81 ngày đêm – Bản hùng ca bất diệt
                  </p>
                  <p className="text-xs md:text-sm text-gray-200 leading-relaxed mb-6">
                    Hóa thân thành người lính trẻ mùa hè 1972, trực tiếp bước vào những khoảnh khắc sinh tử để giữ vững từng tấc đất di sản thiêng liêng.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('trochoi');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#D4AF37] hover:bg-white text-[#3D0505] px-8 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>KHÁM PHÁ TRÒ CHƠI</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 bg-[#3D0505] text-[#F4EBD0] border-b border-[#C5B358] relative">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37] uppercase mb-2 tracking-wide">
              DANH MỤC SẢN PHẨM
            </h2>
            <p className="font-sans text-[#F4EBD0]/80 text-sm">
              Mang một mảnh Hồn Việt về nhà qua các vật phẩm lưu niệm tích hợp công nghệ NFC
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#F9F3E8] rounded-xl border border-[#C5B358] overflow-hidden flex flex-col text-[#261816] shadow-lg group hover:-translate-y-1 transition-all"
              >
                <div className="p-3 m-2 bg-white rounded-lg aspect-square overflow-hidden border border-[#D8CBB4] relative flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded"
                  />
                  <span className="absolute top-2 left-2 bg-[#800000] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    NFC
                  </span>
                  <span className="absolute top-2 right-2 bg-[#E63946] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    -10%
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-serif font-bold text-base text-[#5B0E0E] mb-1 line-clamp-2 min-h-[44px]">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2">{prod.shortDesc}</p>
                  <div className="mt-auto pt-3 border-t border-[#D8CBB4] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-[#5B0E0E] text-base">
                          {prod.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="bg-[#E63946] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          -10%
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 line-through block">
                        {(prod.oldPrice || Math.round((prod.price / 0.9) / 1000) * 1000).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Nút xem nhanh chi tiết */}
                      <button
                        type="button"
                        onClick={() => onSelectProduct(prod)}
                        className="w-8 h-8 rounded-full text-[#5B0E0E] hover:bg-[#FDE2DE] flex items-center justify-center transition-colors cursor-pointer"
                        title="Xem chi tiết"
                        aria-label="Xem chi tiết"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>

                      {/* Nút sticker Giỏ hàng tách riêng */}
                      <button
                        type="button"
                        onClick={() => onAddToCart(prod)}
                        className="w-8 h-8 rounded-full border border-[#C5B358] bg-white text-[#5B0E0E] hover:bg-[#5B0E0E] hover:text-[#D4AF37] hover:border-[#5B0E0E] flex items-center justify-center transition-all cursor-pointer shadow-2xs group/cart"
                        title="Thêm vào giỏ hàng"
                        aria-label="Thêm vào giỏ hàng"
                      >
                        <span className="material-symbols-outlined text-base group-hover/cart:scale-110 transition-transform">
                          shopping_cart
                        </span>
                      </button>

                      {/* Nút Mua ngay chính */}
                      <button
                        type="button"
                        onClick={() => handleBuyNow(prod)}
                        className="bg-[#5B0E0E] hover:bg-[#800000] active:scale-95 text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow cursor-pointer whitespace-nowrap"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => {
                setActiveTab('cuahang');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#D4AF37] hover:bg-white text-[#3D0505] px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>XEM TOÀN BỘ CỬA HÀNG</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contribute & Testimonials */}
      <section className="py-20 bg-[#F4EBD0]">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contribute Box */}
          <div className="lg:col-span-5 bg-[#2A3428] rounded-2xl text-white p-8 md:p-10 flex flex-col justify-between shadow-xl border border-[#C5B358]/50">
            <div>
              <span className="text-xs bg-[#C5B358] text-[#2A3428] font-bold px-3 py-1 rounded uppercase tracking-wider inline-block mb-4">
                ĐỒNG HÀNH
              </span>
              <h3 className="font-serif text-3xl font-bold mb-4 uppercase text-[#D4AF37]">
                ĐÓNG GÓP DI TÍCH
              </h3>
              <p className="text-sm mb-6 text-gray-200 leading-relaxed">
                Bạn muốn Mảnh Ghép Hồn Việt kể câu chuyện di sản nào tiếp theo? Cùng chúng tôi lưu giữ và lan tỏa!
              </p>
              <ul className="space-y-3.5 mb-8 text-xs text-gray-200">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-base">location_on</span>
                  <span>Đề xuất địa danh, di tích mới</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-base">image</span>
                  <span>Gửi hình ảnh và tư liệu quý giá</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-base">campaign</span>
                  <span>Chia sẻ hồi ức của nhân chứng lịch sử</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('lienhe');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#D4AF37] hover:bg-white text-[#2A3428] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>ĐÓNG GÓP NGAY</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-7 bg-[#FDFBF7] rounded-2xl border border-[#D8CBB4] p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#5B0E0E] uppercase mb-1">
                  NGƯỜI CHƠI NÓI GÌ?
                </h3>
                <p className="text-xs text-gray-600">Cảm nhận từ những người trẻ yêu lịch sử Việt</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#FAF5EB] p-4 rounded-xl border border-[#D8CBB4] flex flex-col">
                  <div className="flex text-[#D4AF37] text-xs mb-2 justify-center">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs text-gray-800 italic mb-4 text-center flex-grow">
                    "Lần đầu tiên mình cảm thấy lịch sử không còn xa lạ. Nhập vai rất chân thực và xúc động."
                  </p>
                  <p className="text-center font-bold text-xs text-[#5B0E0E]">Minh Anh</p>
                  <p className="text-center text-[10px] text-gray-500">Sinh viên, Hà Nội</p>
                </div>

                <div className="bg-[#FAF5EB] p-4 rounded-xl border border-[#D8CBB4] flex flex-col">
                  <div className="flex text-[#D4AF37] text-xs mb-2 justify-center">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs text-gray-800 italic mb-4 text-center flex-grow">
                    "Trò chơi cuốn hút, đồ họa cổ kính tuyệt đẹp. Mảnh ghép bản đồ NFC mua về ai cũng khen!"
                  </p>
                  <p className="text-center font-bold text-xs text-[#5B0E0E]">Hoàng Nam</p>
                  <p className="text-center text-[10px] text-gray-500">Học sinh, Đà Nẵng</p>
                </div>

                <div className="bg-[#FAF5EB] p-4 rounded-xl border border-[#D8CBB4] flex flex-col">
                  <div className="flex text-[#D4AF37] text-xs mb-2 justify-center">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs text-gray-800 italic mb-4 text-center flex-grow">
                    "Cách tiếp cận lịch sử rất văn minh, khơi dậy niềm tự hào dân tộc trong giới trẻ."
                  </p>
                  <p className="text-center font-bold text-xs text-[#5B0E0E]">Thảo Vy</p>
                  <p className="text-center text-[10px] text-gray-500">Nhân viên văn phòng, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[#FAF5EB] py-16 px-6">
        <div className="max-w-[1240px] mx-auto text-center bg-[#3D0505] py-12 px-6 rounded-3xl border-2 border-[#C5B358] shadow-2xl">
          <h2 className="font-serif text-2xl sm:text-4xl text-[#D4AF37] mb-3 uppercase font-bold leading-tight">
            MỖI MẢNH GHÉP LÀ MỘT CÂU CHUYỆN.
            <br />
            MỖI CÂU CHUYỆN LÀ MỘT PHẦN HỒN VIỆT.
          </h2>
          <p className="font-serif italic text-[#F4EBD0]/90 text-lg md:text-xl mb-8">
            Sống lại di sản, viết tiếp sử xanh.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTab('trochoi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#D4AF37] hover:bg-white text-[#3D0505] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105"
          >
            <span>BẮT ĐẦU HÀNH TRÌNH NGAY</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}
