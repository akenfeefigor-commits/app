import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Snowflake } from 'lucide-react';

interface NavigationProps {
  onCartClick: () => void;
}

export default function Navigation({ onCartClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <Snowflake 
              className="w-8 h-8 text-[#00e5a0] transition-transform duration-500 group-hover:rotate-180" 
            />
            <div className="absolute inset-0 bg-[#00e5a0] blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          </div>
          <span className="text-2xl font-black tracking-wider">
            <span className="text-gradient-mint">SHARBAT</span>
          </span>
        </a>

        {/* Center Badge */}
        <div className="hidden md:flex items-center gap-4">
          <div className="px-5 py-2 rounded-full glass border border-[#ffe234]/30">
            <span className="text-sm font-bold text-[#ffe234] tracking-wide">
              🎪 СЕГОДНЯ НА ЯРМАРКЕ
            </span>
          </div>
          <div className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00e5a0] to-[#00bcd4]">
            <span className="text-sm font-black text-[#080d1a] tracking-wide">
              Всё по 17 000 сум
            </span>
          </div>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-3 px-5 py-3 rounded-full glass border border-white/10 hover:border-[#00e5a0]/50 transition-all duration-300 hover:scale-105 group"
        >
          <ShoppingCart className="w-5 h-5 text-[#00e5a0] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-sm font-bold">Корзина</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#ff4d8d] text-white text-xs font-black flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
