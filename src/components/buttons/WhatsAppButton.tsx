'use client';

import * as motion from "motion/react-client"
import { FaWhatsapp } from "react-icons/fa6";
import openLinkOnButton from "@/data/functions/openNewWindowButton";

interface WhatsAppButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  message: string;
}

export function WhatsAppButton(props: WhatsAppButtonProps) {
  return (
    <button
      onClick={() => openLinkOnButton(props.message)}
      className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-sans font-bold text-lg flex items-center justify-center gap-3 hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
    >
      <FaWhatsapp className="w-6 h-6" />
      Finalizar Pedido no WhatsApp
    </button>
  );
}

export function WhatsAppButtonFixed(props: WhatsAppButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 6 }}
      onClick={() => openLinkOnButton(props.message)}
      className="fixed z-40 cursor-pointer top-[91%] left-[84%] md:left-[92%] xl:left-[95%] items-center justify-center bg-linear-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all shadow-lg p-3"
    >
      <FaWhatsapp className="w-6 h-6" />
    </motion.button>
  );
}