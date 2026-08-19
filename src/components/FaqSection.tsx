import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Como chegar ao preço postado?",
    answer: "Quando aparecer “Use o cupom”, copie o código enviado no grupo. O preço pode abrir maior no link. Antes de pagar, procure a opção “Cupom” e aplique o código."
  },
  {
    question: "Como aplicar o cupom do Mercado Livre?",
    answer: "Ao abrir a oferta, o preço pode aparecer mais alto. Isso é normal.\n\nSiga a compra até chegar em Forma de pagamento. Depois, role para baixo e toque em “Inserir cupom”.\n\nDigite o código que enviamos no grupo em “Use o cupom” e aplique. Pronto! O desconto será calculado no valor da compra."
  },
  {
    question: "Como usar cupom na Amazon?",
    answer: "Quando disponível, o cupom geralmente aparece abaixo do preço. Clique em “Resgatar” e siga a compra normalmente."
  },
  {
    question: "Os produtos são originais?",
    answer: "Sim. Compartilhamos ofertas de produtos originais e filtramos bons preços e cupons."
  },
  {
    question: "O preço ou cupom pode mudar?",
    answer: "Sim. Ofertas e cupons podem acabar ou mudar a qualquer momento."
  },
  {
    question: "Quais plataformas trabalhamos?",
    answer: "Mercado Livre, Amazon e Netshoes."
  },
  {
    question: "Como funciona o suporte?",
    answer: "Os números que enviam as ofertas não respondem mensagens. Para dúvidas, utilize o número oficial de suporte informado dentro dos grupos."
  },
  {
    question: "O grupo é gratuito?",
    answer: "Sim, até o momento a participação é gratuita."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-2 text-left">
      <div className="flex items-center justify-center gap-2 mb-3 text-center">
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
        <h3 className="font-display font-black text-base sm:text-xl text-zinc-900 uppercase tracking-tight">
          Dúvidas Frequentes (FAQ)
        </h3>
      </div>

      <div className="space-y-1.5">
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bg-white rounded-xl border border-zinc-200/90 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-left gap-3 hover:bg-zinc-50/80 transition-colors cursor-pointer outline-none select-none"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-xs sm:text-sm text-zinc-900 tracking-tight leading-snug">
                  {item.question}
                </span>
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3 pt-1 text-xs sm:text-[13px] text-zinc-700 leading-relaxed border-t border-zinc-100 bg-zinc-50/50 whitespace-pre-line">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
