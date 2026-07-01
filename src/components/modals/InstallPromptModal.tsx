'use client';

import { useState, useEffect } from 'react';
import { X, Share, PlusSquare } from 'lucide-react';

export default function InstallPrompt() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const [isStandalone] = useState(() => {
    if (typeof window === 'undefined') return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
  });

  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hidePrompt = localStorage.getItem('hideVeritasInstallPrompt');
    
    if (hidePrompt === 'true' || isStandalone) return;

    // 3. Lógica para iOS
    if (isIOS) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone, isIOS]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    };

    setDeferredPrompt(null);
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideVeritasInstallPrompt', 'true');
    };

    setShowPrompt(false);
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 rounded-2xl font-sans
      bg-white dark:bg-zinc-900 p-4 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 
      md:bottom-8 md:left-auto md:right-8 md:w-96 text-zinc-800 dark:text-zinc-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-lg">
            Instale o Veritas Ateliê
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Adicione nosso site à sua tela inicial para acesso rápido e fácil.
          </p>
        </div>
        <button 
          onClick={handleClose}
          className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isIOS ? (
        <div className="mt-2 flex flex-col gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 p-3 text-sm">
          <p className="flex items-center gap-2">
            1. Toque em <Share className="w-4 h-4 text-blue-500" /> na barra inferior
          </p>
          <p className="flex items-center gap-2">
            2. Selecione <PlusSquare className="w-4 h-4 text-zinc-700 dark:text-zinc-300" /> Adicionar à Tela de Início
          </p>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm 
            bg-primary dark:bg-details hover:bg-primary/90 dark:hover:bg-details/90 transition-colors"
        >
          Adicionar à Tela Inicial
        </button>
      )}

      <div className="mt-1 flex items-center gap-2">
        <input 
          type="checkbox" 
          id="dontShowAgain" 
          checked={dontShowAgain}
          onChange={(e) => setDontShowAgain(e.target.checked)}
          className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
        />
        <label 
          htmlFor="dontShowAgain" 
          className="text-sm text-zinc-500 dark:text-zinc-400 cursor-pointer select-none"
        >
          Não mostrar novamente
        </label>
      </div>
    </div>
  );
}