'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/data/context/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { login } from "@/data/services/auth.service";
import { LogoHorizontalSvg } from "@/components/Typography";

export default function Login() {
  const searchParams = useSearchParams();
  const { setToken, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();
  
  const isExpired = searchParams.get("expired") === "true";
  const redirectUrl = searchParams.get("redirect") || '/admin';

  useEffect(() => {
    if (isExpired) {
      localStorage.clear();
      Cookies.remove('veritas_token');
      toast.warning("Sua sessão expirou. Faça login novamente.");
    };
  }, [isExpired]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await login({ email, password });

      if (!response) {
        toast.error("Email ou senha inválidos");
        setIsLoading(false);
        return;
      };

      const { user, tokens } = response;

      Cookies.set('veritas_token', tokens.access, { 
        expires: 1,
        path: '/',
      });

      setToken(tokens.access);
      setUser(user);

      toast.success("Login realizado com sucesso");
      router.refresh();

      setTimeout(() => {
        router.replace(redirectUrl);
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erro inesperado ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center min-h-screen items-center font-sans bg-background-alternative dark:bg-background-dark">
      <div className="m-10 w-full sm:w-1/2 lg:w-1/3">
        <div className="w-full mb-8">
          <LogoHorizontalSvg />
        </div>
        <form onSubmit={handleLogin} className="space-y-6 xl:p-4">
          <div className="">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0"
              disabled={isLoading}
            />
          </div>

          <div className="">
            <Label htmlFor="password" className="text-sm">
              Senha
            </Label>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              required={true}
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0"
            />
          </div>

          <button 
            type="submit" 
            className={`flex w-full px-4 py-3 rounded-lg text-white items-center justify-center
              bg-primary dark:bg-details dark:hover:bg-details/80 hover:bg-primary/90 cursor-pointer
            `} 
            disabled={isLoading}
          >
            {isLoading ? 
              <div className="flex justify-center items-center gap-2"> 
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Entrando...</span>
              </div> : 
              "Entrar"
            }
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/"
            className={`inline-flex items-center justify-center text-xs text-secondary underline cursor-pointer`}
          >
            Voltar para Página Inicial
          </Link>
        </div>  
      </div>
    </main>
  );
};