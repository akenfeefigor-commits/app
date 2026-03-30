import { CheckCircle } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
}

export default function Toast({ show, message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[3000] transition-all duration-300 ${
        show
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-[#00e5a0] to-[#00bcd4] shadow-lg shadow-[#00e5a0]/30">
        <CheckCircle className="w-5 h-5 text-[#080d1a]" />
        <span className="font-black text-[#080d1a]">{message}</span>
      </div>
    </div>
  );
}
