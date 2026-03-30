import { useRef } from 'react';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

interface MenuProps {
  showToast: (message: string) => void;
}

const drinks = [
  {
    id: 1,
    emoji: '🍃',
    name: 'Мохито',
    desc: 'Классика, которую не забудешь. Свежая мята, кислинка лайма, игристая содовая — идеальная прохлада в стакане.',
    color: 'mint',
    tags: ['🌿 Мята', '🍋 Лайм', '🍬 Сироп', '💧 Содовая', '🧊 Лёд'],
  },
  {
    id: 2,
    emoji: '🍋',
    name: 'Лимонад',
    desc: 'Солнечное сочетание лимона и апельсина на газировке. Кисло, сладко, освежающе — один глоток и всё хорошо.',
    color: 'lemon',
    tags: ['🍋 Лимон', '🍊 Апельсин', '🫧 Газировка', '🧊 Лёд'],
  },
  {
    id: 3,
    emoji: '🥒',
    name: 'Огуречный Тоник',
    desc: 'Неожиданно, но невероятно. Свежий огурец + тоник + мята + лайм = самый необычный напиток на ярмарке.',
    color: 'cuke',
    tags: ['🥒 Огурец', '🌿 Мята', '🫧 Тоник', '🍋 Лайм', '🧊 Лёд'],
  },
  {
    id: 4,
    emoji: '🍓',
    name: 'Клубничный Мохито',
    desc: 'Всё что ты любишь в мохито — и спелая клубника сверху. Розовый, ягодный, дерзкий и невероятно вкусный.',
    color: 'berry',
    tags: ['🍓 Клубника', '🌿 Мята', '🍋 Лайм', '🍬 Сироп', '💧 Содовая', '🧊 Лёд'],
  },
  {
    id: 5,
    emoji: '🍎',
    name: 'Гранат-Мята',
    desc: 'Насыщенный гранатовый сок с прохладой свежей мяты. Терпкий, глубокий, с настоящим восточным характером.',
    color: 'pomeg',
    tags: ['🍎 Гранат', '🌿 Мята', '🍬 Сироп', '🫧 Газировка', '🧊 Лёд'],
  },
];

const colorMap: Record<string, { border: string; title: string; tagBorder: string; tagText: string }> = {
  mint: { border: 'border-[#00e5a0]/30', title: 'text-[#00e5a0]', tagBorder: 'border-[#00e5a0]/30', tagText: 'text-[#00e5a0]' },
  lemon: { border: 'border-[#ffe234]/30', title: 'text-[#ffe234]', tagBorder: 'border-[#ffe234]/30', tagText: 'text-[#ffe234]' },
  cuke: { border: 'border-[#7fff6e]/30', title: 'text-[#7fff6e]', tagBorder: 'border-[#7fff6e]/30', tagText: 'text-[#7fff6e]' },
  berry: { border: 'border-[#ff4d8d]/30', title: 'text-[#ff4d8d]', tagBorder: 'border-[#ff4d8d]/30', tagText: 'text-[#ff4d8d]' },
  pomeg: { border: 'border-[#c0392b]/30', title: 'text-[#e57373]', tagBorder: 'border-[#c0392b]/30', tagText: 'text-[#e57373]' },
};

export default function Menu({ showToast }: MenuProps) {
  const { addToCart } = useCart();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleAddToCart = (drink: typeof drinks[0], index: number) => {
    addToCart({
      emoji: drink.emoji,
      name: drink.name,
      desc: drink.tags.join(' · '),
      type: 'menu',
    });

    showToast(`${drink.name} добавлен в корзину!`);

    // Animate the button
    const card = cardRefs.current[index];
    if (card) {
      const btn = card.querySelector('.add-btn');
      if (btn) {
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  };

  return (
    <section id="menu" className="py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="section-title reveal">
          <span className="section-eyebrow">Наше меню</span>
          <h2 className="section-heading">
            5 <span className="text-gradient-mint">ХИТОВ</span> СЕЗОНА
          </h2>
        </div>

        {/* Price Banner */}
        <div className="reveal mb-12">
          <div className="glass-strong rounded-3xl p-6 md:p-8 border border-[#ffe234]/30 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-5xl md:text-6xl font-black text-[#ffe234] text-glow-lemon">
              17 000
              <span className="text-2xl md:text-3xl text-[#ffe234]/50 ml-2">СУМ</span>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20" />
            <div className="text-center md:text-left">
              <div className="font-bold text-lg mb-1">Единая цена на все напитки</div>
              <div className="text-white/50">Выбери из меню или создай свой — цена одна для всех!</div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinks.map((drink, index) => {
            const colors = colorMap[drink.color];
            return (
              <div
                key={drink.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`reveal card-mega ${colors.border} group tilt-card`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {drink.emoji}
                  </span>
                  <span className="px-4 py-1 rounded-full glass text-sm font-black text-[#ffe234]">
                    17 000 сум
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-3xl font-black mb-3 ${colors.title}`}>
                  {drink.name}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {drink.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {drink.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${colors.tagBorder} ${colors.tagText} bg-white/5`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Add Button */}
                <button
                  onClick={() => handleAddToCart(drink, index)}
                  className="add-btn w-full py-4 rounded-2xl bg-white/5 border border-[#00e5a0]/30 text-[#00e5a0] font-bold flex items-center justify-center gap-2 hover:bg-[#00e5a0]/10 hover:border-[#00e5a0]/50 transition-all group/btn"
                >
                  <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
                  <span>В корзину</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
