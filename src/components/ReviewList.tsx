import React, { useState, useEffect, useRef } from "react";

export default function ReviewList() {
  const POSTIMG_URL = "https://i.postimg.cc/D0mYcVj9/Screenshot-2026-09-26-21-43-32-057-com-instagram-android.jpg";

  // Ordem de carregamento otimizada para máxima velocidade e confiabilidade:
  // 1. Imagem local no projeto (se existir ou após salvar)
  // 2. URL fornecida pelo usuário no Postimages
  // 3. Espelho CDN direto
  const CANDIDATES = [
    "/images/depoimentos.webp",
    POSTIMG_URL,
    "https://i.postimg.cc/HYtDddQk/Screenshot-2026-09-26-21-43-32-057-com-instagram-android.jpg",
    "/images/depoimentos.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Carrega instantaneamente do cache local se já tiver sido compactado anteriormente
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rosleon_depoimentos_cached");
      if (saved && saved.startsWith("data:image/")) {
        setCachedSrc(saved);
      }
    } catch {
      // Ignora erro de acesso ao localStorage
    }
  }, []);

  const handleError = () => {
    if (cachedSrc) {
      // Se falhou o cache antigo, remove e tenta os links remotos
      setCachedSrc(null);
      try {
        localStorage.removeItem("rosleon_depoimentos_cached");
      } catch {
        // noop
      }
      return;
    }
    if (currentIndex < CANDIDATES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Quando a imagem carrega com sucesso, compacta em WebP e salva no cache local + servidor
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (cachedSrc) return; // Já está compactada e em cache

    const img = e.currentTarget;
    try {
      // Cria um canvas para redimensionar/comprimir em WebP rápido
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx || !img.naturalWidth) return;

      // Mantém proporção e resolução nítida limitando largura a no máximo 720px
      const scale = img.naturalWidth > 720 ? 720 / img.naturalWidth : 1;
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const webpData = canvas.toDataURL("image/webp", 0.85);

      // Salva no localStorage para carregamento ultra rápido (0ms) nas próximas visitas
      try {
        localStorage.setItem("rosleon_depoimentos_cached", webpData);
      } catch {
        // Cota de localStorage excedida
      }

      // Envia para o servidor Vite salvar permanentemente em /public/images/depoimentos.webp
      fetch("/api/cache-depoimentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: webpData })
      }).catch(() => {
        // Ambiente de produção estático ou offline
      });
    } catch {
      // Se houver restrição CORS de canvas, a imagem continua sendo exibida normalmente
    }
  };

  const imageSource = cachedSrc || CANDIDATES[currentIndex];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Official Testimonials Image Container */}
      <div 
        id="official-testimonials-container"
        className="w-[75%] max-w-[432px] mx-auto bg-white rounded-3xl border border-zinc-300 overflow-hidden shadow-2xl p-1 sm:p-2 transition-all duration-300"
      >
        <img 
          ref={imgRef}
          src={imageSource} 
          alt="Depoimentos de seguidores e inscritos - ROSLEON"
          className="w-full h-auto block rounded-2xl shadow-sm object-contain"
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
