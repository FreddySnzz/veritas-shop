'use client';

import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { SlogganTypography, Typography } from "./Typography";
import { PhraseSloganAlternative } from "./Phrases";
import { useMediaQuery } from "@/data/hook/useMediaQuery";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  const isSmUp = useMediaQuery("(min-width: 540px)");
  const isMdUp = useMediaQuery("(min-width: 768px)");

  return (
    <footer className={`w-full bg-secondary font-sans p-8 z-49 
      md:px-12 lg:px-32 md:pb-0 mt-8 ${isSmUp && 'px-16'}
      ${className}`}
    >
      <div className="md:flex md:justify-around">
        <div className="flex flex-col justify-center items-center grow w-full">
          <Link 
            aria-label="Voltar para a página inicial"
            title="Voltar para a página inicial"
            href={`/`}
          >
            <Typography 
              className="text-center font-playfair-display" 
              titleColor="text-stone-300" 
              size={"sm"} 
            />
          </Link>

          <SlogganTypography className="text-center" />
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
            <p className="font-bold uppercase text-gray-500 text-sm mb-2">
              Siga-nos
            </p>
            
            <div className="flex sm:flex-col gap-4">
              <div className="flex text-primary">
                <div className={`flex cursor-pointer items-center justify-center 
                  hover:text-blue-400`}
                >
                  <Link 
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    href={`https://www.instagram.com/veritas_atelie`} 
                    target="_blank" 
                  >
                    <FaInstagram size={35} />
                  </Link>
                  <span className="hidden sm:block ml-2 text-sm hover:underline">
                    Instagram
                  </span>
                </div>
              </div>
              
              <div className="flex text-primary">
                <div className={`flex cursor-pointer items-center justify-center 
                  hover:text-green-500`}
                >
                  <Link 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    href={`https://wa.me/5586994379414`} 
                    target="_blank" 
                  >
                    <FaWhatsapp size={35} />
                  </Link>
                  <span className="hidden sm:block ml-2 text-sm hover:underline">
                    WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full h-full">
            <div className="flex text-primary font-light text-sm">
              <div className="flex flex-col">
                <p className="font-bold uppercase text-gray-500 text-sm mb-2">
                  Suporte
                </p>

                <Link 
                  aria-label="Ajuda"
                  title="Ajuda"
                  href={`/ajuda`}
                >
                  <span className="hover:underline">Podemos ajudar?</span>
                </Link>

                <Link 
                  aria-label="Sobre nós"
                  title="Sobre nós"
                  href={`/ajuda/sobre`}
                >
                  <span className="hover:underline">Sobre nós</span>
                </Link>

                <Link 
                  aria-label="Dúvidas Frequentes"
                  title="Dúvidas Frequentes"
                  href={`/ajuda#faq`}
                >
                  <span className="hover:underline">Dúvidas Frequentes</span>
                </Link>

                <Link
                  aria-label="Termos e Condições"
                  title="Termos e Condições"
                  href={`/ajuda/termos-e-condicoes`}
                >
                  <span className="hover:underline">Termos e Condições</span>
                </Link>

                <Link 
                  aria-label="Painel Administrativo"
                  title="Painel Administrativo"
                  href={`/admin`}
                >
                  <span className="hover:underline">Painel Administrativo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-muted-foreground/50" />

      <div className="flex flex-col">
        <div className="text-center">
          <div className="text-xs font-semibold text-muted-foreground">
            <div className="flex items-center justify-center">
              <span className="mr-1">
                &copy; 2025 |
              </span>
              <span>
                {`Veritas Ateliê — Todos os direitos reservados.`}
              </span>
            </div>
            <span className="text-xs text-center font-playfair-display text-muted-foreground font-medium">
              São Gonçalo do Piauí - PI
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground/30 mt-4">
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
  );
};