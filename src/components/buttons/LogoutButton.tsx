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
        <LogOut className="w-6 h-6 text-secondary hover:text-secondary/70 transition-colors" />
      </button>
    </div>
  );
}