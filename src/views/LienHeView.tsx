import { useState, type FormEvent } from 'react';
import { TabType } from '../types';

interface LienHeViewProps {
  setActiveTab: (tab: TabType) => void;
}

export default function LienHeView({ setActiveTab: _setActiveTab }: LienHeViewProps) {
  const [formType, setFormType] = useState<'contact' | 'contribute'>('contact');
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Đóng góp tư liệu di tích');
  const [message, setMessage] = useState('');

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Làm thế nào để quét chip NFC trên các sản phẩm Mảnh Ghép Hồn Việt?',
      a: 'Bạn chỉ cần bật tính năng NFC trên điện thoại thông minh (iPhone từ Xs trở lên tự động nhận, Android bật NFC trong Cài đặt) rồi chạm nhẹ mặt lưng điện thoại vào vị trí có logo NFC trên sản phẩm.'
    },
    {
      q: 'Làm cách nào để tôi có thể đóng góp câu chuyện hoặc hình ảnh di tích quê hương?',
      a: 'Bạn có thể điền vào biểu mẫu "Đóng góp di tích" ngay tại trang này hoặc liên hệ trực tiếp qua email lienhe@manhghephonviet.vn. Ban biên tập sẽ thẩm định và đưa vào kho tư liệu chính thức.'
    },
    {
      q: 'Điểm Sen & Sao tích lũy được trong trò chơi có tác dụng gì?',
      a: 'Điểm Sen & Sao dùng để đổi voucher mua quà lưu niệm tại Cửa Hàng, nhận huy hiệu vinh danh độc quyền và mở khóa các chương cốt truyện đặc biệt trong game.'
    }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="w-full flex-grow bg-[#FDFBF7]">
      {/* Hero Banner */}
      <section className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden border-b border-[#C5B358] bg-[#570000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida/AEtjO1UjE2_lU02qX17qP74Wl3q7W8q4k92fD3m54817x84pD1v7v51QW9m98v0c3-m68k5116x87pD2v7-A6q1213q8_X9QW5e8x8764-QW89m-v1-QW98e')"
          }}
        ></div>
        <div className="absolute inset-0 bg-[#570000]/90"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
          <span className="text-xs bg-[#D4AF37] text-[#570000] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3">
            KẾT NỐI VÀ ĐỒNG HÀNH
          </span>
          <h1 
        className="hero-title text-[#D4AF37]"
        style={{ color: "#D4AF37" }}
        >
            LIÊN HỆ & ĐÓNG GÓP
          </h1>
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#F4EBD0]/90 max-w-3xl mx-auto whitespace-nowrap">
            Cùng chúng tôi lưu giữ, phục dựng và lan tỏa những giá trị di sản quý báu của cha ông.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1240px] mx-auto px-6 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form / Contribute Form */}
          <div className="lg:col-span-7 bg-[#FFF8F6] p-8 md:p-10 rounded-3xl border-2 border-[#C5B358] shadow-lg">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 pb-4 border-b border-[#C5B358]/40">
              <button
                type="button"
                onClick={() => {
                  setFormType('contact');
                  setSubmitted(false);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  formType === 'contact'
                    ? 'bg-[#570000] text-white shadow'
                    : 'bg-[#FFE9E6] text-[#570000] hover:bg-[#FDE2DE]'
                }`}
              >
                Gửi Tin Nhắn
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormType('contribute');
                  setSubmitted(false);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  formType === 'contribute'
                    ? 'bg-[#570000] text-white shadow'
                    : 'bg-[#FFE9E6] text-[#570000] hover:bg-[#FDE2DE]'
                }`}
              >
                Đóng Góp Di Tích & Ký Ức
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#007A33] text-white flex items-center justify-center mx-auto shadow-md">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#570000]">
                  Cảm ơn sự đóng góp của bạn!
                </h3>
                <p className="text-xs text-[#5A413D] max-w-md mx-auto leading-relaxed">
                  Thông tin của bạn đã được gửi thành công. Ban biên tập Mảnh Ghép Hồn Việt sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#570000] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Gửi thêm nội dung khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn An"
                      className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0987 654 321"
                      className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                      Chủ đề
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                    >
                      <option value="Đóng góp tư liệu di tích">Đóng góp tư liệu di tích</option>
                      <option value="Đề xuất di tích mới">Đề xuất di tích mới</option>
                      <option value="Hợp tác giáo dục & trường học">Hợp tác giáo dục & trường học</option>
                      <option value="Hỗ trợ đơn hàng & sản phẩm">Hỗ trợ đơn hàng & sản phẩm</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                    {formType === 'contribute'
                      ? 'Nội dung câu chuyện / Thông tin di tích muốn đóng góp *'
                      : 'Lời nhắn của bạn *'}
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      formType === 'contribute'
                        ? 'Hãy mô tả về di tích, các nhân chứng lịch sử, hình ảnh hoặc câu chuyện bạn muốn chia sẻ...'
                        : 'Nhập nội dung bạn muốn trao đổi cùng Mảnh Ghép Hồn Việt...'
                    }
                    className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#570000] hover:bg-[#800000] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {formType === 'contribute' ? 'Gửi Đóng Góp Di Tích' : 'Gửi Tin Nhắn Ngay'}
                    </span>
                    <span className="material-symbols-outlined text-base">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact Information & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#3D0505] text-[#F4EBD0] p-8 rounded-3xl border-2 border-[#C5B358] shadow-lg space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#D4AF37] uppercase">
                Thông Tin Liên Hệ
              </h3>
              <p className="text-xs text-[#F4EBD0]/80 leading-relaxed">
                Đội ngũ phát triển luôn sẵn sàng lắng nghe mọi ý kiến đóng góp, phản hồi và cơ hội hợp tác từ cộng đồng.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-lg mt-0.5">
                    location_on
                  </span>
                  <div>
                    <p className="font-bold text-[#D4AF37]">Trụ sở chính:</p>
                    <p className="text-gray-200">
                      UEH cơ sở N, đường Nguyễn Văn Linh, Khu Chức Năng, Số 15 Đô Thị Mới, Nam Thành Phố, Bình Hưng, Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-lg mt-0.5">
                    call
                  </span>
                  <div>
                    <p className="font-bold text-[#D4AF37]">Hotline hỗ trợ:</p>
                    <p className="text-gray-200">0338 343 697 (8:00 - 20:00 hàng ngày)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-lg mt-0.5">
                    mail
                  </span>
                  <div>
                    <p className="font-bold text-[#D4AF37]">Email dự án:</p>
                    <p className="text-gray-200">lienhe@manhghephonviet.vn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours Card */}
            <div
              id="card-support-hours"
              className="bg-[#FAF5EB] p-7 sm:p-8 rounded-3xl border-2 border-[#C5B358] shadow-lg space-y-5"
            >
              {/* Header with Red Clock Icon */}
              <div className="flex items-center gap-2.5 border-b border-[#C5B358]/40 pb-3">
                <span className="material-symbols-outlined text-[#C8102E] text-2xl">
                  schedule
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#570000] uppercase tracking-wide">
                  THỜI GIAN HỖ TRỢ
                </h3>
              </div>

              {/* Body: Big Clock Icon on Left & Details on Right */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Large Round Clock Icon on Left */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FFE9E6] border-2 border-[#C8102E]/40 text-[#C8102E] flex items-center justify-center shadow-inner shrink-0 group">
                  <span className="material-symbols-outlined text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
                    alarm
                  </span>
                </div>

                {/* Information on Right */}
                <div className="space-y-1.5 text-center sm:text-left flex-grow">
                  <p className="text-xs sm:text-[13px] text-[#5A413D] leading-relaxed">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn trong khung giờ:
                  </p>
                  <div className="text-2xl sm:text-3xl font-black text-[#570000] font-sans tracking-tight py-0.5">
                    08:00 - 22:00
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                    <span className="font-serif font-bold text-sm text-[#570000]">
                      Thứ 2 - Chủ nhật
                    </span>
                    <span className="text-xs text-[#C8102E] font-medium italic bg-[#FFE9E6] px-2 py-0.5 rounded-full border border-[#C8102E]/30">
                      (Kể cả ngày lễ)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-[#FFE9E6] p-6 rounded-2xl border border-[#C5B358] flex items-center justify-center">
              <p className="font-serif italic text-sm md:text-base text-[#570000] text-center">
                “Gom mảnh ký ức, dệt hồn non sông”
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#C5B358] shadow-sm">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#570000] uppercase mb-1">
              CÂU HỎI THƯỜNG GẶP
            </h2>
            <p className="text-xs text-stone-500">
              Giải đáp nhanh các thắc mắc về trải nghiệm và sản phẩm
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#C5B358]/50 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-serif font-bold text-sm text-[#570000] flex items-center justify-between bg-[#FFF8F6] hover:bg-[#FFE9E6] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-base">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-[#5A413D] leading-relaxed border-t border-[#C5B358]/30 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
