import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OFFERS = [
  { id: 1, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725032/1.png", title: "Oferta Publicada 1" },
  { id: 2, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725032/10.png", title: "Oferta Publicada 2" },
  { id: 3, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725032/11.png", title: "Oferta Publicada 3" },
  { id: 4, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725032/12.png", title: "Oferta Publicada 4" },
  { id: 5, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725032/4.png", title: "Oferta Publicada 5" },
  { id: 6, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725033/3.png", title: "Oferta Publicada 6" },
  { id: 7, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725033/2.png", title: "Oferta Publicada 7" },
  { id: 8, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725033/5.png", title: "Oferta Publicada 8" },
  { id: 9, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725033/6.png", title: "Oferta Publicada 9" },
  { id: 10, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725033/13.png", title: "Oferta Publicada 10" },
  { id: 11, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725033/9.png", title: "Oferta Publicada 11" },
  { id: 12, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725034/7.png", title: "Oferta Publicada 12" },
  { id: 13, src: "https://res.cloudinary.com/jfqsykts/image/upload/v1786725034/8.png", title: "Oferta Publicada 13" },
];

export const PastOffersCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const cardWidth = clientWidth * 0.76;
    const newIndex = Math.round(scrollLeft / (cardWidth || 280));
    setActiveIndex(Math.min(Math.max(newIndex, 0), OFFERS.length - 1));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleScrollToButtons = () => {
    const el = document.getElementById('action-buttons');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 select-none">
      {/* Title & Description */}
      <div className="text-center mb-4 sm:mb-5">
        <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-zinc-950 tracking-tight leading-tight mb-1.5">
          🔥 Ofertas que já passaram pelos grupos
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 font-medium max-w-xl mx-auto leading-normal">
          Preços reais já publicados — <strong className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">e algumas ofertas podem ficar ainda mais baratas!</strong>
        </p>
      </div>

      {/* Carousel Track */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label="Anterior"
            className="flex absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 shadow-lg border border-zinc-300 items-center justify-center text-zinc-800 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        )}

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            aria-label="Próximo"
            className="flex absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 shadow-lg border border-zinc-300 items-center justify-center text-zinc-800 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        )}

        {/* Scroll Snap Track */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-1 px-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {OFFERS.map((offer, index) => (
            <div
              key={offer.id}
              onClick={handleScrollToButtons}
              className="w-[80%] min-[400px]:w-[76%] sm:w-[280px] md:w-[320px] shrink-0 snap-start bg-white rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
            >
              <div className="w-full relative bg-zinc-50 overflow-hidden rounded-2xl">
                <img
                  src={offer.src}
                  alt={offer.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discrete Drag Instruction Hint */}
      <div className="text-center mt-2.5">
        <span className="text-[11px] sm:text-xs font-medium text-zinc-400 tracking-wide select-none">
          ← Arraste para ver mais →
        </span>
      </div>

      {/* Dots Progress Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {OFFERS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!scrollRef.current) return;
              const cardWidth = scrollRef.current.clientWidth * 0.76;
              scrollRef.current.scrollTo({
                left: i * cardWidth,
                behavior: 'smooth'
              });
            }}
            aria-label={`Ir para oferta ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === activeIndex
                ? 'w-5 h-1.5 bg-emerald-500'
                : 'w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PastOffersCarousel;
