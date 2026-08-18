import React, { useState } from "react";
import InteractivePlayer from "./components/InteractivePlayer";
import LiveViewerCounter from "./components/LiveViewerCounter";
import GroupNotification from "./components/GroupNotification";
import ReviewList from "./components/ReviewList";
import AboutMe from "./components/AboutMe";
import ReturnPolicySecurity from "./components/ReturnPolicySecurity";
import FloatingHelpButton from "./components/FloatingHelpButton";
import WhatsAppModal from "./components/WhatsAppModal";
import { GroupSelectionSection } from "./components/GroupSelectionSection";
import PastOffersCarousel from "./components/PastOffersCarousel";
import { FaqSection } from "./components/FaqSection";
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenEletronicos = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("trackSingle", "1319209950176987", "Lead", { content_name: "Grupo Eletrônicos", value: 0, currency: "BRL" });
      } catch (err) {
        console.error("Error sending pixel event:", err);
      }
    }
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/FgNiDCz47lA0FGAaDGdHbs?s=cl&p=i&ilr=2", "_blank");
    }, 150);
  };

  const handleOpenFitness = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("trackSingle", "1335109292111834", "Lead", { content_name: "Grupo Fitness", value: 0, currency: "BRL" });
      } catch (err) {
        console.error("Error sending pixel event:", err);
      }
    }
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/FgNiDCz47lA0FGAaDGdHbs?s=cl&p=i&ilr=2", "_blank");
    }, 150);
  };

  const handleOpenOfertasGerais = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("trackSingle", "954536017305711", "Lead", { content_name: "Grupo Ofertas Gerais", value: 0, currency: "BRL" });
      } catch (err) {
        console.error("Error sending pixel event:", err);
      }
    }
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/FgNiDCz47lA0FGAaDGdHbs?s=cl&p=i&ilr=2", "_blank");
    }, 150);
  };

  const handleScrollToButtons = (e: React.MouseEvent) => {
    e.preventDefault();
    const actionButtons = document.getElementById("action-buttons");
    if (actionButtons) {
      actionButtons.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col text-zinc-950 overflow-x-hidden selection:bg-orange-100 selection:text-orange-600">
      
      {/* 1. Top Urgent Bar */}
      <div className="w-full bg-[#FF6A00] text-white py-3.5 px-4 text-center text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-md select-none">
        ATENÇÃO: ÚLTIMAS VAGAS GRATUITAS NO GRUPO!
      </div>

      {/* 2. Main Promotions Presentation Area */}
      <header className="w-full max-w-2xl mx-auto px-4 mt-3 sm:mt-5 mb-3 sm:mb-4 text-center flex flex-col items-center">
        {/* Linha 1 — Alerta */}
        <p className="font-display font-bold text-xs sm:text-sm text-[#111111] uppercase tracking-wider mb-0.5">
          FIM DE ANO CHEGANDO...
        </p>

        {/* Linha 2 — Headline principal */}
        <h1 className="font-display font-extrabold text-base sm:text-2xl lg:text-3xl text-[#111111] tracking-tight uppercase leading-snug my-0.5">
          O MESMO PRODUTO PODE CUSTAR <span className="text-[#FF6A00] font-black">MUITO MENOS</span>
        </h1>
        
        {/* Linha 3 — Maior impacto visual */}
        <div className="my-0.5 select-none">
          <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#12C95A] tracking-tight uppercase leading-none">
            ECONOMIZE <span className="font-black">ATÉ 70%</span>
          </span>
        </div>

        {/* Linha 4 — Sustentação */}
        <h2 className="font-display font-extrabold text-xs sm:text-lg lg:text-xl text-[#111111] tracking-tight uppercase leading-tight mt-0.5 mb-1.5">
          COM <span className="font-black">OFERTAS E CUPONS</span> O ANO TODO
        </h2>

        {/* Subheadline final */}
        <p className="text-xs sm:text-sm text-[#444444] font-medium tracking-normal text-center max-w-md mx-auto leading-snug">
          Receba ofertas e cupons direto no <span className="font-bold text-[#111111]">WhatsApp</span>. <span className="font-bold text-[#12C95A]">Grátis.</span>
        </p>
      </header>

      {/* 3. Interactive Video Section */}
      <main className="flex-grow w-full">
        {/* Gien Liu Video Reel Container */}
        <InteractivePlayer />

        {/* 4. Instant Action Button & Trust elements */}
        <div id="action-buttons" className="w-full max-w-lg mx-auto px-4 flex flex-col items-center mt-4 mb-4 text-center">
          
          {/* Ofertas Gerais Group CTA Button */}
          <button
            onClick={handleOpenOfertasGerais}
            className="group w-full max-w-md bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer outline-none relative overflow-hidden whitespace-nowrap text-[13px] min-[390px]:text-sm sm:text-lg md:text-xl animate-pulse-gentle"
          >
            {/* Gloss shine reflection effect */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-full pointer-events-none" />
            
            {/* Moving shine sweep line */}
            <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shine-sweep" />
            
            {/* Official WhatsApp Logo */}
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0 drop-shadow-md z-10" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.852-4.386 9.855-9.775.002-2.611-1.013-5.065-2.859-6.91-1.845-1.847-4.3-2.864-6.912-2.865-5.44 0-9.856 4.385-9.86 9.776-.001 1.916.499 3.79 1.447 5.4l-.94 3.43 3.519-.918zM17.487 14.39c-.3-.149-1.772-.874-2.042-.973-.27-.099-.467-.149-.662.149-.195.297-.756.973-.927 1.171-.171.197-.341.221-.641.073-.3-.149-1.265-.466-2.41-1.487-.891-.795-1.493-1.778-1.668-2.076-.175-.297-.019-.458.13-.606.134-.133.3-.347.45-.52.149-.174.199-.297.299-.496.099-.198.05-.372-.025-.521-.075-.149-.662-1.595-.908-2.189-.24-.578-.48-.5-.662-.51-.17-.008-.367-.01-.563-.01-.197 0-.518.074-.789.372-.27.297-1.03 1.011-1.03 2.463 0 1.453 1.056 2.858 1.203 3.056.149.198 2.078 3.175 5.037 4.453.704.304 1.253.486 1.68.621.71.224 1.354.193 1.864.118.57-.085 1.771-.724 2.022-1.423.25-.699.25-1.298.175-1.422-.075-.125-.27-.199-.57-.349z" />
            </svg>
            
            <span className="tracking-wide uppercase font-black text-dark-stroke z-10">Grupo Ofertas Gerais</span>
          </button>

          {/* Critical Warning notification label */}
          <div className="flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-bold text-zinc-800 select-none">
            <span role="img" aria-label="warning" className="text-base">🚨</span>
            <span className="uppercase tracking-wide">AVISO: Últimas vagas gratuitas!</span>
          </div>
        </div>

        {/* Real-time viewer count badge below buttons */}
        <div className="mb-4 flex flex-col items-center">
          <LiveViewerCounter />
          
          {/* Past Offers Showcase Carousel */}
          <PastOffersCarousel />

          {/* Group Options Overview Section in Native Text & Cards */}
          <div className="w-full mt-2">
            <GroupSelectionSection />
          </div>
        </div>

        {/* 5. Light Gray Panel - Testimonials and Social Reviews Section */}
        <section className="w-full bg-[#EEEEEE] py-6 md:py-8 text-center border-t border-zinc-200/50">
          <div className="w-full max-w-4xl mx-auto px-4">
            {/* Title review badge */}
            <h2 className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-zinc-900 tracking-tight uppercase mb-4 flex items-center justify-center gap-2">
              Veja os depoimentos dos nossos seguidores e inscritos do canal.
            </h2>

            {/* List of high fidelity comments matching the provided screenshot */}
            <ReviewList />

            {/* Action Button directly below the testimonials image */}
            <div className="mt-4 mb-4 w-full max-w-md mx-auto">
              <button
                onClick={handleOpenOfertasGerais}
                className="group w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer outline-none relative overflow-hidden whitespace-nowrap text-[13px] min-[390px]:text-sm sm:text-lg md:text-xl animate-pulse-gentle"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-full pointer-events-none" />
                <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shine-sweep" />
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0 drop-shadow-md z-10" 
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.852-4.386 9.855-9.775.002-2.611-1.013-5.065-2.859-6.91-1.845-1.847-4.3-2.864-6.912-2.865-5.44 0-9.856 4.385-9.86 9.776-.001 1.916.499 3.79 1.447 5.4l-.94 3.43 3.519-.918zM17.487 14.39c-.3-.149-1.772-.874-2.042-.973-.27-.099-.467-.149-.662.149-.195.297-.756.973-.927 1.171-.171.197-.341.221-.641.073-.3-.149-1.265-.466-2.41-1.487-.891-.795-1.493-1.778-1.668-2.076-.175-.297-.019-.458.13-.606.134-.133.3-.347.45-.52.149-.174.199-.297.299-.496.099-.198.05-.372-.025-.521-.075-.149-.662-1.595-.908-2.189-.24-.578-.48-.5-.662-.51-.17-.008-.367-.01-.563-.01-.197 0-.518.074-.789.372-.27.297-1.03 1.011-1.03 2.463 0 1.453 1.056 2.858 1.203 3.056.149.198 2.078 3.175 5.037 4.453.704.304 1.253.486 1.68.621.71.224 1.354.193 1.864.118.57-.085 1.771-.724 2.022-1.423.25-.699.25-1.298.175-1.422-.075-.125-.27-.199-.57-.349z" />
                </svg>
                <span className="tracking-wide uppercase font-black text-dark-stroke z-10">Grupo Ofertas Gerais</span>
              </button>
            </div>

            {/* Compact FAQ / Dúvidas Frequentes Accordion */}
            <FaqSection />

            {/* Conte Comigo section below testimonials */}
            <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
              <h3 className="font-display font-bold text-lg sm:text-2xl text-zinc-900 tracking-tight mb-3">
                Conte Comigo Para Te Ajudar Se Tiver Dúvidas
              </h3>
              <img
                src="https://i.postimg.cc/gctQKJFF/Chat-GPT-Image-1-de-ago-de-2026-11-58-25.png"
                alt="Conte Comigo"
                className="w-[72%] max-w-[416px] mx-auto rounded-2xl shadow-lg object-contain h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Security & Return Policy Trust Card */}
        <ReturnPolicySecurity />

        {/* Penultimate Section: About Leonardo / How I get promotions */}
        <AboutMe />

      </main>

      {/* Footer with CNPJ, Termos de Uso e Políticas de Privacidade */}
      <footer className="w-full bg-white border-t border-zinc-200 py-6 px-4 mt-auto">
        <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium tracking-wide">
          <a 
            href="#termos-de-uso" 
            className="hover:text-amber-600 transition-colors cursor-pointer"
            onClick={(e) => { e.preventDefault(); alert("Termos de Uso em desenvolvimento."); }}
          >
            Termos de Uso
          </a>

          <div className="flex flex-col items-center text-center gap-0.5">
            <span className="font-semibold text-zinc-600">CNPJ: 59.100.225/0001-62</span>
            <span className="text-zinc-400 text-[11px]">Barra Velha - SC</span>
          </div>

          <a 
            href="#politicas-de-privacidade" 
            className="hover:text-amber-600 transition-colors cursor-pointer"
            onClick={(e) => { e.preventDefault(); alert("Políticas de Privacidade em desenvolvimento."); }}
          >
            Políticas de Privacidade
          </a>
        </div>
      </footer>

      {/* Real-time group join notifications */}
      <GroupNotification />

      {/* Floating WhatsApp Help Button - Fixed at bottom-right */}
      <FloatingHelpButton />

      {/* Verification and Entry Funnel Modal */}
      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
