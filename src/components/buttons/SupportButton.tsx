'use client';

import Link from "next/link";
import { MessageSquareWarning } from "lucide-react";

interface SupportButtonProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  messageToSupport: string;
  className?: string;
  whatsappNumber?: string;
};

export function SupportButton({ 
  title = "Relatar problema",
  messageToSupport, 
  className,
  whatsappNumber
}: SupportButtonProps) {

  return (
    <Link
      aria-label={title}
      title="Abrir chat com o suporte"
      rel="noopener noreferrer"
      target="_blank"
      href={`https://wa.me/${whatsappNumber || 
        "5586994379414"}?text=${encodeURIComponent(messageToSupport)}
      `}
      className={`flex items-center justify-center 
        text-sm gap-1 hover:underline ${className}
      `}
    >
      <MessageSquareWarning className="w-3 h-3" />
      <p className="text-xs">
        {title}
      </p>
    </Link>
  );
};