'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { X, Share, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const emptySubscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  
    () => false  
  );
}

function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const isClient = useIsClient();

  const checkIsDismissed = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('hideVeritasInstallPrompt') === 'true';
  }, []);

  const isStandalone = isClient && (
    window.matchMedia('(display-mode: standalone)').matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ('standalone' in window.navigator && (window.navigator as any).standalone)
  );

  const isIOS = isClient && (
    /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  );

  useEffect(() => {
    if (!isClient) return;
    if (checkIsDismissed()) return;

    const hidePrompt = localStorage.getItem('hideVeritasInstallPrompt');
    if (hidePrompt === 'true') return;
    if (isStandalone) return;

    if (isIOS) {
      const timer = setTimeout(() => {
        if (!checkIsDismissed()) {
          setShowPrompt(true);
        }
      }, 3000); 
      
      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      if (checkIsDismissed()) return;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isClient, isStandalone, isIOS, checkIsDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  return {
    showPrompt,
    setShowPrompt,
    isStandalone: isClient ? isStandalone : false,
    isIOS: isClient ? isIOS : false,
    handleInstallClick
  };
}

export default function InstallPrompt() {
  const { showPrompt, setShowPrompt, isStandalone, isIOS, handleInstallClick } = useInstallPrompt();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!showPrompt || isStandalone) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideVeritasInstallPrompt', 'true');
    }
    setShowPrompt(false);
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 rounded-2xl font-sans 
      bg-white dark:bg-zinc-900 p-6 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 
      md:bottom-8 md:left-auto md:right-8 md:w-96 text-zinc-800 dark:text-zinc-100`
    }>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-lg">Instale o Veritas Ateliê</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Adicione nosso site à sua tela inicial para acesso rápido e fácil.
          </p>
        </div>
        <button 
          onClick={handleClose}
          className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          aria-label="Fechar prompt de instalação"
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
          className={`mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer
            text-white shadow-sm bg-primary dark:bg-details hover:bg-primary/90 dark:hover:bg-details/90
          `}
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
          className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer"
        />
        <label 
          htmlFor="dontShowAgain" 
          className="text-sm text-zinc-500 dark:text-zinc-400 cursor-pointer select-none"
        >
          Não mostrar novamente
        </label>
      </div>
    </div>
  )
}