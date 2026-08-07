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
        "flex lg:flex-col items-center justify-center w-full lg:max-h-1/2 xl:max-h-1/3 py-4 px-5",
        "bg-white hover:bg-gray-50 dark:bg-background-dark dark:hover:bg-zinc-900/70 text-secondary dark:text-zinc-200",
        "rounded-xl font-sans font-bold gap-2 transition-all cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}