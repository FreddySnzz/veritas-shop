'use client';

import Link from "next/link";

interface InstagramButtonProps {
  className?: string;
};

export function InstagramButton({ className }: InstagramButtonProps) {
  return (
    <Link
      href="https://www.instagram.com/veritas_atelie"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className={`font-sans text-secondary cursor-pointer ${className}`}>
        @veritas_atelie
      </button>
    </Link>
  );
};