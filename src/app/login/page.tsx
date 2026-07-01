'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/data/context/AuthContext";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from '@/components/ui/password-input';
import { LogoHorizontalSvg } from "@/components/Typography";
import { onlyNumbers } from '@/data/functions/inputMasks';
import { Loader2 } from "lucide-react";
import { FaGoogle } from 'react-icons/fa6';
import { CreateUserRequest, User } from '@/data/types/auth';
import { authFormSchema } from '@/data/schemas/form.schema';
import { 
  registerAction, 
  registerWithGoogleAction, 
  userLoginAction 
} from '../actions/auth.actions';
import { cn } from '@/lib/utils';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/data/firebase/config';
import { RolesEnum } from '@/data/types/enums/roles.enum';

export default function Login() {
  const { setToken, setUser } = useAuth();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  
  const router = useRouter();
  
  const isExpired = searchParams.get("expired") === "true";
  const redirectUrl = searchParams.get("redirect") || '/';

  useEffect(() => {
    if (isExpired) {
      localStorage.clear();
      Cookies.remove('veritas_token');
      toast.warning("Sua sessão expirou. Faça login novamente.");
    };
  }, [isExpired]);

  function validate() {
    const result = authFormSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") fieldErrors[path] = issue.message;
      });

      setErrors(fieldErrors);
      return false;
    };

    setErrors({});
    return true;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await userLoginAction({ 
        phone: form.phone, 
        password: form.password 
      });

      if (!response) {
        toast.error("O telefone ou senha estão incorretos.");
        setIsLoading(false);
        return;
      };

      const { user, tokens } = response;

      Cookies.set('veritas_token', tokens.access, { 
        expires: 1,
        path: redirectUrl,
      });

      setToken(tokens.access);
      setUser(user);

      toast.success("Login realizado com sucesso");
      router.refresh();

      setTimeout(() => {
        router.replace(redirectUrl);
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erro inesperado ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const result = await signInWithPopup(auth, googleProvider);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parseUser = result.user as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const safeUserData: any = {
        uid: result.user.uid,
        email: result.user.email,
        phone: result.user?.phoneNumber,
        displayName: result.user.displayName,
        accessToken: parseUser.accessToken,
        role: RolesEnum.USER,
      };

      await registerWithGoogleAction(safeUserData);

      Cookies.set('veritas_token', safeUserData.accessToken, {
        expires: 1,
        path: redirectUrl,
      });

      setToken(safeUserData.accessToken);
      setUser({
        id: safeUserData.uid,
        name: safeUserData.displayName,
        email: safeUserData.email,
        phone: safeUserData.phone,
        role: safeUserData.role,
      });

      toast.success("Login realizado com sucesso");
      router.refresh();

      setTimeout(() => {
        router.replace(redirectUrl);
      }, 100);
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
      toast.error('Erro ao autenticar com Google. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    };
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    try {
      const payload: CreateUserRequest = {
        name: form.name,
        email: form?.email,
        phone: form.phone,
        password: form.password,
      };

      const createUserResponse = await registerAction(payload);

      if (createUserResponse instanceof Error) {
        toast.error("Usuário já existe!");
        return;
      };

      const loginResponse = await userLoginAction({ 
        phone: form.phone, 
        password: form.password 
      });
      
      if (!loginResponse) return;

      const { tokens } = loginResponse;

      Cookies.set('veritas_token', tokens.access, { 
        expires: 1,
        path: redirectUrl,
      });

      setToken(tokens.access);
      setUser(createUserResponse as User);

      toast.success("Cadastro realizado com sucesso");
      router.push(redirectUrl);

      setTimeout(() => {
        router.replace(redirectUrl);
      }, 100);
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Erro inesperado ao realizar cadastro");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <main className="flex justify-center min-h-screen items-center font-sans bg-background-alternative dark:bg-background-dark">
      <div className="m-10 w-full sm:w-1/2 lg:w-1/3">
        <div className="w-full mb-8">
          <LogoHorizontalSvg />
        </div>
        
        <form onSubmit={handleLogin} className={`${mode === 'login' ? '' : 'hidden'} space-y-6 xl:p-4`}>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(DDD) 9 1234-5678"
              required
              maxLength={11}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: onlyNumbers(e.target.value) }))}
              value={form.phone}
              className={cn("h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0",
                errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              Senha
            </Label>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              required={true}
              placeholder="senha"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
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

        <form onSubmit={handleRegister} className={`${mode === 'register' ? '' : 'hidden'} space-y-6 xl:p-4`}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1">
              <Label htmlFor="name" className="text-sm">
                Nome
              </Label>
              <p className="text-xs">*</p>
            </div>
            <Input
              id="name"
              type="text"
              placeholder="Maria de Fátima"
              required
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              value={form.name}
              className={cn("h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0",
                errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1">
              <Label htmlFor="phone" className="text-sm">
                Telefone
              </Label>
              <p className="text-xs">*</p>
            </div>
            
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(DDD) 9 1234-5678"
              required
              maxLength={11}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: onlyNumbers(e.target.value) }))}
              value={form.phone}
              className={cn("h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0",
                errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <p className="text-xs text-muted-foreground">(opcional)</p>
            </div>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              required={false}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              value={form.email}
              className={cn("h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0",
                errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
              disabled={isLoading}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1">
              <Label htmlFor="password" className="text-sm">
                Senha
              </Label>
              <p className="text-xs">*</p>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              required={true}
              placeholder="senha"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              disabled={isLoading}
              className={cn("h-12 bg-white dark:bg-input/40 dark:placeholder:text-zinc-400 focus-visible:ring-0",
                errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              )}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            <div className="flex flex-col text-xs text-muted-foreground dark:text-secondary/40">
              <p>A senha deve conter no mínimo <strong>8 caracteres</strong> com:</p>
              <p className="font-bold">- 1 letra</p>
              <p className="font-bold">- 1 número</p>
              <p className="font-bold">- 1 caracter especial</p>
            </div>
            <p className={'mt-2 text-xs font-bold text-secondary dark:text-secondary/70'}>
              (*) Campos obrigatórios
            </p>
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
                <span>Criando sua conta...</span>
              </div> : 
              "Criar conta"
            }
          </button>
        </form>

        <hr className="border-muted-foreground/50 my-4" />

        <div className="flex justify-center items-center">
          <button 
            type="button"
            title="Entrar com uma conta Google"
            aria-label="Entrar com uma conta Google"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-4 text-secondary hover:text-blue-400 cursor-pointer"
          >
            <FaGoogle className="w-6 h-6" />
            <p className="text-center hover:underline">
              Entrar com uma conta Google
            </p>
          </button>
        </div>

        <div className="flex flex-col mt-8 justify-center">
          <button
            className={`text-sm text-secondary cursor-pointer`}
          >
            {mode === 'login' ? "Ainda não possui uma conta?" : "Já possui uma conta?" }
          </button>
          <button
            type="button"
            title="Criar uma conta"
            aria-label="Criar uma conta"
            onClick={() => {
              setMode((prev) => (prev === 'login' ? 'register' : 'login'))
              setForm({
                name: '',
                phone: '',
                email: '',
                password: '',
              })
            }}
            className={`text-sm text-secondary dark:text-details font-bold cursor-pointer hover:underline`}
          >
            {mode === 'login' ? "Criar uma conta agora" : "Entrar com uma conta existente" }
          </button>
        </div> 

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