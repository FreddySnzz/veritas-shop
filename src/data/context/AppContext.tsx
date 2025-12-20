'use client';

import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useState 
} from "react";

interface AppContextProps {
  theme?: string;
  toggleTheme?: () => void;
};

const AppContext = createContext<AppContextProps>({});

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('');

  function toggleTheme() {
    const newTheme = theme === '' ? 'dark' : '';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || '';
    setTheme(savedTheme);
  }, []);

  return (
    <AppContext.Provider value={{ 
      theme,
      toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;