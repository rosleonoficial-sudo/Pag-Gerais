import React from 'react';

export const FloatingHelpButton: React.FC = () => {
  return (
    <aside 
      id="floating-whatsapp-help"
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-2 select-none pointer-events-auto"
    >
      {/* Help Bubble Prompt */}
      <a
        href="https://wa.me/5547997785876"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden min-[380px]:flex items-center gap-2 bg-white/95 backdrop-blur-md text-zinc-800 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] border border-emerald-300 hover:bg-emerald-50 transition-all duration-200 cursor-pointer group"
      >
        <span className="inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shrink-0"></span>
        <span className="text-zinc-800 group-hover:text-emerald-700 font-bold whitespace-nowrap">
          Dúvidas? Fale comigo!
        </span>
      </a>

      {/* Main WhatsApp Floating Button */}
      <a
        href="https://wa.me/5547997785876"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp: 47 99778-5876"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] transition-all duration-300 cursor-pointer border-2 border-white/90"
      >
        {/* WhatsApp Official Vector Logo */}
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-white shrink-0 drop-shadow-md z-10 transition-transform duration-300 group-hover:scale-110" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.852-4.386 9.855-9.775.002-2.611-1.013-5.065-2.859-6.91-1.845-1.847-4.3-2.864-6.912-2.865-5.44 0-9.856 4.385-9.86 9.776-.001 1.916.499 3.79 1.447 5.4l-.94 3.43 3.519-.918zM17.487 14.39c-.3-.149-1.772-.874-2.042-.973-.27-.099-.467-.149-.662.149-.195.297-.756.973-.927 1.171-.171.197-.341.221-.641.073-.3-.149-1.265-.466-2.41-1.487-.891-.795-1.493-1.778-1.668-2.076-.175-.297-.019-.458.13-.606.134-.133.3-.347.45-.52.149-.174.199-.297.299-.496.099-.198.05-.372-.025-.521-.075-.149-.662-1.595-.908-2.189-.24-.578-.48-.5-.662-.51-.17-.008-.367-.01-.563-.01-.197 0-.518.074-.789.372-.27.297-1.03 1.011-1.03 2.463 0 1.453 1.056 2.858 1.203 3.056.149.198 2.078 3.175 5.037 4.453.704.304 1.253.486 1.68.621.71.224 1.354.193 1.864.118.57-.085 1.771-.724 2.022-1.423.25-.699.25-1.298.175-1.422-.075-.125-.27-.199-.57-.349z" />
        </svg>

        {/* Small "Ajuda" Badge */}
        <span className="absolute -top-1.5 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white shadow-sm z-20 uppercase tracking-tighter">
          Ajuda
        </span>
      </a>
    </aside>
  );
};

export default FloatingHelpButton;
