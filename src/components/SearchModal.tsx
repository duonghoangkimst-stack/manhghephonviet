import { useState } from 'react';
import { TabType, Product, Article } from '../types';
import { PRODUCTS, ARTICLES } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: TabType) => void;
  onSelectProduct: (p: Product) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  setActiveTab,
  onSelectProduct
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedProducts = query.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const matchedArticles = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div
        className="bg-[#FDFBF7] rounded-2xl border-2 border-[#C5B358] w-full max-w-2xl shadow-2xl p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-[#570000] cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <h3 className="font-serif text-xl font-bold text-[#570000] mb-4">
          Tìm kiếm trong Mảnh Ghép Hồn Việt
        </h3>

        <div className="relative mb-6 flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xl pointer-events-none select-none flex items-center justify-center leading-none">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Nhập tên di tích, sản phẩm hoặc bài viết..."
            className="w-full pl-11 pr-10 py-3 bg-white border border-[#C5B358] rounded-xl text-sm text-[#261816] focus:outline-none focus:border-[#570000]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>

        {query.trim() && (
          <div className="max-h-80 overflow-y-auto space-y-4">
            {/* Matched Products */}
            {matchedProducts.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase text-[#570000] mb-2 pb-1 border-b border-[#C5B358]/30">
                  Sản phẩm ({matchedProducts.length})
                </h4>
                <div className="space-y-2">
                  {matchedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setActiveTab('cuahang');
                        onClose();
                      }}
                      className="p-2.5 bg-white hover:bg-[#FFE9E6] rounded-xl border border-stone-200 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg border"
                        />
                        <span className="text-xs font-bold text-[#261816]">{p.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#570000]">
                        {p.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Articles */}
            {matchedArticles.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase text-[#570000] mb-2 pb-1 border-b border-[#C5B358]/30">
                  Bài viết & Di tích ({matchedArticles.length})
                </h4>
                <div className="space-y-2">
                  {matchedArticles.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => {
                        setActiveTab('baiviet');
                        onClose();
                      }}
                      className="p-2.5 bg-white hover:bg-[#FFE9E6] rounded-xl border border-stone-200 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-10 h-10 object-cover rounded-lg border"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#261816] block">{a.title}</span>
                          <span className="text-[10px] text-stone-500">{a.category}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-sm text-[#570000]">
                        arrow_forward
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedProducts.length === 0 && matchedArticles.length === 0 && (
              <p className="text-xs text-stone-500 text-center py-6">
                Không tìm thấy kết quả nào phù hợp với "{query}".
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
