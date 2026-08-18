import React from "react";

export default function ReviewList() {
  const OFFICIAL_TESTIMONIAL_IMAGE = "https://i.postimg.cc/J0Z8SBmP/5114002286903496041.jpg";

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Official Testimonials Image Container */}
      <div 
        id="official-testimonials-container"
        className="w-[75%] max-w-[432px] mx-auto bg-white rounded-3xl border border-zinc-300 overflow-hidden shadow-2xl p-1 sm:p-2 transition-all duration-300"
      >
        <img 
          src={OFFICIAL_TESTIMONIAL_IMAGE} 
          alt="Depoimentos de seguidores e inscritos - ROSLEON"
          className="w-full h-auto block rounded-2xl shadow-sm object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
