"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attribute?: any;
  defaultTheme?: string;
  enableSystem: boolean;
  children: React.ReactNode;
};

export function ThemeProvider({ 
  children, 
  attribute = "class", 
  defaultTheme = "system", 
  enableSystem = true
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </NextThemesProvider>
  );
}