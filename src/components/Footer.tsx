'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { TbWorldDownload } from "react-icons/tb";
import { SlogganTypography } from "./Typography";
import { PhraseSloganAlternative } from "./Phrases";
import { useMediaQuery } from "@/data/hook/useMediaQuery";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/data/context/AuthContext";
import { RolesEnum } from "@/data/types/enums/roles.enum";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function Footer({ className }: FooterProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isSmUp = useMediaQuery("(min-width: 540px)");
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const { user } = useAuth();

  const whatsappNumber = user?.role === RolesEnum.ADMIN ? user?.phone : '5586994379414';

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleSaveApp = async () => {
    if (!deferredPrompt) {
      toast.info('Para instalar, abra o menu do seu navegador e selecione "Adicionar à Tela Inicial".');
      return;
    };

    deferredPrompt.prompt();
    setDeferredPrompt(null);
  }

  return (
    <footer className={cn(`w-full bg-secondary dark:bg-zinc-950 font-sans p-8 z-49 
      md:px-12 lg:px-32 md:pb-0 mt-8 ${isSmUp && 'px-16'}`,
      className
    )}>
      <div className="md:flex md:justify-around">
        <div className="flex flex-col justify-center items-center grow w-full">
          <Link 
            aria-label="Voltar para a página inicial"
            title="Voltar para a página inicial"
            href={`/`}
          >
            <Image
              src="/logo-h-alt.svg"
              alt="Logo Veritas"
              width={140}
              height={140}
              className="object-contain text-stone-300"
            />
          </Link>

          <SlogganTypography className="text-center dark:text-zinc-400 mt-2" />
          <PhraseSloganAlternative 
            divClassName="text-center" 
            className="text-muted-foreground text-sm" 
          />
        </div>

        {!isMdUp && (
          <hr className="my-4 border-muted-foreground/50"/>
        )}
        
        <div className="flex w-full">
          <div className="flex flex-col w-full h-full">
            <p className="font-bold uppercase text-gray-500 dark:text-zinc-200 text-sm mb-2">
              Siga-nos
            </p>
            
            <div className="flex sm:flex-col gap-2 sm:gap-4">
              <div className="flex text-primary dark:text-zinc-400">
                <div className={`flex cursor-pointer items-center justify-center 
                  hover:text-blue-400 transition-all`}
                >
                  <Link 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    href={`https://www.instagram.com/veritas_atelie/`} 
                    target="_blank" 
                    className="flex items-center justify-center"
                  >
                    <FaInstagram size={35} />
                    <span className="hidden sm:block ml-2 text-sm hover:underline">
                      Instagram
                    </span>
                  </Link>
                </div>
              </div>
              
              <div className="flex text-primary dark:text-zinc-400">
                <div className={`flex cursor-pointer items-center justify-center 
                  hover:text-green-500 transition-all`}
                >
                  <Link 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    href={`https://wa.me/${whatsappNumber}`} 
                    target="_blank" 
                    className="flex items-center justify-center"
                  >
                    <FaWhatsapp size={35} />
                    <span className="hidden sm:block ml-2 text-sm hover:underline">
                      WhatsApp
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex text-primary dark:text-zinc-400">
                <div className={`flex cursor-pointer items-center justify-center 
                  hover:text-details/80 transition-all`}
                >
                  <button 
                    type="button"
                    onClick={handleSaveApp}
                    aria-label="Salvar como app"
                    title="Salvar como app"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <TbWorldDownload size={35} />
                    <span className="hidden sm:block ml-2 text-sm hover:underline">
                      Salvar como app
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full h-full">
            <div className="flex text-primary dark:text-zinc-400 font-light text-sm">
              <div className="flex flex-col">
                <p className="font-bold uppercase text-gray-500 dark:text-zinc-200 text-sm mb-2">
                  Suporte
                </p>

                <Link 
                  aria-label="Sobre nós"
                  title="Sobre nós"
                  href={`/ajuda/sobre`}
                  className="w-fit"
                >
                  <span className="hover:underline">Sobre nós</span>
                </Link>

                <Link 
                  aria-label="Ajuda"
                  title="Ajuda"
                  href={`/ajuda`}
                  className="w-fit"
                >
                  <span className="hover:underline">Podemos ajudar?</span>
                </Link>

                <Link 
                  aria-label="Dúvidas Frequentes"
                  title="Dúvidas Frequentes"
                  href={`/ajuda#faq`}
                  className="w-fit"
                >
                  <span className="hover:underline">Dúvidas Frequentes</span>
                </Link>

                <Link
                  aria-label="Termos e Condições"
                  title="Termos e Condições"
                  href={`/ajuda/termos-e-condicoes`}
                  className="w-fit"
                >
                  <span className="hover:underline">Termos e Condições</span>
                </Link>

                <Link 
                  aria-label="Relatar Problema"
                  title="Relatar Problema"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://wa.me/${whatsappNumber || 
                    "5586994379414"}?text=${encodeURIComponent("Olá, gostaria de informar um problema que encontrei na Veritas Ateliê!")}
                  `}
                  className="w-fit"
                >
                  <span className="hover:underline">Relatar Problema</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-muted-foreground/50" />

      <div className="flex flex-col">
        <div className="text-center">
          <div className="text-xs font-semibold text-muted-foreground dark:text-zinc-600">
            <div className="flex items-center justify-center">
              <span className="mr-1">
                &copy; {new Date().getFullYear()} |
              </span>
              <span>
                {`Veritas Ateliê — Todos os direitos reservados.`}
              </span>
            </div>
            <span className="text-xs text-center font-playfair-display text-muted-foreground dark:text-zinc-600 font-medium">
              São Gonçalo do Piauí - PI
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground/30 dark:text-zinc-700/15 mt-4">
          <span>Desenvolvido com carinho por </span>
          <Link
            aria-label="Ver Portfólio"
            title="Ver Portfólio"
            href="https://portfolio-freddy-snzz.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="transition-all">
              <span className="cursor-pointer hover:font-medium hover:italic">Fredson Luiz.</span>
              <span className="animate-pulse"> ❤️</span>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}