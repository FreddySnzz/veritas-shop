'use client';

import Image from "next/image";
import { useEffect, useState, useRef, TouchEvent, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CatalogImageModel from "@/data/models/CatalogImage.model";
import { cn } from "@/lib/utils";

interface CatalogCarrouselProps {
  images: CatalogImageModel[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
  rounded?: boolean;
  swipeThreshold?: number;
  transitionDuration?: number;
};

export default function CatalogCarrousel({ 
  images,
  autoPlayInterval = 10000,
  showControls = true,
  showDots = true,
  className = "",
  rounded = false,
  swipeThreshold = 50,
  transitionDuration = 500
}: CatalogCarrouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useCallback((direction: 'next' | 'prev' | number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (typeof direction === 'number') {
      setCurrentIndex(direction);
    } else if (direction === 'next') {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, images.length, transitionDuration]);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      navigate('next');
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval, isPaused, navigate]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    if (distance > swipeThreshold) navigate('next');
    else if (distance < -swipeThreshold) navigate('prev');
  };

  if (!images?.length) return null;

  return (
    <div 
      className={cn("w-full h-[30vh]", className)}
      role="region" 
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden",
          rounded && "rounded-2xl"
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div
                key={image.id}
                style={{ transitionDuration: `${transitionDuration}ms` }}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity ease-in-out",
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                )}
                aria-hidden={!isActive}
              >
                <div className="absolute inset-0 pointer-events-none" />
                <Image
                  src={image.image_url || ''}
                  alt={image.desc || `Slide ${index + 1}`}
                  fill 
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0} 
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover lg:object-contain pointer-events-none select-none"
                />
              </div>
            );
          })}
        </div>

        {showControls && images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full p-2 sm:p-3",
                "bg-linear-to-l from-transparent to-black/40 hover:to-black/60",
                "text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              )}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              type="button"
              aria-label="Imagem seguinte"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full p-2 sm:p-3",
                "bg-linear-to-r from-transparent to-black/15 hover:to-black/30",
                "text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
              )}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {showDots && images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para a imagem ${index + 1}`}
                aria-current={index === currentIndex}
                onClick={() => navigate(index)}
                disabled={isAnimating}
                className={cn(
                  "transition-all duration-300 rounded-full disabled:cursor-not-allowed cursor-pointer",
                  index === currentIndex
                    ? "bg-white w-6 sm:w-8 h-1.5 sm:h-2"
                    : "bg-white/40 hover:bg-white/60 w-1.5 sm:w-2 h-1.5 sm:h-2"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};