import { MapPin, Sparkles, ArrowLeft } from 'lucide-react';

export default function CTA() {
  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="find-us" className="py-20 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="reveal relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5a0]/20 via-[#ff4d8d]/10 to-[#ffe234]/20" />
          
          {/* Animated orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00e5a0]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff4d8d]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Content */}
          <div className="relative z-10 glass-strong rounded-3xl p-8 md:p-12 border border-white/10 text-center">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-[#ffe234]/30 mb-8">
              <MapPin className="w-5 h-5 text-[#ffe234]" />
              <span className="text-sm font-bold text-[#ffe234]">
                Студенческая ярмарка · Университет
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-wide">
              НАЙДИ НАС И{' '}
              <span className="text-gradient-mint">ПОПРОБУЙ!</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
              Ищи яркий стенд <span className="text-white font-bold">SHARBAT</span> на ярмарке — мимо не пройдёшь! 
              Любой напиток, включая твой собственный, всего за{' '}
              <span className="text-[#ffe234] font-black">17 000 сум</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToBuilder}
                className="btn-mega btn-berry-mega"
              >
                <Sparkles className="w-5 h-5" />
                <span>Создать свой напиток</span>
              </button>
              <button
                onClick={scrollToMenu}
                className="btn-mega btn-outline-mega"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>К меню</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
