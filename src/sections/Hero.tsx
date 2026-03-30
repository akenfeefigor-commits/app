import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D tilt effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (!titleRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;

        gsap.to(titleRef.current, {
          rotateY: x,
          rotateX: -y,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Floating animation for decorative elements
      gsap.to('.float-emoji', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    document.getElementById('find-us')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="float-emoji absolute top-[15%] left-[10%] text-5xl opacity-20">🍃</span>
        <span className="float-emoji absolute top-[25%] right-[15%] text-6xl opacity-20">🍋</span>
        <span className="float-emoji absolute bottom-[20%] left-[15%] text-5xl opacity-20">🍓</span>
        <span className="float-emoji absolute top-[60%] right-[10%] text-4xl opacity-20">🧊</span>
        <span className="float-emoji absolute bottom-[30%] right-[20%] text-5xl opacity-20">✨</span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="hero-subtitle inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-[#00e5a0]/30 mb-8">
          <Sparkles className="w-4 h-4 text-[#00e5a0]" />
          <span className="text-sm font-bold text-[#00e5a0] tracking-widest uppercase">
            Холодные напитки · Студенческая ярмарка
          </span>
        </div>

        {/* Main Title with 3D effect */}
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 perspective-1000"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="block text-white mb-2">SHARBAT</span>
          <span className="block">
            <span className="text-[#00e5a0] text-glow-mint">— ЭТО</span>{' '}
            <span className="text-[#ffe234] text-glow-lemon">ВКУ</span>
            <span className="text-[#ff4d8d]">СНО</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          5 авторских напитков + создай свой — всё по единой цене.
          <br />
          Живые ингредиенты, лёд, вкус 🔥
        </p>

        {/* Price Badge */}
        <div className="hero-price inline-flex items-center gap-4 glass-strong rounded-full px-8 py-4 mb-10 border-2 border-[#ffe234]/40 pulse-glow">
          <Zap className="w-8 h-8 text-[#ffe234]" />
          <div className="text-left">
            <div className="text-4xl md:text-5xl font-black text-[#ffe234] text-glow-lemon">
              17 000
            </div>
            <div className="text-xs font-bold text-white/50 tracking-wider uppercase">
              сум за любой напиток
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-wrap justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="btn-mega btn-primary-mega group"
          >
            <span className="text-xl">📋</span>
            <span>Посмотреть меню</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
          <button
            onClick={scrollToBuilder}
            className="btn-mega btn-berry-mega"
          >
            <Sparkles className="w-5 h-5" />
            <span>Создать свой</span>
          </button>
          <button
            onClick={scrollToLocation}
            className="btn-mega btn-outline-mega"
          >
            <span className="text-xl">📍</span>
            <span>Где нас найти</span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080d1a] to-transparent pointer-events-none" />
    </section>
  );
}
