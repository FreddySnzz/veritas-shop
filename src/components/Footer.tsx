'use client';

import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { SlogganTypography, Typography } from "./Typography";
import openLinkOnButton from "@/data/functions/openNewWindowButton";
import { PhraseSloganAlternative } from "./Phrases";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`w-full bg-secondary font-sans p-8 z-49 ${className}`}>
      <div>
        <div className="md:flex items-center justify-around">
          <div className="flex flex-col items-center">
            <a href={`/`}>
              <Typography 
                className="text-center font-playfair-display" 
                tittleColor="text-stone-300" 
                size={"sm"} 
              />
            </a>
            <SlogganTypography className="text-center" />
          </div>

          <PhraseSloganAlternative divClassName="text-center" className="text-muted-foreground text-sm" />
        </div>

        <hr className="mt-6 border-muted-foreground/50"/>
        
        <div className="flex justify-around items-center">
          <div className="flex items-center justify-center gap-6 my-2 w-full">
            <div className="flex mt-2 text-primary">
              <div className="flex cursor-pointer hover:text-blue-400">
                <a href={`https://www.instagram.com/veritas_atelie`} target="_blank" className="cursor-pointer">
                  <FaInstagram size={35} />
                </a>
              </div>
            </div>
            <div className="flex mt-2 text-primary">
              <div className="flex cursor-pointer hover:text-green-500">
                <a href={`https://wa.me/5586994379414`} target="_blank" className="cursor-pointer">
                  <FaWhatsapp size={35} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around my-2 w-full">
            <div className="flex mt-2 text-primary font-light text-sm">
              <div className="flex flex-col">
                <a href={`/apresentacao`}>
                  <span className="hover:underline">Quem somos</span>
                </a>
                <span className="hover:underline">Sistema de entregas</span>
                <a href={`/admin`}>
                  <span className="hover:underline">Painel Administrativo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <hr className="mt-4 border-muted-foreground/50"/>
        <div className="pt-4 text-center">
          <div className="text-xs mb-2 font-semibold text-muted-foreground">
            <div className="flex items-center justify-center">
              <span className="mr-1">
                &copy; 2025 |
              </span>
              <span>
                {`Veritas Ateliê — Todos os direitos reservados.`}
              </span>
            </div>
            <span className="text-xs text-center mb-6 font-playfair-display text-muted-foreground font-medium">
              São Gonçalo do Piauí - PI
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground/30 mt-4">
          <span>Feito com carinho por </span>
          <span 
            className="cursor-pointer hover:italic" 
            onClick={() => openLinkOnButton("https://portfolio-freddy-snzz.vercel.app/")}
          >
            Fredson Luiz. <span className="animate-pulse">❤️</span>
          </span>
        </div>
      </div>
    </footer>
  );
};