'use client';

import Image from "next/image";
import { 
  useEffect, 
  useState, 
  useRef, 
  TouchEvent, 
  useCallback 
} from "react";
import ProductModel from "@/data/models/Product.model";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { useIsTouchDevice } from "@/data/hook/useMouseDrag";

interface ProductCarrouselProps {
  product: ProductModel;
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  rounded?: boolean;
  swipeThreshold?: number;
  gridMode?: boolean;
};

export default function ProductCarrousel({ 
  product,
  autoPlayInterval = 8000,
  showControls = true,
  showDots = true,
  className = "",
  rounded = false,
  swipeThreshold = 50,
  gridMode = false 
}: ProductCarrouselProps) {
  const [availableImages] = useState<string[]>(product.images_url || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === availableImages.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [availableImages.length, isAnimating]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev === 0 ? availableImages.length - 1 : prev - 1)
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [availableImages.length, isAnimating]);

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    };
  };

  useEffect(() => {
    if (availableImages.length <= 1 || 
      (gridMode && window.innerWidth >= 768)) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [availableImages.length, autoPlayInterval, handleNext, gridMode]);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > swipeThreshold;
    const isRightSwipe = distance < -swipeThreshold;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrevious();

    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  if (availableImages.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      <div 
        ref={containerRef}
        className={`relative w-full 
          ${gridMode ? 'md:h-auto' : 'h-[50vh]'} 
          ${!gridMode ? 'h-[50vh] lg:h-[75vh]' : ''}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`
          w-full h-full transition-all duration-300
          ${rounded ? 'rounded-2xl' : ''}
          ${gridMode 
            ? 'md:grid md:grid-cols-2 md:gap-0.5 md:overflow-visible overflow-hidden relative' 
            : 'relative overflow-hidden'
          }
        `}>
          {availableImages.map((image, index) => {
            const isHiddenInGrid = gridMode && !isExpanded && index > 3;

            return (
              <div
                key={index}
                className={`
                  absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out
                  ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                  ${gridMode ? `md:relative md:opacity-100 md:inset-auto md:z-auto 
                    md:aspect-square md:w-full md:block ${isHiddenInGrid ? 'md:hidden' : ''}` : ''}
                `}
              >
                <Image
                  src={image}
                  alt={`Produto visualização ${index + 1}`}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                  className={`object-cover ${gridMode ? 
                    'md:object-cover' : 'sm:object-contain'} 
                  `}
                />
              </div>
            );
          })}
        </div>

        {gridMode && availableImages.length > 4 && (
          <div className="hidden md:flex justify-center w-full mt-4">
            <button
              onClick={toggleExpand}
              className={`
                flex items-center gap-2 px-6 py-2 
                bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700
                rounded-full font-medium transition-colors text-sm cursor-pointer border border-gray-200
              `}
            >
              {isExpanded ? (
                <>
                  Ver menos 
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Ver mais ({availableImages.length - 4}) 
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {showControls && availableImages.length > 1 && !isTouchDevice && (
          <div className={`${gridMode ? 'md:hidden' : ''}`}>
            <button
              type="button"
              aria-label="Anterior"
              onClick={handlePrevious}
              disabled={isAnimating}
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full p-2 sm:p-4
                bg-linear-to-r from-black/40 to-transparent hover:from-black/60
                text-white transition-all disabled:opacity-0 cursor-pointer
              `}
            >
              <ChevronLeft className="w-6 h-6 drop-shadow-md hover:scale-110 transition-transform" />
            </button>
            
            <button
              type="button"
              aria-label="Próximo"
              onClick={handleNext}
              disabled={isAnimating}
              className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full p-2 sm:p-4
                bg-linear-to-l from-black/40 to-transparent hover:from-black/60
                text-white transition-all disabled:opacity-0 cursor-pointer
              `}
            >
              <ChevronRight className="w-6 h-6 drop-shadow-md hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {showDots && availableImages.length > 1 && (
          <div 
            className={`
              absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 
              bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full
              ${gridMode ? 'md:hidden' : ''}
            `}
          >
            {availableImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`
                  rounded-full transition-all duration-300 cursor-pointer shadow-sm
                  ${index === currentIndex 
                    ? 'bg-white w-6 h-1.5' 
                    : 'bg-white/50 w-1.5 h-1.5 hover:bg-white/80'}
                `}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}