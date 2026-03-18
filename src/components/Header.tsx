'use client';

import Link from "next/link";
import FlowerIcon from "./icons/FlowerIcon";
import { CartButton } from "./buttons/CartButton";
import Sidebar from "./Sidebar";
import { LogoutButton } from "./buttons/LogoutButton";
import { useAuth } from "@/data/context/AuthContext";
import { useApp } from "@/data/context/AppContext";
import Searchbar from "./Searchbar";
import Image from "next/image";

interface HeaderProps {
  mode: 'admin' | 'user' | 'cart';
  search?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
};

export function Header({ mode, search, data }: HeaderProps) {
  const { logout } = useAuth();
  const { toggleSidebar } = useApp();

  return (
    <header className="bg-white fixed top-0 z-50 w-screen">
      <div className="flex items-center justify-between mx-auto px-4 md:px-8 lg:px-12 py-2">
        <Link 
          aria-label="Voltar para a página inicial"
          title="Voltar para a página inicial"
          href="/" 
          className="relative flex gap-2"
        >
          <div className="flex items-center gap-2">
            <FlowerIcon
              width={40} 
              height={40} 
              color="var(--color-secondary)"
            />
            <Image
              src="/logo-w.svg"
              alt="Logo Veritas"
              width={130}
              height={40}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex justify-end items-center gap-2 w-[60%]">
          {/* <div className="flex items-center justify-center"> // TODO: theme provider
            <Sun className="w-6 h-6 text-secondary" />
            <Moon className="w-6 h-6 text-secondary" />
          </div> */}

          {search && data &&
            <Searchbar
              searchbarPlaceholder="Pesquisar produtos"
              data={data}
            />
          }

          {mode === 'user' && 
            <CartButton isOpen={toggleSidebar} />
          }

          {mode === 'admin' && 
            <LogoutButton onClick={() => logout()} /> 
          }
        </div>

        <Sidebar />
      </div>
    </header>
  );
}