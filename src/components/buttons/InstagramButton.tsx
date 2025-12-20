'use client';

import openLinkOnButton from "@/data/functions/openNewWindowButton";

interface InstagramButtonProps {
  className?: string;
}

export function InstagramButton({ className }: InstagramButtonProps) {
  return (
    <button 
      onClick={() => openLinkOnButton('https://www.instagram.com/veritas_atelie')} 
      className={`font-sans text-secondary cursor-pointer ${className}`}
    >
      @veritas_atelie
    </button>
  );
}