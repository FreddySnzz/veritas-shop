"use client";

import { 
  type ReactNode, 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useState, 
  useRef 
} from "react";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";
import { User } from "../types/auth";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const hasInitialized = useRef(false);

  const logout = useCallback((redirect: boolean = true) => {
    setUser(null);
    deleteCookie("veritas_token");
    localStorage.removeItem("user");
    
    if (redirect && pathname?.startsWith('/admin') && pathname !== '/admin/login') {
      router.replace('/admin/login?expired=true');
    }
  }, [router, pathname]);

  const handleSetToken = useCallback((token: string) => {
    setCookie("veritas_token", token, 1);
  }, []);

  const handleSetUser = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  // Inicialização - carrega dados do localStorage
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initAuth = () => {
      const token = getCookie("veritas_token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Erro ao parsear usuário:", error);
          logout(false);
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setToken: handleSetToken,
        setUser: handleSetUser,
        logout: () => logout(true),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}