import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ARTICLES, Article } from '../data/mockData';

interface ChiTietBaiVietViewProps {
  onBack: () => void;
}

export const ChiTietBaiVietView: React.FC<ChiTietBaiVietViewProps> = ({ onBack }) => {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedId = localStorage.getItem('selectedArticleId');
    if (savedId) {
      const found = ARTICLES.find((a) => String(a.id) === String(savedId));
      setArticle(found || ARTICLES[0]);
    } else {
      setArticle(ARTICLES[0]);
    }
  }, []);

  if (!article) return <div className="p-8 text-center text-gray-500">Đang tải bài viết...</div>;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Nút quay lại */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C1010] hover:underline cursor-pointer"
        >
          ← Quay lại danh sách bài viết
        </button>

        {/* Khung bài viết chính */}
        <article className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-[#C5B358]/30 space-y-6">
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#8C1010]/10 text-[#8C1010] text-xs font-bold rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{article.date}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#261816] leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 pb-6 border-b border-gray-100">
            <span>Tác giả: <strong className="text-gray-800">{article.author}</strong></span>
            <span>•</span>
            <span>Lượt xem: <strong className="text-gray-800">{article.views}</strong></span>
          </div>

          {/* SAPO / Mô tả ngắn */}
          {article.description && (
            <div className="p-5 bg-[#FAF5EF] border-l-4 border-[#8C1010] rounded-r-2xl text-gray-700 font-medium italic text-base md:text-lg leading-relaxed">
              {article.description}
            </div>
          )}

          {/* Nội dung chi tiết render chuẩn Markdown */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans space-y-4 prose-headings:font-sans prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-2xl prose-h3:font-bold prose-h3:text-gray-900">
          <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h2: ({ node, ...props }) => (
      <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-900 mt-6 mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg md:text-xl font-bold font-sans text-gray-900 mt-5 mb-2" {...props} />
    ),
    img: ({ node, ...props }) => (
      <img className="w-full h-auto rounded-lg my-4 block object-cover" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    
    /* ================= BỔ SUNG ĐỊNH DẠNG BẢNG CÓ VIỀN ================= */
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-300 text-left text-sm md:text-base" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-gray-50" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="border border-gray-300 p-3 font-bold text-gray-900 align-top" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="border border-gray-300 p-3 text-gray-800 align-top" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-gray-50 transition-colors" {...props} />
    ),
    /* ================================================================== */

    p: ({ node, children, ...props }) => {
      // Lấy toàn bộ nội dung chữ thô bên trong đoạn p
      const rawText = node?.children
        ?.map((child: any) => child.value || child.children?.[0]?.value || '')
        .join('')
        .trim();

      // Kiểm tra nếu đoạn văn bắt đầu bằng "Hình "
      const isCaption = /^Hình\s+\d+:/i.test(rawText);

      if (isCaption) {
        return (
          <p className="text-center text-gray-600 text-sm italic -mt-2 mb-6 w-full block" {...props}>
            {children}
          </p>
        );
      }

      return <p className="mb-4" {...props}>{children}</p>;
    },
  }}
>
  {article.content}
</ReactMarkdown>
          </div>

        </article>

      </div>
    </div>
  );
};

export default ChiTietBaiVietView;