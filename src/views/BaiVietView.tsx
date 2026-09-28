import { useState } from 'react';
import { Article, TabType } from '../types';
import { ARTICLES } from '../data/mockData';
import SEO from '../components/SEO';

interface BaiVietViewProps {
  setActiveTab: (tab: TabType) => void;
  articles?: Article[];
  onSelectArticle?: (article: Article) => void;
  onLikeArticle?: (id: string) => void;
}

export default function BaiVietView({ onSelectArticle }: BaiVietViewProps) {
  const [articlesList] = useState<Article[]>(ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Số lượng bài viết tối đa mỗi trang

  const categories = [
    'Tất cả',
    'Về Mảnh ghép Hồn Việt',
    'Góc Lịch sử Việt',
    'Góc học tập',
  ];

  // Lọc bài viết theo danh mục
  const filteredArticles = selectedCategory === 'Tất cả'
    ? articlesList
    : articlesList.filter(a => a.category.toUpperCase() === selectedCategory.toUpperCase());

  // Logic tính toán phân trang
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1); // Reset về trang 1 khi chuyển danh mục
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' }); // Cuộn nhẹ lên khu vực danh sách bài viết
  };

  const topFeaturedArticles = articlesList.slice(0, 3);

  // Schema SEO JSON-LD
  const schemaStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bài Viết Di Sản & Tư Liệu Lịch Sử Việt Nam",
    "description": "Kho bài viết nghiên cứu di sản, ký ức di tích và tư liệu lịch sử Việt Nam.",
    "url": "https://www.manhghephonviet.com/bai-viet",
    "mainEntity": filteredArticles.map((art) => ({
      "@type": "BlogPosting",
      "headline": art.title,
      "description": art.excerpt,
      "image": art.image,
      "author": {
        "@type": "Person",
        "name": typeof art.author === 'string' ? art.author : art.author?.name
      }
    }))
  };

  return (
    <main className="w-full flex-grow bg-[#FAF5EB] text-[#261816]">
      <SEO 
        title="Bài Viết Di Sản - Diễn Đàn & Kho Tư Liệu Lịch Sử Việt Nam"
        description="Khám phá các bài viết nghiên cứu di sản, câu chuyện lịch sử, ký ức văn hóa Việt Nam."
        canonical="https://www.manhghephonviet.com/bai-viet"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaStructuredData) }}
      />

      {/* HERO BANNER */}
      <section className="relative bg-[#570000] text-[#F4EBD0] py-12 px-6 border-b-2 border-[#C5B358] overflow-hidden">
        <img 
          src="/NenBaiViet.jpg" 
          alt="Nền trang trí di sản văn hóa lịch sử Việt Nam" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none" 
        />
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <span className="text-xs bg-[#D4AF37] text-[#570000] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-xs mb-4">
            DIỄN ĐÀN & KHO TƯ LIỆU LỊCH SỬ
          </span>
          <h1 className="hero-title text-[#C5B358] text-3xl md:text-5xl font-serif font-bold tracking-wide">
            BÀI VIẾT DI SẢN
          </h1>
          <p className="font-sans text-sm md:text-base text-[#F4EBD0]/90 max-w-2xl mx-auto leading-relaxed mt-2">
            Nơi ghi chép những trang sử hào hùng, chia sẻ ký ức di tích và kết nối tâm hồn người trẻ yêu nước.
          </p>
        </div>
      </section>

      {/* DANH SÁCH BÀI VIẾT & SIDEBAR */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        
        <div className="flex justify-between items-center mb-8 bg-[#FFFDF9] p-4 rounded-xl border border-[#C5B358]/50 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#580E0E] uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[#D4AF37]" aria-hidden="true">auto_stories</span>
            Kho Tư Liệu Di Sản
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <section aria-label="Danh sách bài viết di sản" className="lg:col-span-8 flex flex-col justify-between min-h-[600px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentArticles.map((art, idx) => {
                const dateParts = art.date.split(' ');
                const dayStr = dateParts[0] || `${10 + idx}`;
                const monthStr = dateParts[1] ? `${dateParts[1]} ${dateParts[2] || ''}` : 'Tháng 09';

                return (
                  <article
                    key={art.id}
                    onClick={() => {
                      localStorage.setItem('selectedArticleId', String(art.id));
                      if (onSelectArticle) {
                        onSelectArticle(art);
                      }
                    }}
                    className="bg-[#FFFDF9] rounded-2xl border-2 border-[#C5B358]/60 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden"
                  >
                    <div className="relative w-full h-56 overflow-hidden bg-[#FAF5EB]">
                      <img
                        src={art.image}
                        alt={`Hình ảnh: ${art.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-3 right-3 bg-[#580E0E] text-white rounded-xl px-3 py-1.5 text-center shadow-md border border-[#D4AF37]/50 min-w-[64px]">
                        <span className="block font-serif font-bold text-lg leading-none">{dayStr}</span>
                        <span className="block text-[10px] uppercase font-sans font-medium opacity-90 mt-0.5">{monthStr}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#580E0E] text-[#FAF5EB] flex-grow flex flex-col justify-between border-t-2 border-[#C5B358]/70">
                      <div>
                        <h3 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug mb-3 min-h-[44px]">
                          {art.title}
                        </h3>
                      </div>

                      <div className="pt-2">
                        <span className="inline-block bg-[#FAF5EB]/20 hover:bg-[#FAF5EB] text-[#F4EBD0] hover:text-[#580E0E] border border-[#C5B358]/60 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200">
                          Đọc tiếp
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* THANH PHÂN TRANG (PAGINATION) */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10 pt-6 border-t border-[#C5B358]/40">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                      : 'bg-[#FFFDF9] text-[#580E0E] border-[#C5B358] hover:bg-[#580E0E] hover:text-white'
                  }`}
                >
                  ‹ Trước
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#580E0E] text-[#D4AF37] border-[#D4AF37] shadow-md font-extrabold'
                        : 'bg-[#FFFDF9] text-[#580E0E] border-[#C5B358]/60 hover:bg-[#580E0E]/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                      : 'bg-[#FFFDF9] text-[#580E0E] border-[#C5B358] hover:bg-[#580E0E] hover:text-white'
                  }`}
                >
                  Sau ›
                </button>
              </div>
            )}
          </section>

          {/* SIDEBAR DANH MỤC & NỔI BẬT */}
          <aside aria-label="Thanh điều hướng di sản" className="lg:col-span-4 space-y-6">
            <div className="bg-[#EBF3E8] rounded-2xl border-2 border-[#C5B358]/60 p-6 shadow-xs">
              <h2 className="font-serif text-base font-bold text-[#2A5222] uppercase tracking-wide mb-4 flex items-center gap-2 border-b border-[#C5B358]/40 pb-2">
                DANH MỤC DI SẢN 🌿
              </h2>
              <ul className="space-y-2.5 font-sans font-bold text-xs text-[#2A5222]">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left uppercase py-1.5 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat ? 'bg-[#2A5222] text-white' : 'hover:bg-[#2A5222]/10 text-[#2A5222]'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#EBF3E8] rounded-2xl border-2 border-[#C5B358]/60 p-6 shadow-xs">
              <h2 className="font-serif text-base font-bold text-[#2A5222] uppercase tracking-wide mb-4 flex items-center gap-2 border-b border-[#C5B358]/40 pb-2">
                TIN TỨC NỔI BẬT 🌿
              </h2>
              <div className="space-y-4">
                {topFeaturedArticles.map((feat) => (
                  <div
                    key={feat.id}
                    onClick={() => {
                      localStorage.setItem('selectedArticleId', String(feat.id));
                      if (onSelectArticle) onSelectArticle(feat);
                    }}
                    className="flex gap-3 items-center cursor-pointer group"
                  >
                    <img
                      src={feat.image}
                      alt={`Bài nổi bật: ${feat.title}`}
                      className="w-16 h-16 object-cover rounded-xl border border-[#C5B358]/50 group-hover:scale-105 transition-transform shrink-0"
                      loading="lazy"
                    />
                    <h3 className="font-serif font-bold text-xs text-[#1B3615] group-hover:text-[#2A5222] line-clamp-2 leading-snug">
                      {feat.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}