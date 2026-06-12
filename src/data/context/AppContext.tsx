'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openMenu = () => setIsMenuOpen(true); 
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <AppContext.Provider 
      value={{ 
        isSidebarOpen, 
        toggleSidebar, 
        openSidebar, 
        closeSidebar,
        isMenuOpen, 
        toggleMenu, 
        openMenu, 
        closeMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  };

  return context;
};