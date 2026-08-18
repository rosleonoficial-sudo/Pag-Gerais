import React from "react";

interface GroupCTAButtonProps {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  subtext?: string;
}

export default function GroupCTAButton({ text, onClick, className = "", subtext }: GroupCTAButtonProps) {
  return (
    <div className={`w-full max-w-md mx-auto px-4 flex flex-col items-center text-center ${className}`}>
      <button
        onClick={onClick}
        className="group w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer outline-none relative overflow-hidden text-[13px] min-[390px]:text-sm sm:text-lg md:text-xl animate-pulse-gentle"
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
        
        <span className="tracking-wide uppercase font-black text-dark-stroke z-10">{text}</span>
      </button>

      {subtext && (
        <div className="flex items-center justify-center gap-1.5 mt-3 text-xs sm:text-sm font-bold text-zinc-800 select-none">
          <span role="img" aria-label="warning" className="text-base">🚨</span>
          <span className="uppercase tracking-wide">{subtext}</span>
        </div>
      )}
    </div>
  );
}
