'use client'

import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";

export function ThemeToggleSwitch() {
  const { theme, setTheme } = useTheme();

  const handleUpdate = (checked: boolean) => {
    setTheme(checked ? 'light' : 'dark');
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      className="flex items-center gap-4 transition-all cursor-pointer"
      title={theme === 'light' ? 'Alternar para o tema escuro' : 'Alternar para o tema claro'}
      aria-label={theme === 'light' ? 'Alternar para o tema escuro' : 'Alternar para o tema claro'}
    >
      <Moon className="w-5 h-5" />
      <Switch
        checked={theme === 'light'}
        onCheckedChange={handleUpdate}
        className={`cursor-pointer data-[state=checked]:bg-green-600 data-[state=checked]:dark:bg-zinc-800 dark:data-[state=checked]:text-white
          dark:data-[state=unchecked]:bg-zinc-800 dark:data-[state=unchecked]:text-zinc-50 data-[state=unchecked]:bg-gray-200
        `}
      />
      <Sun className="w-5 h-5" />
    </div>
  );
};