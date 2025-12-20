'use client';

import FlowerIcon from "./icons/FlowerIcon";
import Link from "next/link";
import { CartButton } from "./CartButton";
import { useState } from "react";
import Sidebar from "./Sidebar";

export function Header() {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between mx-auto px-4 py-4">
        <Link href="/" className="relative flex gap-2">
          <div className="flex items-center gap-2">
            <FlowerIcon
              width={40} 
              height={40} 
              color="var(--color-secondary)"
            />
              <h1 className="text-2xl font-playfair-display font-black text-secondary">
                VERITAS
              </h1>
          </div>
          <div className="absolute right-[-55] top-[0.8rem] ">
            <h1 className="font-sans font-medium text-secondary">
              ATELIÊ
            </h1>
          </div>
        </Link>

        <CartButton isOpen={toggleExpanded} />
        <Sidebar open={expanded} onClose={() => setExpanded(false)} />

      </div>
    </header>
  );
}