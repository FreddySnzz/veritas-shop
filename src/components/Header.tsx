'use client';

import Link from "next/link";
import Image from "next/image";
import FlowerIcon from "./icons/FlowerIcon";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Searchbar from "./Searchbar";
import { CartButton } from "./buttons/CartButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { useAuth } from "@/data/context/AuthContext";
import { useApp } from "@/data/context/AppContext";
import { MenuIcon } from "./icons/MenuIcon";
import { useTheme } from "next-themes";

interface HeaderProps {
  mode: 'admin' | 'user' | 'cart';
  search?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
};

export function Header({ mode, search, data }: HeaderProps) {
  const { logout } = useAuth();
  const { toggleSidebar, toggleMenu, isMenuOpen } = useApp();
  const { theme } = useTheme();

  return (
    <header className={`${theme} fixed top-0 z-50 w-screen
      bg-white text-secondary dark:bg-zinc-900 dark:text-background-alternative-v2`}
    >
      <div className="flex items-center justify-between mx-auto px-4 md:px-8 lg:px-12 py-2">
        {/* TODO: Ocultar no desktop? */}
        <div className="pr-2 ml-auto cursor-pointer w-10">
          <MenuIcon 
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu} 
          />
          <Menu />
        </div>

        <Link 
          aria-label="Voltar para a página inicial"
          title="Voltar para a página inicial"
          href="/" 
          className="relative flex gap-2 w-full"
        >
          <div className="flex items-center gap-2">
            <FlowerIcon
              width={65} 
              height={40} 
              color={ theme === 'dark' ? "var(--color-background-alternative-v2)" : "var(--color-secondary)" }
            />
            <Image
              src={ theme === 'dark' ? "/logo-w-alt.svg" : "/logo-w.svg" }
              alt="Logo Veritas"
              width={130}
              height={40}
              loading="eager"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex justify-end items-center gap-2 w-[60%]">
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