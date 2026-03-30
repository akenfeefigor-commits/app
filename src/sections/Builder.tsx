import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RefreshCw, ShoppingCart, Sparkles } from 'lucide-react';

interface BuilderProps {
  showToast: (message: string) => void;
}

const bases = [
  { emoji: '💧', name: 'Содовая' },
  { emoji: '🫧', name: 'Тоник' },
  { emoji: '🍊', name: 'Апельсиновый сок' },
  { emoji: '🍎', name: 'Гранатовый сок' },
  { emoji: '🍋', name: 'Лимонный сок' },
];

const flavors = [
  { emoji: '🌿', name: 'Мята' },
  { emoji: '🍓', name: 'Клубника' },
  { emoji: '🍋', name: 'Лайм' },
  { emoji: '🥒', name: 'Огурец' },
  { emoji: '🍊', name: 'Апельсин' },
  { emoji: '🫐', name: 'Черника' },
  { emoji: '🍍', name: 'Ананас' },
];

const extras = [
  { emoji: '🍬', name: 'Сахарный сироп' },
  { emoji: '🧊', name: 'Много льда' },
  { emoji: '🌶', name: 'Острая нотка' },
  { emoji: '🍯', name: 'Мёд' },
  { emoji: '🌸', name: 'Розовая вода' },
];

export default function Builder({ showToast }: BuilderProps) {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const { addToCart } = useCart();

  const toggleBase = (base: string) => {
    setSelectedBase(selectedBase === base ? null : base);
  };

  const toggleFlavor = (flavor: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor)
        ? prev.filter((f) => f !== flavor)
        : [...prev, flavor]
    );
  };

  const toggleExtra = (extra: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((e) => e !== extra)
        : [...prev, extra]
    );
  };

  const getDrinkName = () => {
    const flavorNames = selectedFlavors.slice(0, 2).map((f) => {
      const found = flavors.find((fl) => fl.name === f);
      return found ? found.name : f;
    });
    const baseName = selectedBase
      ? bases.find((b) => b.name === selectedBase)?.name
      : '';

    if (flavorNames.length > 0) {
      return `${flavorNames.join(' + ')}${baseName ? ' на ' + baseName : ''}`;
    }
    return baseName || 'Мой напиток';
  };

  const getDrinkEmoji = () => {
    if (selectedFlavors.length > 0) {
      const flavor = flavors.find((f) => f.name === selectedFlavors[0]);
      return flavor ? flavor.emoji : '🥤';
    }
    if (selectedBase) {
      const base = bases.find((b) => b.name === selectedBase);
      return base ? base.emoji : '🥤';
    }
    return '🥤';
  };

  const getSummary = () => {
    const parts = [
      selectedBase,
      ...selectedFlavors,
      ...selectedExtras,
    ].filter(Boolean);
    return parts.join(' · ') || 'Выбери ингредиенты';
  };

  const handleAddToCart = () => {
    if (!selectedBase && selectedFlavors.length === 0) {
      showToast('⚠️ Сначала выбери ингредиенты!');
      return;
    }

    addToCart({
      emoji: getDrinkEmoji(),
      name: getDrinkName(),
      desc: getSummary(),
      type: 'custom',
    });

    showToast(`${getDrinkName()} добавлен в корзину!`);
    resetBuilder();
  };

  const resetBuilder = () => {
    setSelectedBase(null);
    setSelectedFlavors([]);
    setSelectedExtras([]);
  };

  const hasSelection = selectedBase || selectedFlavors.length > 0;

  return (
    <section id="builder" className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="section-title reveal">
          <span className="section-eyebrow">Твой напиток</span>
          <h2 className="section-heading">
            СОЗДАЙ СВОЙ —{' '}
            <span className="text-gradient-lemon">17 000 СУМ</span>
          </h2>
        </div>

        {/* Builder Box */}
        <div className="reveal glass-strong rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e5a0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff4d8d]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            {/* Title */}
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-[#00e5a0]" />
              <h3 className="text-2xl md:text-3xl font-black tracking-wide">
                🧪 КОНСТРУКТОР НАПИТКА
              </h3>
            </div>
            <p className="text-white/50 mb-8">
              Выбери основу, вкус и добавки — и мы приготовим это специально для тебя.
              Та же цена, полная свобода выбора!
            </p>

            {/* Step 1: Base */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-black text-[#00e5a0] tracking-widest uppercase">
                  Шаг 1 — Основа
                </span>
                <span className="text-xs text-white/30">выбери одно</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {bases.map((base) => (
                  <button
                    key={base.name}
                    onClick={() => toggleBase(base.name)}
                    className={`option-btn-mega ${
                      selectedBase === base.name ? 'selected-mint' : ''
                    }`}
                  >
                    {base.emoji} {base.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavors */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-black text-[#ff4d8d] tracking-widest uppercase">
                  Шаг 2 — Вкус
                </span>
                <span className="text-xs text-white/30">можно несколько</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {flavors.map((flavor) => (
                  <button
                    key={flavor.name}
                    onClick={() => toggleFlavor(flavor.name)}
                    className={`option-btn-mega ${
                      selectedFlavors.includes(flavor.name) ? 'selected-berry' : ''
                    }`}
                  >
                    {flavor.emoji} {flavor.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Extras */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-black text-[#ffe234] tracking-widest uppercase">
                  Шаг 3 — Добавки
                </span>
                <span className="text-xs text-white/30">по желанию</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {extras.map((extra) => (
                  <button
                    key={extra.name}
                    onClick={() => toggleExtra(extra.name)}
                    className={`option-btn-mega ${
                      selectedExtras.includes(extra.name) ? 'selected-lemon' : ''
                    }`}
                  >
                    {extra.emoji} {extra.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div
              className={`glass rounded-2xl p-6 mb-6 border-2 border-dashed transition-all duration-300 ${
                hasSelection
                  ? 'border-[#00e5a0]/50 bg-[#00e5a0]/5'
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{getDrinkEmoji()}</span>
                <div className="flex-1">
                  <h4
                    className={`text-xl font-black ${
                      hasSelection ? 'text-[#00e5a0]' : 'text-white/50'
                    }`}
                  >
                    {hasSelection ? getDrinkName() : 'Выбери ингредиенты'}
                  </h4>
                  <p className="text-sm text-white/40 mt-1">{getSummary()}</p>
                </div>
                <div className="text-right">
                  {hasSelection ? (
                    <div className="text-3xl font-black text-[#ffe234] text-glow-lemon">
                      17 000
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-white/20">—</div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!hasSelection}
                className="btn-mega btn-primary-mega disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>В корзину</span>
              </button>
              <button
                onClick={resetBuilder}
                className="btn-mega btn-outline-mega"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Сбросить</span>
              </button>
              <p className="text-sm text-white/40 self-center">
                Добавь в корзину и оформи всё сраз! 😄
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
