import { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout?: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}: CartDrawerProps) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      setCheckoutSuccess(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutSuccess(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l-2 border-[#C5B358] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#570000] text-[#F4EBD0] flex items-center justify-between border-b border-[#C5B358]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#D4AF37]">
              shopping_bag
            </span>
            <h3 className="font-serif font-bold text-lg uppercase">
              Giỏ Hàng ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-black/30 rounded-full transition-colors cursor-pointer text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-grow p-6 overflow-y-auto space-y-4">
          {checkoutSuccess ? (
            <div className="text-center py-16 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#007A33] text-white flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-3xl">check</span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#570000]">
                Đặt hàng thành công!
              </h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Cảm ơn bạn đã đồng hành cùng Mảnh Ghép Hồn Việt. Đơn hàng sẽ sớm được chuẩn bị và chuyển đến bạn.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <span className="material-symbols-outlined text-6xl text-stone-300">
                shopping_cart
              </span>
              <p className="font-serif text-base text-stone-500 font-bold">
                Giỏ hàng của bạn đang trống
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-white rounded-xl border border-[#C5B358]/50 flex gap-3 shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-[#D8CBB4] shrink-0"
                />
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="font-serif font-bold text-xs text-[#570000] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                  <span className="text-xs font-bold text-[#570000]">
                    {item.product.price.toLocaleString('vi-VN')}đ
                  </span>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && !checkoutSuccess && (
          <div className="p-5 bg-[#FFE9E6] border-t border-[#C5B358] space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-[#570000]">Tổng thanh toán:</span>
              <span className="text-lg text-[#570000]">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-[#570000] hover:bg-[#800000] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Thanh toán đơn hàng</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
