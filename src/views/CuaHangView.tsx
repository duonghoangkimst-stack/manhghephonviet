import { useState } from 'react';
import { Product, TabType } from '../types';
import { PRODUCTS } from '../data/mockData';
import heritageBannerBg from '../assets/images/heritage_banner_bg_1788592895577.jpg';

interface CuaHangViewProps {
  setActiveTab: (tab: TabType) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  selectedProduct: Product | null;
  onSelectProduct: (product: Product | null) => void;
}

export default function CuaHangView({
  setActiveTab: _setActiveTab,
  onAddToCart,
  onBuyNow,
  selectedProduct,
  onSelectProduct
}: CuaHangViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleBuyNow = (product: Product) => {
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
    }
  };

  const categories = [
    { id: 'all', label: 'TẤT CẢ' },
    { id: 'banchay', label: 'BÁN CHẠY NHẤT' },
    { id: 'chinh', label: 'SẢN PHẨM CHÍNH' },
    { id: 'phu', label: 'SẢN PHẨM PHỤ' },
    { id: 'voucher', label: 'VOUCHER BẠN CÓ' },
  ];

  const userVouchers = [
    {
      code: 'HONVIET50K',
      title: 'Giảm 50.000đ',
      desc: 'Áp dụng cho đơn hàng Mảnh ghép bản đồ Việt Nam từ 500.000đ',
      expiry: '31/12/2026',
      tag: 'Ưu đãi chính',
      icon: 'redeem'
    },
    {
      code: 'FREESHIP',
      title: 'Miễn phí vận chuyển',
      desc: 'Miễn phí giao hàng tiêu chuẩn toàn quốc cho mọi đơn hàng',
      expiry: 'Không giới hạn',
      tag: 'Toàn quốc',
      icon: 'local_shipping'
    },
    {
      code: 'SENVIET20',
      title: 'Giảm 20% đổi điểm Sen',
      desc: 'Áp dụng cho tất cả phụ kiện, móc khóa & quà lưu niệm thủ công',
      expiry: 'Còn 30 ngày',
      tag: 'Đổi từ 50 Sen',
      icon: 'loyalty'
    },
    {
      code: 'KHOIDAU10',
      title: 'Giảm 10% thành viên mới',
      desc: 'Tặng riêng cho tài khoản đã nhập mã giới thiệu Hồn Việt',
      expiry: '31/12/2026',
      tag: 'Thành viên mới',
      icon: 'celebration'
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  let filtered = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'banchay') return p.id === 'sp-01' || p.id === 'sp-02';
    if (selectedCategory === 'chinh') return p.id === 'sp-01';
    if (selectedCategory === 'phu') return p.id !== 'sp-01';
    return true;
  }).filter((p) => {
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="w-full flex-grow bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative h-[340px] md:h-[410px] flex items-center justify-center overflow-hidden border-b border-[#C5B358] bg-[#3D0505]">
        <img
          src={heritageBannerBg}
          alt="Họa tiết truyền thống Hồn Việt"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D0505]/85 via-[#570000]/80 to-[#3D0505]/95"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">
          {/* Badge with increased margin (15-20px extra breathing space) */}
          <span className="text-xs bg-[#D4AF37] text-[#570000] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-sm mb-7 md:mb-8">
            QUÀ LƯU NIỆM CÔNG NGHỆ
          </span>

          {/* Title with exact precomposed diacritics on HỒN */}
          <h1 
        className="hero-title text-[#D4AF37]"
        style={{ color: "#C5B358" }}
        >
            NƠI LƯU GIỮ SỬ VIỆT
          </h1>

          {/* Sub-heading */}
          <p className="font-serif italic text-sm md:text-base text-[#F4EBD0]/95 max-w-xl mx-auto leading-relaxed">
            Không chỉ mang đến một món quà, mà còn mang theo một câu chuyện lịch sử.
          </p>
        </div>
      </section>

      {/* Main Store View */}
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 pb-6 border-b border-[#C5B358]/40">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#570000] text-white shadow-sm'
                    : 'bg-[#FFE9E6] text-[#570000] hover:bg-[#FDE2DE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort (Only shown when not in voucher tab) */}
          {selectedCategory !== 'voucher' && (
            <div className="flex items-center gap-3">
              <div className="relative flex items-center flex-grow md:w-56">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base pointer-events-none select-none flex items-center justify-center leading-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm sản phẩm..."
                  className="w-full pl-10 pr-7 py-2 bg-white border border-[#C5B358] rounded-full text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')
                }
                className="px-3 py-2 bg-white border border-[#C5B358] rounded-full text-xs font-bold text-[#570000] focus:outline-none cursor-pointer"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          )}
        </div>

        {/* Voucher List View */}
        {selectedCategory === 'voucher' ? (
          <div className="space-y-6">
            <div className="bg-[#FFF8F6] border border-[#C5B358] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#570000] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#570000]">
                    Kho Mã Giảm Giá & Voucher Của Bạn
                  </h3>
                  <p className="text-xs text-[#5A413D]">
                    Sao chép mã ưu đãi và nhập ở bước thanh toán để nhận chiết khấu trực tiếp.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="px-5 py-2 rounded-full bg-[#570000] hover:bg-[#800000] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                Khám phá sản phẩm
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {userVouchers.map((v) => (
                <div
                  key={v.code}
                  className="bg-white rounded-2xl border-2 border-[#D4AF37]/50 hover:border-[#570000] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFE9E6] text-[#570000] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">{v.icon}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#A26D2B] bg-[#FFF8F6] border border-[#C5B358]/60 px-2 py-0.5 rounded-full inline-block mb-1">
                          {v.tag}
                        </span>
                        <h4 className="font-serif font-bold text-base text-[#570000]">
                          {v.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(v.code)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                        copiedCode === v.code
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#570000] hover:bg-[#800000] text-white shadow-2xs'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedCode === v.code ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedCode === v.code ? 'Đã sao chép' : 'Lấy mã'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#5A413D] mb-4 leading-relaxed">
                    {v.desc}
                  </p>

                  <div className="pt-3 border-t border-dashed border-[#C5B358]/40 flex items-center justify-between text-[11px] text-stone-500">
                    <span>
                      Mã: <strong className="text-[#570000] font-mono tracking-wider">{v.code}</strong>
                    </span>
                    <span>HSD: {v.expiry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#FFF8F6] rounded-2xl border border-[#C5B358] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-4 m-3 bg-white rounded-xl aspect-square overflow-hidden border border-[#D8CBB4] relative flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded"
                  />

                  {/* SẢN PHẨM CHÍNH: Chỉ duy nhất 'sp-01' giữ nguyên badge CHIP NFC */}
                  {prod.id === 'sp-01' && (
                    <span className="absolute top-2 left-2 bg-[#570000] text-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow border border-[#D4AF37]/40">
                      CHIP NFC
                    </span>
                  )}

                  <span className="absolute top-2 right-2 bg-[#E63946] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    -10%
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-[#D4AF37] text-xs mb-1">
                    <span>★</span>
                    <span className="font-bold text-[#261816]">Chưa có đánh giá</span>
                    <span className="text-stone-400 text-[10px]">(0 đã bán)</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#570000] mb-1 line-clamp-2 min-h-[44px] group-hover:text-[#800000] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#5A413D] mb-4 line-clamp-2 leading-relaxed">
                    {prod.shortDesc}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[#C5B358]/30 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-[#570000] text-sm sm:text-base block whitespace-nowrap">
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
                        className="w-8 h-8 rounded-full text-[#570000] hover:bg-[#FFE9E6] flex items-center justify-center transition-colors cursor-pointer"
                        title="Xem chi tiết"
                        aria-label="Xem chi tiết"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>

                      {/* Nút sticker Giỏ hàng tách riêng */}
                      <button
                        type="button"
                        onClick={() => onAddToCart(prod)}
                        className="w-8 h-8 rounded-full border border-[#C5B358] bg-white text-[#570000] hover:bg-[#570000] hover:text-[#D4AF37] hover:border-[#570000] flex items-center justify-center transition-all cursor-pointer shadow-2xs group/cart"
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
                        className="bg-[#570000] hover:bg-[#800000] active:scale-95 text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow cursor-pointer whitespace-nowrap"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCategory !== 'voucher' && filtered.length === 0 && (
          <div className="text-center py-16 bg-[#FFE9E6] rounded-xl border border-[#C5B358]">
            <span className="material-symbols-outlined text-5xl text-[#570000] mb-2">
              inventory_2
            </span>
            <h3 className="font-serif text-xl font-bold text-[#570000] mb-1">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-xs text-stone-600">Vui lòng thử tìm với từ khóa khác.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FDFBF7] rounded-2xl border-2 border-[#C5B358] w-full max-w-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row">
            <button
              type="button"
              onClick={() => onSelectProduct(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full z-20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Left: Product Image */}
            <div className="md:w-1/2 p-6 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-[#C5B358]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-[320px] w-full object-contain"
              />
            </div>

            {/* Right: Product Details */}
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-4">
              <div>
                {selectedProduct.id === 'sp-01' ? (
                  <span className="text-[10px] bg-[#570000] text-[#D4AF37] font-bold uppercase px-3 py-1 rounded-full inline-block mb-2">
                    TÍCH HỢP CHIP NFC THÔNG MINH
                  </span>
                ) : (
                  <span className="text-[10px] bg-[#FFE9E6] text-[#570000] font-bold uppercase px-3 py-1 rounded-full inline-block mb-2">
                    QUÀ TẶNG THỦ CÔNG DI SẢN
                  </span>
                )}

                <h3 className="font-serif text-2xl font-bold text-[#570000] mb-2">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-[#570000]">
                    {selectedProduct.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-sm sm:text-base text-stone-400 line-through">
                    {(selectedProduct.oldPrice || Math.round((selectedProduct.price / 0.9) / 1000) * 1000).toLocaleString('vi-VN')}đ
                  </span>
                  <span className="bg-[#E63946] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                    -10%
                  </span>
                </div>

                <p className="text-xs text-[#5A413D] leading-relaxed mb-4 whitespace-pre-line">
                  {selectedProduct.description}
                </p>

                <div className="bg-[#FFF8F6] p-4 rounded-xl border border-[#C5B358] space-y-2 mb-4">
                  <h4 className="font-bold text-xs text-[#570000] uppercase tracking-wide">
                    {selectedProduct.id === 'sp-01'
                      ? 'TÍNH NĂNG NFC:'
                      : selectedProduct.id === 'sp-02' || selectedProduct.id === 'sp-03'
                      ? 'TÍNH NĂNG NFC ĐỘC QUYỀN:'
                      : 'ĐẶC ĐIỂM THỦ CÔNG NỔI BẬT:'}
                  </h4>
                  <ul className="text-xs text-[#5A413D] space-y-1.5">
                    {selectedProduct.nfcFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold text-sm leading-none mt-0.5">•</span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    onSelectProduct(null);
                  }}
                  className="flex-1 border-2 border-[#570000] text-[#570000] hover:bg-[#FFE9E6] py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart</span>
                  <span>THÊM VÀO GIỎ</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleBuyNow(selectedProduct);
                    onSelectProduct(null);
                  }}
                  className="flex-1 bg-[#570000] hover:bg-[#800000] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center shadow-lg transition-all cursor-pointer"
                >
                  <span>MUA NGAY</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
