'use client';

import FlowerIcon from "./icons/FlowerIcon";
import Link from "next/link";
import { CartButton } from "./buttons/CartButton";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { LogoutButton } from "./buttons/LogoutButton";
import { useAuth } from "@/data/context/AuthContext";

interface HeaderProps {
  mode: 'admin' | 'user';
}

export function Header({ mode }: HeaderProps) {
  const { logout } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <header className="bg-white fixed top-0 z-50 w-screen">
      <div className="flex items-center justify-between mx-auto px-4 md:px-8 py-2">
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

        { mode === 'user' ? 
          <CartButton isOpen={toggleExpanded} /> : 
          <LogoutButton onClick={() => logout()} /> 
        }

        <Sidebar open={expanded} onClose={() => setExpanded(false)} />

      </div>
    </header>
  );
}