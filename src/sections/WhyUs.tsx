import { Leaf, Wallet, Zap, Wand2, Snowflake, GraduationCap } from 'lucide-react';

const perks = [
  {
    icon: Leaf,
    emoji: '🌿',
    title: 'Только свежее',
    desc: 'Никаких концентратов. Всё из натуральных ингредиентов.',
    color: 'from-[#00e5a0]/20 to-[#00e5a0]/5',
    borderColor: 'border-[#00e5a0]/30',
    iconColor: 'text-[#00e5a0]',
  },
  {
    icon: Wallet,
    emoji: '💰',
    title: 'Единая цена',
    desc: '17 000 сум за любой напиток — никаких сюрпризов.',
    color: 'from-[#ffe234]/20 to-[#ffe234]/5',
    borderColor: 'border-[#ffe234]/30',
    iconColor: 'text-[#ffe234]',
  },
  {
    icon: Zap,
    emoji: '⚡️',
    title: 'Быстро',
    desc: 'Твой напиток готов за пару минут без очередей.',
    color: 'from-[#ff9800]/20 to-[#ff9800]/5',
    borderColor: 'border-[#ff9800]/30',
    iconColor: 'text-[#ff9800]',
  },
  {
    icon: Wand2,
    emoji: '✨',
    title: 'Твой рецепт',
    desc: 'Создай свой авторский напиток — мы приготовим его для тебя!',
    color: 'from-[#ff4d8d]/20 to-[#ff4d8d]/5',
    borderColor: 'border-[#ff4d8d]/30',
    iconColor: 'text-[#ff4d8d]',
  },
  {
    icon: Snowflake,
    emoji: '🧊',
    title: 'Всегда со льдом',
    desc: 'Холодно и освежающе — даже в самый жаркий день.',
    color: 'from-[#00bcd4]/20 to-[#00bcd4]/5',
    borderColor: 'border-[#00bcd4]/30',
    iconColor: 'text-[#00bcd4]',
  },
  {
    icon: GraduationCap,
    emoji: '🎓',
    title: 'Студенты для студентов',
    desc: 'Делаем с душой и гордостью — мы такие же как ты.',
    color: 'from-[#9c27b0]/20 to-[#9c27b0]/5',
    borderColor: 'border-[#9c27b0]/30',
    iconColor: 'text-[#9c27b0]',
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="section-title reveal">
          <span className="section-eyebrow">Почему мы?</span>
          <h2 className="section-heading">
            ТОЛЬКО <span className="text-gradient-berry">ПЛЮСЫ</span>
          </h2>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, index) => (
            <div
              key={index}
              className={`reveal group relative overflow-hidden rounded-3xl p-8 border ${perk.borderColor} bg-gradient-to-br ${perk.color} hover:scale-105 transition-all duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${perk.color} blur-xl`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {perk.emoji}
                  </span>
                  <perk.icon className={`w-8 h-8 ${perk.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-black mb-3 group-hover:text-white transition-colors">
                  {perk.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {perk.desc}
                </p>
              </div>

              {/* Corner decoration */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${perk.color} opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
