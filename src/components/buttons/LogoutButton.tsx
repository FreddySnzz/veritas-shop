import { LogOut } from "lucide-react";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLElement> {
  onClick: () => void;
};

export function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        <LogOut className="w-6 h-6 text-secondary" />
      </button>
    </div>
  );
}