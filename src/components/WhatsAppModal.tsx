import React, { useState, useEffect } from "react";
import { X, MessageSquare, CheckCircle2, AlertCircle, Sparkles, Users } from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setLoadingStep(0);
      setIsVerifying(true);
      return;
    }

    // Fast loading simulation 0-100%
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      {/* Modal Container */}
      <div 
        id="whatsapp-verification"
        className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl border border-zinc-100/90 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 cursor-pointer transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* WhatsApp branding header bar */}
        <div className="bg-[#075E54] px-6 py-5 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-400/30">
            <svg 
              className="w-6 h-6 fill-current text-white" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.852-4.386 9.855-9.775.002-2.611-1.013-5.065-2.859-6.91-1.845-1.847-4.3-2.864-6.912-2.865-5.44 0-9.856 4.385-9.86 9.776-.001 1.916.499 3.79 1.447 5.4l-.94 3.43 3.519-.918zM17.487 14.39c-.3-.149-1.772-.874-2.042-.973-.27-.099-.467-.149-.662.149-.195.297-.756.973-.927 1.171-.171.197-.341.221-.641.073-.3-.149-1.265-.466-2.41-1.487-.891-.795-1.493-1.778-1.668-2.076-.175-.297-.019-.458.13-.606.134-.133.3-.347.45-.52.149-.174.199-.297.299-.496.099-.198.05-.372-.025-.521-.075-.149-.662-1.595-.908-2.189-.24-.578-.48-.5-.662-.51-.17-.008-.367-.01-.563-.01-.197 0-.518.074-.789.372-.27.297-1.03 1.011-1.03 2.463 0 1.453 1.056 2.858 1.203 3.056.149.198 2.078 3.175 5.037 4.453.704.304 1.253.486 1.68.621.71.224 1.354.193 1.864.118.57-.085 1.771-.724 2.022-1.423.25-.699.25-1.298.175-1.422-.075-.125-.27-.199-.57-.349z" />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold text-base tracking-wide">CONVITE EXCLUSIVO</h3>
            <p className="text-emerald-100 text-[11px] font-medium tracking-wider">Garimpei Vip Descontos 🇪🇸</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isVerifying ? (
            <div className="flex flex-col items-center justify-center text-center py-6">
              {/* Spinner animation */}
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-[#075E54] border-r-[#075E54] animate-spin"></div>
              </div>
              <h4 className="text-zinc-800 font-bold text-lg mb-1">Verificando vagas disponíveis...</h4>
              <p className="text-zinc-500 text-xs mb-4">Aguarde um instante enquanto confirmamos sua conexão.</p>
              
              {/* Progress visual */}
              <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-[#25D366] h-full transition-all duration-150"
                  style={{ width: `${loadingStep}%` }}
                />
              </div>
              <span className="text-[#075E54] font-bold text-xs">{loadingStep}% Concluído</span>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Success Alert Header */}
              <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <CheckCircle2 className="text-[#25D366] shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-emerald-950 font-bold text-sm tracking-tight">VAGA GARANTIDA COM SUCESSO!</h4>
                  <p className="text-emerald-800 text-xs mt-0.5 leading-relaxed">
                    Você foi qualificado para entrar no grupo oficial do criador Gien Liu.
                  </p>
                </div>
              </div>

              {/* Group stats with icons */}
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-zinc-400" />
                    Membros no Grupo:
                  </span>
                  <span className="text-zinc-800 font-bold">119.824 / 120.000</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-orange-500" />
                    Vagas Restantes:
                  </span>
                  <span className="text-orange-600 font-black bg-orange-100 px-2 py-0.5 rounded-md">
                    APENAS 176 VAGAS!
                  </span>
                </div>
                
                {/* Visual live progress bar */}
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div className="w-[99.8%] h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                </div>
              </div>

              {/* Warning/Guideline info */}
              <p className="text-[#65676B] text-[11px] leading-relaxed text-center px-2">
                ⚠️ **Aviso:** Devido ao grande volume de acessos, as vagas restantes expiram rapidamente. Entre agora para garantir seu desconto de até 70% em qualquer produto.
              </p>

              {/* Mega CTA Button */}
              <button 
                onClick={() => {
                  window.open("https://chat.whatsapp.com/FgNiDCz47lA0FGAaDGdHbs?s=cl&p=i&ilr=2", "_blank");
                  onClose();
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-extrabold text-base py-4 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all cursor-pointer animate-pulse-gentle"
              >
                <div className="w-6 h-6 fill-current text-white flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.41 1.27 4.86l-1.35 4.93 5.05-1.32C8.38 21.32 9.9 22 12.004 22 17.52 22 22 17.52 22 12S17.52 2 12.004 2zM12 20.21c-1.63 0-3.14-.43-4.47-1.19l-.32-.18-2.98.78.8-2.91-.2-.32c-.82-1.31-1.27-2.84-1.27-4.43 0-4.51 3.67-8.18 8.19-8.18 4.51 0 8.18 3.67 8.18 8.18 0 4.52-3.67 8.25-8.19 8.25z" />
                  </svg>
                </div>
                <span className="text-dark-stroke">ENTRAR NO GRUPO VIP AGORA!</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
