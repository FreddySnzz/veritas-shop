'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomization } from '@/data/context/CustomizationContext';
import { useCart } from '@/data/context/CartContext';
import { useApp } from '@/data/context/AppContext';
import { getCachedCustomizationItemsAction } from '@/app/actions/cache.actions';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, X, ShoppingCart, Loader2 } from 'lucide-react';
import { baseProductCustomization } from '@/data/types/products.type';
import { CustomizationCatalogButton } from './buttons/CatalogButton';
import MultiTextInput from './inputs/MultiTexts';
import CordaoModel from '@/data/models/Cordao.model';
import ContaModel from '@/data/models/Conta.model';
import LetraModel from '@/data/models/Letra.model';
import CrucifixoModel from '@/data/models/Crucifixo.model';
import EntremeioModel from '@/data/models/Entremeio.model';

interface CustomizationCatalog {
  cordoes: CordaoModel[] | null;
  contas: ContaModel[] | null;
  letras: LetraModel[] | null;
  crucifixos: CrucifixoModel[] | null;
  entremeios: EntremeioModel[] | null;
};

const ALL_STEPS = [
  { id: 'cordao', title: 'Cordão', subtitle: 'Escolha a cor do cordão' },
  { id: 'conta', title: 'Contas', subtitle: 'Escolha a cor das contas (bolinhas)' },
  { id: 'texto', title: 'Personalização (Opcional)', subtitle: 'Escreva um nome ou texto' },
  { id: 'letra', title: 'Estilo da Letra', subtitle: 'Escolha o design das letras' },
  { id: 'crucifixo', title: 'Crucifixo', subtitle: 'Escolha o crucifixo' },
  { id: 'entremeio', title: 'Entremeio (Opcional)', subtitle: 'Escolha um entremeio' },
  { id: 'final', title: 'Revisão', subtitle: 'Confira seu pedido' },
];

interface ProductCustomizerProps {
  baseProduct: baseProductCustomization;
};

const ProductCustomizerWizard = ({ baseProduct }: ProductCustomizerProps) => {
  const { toggleSidebar } = useApp();
  const { customization, updateCustomization, isComplete, resetCustomization } = useCustomization();
  const { addItem } = useCart();
  const [customizationItems, setCustomizationItems] = useState<CustomizationCatalog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();

  const currentSteps = useMemo(() => {
    const dynamicItems = baseProduct.customizationItems || [];
    
    const steps = dynamicItems
      .map(itemId => ALL_STEPS.find(step => step.id === itemId))
      .filter((step): step is typeof ALL_STEPS[0] => !!step);

    if (steps.some(s => s.id === 'letra')) {
      const addTextStep = ALL_STEPS.find(s => s.id === 'texto');
      if (addTextStep) steps.splice(2, 0, addTextStep);
    };

    if (!steps.some(s => s.id === 'final')) {
      const finalStep = ALL_STEPS.find(s => s.id === 'final');
      if (finalStep) steps.push(finalStep);
    };

    return steps;
  }, [baseProduct.customizationItems]);

  useEffect(() => {
    async function getCustomizationItems() {
      try {
        setIsLoading(true);
        const items = await getCachedCustomizationItemsAction();
        
        setCustomizationItems(items);
      } catch (error) {
        console.error("Erro ao carregar itens de personalização", error);
        toast.error("Erro ao carregar opções. Tente novamente.");
      } finally {
        setIsLoading(false);
      };
    };

    getCustomizationItems();
  }, []);

  const handleAddToCart = () => {
    if (!isComplete()) return; 

    addItem(baseProduct, customization);
    toast.success("Produto adicionado ao carrinho!");

    setTimeout(() => {
      toggleSidebar();
      resetCustomization();
    }, 3000);
  };

  const handleNext = () => {
    let nextIndex = currentStep + 1;

    if (!currentSteps[currentStep]) return;

    const currentStepId = currentSteps[currentStep].id;
    
    if (currentStepId === 'texto') {
      const hasText = customization.frase && customization.frase.length > 0;

      if (!hasText) {
        const letrasIndex = currentSteps.findIndex(s => s.id === 'letra');
        if (letrasIndex !== -1 && nextIndex === letrasIndex) nextIndex++;
      };
    };

    if (nextIndex < currentSteps.length) {
      setDirection(1);
      setCurrentStep(nextIndex);
    };
  };

  const handleBack = () => {
    let prevIndex = currentStep - 1;

    if (!currentSteps[currentStep]) return;

    if (currentSteps[currentStep].id === 'crucifixo') {
      const hasText = customization.frase && customization.frase.length > 0;

      if (!hasText) {
        const letrasIndex = currentSteps.findIndex(s => s.id === 'letra');
        
        if (letrasIndex !== -1 && prevIndex === letrasIndex) prevIndex--;
      };
    };

    if (prevIndex >= 0) {
      setDirection(-1);
      setCurrentStep(prevIndex);
    };

    if (currentStep === 0) {
      router.push('/');
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectAndAdvance = (key: string, value: any) => {
    if (customization[key as keyof typeof customization] === value) 
      return updateCustomization({ [key]: undefined });

    updateCustomization({ [key]: value });

    setTimeout(() => {
      handleNext();
    }, 250);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const groupedCrucifixos = useMemo(() => {
    if (!customizationItems?.crucifixos) return {};
    
    const available = customizationItems.crucifixos.filter((c: CrucifixoModel) => c.available);
    return available.reduce((groups: Record<string, CrucifixoModel[]>, item: CrucifixoModel) => {
      const key = item.style || 'Outros';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      
      return groups;
    }, {});
  }, [customizationItems]);

  const groupedEntremeios = useMemo(() => {
    if (!customizationItems?.entremeios) return {};

    const available = customizationItems.entremeios.filter((e: EntremeioModel) => e.available);
    return available.reduce((groups: Record<string, EntremeioModel[]>, item: EntremeioModel) => {
      const key = item.style || 'Outros';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);

      return groups;
    }, {});
  }, [customizationItems]);

  const renderStepContent = () => {
    if (!customizationItems || !currentSteps[currentStep]) return null;

    const stepId = currentSteps[currentStep].id; 

    switch (stepId) {
      case 'cordao':
        return (
          <div className="grid grid-cols-2 gap-4">
            {customizationItems.cordoes?.filter((c: CordaoModel) => c.available).map((cordao: CordaoModel) => (
              <button
                key={cordao.id}
                onClick={() => handleSelectAndAdvance('cordao', cordao.ref)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  customization?.cordao === cordao.ref ? 'border-primary bg-green-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {cordao.image_url ? (
                  <div className="relative w-30 h-30 mx-auto mb-3">
                    <Image 
                      src={cordao.image_url} 
                      alt={cordao.ref} 
                      fill 
                      className="object-contain rounded-lg" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="relative w-30 h-30 mx-auto mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    </div>
                  </div>
                )}
                <span className="block font-medium text-gray-800">{cordao.name}</span>
                <span className="text-xs text-gray-400">Ref: {cordao.ref}</span>
                {customization?.cordao === cordao.ref && (
                  <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
            ))}
          </div>
        );

      case 'conta':
        return (
          <div className="grid grid-cols-2 gap-4">
            {customizationItems.contas?.filter((c: ContaModel) => c.available).map((conta: ContaModel) => (
              <button
                key={conta.id}
                onClick={() => handleSelectAndAdvance('conta', conta.ref)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  customization?.conta === conta.ref ? 'border-primary bg-green-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {conta.image_url ? (
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <Image 
                      src={conta.image_url} 
                      alt={conta.ref} 
                      fill 
                      className="object-contain rounded-lg" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    </div>
                  </div>
                )}
                <span className="text-xs text-gray-400">Ref: {conta.ref}</span>
                {customization?.conta === conta.ref && (
                  <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
            ))}
          </div>
        );

      case 'texto':
        return (
          <div className="flex flex-col gap-4">
            <MultiTextInput />
            <div className="bg-green-50 p-4 rounded-xl text-sm text-blue-700">
              <p>Dica: O máximo de letras por mistério é 10.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-sm text-blue-700">
              <p>Dica²: Dependendo da quantidade de letras/palavras será acrescido um valor ao valor final.</p>
            </div>
          </div>
        );

      case 'letra':
        return (
          <div className="grid grid-cols-2 gap-4">
            {customizationItems.letras?.filter((l: LetraModel) => l.available).map((letra: LetraModel) => (
              <button
                key={letra.id}
                onClick={() => handleSelectAndAdvance('styleLetra', letra.ref)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  customization?.styleLetra === letra.ref ? 'border-primary bg-green-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {letra.image_url ? (
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <Image 
                      src={letra.image_url} 
                      alt={letra.ref} 
                      fill 
                      className="object-contain rounded-lg" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    />
                  </div>
                ) : (
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    </div>
                  </div>
                )}
                <div className='flex flex-col'>
                  <span>{letra.name}</span>
                  <span className="text-xs text-gray-400">Ref: {letra.ref}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'crucifixo':
        return (
          <div className="space-y-6">
            {Object.entries(groupedCrucifixos).map(([style, items]) => (
              <div key={style}>
                <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  {style}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {items.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectAndAdvance('crucifixo', c.ref)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        customization?.crucifixo === c.ref ? 'border-primary bg-green-50' : 'border-gray-100'
                      }`}
                    >
                      {c.image_url ? (
                        <div className="relative w-30 h-40 mx-auto mb-3">
                          <Image 
                            src={c.image_url} 
                            alt={c.ref} 
                            fill 
                            className="object-contain rounded-lg" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="relative w-30 h-40 mx-auto mb-3">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Sem imagem</span>
                          </div>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">Ref: {c.ref}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'entremeio':
        return (
          <div className="space-y-4">
            <button 
              onClick={() => handleSelectAndAdvance('entremeio', null)}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-gray-400 hover:bg-gray-50"
            >
              Prefiro sem Entremeio (Pular)
            </button>
            
            {Object.entries(groupedEntremeios).map(([style, items]) => (
              <div key={style}>
                  <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    {style}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                  {items.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => handleSelectAndAdvance('entremeio', e.ref)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        customization?.entremeio === e.ref ? 'border-primary bg-green-50' : 'border-gray-100'
                      }`}
                    >
                      {e.image_url ? (
                        <div className="relative w-30 h-30 mx-auto mb-3">
                          <Image 
                            src={e.image_url} 
                            alt={e.ref} 
                            fill 
                            className="object-contain rounded-lg" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="relative w-30 h-30 mx-auto mb-3">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Sem imagem</span>
                          </div>
                        </div>
                      )}
                      <span className="text-sm font-semibold block">{e.name}</span>
                      <span className="text-xs text-gray-500">Ref: {e.ref}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'final':
        if (!isComplete()) {
          return (
            <div className="flex flex-col items-center justify-center">
              <div className='flex flex-col items-center justify-center text-center'>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                  <X size={40} />
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  Personalização incompleta
                </p>
                <p className="text-gray-500 mb-8">
                  Sua personalização ainda não foi concluída.
                </p>
              </div>

              <div className='w-full my-4 text-center'>
                <span className="text-red-600 text-start font-bold">
                  Você precisa selecionar todos os itens obrigatórios.
                </span>
              </div>

              <div className='w-full my-4 text-center'>
                <span className='text-xs text-gray-500'>
                  Clique abaixo para voltar aos passos anteriores
                </span>
              </div>
            </div>
          );
        };
        
        return (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
              <Check size={40} />
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">Tudo pronto!</p>
            <p className="text-gray-500 mb-8">Sua personalização foi concluída. Clique abaixo para adicionar sua personalização ao carrinho.</p>
            
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center justify-center w-4/5"
            >
              <button 
                onClick={handleAddToCart}
                className="flex bg-primary items-center justify-center text-white px-4 py-3 rounded-xl font-bold mt-4 gap-4"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Adicionar ao Carrinho</span>
              </button>
            </motion.div>
          </div>
        );

      default:
        return null;
    };
  };

  if (!baseProduct.customizationItems) {
    return (
      <div className="flex p-4 justify-center items-center text-center font-sans h-full">
        <span>Configuração de personalização inválida.</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden rounded-xl m-4 bg-gray-50">
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto content-start gap-4 m-6 scrollbar-hide">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-100">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-gray-500">Carregando opções de personalização...</p>
          </div>
        ) : (
          <>
            <header className="shrink-0 mb-2">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                <motion.div 
                  className="h-full bg-primary rounded-2xl"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentSteps[currentStep]?.title}</h2>
                  <p className="text-gray-400 text-sm">{currentSteps[currentStep]?.subtitle}</p>
                </div>
              </div>
            </header>

            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto content-start gap-4 scrollbar-hide"> 
              <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
        
        <footer className="flex shrink-0 mt-auto justify-between items-center py-4 pt-2 border-t border-gray-200 gap-4 z-10">
          <button
            onClick={handleBack}
            className={`flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all text-secondary bg-gray-100 hover:bg-gray-200`}
            disabled={isLoading}
          >
            <ChevronLeft size={20} />
            <span>Voltar</span>
          </button>

          {!isLoading && currentStep < currentSteps.length - 1 && (
            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all text-white bg-secondary hover:bg-secondary/90"
            >
              <span>Próximo</span>
              <ChevronRight size={20} />
            </button>
          )}
        </footer>
      </main>
    </div>
  );
};

export default ProductCustomizerWizard;