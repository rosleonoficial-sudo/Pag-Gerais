import React from 'react';
import { ShoppingBag, Star, Plus, TrendingUp, Calendar, ArrowUp } from 'lucide-react';

export const GroupSelectionSection: React.FC = () => {
  const handleOpenGroup = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("trackSingle", "954536017305711", "Lead", { content_name: "Grupo Ofertas Gerais", value: 0, currency: "BRL" });
      } catch (err) {
        console.error("Error sending pixel event:", err);
      }
    }
    window.open("https://chat.whatsapp.com/FgNiDCz47lA0FGAaDGdHbs?s=cl&p=i&ilr=2", "_blank");
  };

  return (
    <section className="w-full max-w-lg mx-auto px-3 py-2 text-zinc-900 select-none">
      {/* 1. Header Title & Subtitle */}
      <div 
        onClick={handleOpenGroup}
        className="flex flex-col items-center text-center mb-3 cursor-pointer group"
      >
        <div className="flex items-center gap-1 mb-1 text-emerald-500">
          <Plus className="w-2.5 h-2.5 stroke-[3]" />
          <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          <Plus className="w-2.5 h-2.5 stroke-[3]" />
        </div>

        <h2 className="text-lg sm:text-xl font-black tracking-tight uppercase text-zinc-900 leading-tight group-hover:text-emerald-600 transition-colors">
          OFERTAS DE TUDO EM UM SÓ GRUPO
        </h2>

        <div className="w-8 h-1 bg-emerald-500 rounded-full my-1.5" />

        <p className="text-zinc-600 text-xs sm:text-sm font-medium max-w-sm leading-snug">
          Encontre promoções, cupons e descontos em várias categorias todos os dias.
        </p>
      </div>

      {/* Main Single Card: Grupo Ofertas Gerais */}
      <div className="mb-4">
        <div 
          onClick={handleOpenGroup}
          className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md hover:shadow-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 transition-all cursor-pointer active:scale-[0.99] relative overflow-hidden"
        >
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-lg shadow-2xs tracking-wider">
            Grupo Oficial
          </div>

          {/* Left Visual Container */}
          <div className="w-full sm:w-[110px] h-[72px] sm:h-[84px] bg-gradient-to-br from-emerald-500/15 via-teal-500/20 to-emerald-600/25 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shrink-0 border border-emerald-300/70 p-1 text-center">
            <div className="grid grid-cols-4 gap-1 text-xs sm:text-sm select-none mb-1">
              <span>🚗</span>
              <span>🔊</span>
              <span>🧴</span>
              <span>👟</span>
              <span>⌚</span>
              <span>📱</span>
              <span>🏠</span>
              <span>🛠️</span>
            </div>
            <span className="text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full text-[8.5px] font-extrabold shadow-2xs leading-none uppercase tracking-wide">
              Ofertas Gerais
            </span>
          </div>

          {/* Right Text Info */}
          <div className="flex-1 min-w-0 text-left w-full">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-3 h-3 stroke-[2.5]" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                Grupo Ofertas Gerais
              </h3>
            </div>

            <p className="text-zinc-700 text-xs sm:text-[13px] leading-relaxed">
              Receba todos os dias ofertas de <strong className="font-extrabold text-zinc-950">caixas de som</strong>, <strong className="font-extrabold text-zinc-950">perfumes</strong>, <strong className="font-extrabold text-zinc-950">tênis</strong>, <strong className="font-extrabold text-zinc-950">relógios</strong>, eletrodomésticos, ferramentas, produtos para casa, eletrônicos, <strong className="font-black text-amber-900 bg-amber-100/80 px-1 py-0.5 rounded border border-amber-300">acessórios automotivos</strong> e muito mais.
            </p>
          </div>
        </div>
      </div>

      {/* Proof of Result Block (Compact 91,7%) */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-zinc-900 text-xs sm:text-sm font-bold leading-tight">
              de aproveitamento dos cupons pelo público
            </span>
            <span className="inline-flex items-center gap-1 text-zinc-500 text-[10px] font-medium mt-0.5">
              <Calendar className="w-2.5 h-2.5 text-zinc-400" />
              Atualizado nos últimos 15 dias
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <span className="text-emerald-600 font-black text-lg sm:text-xl bg-white px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs">
            91,7%
          </span>
        </div>
      </div>

      {/* Responsive Community Rosleon Image & Yellow CTA Button */}
      <div className="mt-4 w-full flex flex-col items-center justify-center">
        <div className="w-[75%] max-w-[432px] mx-auto bg-white rounded-3xl border border-zinc-300 overflow-hidden shadow-2xl p-1 sm:p-2 transition-all duration-300">
          <img
            src="https://i.postimg.cc/Ghj7fJ78/Chat-GPT-Image-6-de-ago-de-2026-13-21-03.png"
            alt="Comunidade Rosleon Oficial"
            className="w-full h-auto block rounded-2xl shadow-sm object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <button
          onClick={handleOpenGroup}
          className="mt-3.5 w-[75%] max-w-[432px] bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-zinc-950 font-black py-3.5 px-6 rounded-full shadow-[0_0_25px_rgba(250,204,21,0.65)] hover:shadow-[0_0_35px_rgba(250,204,21,0.9)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none relative overflow-hidden text-sm sm:text-base md:text-lg tracking-wider uppercase border-2 border-yellow-300 animate-pulse"
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white/40 rounded-t-full pointer-events-none" />
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-950 stroke-[3] z-10 animate-bounce" />
          <span className="z-10 font-black tracking-tight drop-shadow-2xs">ENTRAR AGORA</span>
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-950 stroke-[3] z-10 animate-bounce" />
        </button>
      </div>
    </section>
  );
};


