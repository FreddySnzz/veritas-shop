'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdWarning } from "react-icons/md";
import AuthInput from "@/components/inputs/AuthInput";
// import AuthInput from "@/components/auth/AuthInput";
// import { GoogleIcon, WarningIcon } from "@/components/icons";
// import useAuthData from "@/data/hook/useAuthData";

export default function Login() {
  // const { user, loginGoogle } = useAuthData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const route = useRouter();
  
  function handleLogin() {
    alert(`Fazendo login...`)
    handleError("Ocorreu um erro ao tentar fazer login, tente novamente mais tarde!");
  };

  function handleError(message: any, timeout = 5000) {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, timeout);
  }

  return (
    <main className="flex justify-center items-center h-screen font-sans">
      <div className="hidden md:block w-full sm:w-1/2 lg:w-2/3">
        <img 
          src="https://images.pexels.com/photos/3783879/pexels-photo-3783879.jpeg" 
          alt="Imagem aleatória by Pexels" 
          className="h-screen w-full object-cover" 
        />
      </div>
      <div className="m-10 w-full sm:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-4">
          { 'Fazer login' }
        </h1>

        { error && (
          <div className={`flex items-center gap-2 px-5 py-3 rounded-md bg-red-500 text-white`}>
            <MdWarning className="size-6" />
            <span>{error}</span>
          </div>
        )}

        <AuthInput 
          label="Email"
          value={email}
          changeValue={setEmail}
          type="email"
          className={`bg-white`}
          required
        />
        <AuthInput
          label="Senha"
          value={password}
          changeValue={setPassword}
          type="password"
          required
        />

        <button className={`w-full px-4 py-3 rounded-lg mt-8
          bg-indigo-500 text-white hover:bg-indigo-400 cursor-pointer`}
          onClick={handleLogin}>
          { "Entrar" }
        </button>
      </div>
    </main>
  );
}