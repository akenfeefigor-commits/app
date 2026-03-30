import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Copy, Check, CreditCard, Banknote, ArrowLeft } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CORP_CARD = '8600 1234 5678 9012';

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<'name' | 'payment' | 'cash' | 'card' | 'success'>('name');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const { cart, cartTotal, clearCart } = useCart();

  const formatSum = (n: number) => n.toLocaleString('ru-RU') + ' сум';

  const handleNameSubmit = () => {
    if (name.trim().length >= 2) {
      setStep('payment');
    }
  };

  const handlePaymentChoice = (method: 'cash' | 'card') => {
    setStep(method);
  };

  const copyCardNumber = () => {
    navigator.clipboard.writeText(CORP_CARD.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOrderComplete = () => {
    clearCart();
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('name');
      setName('');
    }, 3000);
  };

  const buildCartSummary = () => {
    return cart.map((i) => (
      <div key={i.id} className="flex items-center gap-2 text-sm">
        <span>{i.emoji}</span>
        <span className="font-bold">{i.name}</span>
        <span className="text-white/50">× {i.qty}</span>
      </div>
    ));
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-[#080d1a]/95 backdrop-blur-xl" />

      <div
        className={`relative w-full max-w-md glass-strong rounded-3xl p-6 md:p-8 transition-all duration-500 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step: Name Input */}
        {step === 'name' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5a0]/20 to-[#00bcd4]/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🥤</span>
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-wide">КАК ТЕБЯ ЗОВУТ?</h2>
            <p className="text-white/50 mb-8">
              Введи своё имя — кассир позовёт тебя по имени!
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Алишер, Малика..."
              className="w-full px-6 py-4 rounded-2xl glass border border-white/20 text-white placeholder-white/30 focus:border-[#00e5a0] focus:outline-none transition-colors text-lg mb-6"
              maxLength={30}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            />
            <button
              onClick={handleNameSubmit}
              disabled={name.trim().length < 2}
              className="w-full btn-mega btn-berry-mega justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далее →
            </button>
          </div>
        )}

        {/* Step: Payment Choice */}
        {step === 'payment' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffe234]/20 to-[#ff9800]/20 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-[#ffe234]" />
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-wide">СПОСОБ ОПЛАТЫ</h2>
            <p className="text-white/50 mb-8">Выбери как хочешь оплатить</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handlePaymentChoice('cash')}
                className="p-6 rounded-2xl glass border border-white/10 hover:border-[#00e5a0]/50 transition-all hover:scale-105 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💵</div>
                <div className="font-bold">Наличными</div>
                <div className="text-xs text-white/50">Оплата у кассира</div>
              </button>
              <button
                onClick={() => handlePaymentChoice('card')}
                className="p-6 rounded-2xl glass border border-white/10 hover:border-[#ff4d8d]/50 transition-all hover:scale-105 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📱</div>
                <div className="font-bold">Картой</div>
                <div className="text-xs text-white/50">Перевод на карту</div>
              </button>
            </div>

            <button
              onClick={() => setStep('name')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
          </div>
        )}

        {/* Step: Cash Payment */}
        {step === 'cash' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00e5a0]/20 to-[#00bcd4]/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#00e5a0]" />
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-wide text-[#00e5a0]">ЗАКАЗ ПРИНЯТ!</h2>
            <p className="text-white/50 mb-6">Твой заказ отправлен. Ожидай!</p>

            <div className="glass rounded-2xl p-6 mb-6 border border-[#ffe234]/30">
              <div className="text-sm text-white/50 mb-2">Кассир позовёт:</div>
              <div className="text-4xl font-black text-[#ffe234] text-glow-lemon">{name}</div>
            </div>

            <div className="glass rounded-2xl p-4 mb-6 text-left">
              <div className="text-sm text-white/50 mb-3">Заказ:</div>
              {buildCartSummary()}
              <div className="border-t border-white/10 mt-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold">ИТОГО:</span>
                  <span className="text-xl font-black text-[#ffe234]">{formatSum(cartTotal)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#00e5a0] text-[#080d1a] flex items-center justify-center font-black">1</div>
                <span className="text-white/70">Услышь своё имя от кассира</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#00e5a0] text-[#080d1a] flex items-center justify-center font-black">2</div>
                <span className="text-white/70">Оплати {formatSum(cartTotal)} наличными</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#00e5a0] text-[#080d1a] flex items-center justify-center font-black">3</div>
                <span className="text-white/70">Бармен приготовит напитки 🍹</span>
              </div>
            </div>

            <button onClick={handleOrderComplete} className="w-full btn-mega btn-primary-mega justify-center">
              Понятно! Жду 👍
            </button>
          </div>
        )}

        {/* Step: Card Payment */}
        {step === 'card' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff4d8d]/20 to-[#9c27b0]/20 flex items-center justify-center mx-auto mb-6">
              <Banknote className="w-10 h-10 text-[#ff4d8d]" />
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-wide">ОПЛАТА КАРТОЙ</h2>
            <p className="text-white/50 mb-6">
              Переведи <span className="text-[#ffe234] font-bold">{formatSum(cartTotal)}</span> на карту:
            </p>

            <div className="glass rounded-2xl p-4 mb-6 border border-[#00e5a0]/30 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-2xl font-black text-[#00e5a0] tracking-wider">{CORP_CARD}</div>
              </div>
              <button
                onClick={copyCardNumber}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                  copied
                    ? 'bg-[#00e5a0] text-[#080d1a]'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>

            <div className="glass rounded-2xl p-4 mb-6 text-left">
              <div className="text-sm text-white/50 mb-3">Заказ:</div>
              {buildCartSummary()}
            </div>

            <div className="space-y-2 mb-6 text-sm text-left">
              <div className="flex items-start gap-2">
                <span className="text-[#00e5a0]">1.</span>
                <span className="text-white/70">Скопируй номер карты</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#00e5a0]">2.</span>
                <span className="text-white/70">Открой банковское приложение и переведи сумму</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#00e5a0]">3.</span>
                <span className="text-white/70">Подойди к кассе и покажи чек</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleOrderComplete} className="flex-1 btn-mega btn-berry-mega justify-center">
                ✅ Я оплатил — иду к кассе
              </button>
              <button onClick={() => setStep('payment')} className="btn-mega btn-outline-mega">
                ←
              </button>
            </div>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00e5a0]/30 to-[#ffe234]/30 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="text-5xl">🎉</span>
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-wide text-[#00e5a0]">ЗАКАЗ ОТПРАВЛЕН!</h2>
            <p className="text-white/50">Покажи чек кассиру и назови своё имя:</p>
            <div className="text-4xl font-black text-[#ffe234] text-glow-lemon mt-4">{name}</div>
          </div>
        )}
      </div>
    </div>
  );
}
