import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OFFERS = [
  { id: 1, src: "/images/13.webp", title: "Caixa de Som Boombox Aiwa" },
  { id: 2, src: "/images/4.webp", title: "Tênis Nike Uplift SC" },
  { id: 3, src: "/images/1.webp", title: "Whey Protein Max Titanium" },
  { id: 4, src: "/images/12.webp", title: "Smart TV Philips 50\" 4K" },
  { id: 5, src: "/images/7.webp", title: "Caixa de Som LG XBOOM" },
  { id: 6, src: "/images/6.webp", title: "Tênis Puma Flyer Runner" },
  { id: 7, src: "/images/0001 (1).webp", title: "Perfume 212 Men Carolina Herrera" },
  { id: 8, src: "/images/3.webp", title: "Kit 2 Whey Protein XPro" },
  { id: 9, src: "/images/8.webp", title: "Caixa de Som JBL Partybox" },
  { id: 10, src: "/images/5.webp", title: "Tênis Olympikus Voa 3" },
  { id: 11, src: "/images/0001 (2).webp", title: "Bicicleta Elétrica Altrax" },
  { id: 12, src: "/images/9.webp", title: "Caixa de Som JBL Boombox" },
  { id: 13, src: "/images/0001 (3).webp", title: "Tênis Adidas Adizero Drive RC" },
  { id: 14, src: "/images/11.webp", title: "Ar-condicionado Split Inverter" },
  { id: 15, src: "/images/0001 (4).webp", title: "Tênis Nike Uplift Masculino" },
];

export const PastOffersCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth, children } = scrollRef.current;
    
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);

    const containerLeft = scrollRef.current.offsetLeft;
    let closestIndex = 0;
    let minDiff = Infinity;

    Array.from(children).forEach((child, index) => {
      const el = child as HTMLElement;
      const childRelativeLeft = el.offsetLeft - containerLeft;
      const diff = Math.abs(childRelativeLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const children = Array.from(scrollRef.current.children);
    const targetIndex = Math.max(0, Math.min(index, children.length - 1));
    const targetCard = children[targetIndex] as HTMLElement;

    if (targetCard) {
      const containerLeft = scrollRef.current.offsetLeft;
      const targetLeft = targetCard.offsetLeft - containerLeft;
      scrollRef.current.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      scrollToCard(activeIndex - 1);
    } else {
      scrollToCard(activeIndex + 1);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
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
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-1 px-1 pr-6 sm:pr-12 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] cursor-grab active:cursor-grabbing"
        >
          {OFFERS.map((offer, index) => (
            <div
              key={offer.id}
              onClick={handleCardClick}
              className="w-[80%] min-[400px]:w-[76%] sm:w-[280px] md:w-[320px] shrink-0 snap-start bg-white rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
            >
              <div className="w-full relative bg-zinc-50 overflow-hidden rounded-2xl">
                <img
                  src={offer.src}
                  alt={offer.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 pointer-events-none"
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
    </section>
  );
};

export default PastOffersCarousel;
