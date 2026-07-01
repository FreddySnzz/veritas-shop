'use client';

import { useState, useEffect } from 'react';
import { X, Share, PlusSquare } from 'lucide-react';

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // 1. Verifica se o usuário já pediu para não mostrar o aviso
    const hidePrompt = localStorage.getItem('hideVeritasInstallPrompt');
    if (hidePrompt === 'true') return;

    // 2. Verifica se já está instalado (standalone)
    const isAppMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(isAppMode);

    if (isAppMode) return;

    // 3. Detecta iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    // 4. Intercepta o prompt nativo no Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    // Se o usuário marcou a caixinha, salva a preferência no localStorage
    if (dontShowAgain) {
      localStorage.setItem('hideVeritasInstallPrompt', 'true');
    }
    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-2xl ring-1 ring-slate-200 dark:ring-zinc-800 md:bottom-8 md:left-auto md:right-8 md:w-96 text-slate-800 dark:text-zinc-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">Instalar o Veritas Ateliê</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Adicione nosso catálogo à sua tela inicial para acesso rápido e fácil.
          </p>
        </div>
        <button 
          onClick={handleClose}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isIOS ? (
        <div className="mt-2 flex flex-col gap-2 rounded-xl bg-slate-50 dark:bg-zinc-800 p-3 text-sm">
          <p className="flex items-center gap-2">
            1. Toque em <Share className="w-4 h-4 text-blue-500" /> na barra inferior
          </p>
          <p className="flex items-center gap-2">
            2. Selecione <PlusSquare className="w-4 h-4 text-slate-700 dark:text-zinc-300" /> Adicionar à Tela de Início
          </p>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          Adicionar à Tela Inicial
        </button>
      )}

      {/* Caixa de seleção "Não mostrar novamente" */}
      <div className="mt-1 flex items-center gap-2">
        <input 
          type="checkbox" 
          id="dontShowAgain" 
          checked={dontShowAgain}
          onChange={(e) => setDontShowAgain(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
        />
        <label 
          htmlFor="dontShowAgain" 
          className="text-sm text-slate-500 dark:text-zinc-400 cursor-pointer select-none"
        >
          Não mostrar novamente
        </label>
      </div>
    </div>
  );
}