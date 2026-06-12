import { LogOut } from "lucide-react";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLElement> {
  onClick: () => void;
};

export function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Sair"
        title="Sair"
        onClick={onClick}
        className="p-2 cursor-pointer"
      >
        <LogOut className={`w-6 h-6 transition-colors
          text-secondary hover:text-secondary/70 dark:text-background-alternative-v2 dark:hover:text-background-alternative-v2/70`} 
        />
      </button>
    </div>
  );
}