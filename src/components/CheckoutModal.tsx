import { useState, FormEvent } from 'react';
import { CartItem, UserProfile } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
  user: UserProfile | null;
  onOrderSuccess?: (orderCode: string) => void;
}

interface ShippingForm {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  note: string;
  paymentMethod: 'cod' | 'bank_qr' | 'momo';
}

const POPULAR_PROVINCES = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Quảng Trị',
  'Huế',
  'Đắk Lắk',
  'Gia Lai',
  'Khánh Hòa',
  'Cần Thơ',
  'Hải Phòng',
  'Nghệ An',
  'Quảng Ngãi',
  'Hà Tĩnh',
  'Thanh Hóa',
  'Bắc Ninh',
  'Lâm Đồng',
  'Bình Dương',
  'Đồng Nai',
  'Tỉnh / Thành phố khác'
];

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onClearCart,
  user,
  onOrderSuccess
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<ShippingForm>({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    province: 'Hà Nội',
    district: '',
    ward: '',
    addressDetail: '',
    note: '',
    paymentMethod: 'cod'
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(10); // Mặc định chiết khấu khai xuân 10%
  const [couponApplied, setCouponApplied] = useState<string | null>('KHAIXUAN10');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderCode, setCreatedOrderCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = 0; // Miễn phí vận chuyển toàn quốc
  const totalPayment = Math.max(0, subtotal - discountAmount + shippingFee);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Vui lòng nhập họ và tên người nhận';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại nhận hàng';
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Số điện thoại không hợp lệ (10 chữ số)';
    }
    if (!formData.province.trim()) {
      errs.province = 'Vui lòng chọn Tỉnh / Thành phố';
    }
    if (!formData.district.trim()) {
      errs.district = 'Vui lòng nhập Quận / Huyện';
    }
    if (!formData.ward.trim()) {
      errs.ward = 'Vui lòng nhập Phường / Xã';
    }
    if (!formData.addressDetail.trim()) {
      errs.addressDetail = 'Vui lòng nhập số nhà, tên đường chi tiết';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'HONVIET50K') {
      setDiscountPercent(15);
      setCouponApplied('HONVIET50K (-15%)');
      setCouponCode('');
    } else if (code === 'FREESHIP') {
      setCouponApplied('FREESHIP (Đã miễn phí vận chuyển)');
      setCouponCode('');
    } else if (code === 'SENVIET20') {
      setDiscountPercent(20);
      setCouponApplied('SENVIET20 (-20%)');
      setCouponCode('');
    } else {
      setErrors((prev) => ({ ...prev, coupon: 'Mã ưu đãi không hợp lệ hoặc đã hết lượt' }));
      setTimeout(() => {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.coupon;
          return copy;
        });
      }, 3000);
    }
  };

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (items.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }

    setIsSubmitting(true);

    // Simulate order creation
    setTimeout(() => {
      const randomCode = `MGHV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedOrderCode(randomCode);
      setIsSubmitting(false);
      onClearCart();
      if (onOrderSuccess) {
        onOrderSuccess(randomCode);
      }
    }, 1200);
  };

  const handleCloseAndReset = () => {
    setCreatedOrderCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div
        className="bg-[#FDFBF7] w-full max-w-4xl rounded-2xl border-2 border-[#C5B358] shadow-2xl overflow-hidden relative my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#570000] text-[#F4EBD0] flex items-center justify-between border-b border-[#C5B358] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFE9E6]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wide">
                Thông Tin Giao Hàng & Thanh Toán
              </h3>
              <p className="text-[11px] text-[#F4EBD0]/80">
                Mảnh Ghép Hồn Việt - Bảo tồn di sản qua từng ấn phẩm
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="p-1.5 text-white/80 hover:text-white hover:bg-black/20 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6">
          {createdOrderCode ? (
            /* Success Order View */
            <div className="py-8 px-4 text-center space-y-6 max-w-lg mx-auto animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-[#007A33]/15 border-2 border-[#007A33] text-[#007A33] flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#007A33] bg-[#007A33]/10 px-3 py-1 rounded-full inline-block mb-2">
                  ĐẶT HÀNG THÀNH CÔNG
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#570000]">
                  Cảm ơn quý khách!
                </h4>
                <p className="text-xs sm:text-sm text-[#5A413D] mt-2 leading-relaxed">
                  Đơn hàng của bạn đã được ghi nhận vào hệ thống Mảnh Ghép Hồn Việt. Đội ngũ nghệ nhân sẽ bắt đầu đóng gói cẩn thận và gửi tới bạn.
                </p>
              </div>

              <div className="bg-[#FFF8F6] border border-[#C5B358] rounded-xl p-5 text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#C5B358]/60">
                  <span className="text-xs text-[#5A413D]">Mã đơn hàng:</span>
                  <span className="font-mono font-bold text-sm text-[#570000] tracking-wider">
                    {createdOrderCode}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#5A413D]">Người nhận:</span>
                  <span className="font-bold text-[#261816]">{formData.fullName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#5A413D]">Số điện thoại:</span>
                  <span className="font-bold text-[#261816]">{formData.phone}</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-3">
                  <span className="text-[#5A413D] shrink-0">Địa chỉ giao:</span>
                  <span className="font-bold text-[#261816] text-right">
                    {formData.addressDetail}, {formData.ward}, {formData.district}, {formData.province}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#5A413D]">Hình thức thanh toán:</span>
                  <span className="font-bold text-[#570000]">
                    {formData.paymentMethod === 'cod'
                      ? 'Thanh toán khi nhận hàng (COD)'
                      : formData.paymentMethod === 'bank_qr'
                      ? 'Chuyển khoản VietQR'
                      : 'Ví điện tử MoMo'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#C5B358]/60">
                  <span className="font-bold text-xs text-[#570000]">Tổng tiền:</span>
                  <span className="font-bold text-base text-[#570000]">
                    {totalPayment.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#570000] hover:bg-[#800000] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  Hoàn tất & Tiếp tục mua sắm
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form & Summary Grid */
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Shipping Information (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#570000] flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-lg text-[#C5B358]">person_pin_circle</span>
                    1. Thông tin người nhận hàng
                  </h4>
                  <p className="text-xs text-stone-500">
                    Vui lòng điền chính xác để nhân viên giao hàng liên hệ thuận tiện.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Họ và tên */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Họ và tên người nhận <span className="text-[#E63946]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.fullName ? 'border-rose-500' : 'border-[#C5B358]'
                      } rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Số điện thoại */}
                  <div>
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Số điện thoại nhận hàng <span className="text-[#E63946]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="Ví dụ: 0912 345 678"
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.phone ? 'border-rose-500' : 'border-[#C5B358]'
                      } rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Email nhận hóa đơn (tùy chọn)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@vidu.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors"
                    />
                  </div>

                  {/* Tỉnh / Thành phố */}
                  <div>
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Tỉnh / Thành phố <span className="text-[#E63946]">*</span>
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => {
                        setFormData({ ...formData, province: e.target.value });
                        if (errors.province) setErrors({ ...errors, province: '' });
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] cursor-pointer"
                    >
                      {POPULAR_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.province}</p>
                    )}
                  </div>

                  {/* Quận / Huyện */}
                  <div>
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Quận / Huyện <span className="text-[#E63946]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => {
                        setFormData({ ...formData, district: e.target.value });
                        if (errors.district) setErrors({ ...errors, district: '' });
                      }}
                      placeholder="Ví dụ: Quận Hoàn Kiếm, Quận 1..."
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.district ? 'border-rose-500' : 'border-[#C5B358]'
                      } rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors`}
                    />
                    {errors.district && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.district}</p>
                    )}
                  </div>

                  {/* Phường / Xã */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Phường / Xã <span className="text-[#E63946]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ward}
                      onChange={(e) => {
                        setFormData({ ...formData, ward: e.target.value });
                        if (errors.ward) setErrors({ ...errors, ward: '' });
                      }}
                      placeholder="Ví dụ: Phường Tràng Tiền, Phường Bến Nghé..."
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.ward ? 'border-rose-500' : 'border-[#C5B358]'
                      } rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors`}
                    />
                    {errors.ward && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.ward}</p>
                    )}
                  </div>

                  {/* Địa chỉ chi tiết */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Số nhà, tên đường chi tiết <span className="text-[#E63946]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.addressDetail}
                      onChange={(e) => {
                        setFormData({ ...formData, addressDetail: e.target.value });
                        if (errors.addressDetail) setErrors({ ...errors, addressDetail: '' });
                      }}
                      placeholder="Ví dụ: Số 12 ngõ 45, phố Đinh Tiên Hoàng"
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.addressDetail ? 'border-rose-500' : 'border-[#C5B358]'
                      } rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors`}
                    />
                    {errors.addressDetail && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.addressDetail}</p>
                    )}
                  </div>

                  {/* Ghi chú đơn hàng */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#261816] mb-1">
                      Ghi chú đơn hàng (không bắt buộc)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Ví dụ: Giao vào giờ hành chính, gọi điện trước 15 phút khi đến..."
                      className="w-full px-3.5 py-2 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-2">
                  <h4 className="font-serif font-bold text-base text-[#570000] flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-lg text-[#C5B358]">payments</span>
                    2. Phương thức thanh toán
                  </h4>
                  <div className="space-y-2.5">
                    {/* COD */}
                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#570000] bg-[#FFE9E6]/50 shadow-xs'
                          : 'border-stone-300 bg-white hover:border-[#C5B358]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="accent-[#570000] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#261816] block">
                            Thanh toán tiền mặt khi nhận hàng (COD)
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            Kiểm tra hàng trước khi thanh toán cho bưu tá
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#570000]">local_shipping</span>
                    </label>

                    {/* Bank QR */}
                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'bank_qr'
                          ? 'border-[#570000] bg-[#FFE9E6]/50 shadow-xs'
                          : 'border-stone-300 bg-white hover:border-[#C5B358]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'bank_qr'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank_qr' })}
                          className="accent-[#570000] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#261816] block">
                            Chuyển khoản VietQR / Napas 24/7 (Khuyên dùng)
                          </span>
                          <span className="text-[11px] text-[#007A33] font-medium block">
                            Quét mã QR tiện lợi qua mọi ứng dụng ngân hàng
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#007A33]">qr_code_scanner</span>
                    </label>

                    {/* MoMo */}
                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'momo'
                          ? 'border-[#570000] bg-[#FFE9E6]/50 shadow-xs'
                          : 'border-stone-300 bg-white hover:border-[#C5B358]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'momo'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'momo' })}
                          className="accent-[#570000] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#261816] block">
                            Ví điện tử MoMo
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            Thanh toán an toàn qua cổng MoMo E-Wallet
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#A50064] bg-[#FFEBF5] px-2 py-0.5 rounded">
                        MoMo
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Confirm Button (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="bg-[#FFF8F6] border border-[#C5B358] rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5B358]/40">
                    <h4 className="font-serif font-bold text-sm text-[#570000] uppercase flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">receipt_long</span>
                      Tóm tắt đơn hàng ({items.reduce((s, i) => s + i.quantity, 0)})
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      {items.length} mặt hàng
                    </span>
                  </div>

                  {/* List of items */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 bg-white p-2 rounded-xl border border-[#D8CBB4]/60 shadow-2xs"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif font-bold text-xs text-[#570000] truncate">
                            {item.product.name}
                          </h5>
                          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5">
                            <span>SL: x{item.quantity}</span>
                            <span className="font-bold text-[#261816]">
                              {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Input */}
                  <div className="pt-2 border-t border-dashed border-[#C5B358]/50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã voucher (vd: HONVIET50K)"
                        className="flex-1 px-3 py-1.5 bg-white border border-[#C5B358] rounded-lg text-xs uppercase text-[#261816] focus:outline-none focus:border-[#570000]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3 py-1.5 rounded-lg bg-[#570000] hover:bg-[#800000] text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {couponApplied && (
                      <div className="flex items-center justify-between text-[11px] text-[#007A33] mt-1.5 font-bold">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">sell</span>
                          Mã ưu đãi: {couponApplied}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setCouponApplied(null);
                            setDiscountPercent(0);
                          }}
                          className="text-stone-400 hover:text-stone-600 text-[10px] underline cursor-pointer"
                        >
                          Gỡ
                        </button>
                      </div>
                    )}
                    {errors.coupon && (
                      <p className="text-[10px] text-rose-600 mt-1">{errors.coupon}</p>
                    )}
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-1.5 pt-2 border-t border-[#C5B358]/40 text-xs">
                    <div className="flex justify-between text-[#5A413D]">
                      <span>Tạm tính:</span>
                      <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#007A33] font-medium">
                        <span>Giảm giá khuyến mãi:</span>
                        <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#5A413D]">
                      <span>Phí giao hàng toàn quốc:</span>
                      <span className="font-bold text-[#007A33]">MIỄN PHÍ</span>
                    </div>

                    <div className="pt-2 border-t border-[#C5B358] flex justify-between items-center text-sm font-bold">
                      <span className="text-[#570000]">Tổng cộng:</span>
                      <span className="text-xl text-[#570000] font-black">
                        {totalPayment.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full bg-[#570000] hover:bg-[#800000] active:scale-[0.99] text-white py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        <span>ĐANG TIẾN HÀNH XÁC NHẬN...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">verified</span>
                        <span>XÁC NHẬN ĐẶT HÀNG</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-stone-500">
                    Bằng việc bấm xác nhận, bạn đồng ý với Điều khoản mua hàng & Bảo mật của Mảnh Ghép Hồn Việt.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
