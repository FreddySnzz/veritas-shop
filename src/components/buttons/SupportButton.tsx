'use client';

import Link from "next/link";
import { useAuth } from "@/data/context/AuthContext";
import { MessageSquareWarning } from "lucide-react";

interface SupportButtonProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  messageToSupport: string;
  className?: string;
};

export function SupportButton({ 
  title = "Relatar problema",
  messageToSupport, 
  className 
}: SupportButtonProps) {
  const { user } = useAuth();

  return (
    <Link
      aria-label={title}
      title="Abrir chat com o suporte"
      rel="noopener noreferrer"
      target="_blank"
      href={`https://wa.me/${user?.phone || 
        "5586994379414"}?text=${encodeURIComponent(messageToSupport)}
      `}
      className={`flex items-center justify-center 
        text-sm gap-1 hover:underline mt-2 ${className}
      `}
    >
      <MessageSquareWarning className="w-3 h-3" />
      <span className="text-xs text-secondary">
        {title}
      </span>
    </Link>
  );
};