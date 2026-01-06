'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import { initialData } from '../data/constants/products';
import { CustomizationCatalogButton } from './buttons/CatalogButton';
import MultiTextInput from './inputs/MultiTexts';
import Sidebar from './Sidebar';
import { useCustomization } from '@/data/context/CustomizationContext';
import { Crucifixos, Entremeios } from '@/data/types/products.type';

const STEPS = [
  { id: 'cordao', title: 'Cordão', subtitle: 'Escolha a cor do cordão' },
  { id: 'contas', title: 'Contas', subtitle: 'Escolha a cor das contas (bolinhas)' },
  { id: 'texto', title: 'Personalização (Opcional)', subtitle: 'Escreva um nome ou texto' },
  { id: 'letras', title: 'Estilo da Letra', subtitle: 'Escolha o design das letras' },
  { id: 'crucifixo', title: 'Crucifixo', subtitle: 'Escolha o crucifixo' },
  { id: 'entremeio', title: 'Entremeio (Opcional)', subtitle: 'Escolha um entremeio' },
  { id: 'final', title: 'Revisão', subtitle: 'Confira seu pedido' },
];

type ProductData = typeof initialData;

const RosarioWizard = () => {
  const [products, setProducts] = useState<ProductData>(initialData);
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedSidebar, setExpandedSidebar] = useState(false);
  const { customization, updateCustomization } = useCustomization();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedProducts = window.localStorage.getItem('veritas_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleNext = () => {
    let nextIndex = currentStep + 1;
    
    if (STEPS[currentStep].id === 'texto') {
      const hasText = customization.frase && customization.frase.length > 0;
      if (!hasText) {
        const letrasIndex = STEPS.findIndex(s => s.id === 'letras');
        if (nextIndex === letrasIndex) nextIndex++; 
      }
    }

    if (nextIndex < STEPS.length) {
      setDirection(1);
      setCurrentStep(nextIndex);
    }
  };

  const handleBack = () => {
    let prevIndex = currentStep - 1;

    if (STEPS[currentStep].id === 'crucifixo') {
      const hasText = customization.frase && customization.frase.length > 0;
      if (!hasText) {
      const letrasIndex = STEPS.findIndex(s => s.id === 'letras');
      if (prevIndex === letrasIndex) prevIndex--;
      }
    }

    if (prevIndex >= 0) {
      setDirection(-1);
      setCurrentStep(prevIndex);
    }
  };

  const handleSelectAndAdvance = (key: string, value: any) => {
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
    const available = products.crucifixos.filter(c => c.available);
    return available.reduce((groups: Record<string, Crucifixos[]>, item) => {
      const key = item.style || 'Outros';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }, [products]);

  const groupedEntremeios = useMemo(() => {
    const available = products.entremeios.filter(e => e.available);
    return available.reduce((groups: Record<string, Entremeios[]>, item) => {
      const key = item.style || 'Outros';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }, [products]);

  const renderStepContent = () => {
    const stepId = STEPS[currentStep].id;

    switch (stepId) {
      case 'cordao':
        return (
          <div className="grid grid-cols-2 gap-4">
            {products.cordoes.filter(c => c.available).map((cordao) => (
              <button
                key={cordao.id}
                onClick={() => handleSelectAndAdvance('cordao', cordao.ref)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  customization?.cordao === cordao.ref ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-3 shadow-sm border-2 border-white" style={{ backgroundColor: cordao.color }} />
                <span className="block font-medium text-gray-800">{cordao.name}</span>
                <span className="text-xs text-gray-400">Ref: {cordao.ref}</span>
                {customization?.cordao === cordao.ref && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
            ))}
          </div>
        );

      case 'contas':
        return (
          <div className="grid grid-cols-2 gap-4">
            {products.contas.filter(c => c.available).map((conta) => (
              <button
                key={conta.id}
                onClick={() => handleSelectAndAdvance('conta', conta.ref)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                  customization?.conta === conta.ref ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <Image src={conta.img} alt={conta.ref} fill className="object-contain rounded-lg" sizes='' />
                </div>
                <span className="text-xs text-gray-400">Ref: {conta.ref}</span>
                {customization?.conta === conta.ref && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
            ))}
          </div>
        );

      case 'texto':
        return (
          <div className="flex flex-col gap-4">
            <MultiTextInput />
            <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
              <p>Dica: O máximo de letras por mistério é 10.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
              <p>Dica²: Dependendo da quantidade de letras/palavras será acrescido um valor ao valor final.</p>
            </div>
          </div>
        );

      case 'letras':
        return (
          <div className="grid grid-cols-2 gap-4">
            {products.letras.filter(l => l.available).map((letra) => (
              <button
                key={letra.id}
                onClick={() => handleSelectAndAdvance('styleLetra', letra.ref)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  customization?.styleLetra === letra.ref ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {/* <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-black flex items-center justify-center text-white font-bold text-xl">
                  ABC
                </div> */}
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <Image src={letra.img} alt={letra.ref} fill className="object-contain rounded-lg" sizes='' />
                </div>
                <span className="text-xs text-gray-400">Ref: {letra.ref}</span>
                {customization?.styleLetra === letra.ref && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
            ))}
          </div>
        );

      case 'crucifixo':
        return (
          <div className="space-y-6">
            {Object.entries(groupedCrucifixos).map(([style, items]) => (
              <div key={style}>
                <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{style}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {items.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectAndAdvance('crucifixo', c.ref)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        customization?.crucifixo === c.ref ? 'border-blue-600 bg-blue-50' : 'border-gray-100'
                      }`}
                    >
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-2" /> 
                      {/* Placeholder Image acima */}
                      <span className="text-sm font-semibold block">{c.ref}</span>
                      <span className="text-xs text-gray-500">{c.style}</span>
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
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-gray-400 hover:bg-gray-50"
            >
                Prefiro sem Entremeio (Pular)
            </button>
            
            {Object.entries(groupedEntremeios).map(([style, items]) => (
              <div key={style}>
                 <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{style}</h4>
                 <div className="grid grid-cols-2 gap-3">
                  {items.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => handleSelectAndAdvance('entremeio', e.ref)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        customization?.entremeio === e.ref ? 'border-blue-600 bg-blue-50' : 'border-gray-100'
                      }`}
                    >
                       <div className="w-full h-24 bg-gray-200 rounded-lg mb-2" />
                       <span className="text-sm font-semibold block">{e.name}</span>
                       <span className="text-xs text-gray-500">{e.ref}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'final':
        return (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
               <Check size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Tudo pronto!</h3>
            <p className="text-gray-500 mb-8">Sua personalização foi concluída. Clique abaixo para ver o resumo completo.</p>
            
            <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-full"
            >
               <CustomizationCatalogButton onClick={() => setExpandedSidebar(true)} />
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-gray-50 flex flex-col md:flex-row font-sans rounded-xl m-4">
      <main className="flex flex-col flex-1 mx-auto min-h-[87vh] w-full p-4 md:p-8">
        <header className="mb-8">
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{STEPS[currentStep].title}</h2>
              <p className="text-gray-400 mt-1 text-sm">{STEPS[currentStep].subtitle}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 relative overflow-x-hidden p-1"> 
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
        
        <footer className="mt-8 flex justify-between items-center py-4 border-t border-gray-200 bg-gray-50 z-5">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 0 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={20} />
            Voltar
          </button>

          {currentStep < STEPS.length - 1 && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              {STEPS[currentStep].id === 'texto' ? 'Pular / Continuar' : 'Próximo'}
              <ChevronRight size={20} />
            </button>
          )}
        </footer>
      </main>

      <Sidebar open={expandedSidebar} onClose={() => setExpandedSidebar(false)} />
    </div>
  );
};

export default RosarioWizard;