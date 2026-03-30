import { Snowflake, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Snowflake className="w-8 h-8 text-[#00e5a0]" />
              <div className="absolute inset-0 bg-[#00e5a0] blur-xl opacity-50" />
            </div>
            <span className="text-2xl font-black tracking-wider">
              <span className="text-gradient-mint">SHARBAT</span>
            </span>
          </div>

          {/* Center Text */}
          <p className="text-white/40 text-sm text-center">
            Сделано с{' '}
            <Heart className="w-4 h-4 inline text-[#ff4d8d] fill-[#ff4d8d] animate-pulse" />{' '}
            командой <span className="text-[#00e5a0] font-bold">SHARBAT</span>
            <br />
            Студенческая ярмарка · Маркетинг
          </p>

          {/* Price Badge */}
          <div className="px-5 py-2 rounded-full glass border border-[#ffe234]/30">
            <span className="text-sm font-black text-[#ffe234]">
              Всё по 17 000 сум
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            © 2024 SHARBAT. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
