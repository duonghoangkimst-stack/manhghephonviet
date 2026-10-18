import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Helmet } from 'react-helmet-async';
import { ARTICLES, Article } from '../data/mockData';
import { InteractionSection } from '../components/InteractionSection';

interface ChiTietBaiVietViewProps {
  article?: Article;
  setActiveTab?: (tab: string) => void;
  onBack: () => void;
  user?: any;
  onLike?: (articleId: string) => void;
  allArticles?: Article[];
  onSelectArticle?: (article: Article) => void;
}

export const ChiTietBaiVietView: React.FC<ChiTietBaiVietViewProps> = ({
  article: propArticle,
  setActiveTab,
  onBack,
  user,
  onLike,
  allArticles = ARTICLES,
  onSelectArticle,
}) => {
  // Lấy id/slug trực tiếp từ đường dẫn URL
  const { id } = useParams<{ id: string }>();

  // Ưu tiên tìm bài viết chính xác khớp với slug/id trên URL
  const findArticleByUrlOrProp = () => {
    if (id) {
      const found = allArticles.find(
        (a) => String(a.id) === String(id) || (a as any).slug === String(id)
      );
      if (found) return found;
    }
    return propArticle || null;
  };

  const [article, setArticle] = useState<Article | null>(findArticleByUrlOrProp());

  // Cập nhật lại state bài viết khi URL hoặc propArticle thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
    const currentArticle = findArticleByUrlOrProp();
    setArticle(currentArticle);
  }, [id, propArticle, allArticles]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-20 px-4 text-center">
        <Helmet>
          <title>Không tìm thấy bài viết | Mảnh Ghép Hồn Việt</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <p className="text-gray-500 mb-4">Không tìm thấy bài viết hoặc đang tải...</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#8C1010] text-white rounded-lg hover:bg-[#6e0c0c] transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  // Hàm hỗ trợ render thông tin tác giả
  const renderAuthorInfo = () => {
    const authorData = article.author;
    if (!authorData) return <strong className="text-gray-800">Mảnh Ghép Hồn Việt</strong>;

    if (typeof authorData === 'object' && authorData !== null) {
      return (
        <div className="flex items-center gap-2">
          {authorData.avatar && (
            <img
              src={authorData.avatar}
              alt={authorData.name || 'Avatar'}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <strong className="text-gray-800">{authorData.name || 'Mảnh Ghép Hồn Việt'}</strong>
          {authorData.role && (
            <span className="text-xs text-gray-400">({authorData.role})</span>
          )}
        </div>
      );
    }

    return <strong className="text-gray-800">{String(authorData)}</strong>;
  };

  // Lấy nội dung Sapo/Mô tả ngắn
  const sapoText = article.description || (article as any).excerpt;
  const pageTitle = `${article.title} | Mảnh Ghép Hồn Việt`;
  const pageUrl = `https://manhghephonviet.com/bai-viet/${article.id}`;
  const pageImage = article.image || 'https://manhghephonviet.com/images/bia_seo_4.jpg';

  // Chuẩn bị dữ liệu Schema JSON-LD cho bài viết chuẩn SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": [pageImage],
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": typeof article.author === 'object' && article.author !== null ? (article.author as any).name : (article.author || "Mảnh Ghép Hồn Việt"),
      "url": "https://manhghephonviet.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mảnh Ghép Hồn Việt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://manhghephonviet.com/favicon.ico"
      }
    },
    "description": sapoText || article.title
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
      {/* 🛠️ TÍCH HỢP REACT HELMET ĐỂ FIX TRIỆT ĐỂ LỖI SEOQUAKE (Title, Twitter Card, Canonical, Schema, Hreflang) */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={sapoText || "Khám phá di sản lịch sử văn hóa Việt Nam cùng Mảnh Ghép Hồn Việt."} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="vi" href={pageUrl} />

        {/* Open Graph / Facebook / Zalo Cards */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={sapoText} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter Cards (Fix lỗi MISSING trong SEOquake) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={sapoText} />
        <meta name="twitter:image" content={pageImage} />

        {/* Schema.org Structured Data JSON-LD (Fix lỗi Schema.org NONE) */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

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
            <div className="flex items-center gap-2">
              <span>Tác giả:</span>
              {renderAuthorInfo()}
            </div>
          </div>

          {/* SAPO / Mô tả ngắn dạng khung viền đỏ */}
          {sapoText && (
            <div className="p-5 bg-[#FAF5EF] border-l-4 border-[#8C1010] rounded-r-2xl text-gray-700 font-medium italic text-base md:text-lg leading-relaxed">
              {sapoText}
            </div>
          )}

          {/* Nội dung chi tiết Render qua Markdown */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans space-y-4 prose-headings:font-sans prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-2xl prose-h3:font-bold prose-h3:text-gray-900">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
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
                p: ({ node, children, ...props }) => {
                  const rawText = node?.children
                    ?.map((child: any) => child.value || child.children?.[0]?.value || '')
                    .join('')
                    .trim();

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

            {/* Khung Tương tác (Đã được bọc gọn gàng, tránh lỗi phát sinh thẻ heading từ con component) */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <InteractionSection
                articleId={String(article.id)}
                currentUser={user}
                initialLikes={article.likes || 0}
              />
            </div>
          </div>

        </article>

      </div>
    </div>
  );
};

export default ChiTietBaiVietView;