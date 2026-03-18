'use client';

import Image from "next/image";
import { useEffect, useState, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CatalogImageModel from "@/data/models/CatalogImage.model";

interface CatalogCarrouselProps {
  images: CatalogImageModel[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  rounded?: boolean;
  swipeThreshold?: number;
};

export default function CatalogCarrousel({ 
  images,
  autoPlayInterval = 10000,
  showControls = true,
  showDots = true,
  className = "",
  rounded = false,
  swipeThreshold = 50
}: CatalogCarrouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    };
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    };
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > swipeThreshold;
    const isRightSwipe = distance < -swipeThreshold;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    };

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={`w-full h-[30vh] ${className}`}>
      <div 
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${rounded ? 'rounded-2xl' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 pointer-events-none" />
              <Image
                src={image.image_url || ''}
                alt={`Slide ${index + 1}`}
                fill 
                loading="eager"
                className="object-cover lg:object-contain pointer-events-none select-none"
                priority={index === 0} 
                draggable={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {showControls && images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              title="Imagem anterior"
              onClick={handlePrevious}
              disabled={isAnimating}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 
                bg-linear-to-l from-transparent to-black/30 hover:to-black/60 text-white p-2 sm:p-3 
                h-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer
              `}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              type="button"
              aria-label="Imagem seguinte"
              title="Imagem seguinte"
              onClick={handleNext}
              disabled={isAnimating}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 
                bg-linear-to-r from-transparent to-black/30 hover:to-black/60 text-white p-2 sm:p-3 
                h-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer
              `}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {showDots && images.length > 1 && (
          <div 
            className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 
              bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
            `}
          >
            {images.map((_, index) => (
              <button
                type="button"
                aria-label={`Ver imagem ${index + 1}`}
                title={`Ver imagem ${index + 1}`}
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed cursor-pointer ${
                  index === currentIndex
                    ? 'bg-white w-6 sm:w-8 h-1.5 sm:h-2'
                    : 'bg-white/40 hover:bg-white/60 w-1.5 sm:w-2 h-1.5 sm:h-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};