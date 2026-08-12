'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/data/context/AppContext";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { 
  BookOpenText, 
  CircleQuestionMark, 
  Home, 
  LogOut, 
  Package, 
  User, 
} from "lucide-react";
import { PiHandsPrayingFill } from "react-icons/pi";
import { RosaryIcon } from "./icons/RosaryIcon";
import { ThemeToggleSwitch } from "./buttons/ThemeToggleSwitch";
import { useAuth } from "@/data/context/AuthContext";
import { FaBookBible } from "react-icons/fa6";

export default function Menu() {
  const { isMenuOpen, closeMenu } = useApp();
  const { user, logout } = useAuth();
  const userName = user?.name.split(' ');
  const router = useRouter();
  useLockBodyScroll(isMenuOpen);

  const redirectProfile = () => {
    if (!user) {
      router.push('/login');
      closeMenu();
    };

    if (user?.role === 'user') {
      router.push('/me');
      closeMenu();
    } else if (user?.role === 'admin') {
      router.push('/admin');
      closeMenu();
    };
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    router.push('/login');
  };

  return (
    <>
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-transparent transition-opacity duration-300 font-sans invisible`}
      />
      <div
        className={`fixed top-14 left-0 h-full w-full sm:w-[40%] md:w-[35%] lg:w-[25%] xl:w-[20%]
          transform transition-transform duration-300 ease-in-out flex flex-col
          bg-white text-secondary dark:bg-zinc-900 dark:text-background-alternative-v2 font-sans
          ${ isMenuOpen ? "translate-y-0" : "-translate-x-full"} cursor-default
        `}
      >
        <div className="flex flex-col justify-between h-[90vh] p-6 font-medium">
          <div className="flex flex-col gap-2">
            <Link 
              title="Voltar para a página inicial"
              aria-label="Voltar para a página inicial"
              href="/"
              onClick={closeMenu}
              className="flex items-center w-fit gap-2 cursor-pointer transition-colors hover:text-primary dark:hover:text-details"
            >
              <Home className="w-5 h-5" />
              <p>Página Inicial</p>
            </Link>
            <Link
              title="Ir para a página de produtos"
              aria-label="Ir para a página de produtos"
              href="/produtos"
              onClick={closeMenu}
              className="flex items-center w-fit gap-2 cursor-pointer transition-colors hover:text-primary dark:hover:text-details"
            >
              <RosaryIcon className="w-5 h-5" />
              <p>Produtos</p>
            </Link>
            <Link 
              title="Ir para a página de pedidos"
              aria-label="Ir para a página de pedidos"
              href="/me/pedidos"
              onClick={closeMenu}
              className="flex items-center w-fit gap-2 cursor-pointer transition-colors hover:text-primary dark:hover:text-details"
            >
              <Package className="w-5 h-5" />
              <p>Pedidos</p>
            </Link>
            <Link
              title="Ir para a página de orações"
              aria-label="Ir para a página de orações"
              href="/ajuda/oracoes"
              onClick={closeMenu}
              className="flex items-center w-fit gap-2 cursor-pointer transition-colors hover:text-primary dark:hover:text-details"
            >
              <PiHandsPrayingFill className="w-5 h-5" />
              <p>Orações</p>
            </Link>
            <Link
              title="Ir para a Bíblia"
              aria-label="Ir para a Bíblia"
              href="/ajuda/biblia"
              onClick={closeMenu}
              className="flex items-center w-fit gap-2 cursor-pointer transition-colors hover:text-primary dark:hover:text-details"
            >
              <FaBookBible className="w-5 h-5" />
              <p>Bíblia</p>
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <ThemeToggleSwitch />
            <Link 
              title="Mais informações sobre nós"
              aria-label="Mais informações sobre nós"
              href="/ajuda/sobre"
              onClick={closeMenu}
              className="flex items-center w-fit gap-4 cursor-pointer transition-colors hover:text-primary dark:hover:text-details mt-2">
              <BookOpenText className="w-5 h-5" />
              <p>Sobre nós</p>
            </Link>
            <Link 
              title="Ir para a página de ajuda"
              aria-label="Ir para a página de ajuda"
              href="/ajuda"
              onClick={closeMenu}
              className="flex items-center w-fit gap-4 cursor-pointer transition-colors hover:text-primary dark:hover:text-details"
            >
              <CircleQuestionMark className="w-5 h-5" />
              <p>Precisa de ajuda?</p>
            </Link>

            <hr className="border-muted-foreground/50 my-2" />
            <div className="flex items-center justify-between transition-all">
              <button 
                type="button"
                onClick={redirectProfile}
                aria-label={user ? "" : "Entrar na minha conta"}
                title={user ? "" : "Entrar na minha conta"}
                className={"flex items-center gap-4 transition-colors cursor-pointer hover:text-primary dark:hover:text-details"}
              >
                {!user ? <User className="w-5 h-5" /> : "" }
                <p>{userName ? `Olá, ${userName[0]} ${userName[userName.length - 1]}!` : 'Entrar na minha conta'}</p>
              </button>
              { user && (
                <button 
                  type="button"
                  onClick={handleLogout}
                  aria-label="Sair"
                  title="Sair"
                  className="cursor-pointer hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};