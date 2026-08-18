import React from 'react';
import { ShieldCheck, RotateCcw, CheckCircle2, ArrowUp } from 'lucide-react';

export const ReturnPolicySecurity: React.FC = () => {
  const handleScrollToButtons = () => {
    const el = document.getElementById('action-buttons');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50/60 to-white py-6 px-4 border-t border-emerald-100/80 flex flex-col items-center">
      {/* Warranty Card Box */}
      <div className="w-[72%] max-w-[416px] mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-emerald-200/80 relative overflow-hidden flex flex-col items-center">
        
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />

        <div className="flex flex-col items-center text-center gap-3 w-full">
          
          {/* Shield Icon Badge */}
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shadow-inner border border-emerald-300/60">
            <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center w-full">
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <RotateCcw className="w-3 h-3" />
                Garantia Legal CDC
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200/60">
                <CheckCircle2 className="w-3 h-3 text-blue-600" />
                7 Dias Seguros
              </span>
            </div>

            <h3 className="font-display font-black text-base sm:text-lg text-zinc-950 tracking-tight uppercase mb-1.5">
              Prazo para devolução
            </h3>

            <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed font-medium">
              Comprou e mudou de ideia? Em compras online, você pode solicitar a devolução em até <strong className="text-emerald-800 font-bold">7 dias corridos</strong> após o recebimento, conforme o <span className="underline decoration-emerald-400 decoration-2">Art. 49 do CDC</span>. Consulte os termos de devolução do Mercado Livre ou da Amazon.
            </p>
          </div>
        </div>
      </div>

      {/* Pulsing Yellow CTA Button (Outside the box) */}
      <button
        onClick={handleScrollToButtons}
        className="mt-3.5 w-[72%] max-w-[416px] bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-zinc-950 font-black py-3.5 px-4 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:shadow-[0_0_30px_rgba(250,204,21,0.85)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none relative overflow-hidden text-xs sm:text-sm tracking-wider uppercase border-2 border-yellow-300 animate-pulse"
      >
        {/* Gloss shine reflection effect */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/40 rounded-t-full pointer-events-none" />
        
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950 stroke-[3] z-10 animate-bounce" />
        <span className="z-10 font-black tracking-tight drop-shadow-2xs">ENTRAR AGORA</span>
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950 stroke-[3] z-10 animate-bounce" />
      </button>
    </section>
  );
};
export default ReturnPolicySecurity;
