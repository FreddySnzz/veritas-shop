import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function checkTouchSupport(): boolean {
  if (typeof window === "undefined") return false;
  
  return (
    "ontouchstart" in window ||
    (navigator.maxTouchPoints ?? 0) > 0 ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).msMaxTouchPoints > 0
  );
};

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  window.addEventListener("orientationchange", callback); 
  
  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
  };
}

function getSnapshot() {
  return checkTouchSupport();
};

function getServerSnapshot() {
  return false; 
};

export function useIsTouchDevice() {
  const isTouch = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return isTouch;
};

export function useMouseDrag(quantity: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragLeft, setDragLeft] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth;
      setDragLeft(Math.min(0, containerWidth - contentWidth)); 
    }
  }, [quantity]);

  return { dragLeft, containerRef };
};