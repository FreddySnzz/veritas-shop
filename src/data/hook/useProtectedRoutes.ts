import { useAuth } from "@/data/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook para proteger rotas individuais
 * Uso: const isAuthorized = useProtectedRoute();
 * 
 * Retorna false durante loading/redirecionamento
 * Retorna true quando usuário está autenticado
 */
export function useProtectedRoute(redirectTo: string = '/admin/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return isAuthenticated && !isLoading;
};