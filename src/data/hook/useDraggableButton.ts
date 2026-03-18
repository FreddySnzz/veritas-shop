import { useEffect, useRef, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

type UseDraggableButtonOptions = {
  margin?: number;
  bottomOffset?: number;
  onClick?: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSafeInitialPosition(
  elementWidth: number,
  elementHeight: number,
  margin: number,
  bottomOffset: number
): Position {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const x = screenWidth - elementWidth - margin;
  const y = screenHeight - elementHeight - margin - bottomOffset;

  return {
    x: Math.max(margin, x),
    y: Math.max(margin, y),
  };
}

export function useDraggableButton(options?: UseDraggableButtonOptions) {
  const { margin = 12, bottomOffset = 80, onClick } = options || {};

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [isReady, setIsReady] = useState(false);

  const dragDataRef = useRef({
    startPointerX: 0,
    startPointerY: 0,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const hasUserMovedRef = useRef(false);

  useEffect(() => {
    if (!buttonRef.current) return;

    const updateInitialOrClampedPosition = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      if (!hasUserMovedRef.current) {
        const safePosition = getSafeInitialPosition(
          rect.width,
          rect.height,
          margin,
          bottomOffset
        );

        setPosition(safePosition);
      } else {
        setPosition((prev) => ({
          x: clamp(prev.x, margin, maxX - margin),
          y: clamp(prev.y, margin, maxY - margin),
        }));
      }

      setIsReady(true);
    };

    updateInitialOrClampedPosition();
    window.addEventListener('resize', updateInitialOrClampedPosition);

    return () => {
      window.removeEventListener('resize', updateInitialOrClampedPosition);
    };
  }, [margin, bottomOffset]);

  const startDrag = (clientX: number, clientY: number) => {
    dragDataRef.current = {
      startPointerX: clientX,
      startPointerY: clientY,
      startX: position.x,
      startY: position.y,
      moved: false,
    };

    setDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const touch = e.touches[0];
    if (!touch) return;

    startDrag(touch.clientX, touch.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    startDrag(e.clientX, e.clientY);
  };

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      if (!dragging || !buttonRef.current) return;

      const dx = clientX - dragDataRef.current.startPointerX;
      const dy = clientY - dragDataRef.current.startPointerY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        dragDataRef.current.moved = true;
        hasUserMovedRef.current = true;
      }

      const rect = buttonRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      const nextX = clamp(
        dragDataRef.current.startX + dx,
        margin,
        maxX - margin
      );

      const nextY = clamp(
        dragDataRef.current.startY + dy,
        margin,
        maxY - margin
      );

      setPosition({
        x: nextX,
        y: nextY,
      });
    };

    const finishDrag = () => {
      if (!dragging || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;

      const centerX = position.x + rect.width / 2;
      const screenCenter = window.innerWidth / 2;

      const snappedX = centerX < screenCenter ? margin : maxX - margin;

      setPosition((prev) => ({
        x: clamp(snappedX, margin, maxX - margin),
        y: prev.y,
      }));

      setDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging) return;

      const touch = e.touches[0];
      if (!touch) return;

      updatePosition(touch.clientX, touch.clientY);
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchEnd = () => {
      finishDrag();
    };

    const handleMouseUp = () => {
      finishDrag();
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, margin, position.x]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (dragDataRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragDataRef.current.moved = false;
      return;
    }

    onClick?.();
  };

  return {
    buttonRef,
    position,
    dragging,
    isTouchDevice,
    isReady,
    onTouchStart: handleTouchStart,
    onMouseDown: handleMouseDown,
    onClick: handleClick,
  };
}