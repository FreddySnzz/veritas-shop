import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomLink({ children, className, ...props }: CustomLinkProps) {
  return (
    <Link 
      className={cn(
        "flex items-center justify-center py-1.5 px-5 gap-2 transition-all cursor-pointer",
        "bg-white hover:bg-gray-50 dark:bg-background-dark dark:hover:bg-input/30 text-secondary dark:text-zinc-200",
        "rounded-xl font-sans font-bold transition-all",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}