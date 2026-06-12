'use client';

import { useRouter } from "next/navigation";
import { useApp } from "@/data/context/AppContext";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { 
  BookOpenText, 
  CircleQuestionMark, 
  Home, 
  Package, 
  Palette, 
  ShieldUser 
} from "lucide-react";
import { PiHandsPrayingFill } from "react-icons/pi";
import { RosaryIcon } from "./icons/RosaryIcon";
import { toast } from "sonner";
import { useTheme } from "next-themes";
// import { FaRecycle } from "react-icons/fa6";

export default function Menu() {
  const { isMenuOpen, closeMenu } = useApp();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  useLockBodyScroll(isMenuOpen);

  return (
    <>
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-transparent transition-opacity duration-300 font-sans invisible`}
      />
      <div
        className={`${theme} fixed top-14 left-0 h-full w-full sm:w-100 md:w-112.5 lg:w-125
          transform transition-transform duration-300 ease-in-out flex flex-col
          bg-white text-secondary dark:bg-zinc-900 dark:text-background-alternative-v2 font-sans
          ${ isMenuOpen ? "translate-y-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col justify-between h-[90vh] p-6 font-medium">
          <div className="flex flex-col gap-2">
            <button 
              type="button"
              onClick={() => {router.push("/"), closeMenu()}}
              aria-label="Voltar para a página inicial"
              title="Voltar para a página inicial"
              className="flex items-center gap-2 cursor-pointer transition-colors dark:hover:text-zinc-400"
            >
              <Home className="w-5 h-5" />
              <p>Página Inicial</p>
            </button>
            <button
              type="button"
              onClick={() => toast.warning("Em breve!")}
              // onClick={() => {router.push("/produtos"), closeMenu()}}
              aria-label="Ir para a página de produtos"
              title="Ir para a página de produtos"
              className="flex items-center gap-2 cursor-pointer transition-colors dark:hover:text-zinc-400"
            >
              <RosaryIcon  className="w-5 h-5" />
              <p>Produtos</p>
            </button>
            <button
              type="button"
              onClick={() => toast.warning("Em breve!")}
              // onClick={() => {router.push("/pedidos"), closeMenu()}}
              aria-label="Ir para a página de pedidos"
              title="Ir para a página de pedidos"
              className="flex items-center gap-2 cursor-pointer transition-colors dark:hover:text-zinc-400"
            >
              <Package className="w-5 h-5" />
              <p>Pedidos</p>
            </button>
            <button
              type="button"
              onClick={() => {router.push("/ajuda/oracoes"), closeMenu()}}
              aria-label="Ir para a página de orações"
              title="Ir para a página de orações"
              className="flex items-center gap-2 cursor-pointer transition-colors dark:hover:text-zinc-400"
            >
              <PiHandsPrayingFill className="w-5 h-5" />
              <p>Página de Orações</p>
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Contato"
              title="Contato"
              className="flex items-center gap-4 cursor-pointer transition-colors dark:hover:text-zinc-400"
            >
              <Palette className="w-5 h-5" />
              <p>Alterar Tema</p>
            </button>
            <button 
              type="button"
              onClick={() => {router.push("/ajuda"), closeMenu()}}
              aria-label="Ir para a página de ajuda"
              title="Ir para a página de ajuda"
              className="flex items-center gap-4 cursor-pointer transition-colors dark:hover:text-zinc-400"
            >
              <CircleQuestionMark className="w-5 h-5" />
              <p>Podemos ajudar?</p>
            </button>
            <button 
              type="button"
              onClick={() => {router.push("/ajuda/sobre"), closeMenu()}}
              aria-label="Mais informações sobre nós"
              title="Mais informações sobre nós"
              className="flex items-center gap-4 cursor-pointer transition-colors dark:hover:text-zinc-400">
              <BookOpenText className="w-5 h-5" />
              <p>Sobre nós</p>
            </button>
            <button 
              type="button"
              onClick={() => {router.push("/admin"), closeMenu()}}
              aria-label="Ir para painel administrativo"
              title="Ir para painel administrativo"
              className="flex items-center gap-4 cursor-pointer transition-colors dark:hover:text-zinc-400">
              <ShieldUser className="w-5 h-5" />
              <p>Painel Administrativo</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};