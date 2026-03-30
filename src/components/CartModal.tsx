import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartModal({ isOpen, onClose, onCheckout }: CartModalProps) {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();

  const formatSum = (n: number) => n.toLocaleString('ru-RU') + ' сум';

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-[#080d1a]/90 backdrop-blur-xl" />

      <div
        className={`relative w-full max-w-lg glass-strong rounded-3xl p-6 md:p-8 transition-all duration-500 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00e5a0]/20 to-[#00bcd4]/20 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-[#00e5a0]" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-wide">МОЯ КОРЗИНА</h2>
              <p className="text-sm text-white/50">{cartCount} товаров</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-[50vh] overflow-y-auto space-y-3 mb-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-white/50">Корзина пуста</p>
              <p className="text-white/30 text-sm mt-2">
                Добавь напитки из меню или конструктора
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">
                    {item.name}
                    {item.type === 'custom' && (
                      <span className="text-[#00e5a0] text-xs ml-2">✨ авторский</span>
                    )}
                  </h4>
                  <p className="text-xs text-white/50 truncate">{item.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-black text-[#ffe234]">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-lg bg-[#ff4d8d]/10 flex items-center justify-center hover:bg-[#ff4d8d]/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-[#ff4d8d]" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60 font-bold">ИТОГО:</span>
              <span className="text-3xl font-black text-[#ffe234] text-glow-lemon">
                {formatSum(cartTotal)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onCheckout}
                className="flex-1 btn-mega btn-berry-mega justify-center"
              >
                💳 Оформить заказ
              </button>
              <button
                onClick={onClose}
                className="btn-mega btn-outline-mega"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
