'use client';

import { useDraggableButton } from "@/data/hook/useDraggableButton";
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
        className={`flex items-center justify-center w-full px-4 py-3 gap-2 
          bg-linear-to-r from-green-500 to-green-600 lg:text-lg
          text-white hover:from-green-600/90 hover:to-green-700/90
          dark:from-green-600 dark:to-green-700
          dark:hover:from-green-500/90 dark:hover:to-green-600/90
          cursor-pointer transition-colors shadow-lg rounded-lg font-sans font-bold 
        `}
      >
        <FaWhatsapp className="w-6 h-6" />
        Finalizar pedido no WhatsApp
      </button>
    </Link>
  );
};

export function WhatsAppButtonFixed(props: WhatsAppButtonProps) {
  const {
    buttonRef,
    position,
    dragging,
    onTouchStart,
    onMouseDown,
  } = useDraggableButton({
    margin: 12,
  });

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
        ref={buttonRef}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        className={`cursor-pointer p-3 items-center justify-center
          bg-linear-to-r from-green-500 to-green-600 
          text-white hover:from-green-600/90 hover:to-green-600/90
          rounded-full transition-colors shadow-lg  
        `}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          transition: dragging ? 'none' : 'left 0.2s ease, top 0.2s ease',
          touchAction: 'none',
          userSelect: 'none'
        }}
      >
        <FaWhatsapp className="w-6 h-6" />
      </motion.button>
    </Link>
  );
};