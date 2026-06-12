import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string;
  onClick: () => void;
}

export function CatalogButton() {
  return (
    <Link href="/">
      <button
        className="flex items-center justify-center w-full bg-secondary dark:bg-zinc-700 dark:hover:bg-zinc-700/80 hover:bg-secondary/80 text-white py-4 rounded-2xl font-sans font-bold text-lg gap-3 transition-all cursor-pointer"
      >
        Ver Catálogo
      </button>
    </Link>
  );
}

export function CustomizationCatalogButton({ onClick, buttonText }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center w-full bg-secondary dark:bg-zinc-700 dark:hover:bg-zinc-700/80 hover:bg-secondary/80 text-white py-4 rounded-2xl font-sans font-bold text-lg gap-3 transition-all cursor-pointer">
      <span>{buttonText || 'Ver pedido atual'}</span>
    </button>
  );
}