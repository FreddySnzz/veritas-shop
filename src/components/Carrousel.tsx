import { useEffect, useState, useRef, TouchEvent } from "react";
import Image from "next/image";
import { dataImages } from "@/data/constants/productsImages";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  rounded?: boolean;
  swipeThreshold?: number;
}

const ImageCarousel = ({ 
  autoPlayInterval = 10000,
  showControls = true,
  showDots = true,
  className = "",
  rounded = false,
  swipeThreshold = 50
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const availableImages = dataImages.filter(img => img.available);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (availableImages.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === availableImages.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlayInterval, availableImages.length]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? availableImages.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === availableImages.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > swipeThreshold;
    const isRightSwipe = distance < -swipeThreshold;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div 
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${rounded ? 'rounded-2xl' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          {availableImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-b from-secondary/70 via-transparent to-transparent pointer-events-none" />
              <Image
                src={image.url}
                alt={`Slide ${index + 1}`}
                fill 
                className="object-cover lg:object-contain pointer-events-none select-none"
                priority={index === 0} 
                draggable={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
              
              {/* <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" /> */}
            </div>
          ))}
        </div>

        {showControls && availableImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              disabled={isAnimating}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-stone-400/30 backdrop-blur-md hover:bg-white/30 text-white hover:text-secondary p-2 sm:p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-stone-400/30 backdrop-blur-md hover:bg-white/30 text-white hover:text-secondary p-2 sm:p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {showDots && availableImages.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            {availableImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed cursor-pointer ${
                  index === currentIndex
                    ? 'bg-white w-6 sm:w-8 h-1.5 sm:h-2'
                    : 'bg-white/40 hover:bg-white/60 w-1.5 sm:w-2 h-1.5 sm:h-2'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;