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
import GroupCTAButton from "./components/GroupCTAButton";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const GROUP_WHATSAPP_URL = "https://chat.whatsapp.com/FgNiDCz47lA0FGAaDGdHbs?s=cl&p=i&ilr=2";

  // Centralized WhatsApp Group Click Handler with Meta Pixel Lead Event
  const handleJoinGroup = (e: React.MouseEvent, ctaName: string) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("trackSingle", "954536017305711", "Lead", {
          content_name: ctaName,
          value: 0,
          currency: "BRL"
        });
      } catch (err) {
        console.error("Error sending pixel Lead event:", err);
      }
    }
    setTimeout(() => {
      window.open(GROUP_WHATSAPP_URL, "_blank");
    }, 150);
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

        {/* CTA 1 — JÁ EXISTENTE (Abaixo do Vídeo) */}
        <div id="action-buttons" className="w-full mt-4 mb-4">
          <GroupCTAButton 
            text="GRUPO OFERTAS GERAIS" 
            onClick={(e) => handleJoinGroup(e, "CTA 1 - Abaixo do Video")}
            subtext="AVISO: Últimas vagas gratuitas!"
          />
        </div>

        {/* Real-time viewer count badge */}
        <div className="mb-4 flex flex-col items-center">
          <LiveViewerCounter />
          
          {/* Past Offers Showcase Carousel */}
          <PastOffersCarousel />

          {/* CTA 2 — APÓS AS OFERTAS */}
          <GroupCTAButton 
            text="QUERO RECEBER ESSAS OFERTAS" 
            onClick={(e) => handleJoinGroup(e, "CTA 2 - Apos Ofertas")}
            className="mt-4 mb-2"
          />

          {/* Group Options Overview Section */}
          <div className="w-full mt-2">
            <GroupSelectionSection />
          </div>

          {/* CTA 3 — APÓS OS BENEFÍCIOS DO GRUPO */}
          <GroupCTAButton 
            text="QUERO ENTRAR NO GRUPO" 
            onClick={(e) => handleJoinGroup(e, "CTA 3 - Apos Beneficios")}
            className="mt-4 mb-2"
          />
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

            {/* CTA 4 — APÓS OS DEPOIMENTOS */}
            <GroupCTAButton 
              text="ENTRAR NO GRUPO DE OFERTAS" 
              onClick={(e) => handleJoinGroup(e, "CTA 4 - Apos Depoimentos")}
              className="mt-5 mb-5"
            />

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

        {/* CTA 5 — FECHAMENTO DA PÁGINA (Após Garantia / Antes do Rodapé) */}
        <div className="my-6">
          <GroupCTAButton 
            text="QUERO APROVEITAR AS OFERTAS" 
            onClick={(e) => handleJoinGroup(e, "CTA 5 - Fechamento Pagina")}
          />
        </div>

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
