'use client';

import * as motion from "motion/react-client"
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

interface WhatsAppButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  message: string;
};

export function WhatsAppButton(props: WhatsAppButtonProps) {
  return (
    <Link
      href={props.message}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button
        type="button"
        aria-label="Finalizar pedido no WhatsApp"
        className={`w-full py-4 rounded-lg font-sans font-bold text-lg flex items-center justify-center gap-3
          bg-linear-to-r from-green-500 to-green-600 text-white hover:from-green-600/90 hover:to-green-700/90
          cursor-pointer transition-colors shadow-lg
        `}
      >
        <FaWhatsapp className="w-6 h-6" />
        Finalizar Pedido no WhatsApp
      </button>
    </Link>
  );
};

export function WhatsAppButtonFixed(props: WhatsAppButtonProps) {
  return (
    <Link
      href={props.message}
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 6 }}
        aria-label="Falar com suporte"
        title="Falar com suporte"
        type="button"
        className={`fixed z-40 cursor-pointer top-[91%] left-[84%] md:left-[92%] xl:left-[95%] items-center justify-center p-3
          bg-linear-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all shadow-lg 
        `}
      >
        <FaWhatsapp className="w-6 h-6" />
      </motion.button>
    </Link>
  );
};