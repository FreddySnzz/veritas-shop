import { useEffect, useRef, useState } from "react";

function checkTouchSupport(): boolean {
  return (
    typeof window !== "undefined" &&
    (
      "ontouchstart" in window ||
      (navigator.maxTouchPoints ?? 0) > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    )
  );
}

export function useMouseDrag(quantity: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragLeft, setDragLeft] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const contentWidth = containerRef.current.scrollWidth
      setDragLeft(containerWidth - contentWidth)
    }
  }, [quantity])

  return { dragLeft, containerRef }
};

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(checkTouchSupport());
    const handleResize = () => setIsTouch(checkTouchSupport());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTouch;
}
