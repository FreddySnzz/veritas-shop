"use client";

import { 
  type ReactNode, 
  createContext, 
  useContext, 
  useState 
} from "react";
import { User } from "../types/auth";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth.actions";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ 
  children, 
  initialUser = null 
}: { 
  children: ReactNode, 
  initialUser?: User | null 
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [prevInitialUser, setPrevInitialUser] = useState<User | null>(initialUser);
  const router = useRouter();

  if (initialUser !== prevInitialUser) {
    setPrevInitialUser(initialUser);
    setUser(initialUser);
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null); 
    await logoutAction(); 
    router.push('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  };

  return context;
};