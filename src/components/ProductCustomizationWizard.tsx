'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCustomization } from '@/data/context/CustomizationContext';
import { useCart } from '@/data/context/CartContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, X, ShoppingCart } from 'lucide-react';
import CardCustomization from './CardCustomization';
import MultiTextInput from './inputs/MultiTexts';
import ProductModel from '@/data/models/Product.model';
import { CustomizationItemsModel } from '@/data/models/CustomizationItems.model';
import { CustomizationItemsCategoryModel } from '@/data/models/CustomizationItemsCategory';
import { CustomizationItemConfig } from '@/data/types/customization.type';
import CustomModal from './modals/CustomModal';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

interface ProductCustomizerProps {
  baseProduct: Omit<ProductModel, 'customization_items'> & {
    customization_items?: CustomizationItemConfig[];
  };
  customizationItems: CustomizationItemsModel[];
  categories: CustomizationItemsCategoryModel[];
};

interface UIMetadata {
  subtitle?: string;
  isGrouped?: boolean;
};

const UI_METADATA: Record<string, UIMetadata> = {
  'crucifixos': { 
    subtitle: 'Escolha o modelo do Crucifixo', 
    isGrouped: true 
  },
  'entremeios': { 
    subtitle: 'Escolha um modelo de Entremeio', 
    isGrouped: true, 
  },
  'letras': {
    subtitle: 'Escolha o design das letras',
    isGrouped: true,
  },
  'cordoes': { 
    subtitle: 'Escolha a cor do Cordão' 
  },
  'contas': { 
    subtitle: 'Escolha a cor das Contas (Ave Maria)'
  },
  'contas_talhadas': { 
    subtitle: 'Escolha o estilo das Contas Talhadas (Podem ser usadas nas contas maiores ou menores).',
    isGrouped: true,
  },
  'texto_personalizado': { 
    subtitle: 'Escreva o nome ou palavra desejada para criar uma personalização única.' 
  },
  'final': { 
    subtitle: 'Confira seu pedido antes de finalizar' 
  },
};

export default function ProductCustomizerWizard({
  baseProduct, 
  customizationItems,
  categories 
}: ProductCustomizerProps) {
  const { 
    customization, 
    updateCustomization, 
    isComplete, 
    resetCustomization 
  } = useCustomization();
  const { addItem } = useCart();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDeleteCustomizationModalOpen, setDeleteCustomizationModalOpen] = useState(false);
  const [isOpenImageHelperModal, setIsOpenImageHelperModal] = useState(false);
  const router = useRouter();

  const wizardSteps = useMemo(() => {
    const productConfigItems = baseProduct.customization_items || [];
    
    const steps = productConfigItems.map((configItem) => {
      const categoryData = categories.find(category => category.category_name === configItem.category);
      const uiData = UI_METADATA[configItem.category];
      
      const displayName = categoryData?.name || configItem.category.charAt(0).toUpperCase() + configItem.category.slice(1);
      const displaySubtitle = uiData?.subtitle || `Selecione uma opção de ${displayName}`;

      return {
        id: configItem.category,
        imageHelper: categoryData?.image_url,
        title: displayName,
        subtitle: displaySubtitle,
        isGrouped: uiData?.isGrouped || false,
        isOptional: !configItem.required, 
        isVirtual: false
      };
    });

    const letrasIndex = steps.findIndex(step => step.id === 'letras');

    if (letrasIndex !== -1) {
      steps.splice(letrasIndex, 0, { 
        id: 'texto_personalizado', 
        imageHelper: '',
        title: 'Personalização', 
        subtitle: UI_METADATA['texto_personalizado'].subtitle || '',
        isGrouped: false,
        isOptional: true,
        isVirtual: true
      });
    };

    steps.push({ 
      id: 'final', 
      imageHelper: '',
      title: 'Revisão', 
      subtitle: UI_METADATA['final'].subtitle || '',
      isGrouped: false, 
      isOptional: false,
      isVirtual: true
    });

    return steps;
  }, [baseProduct.customization_items, categories]);

  const currentStep = wizardSteps[currentStepIndex];

  const handleNext = () => {
    if (!currentStep) return;

    if (currentStep.id === 'texto_personalizado') {
      const hasText = customization.frase && customization.frase.length > 0;
      if (!hasText) {
        const nextIndex = currentStepIndex + 1;
        if (wizardSteps[nextIndex]?.id === 'letras') {
          setDirection(1);
          setCurrentStepIndex(nextIndex + 1); 
          return;
        };
      };
    };

    if (currentStepIndex < wizardSteps.length - 1) {
      setDirection(1);
      setCurrentStepIndex(prev => prev + 1);
    };
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(prev => prev - 1);
    } else {
      return setDeleteCustomizationModalOpen(true);
    };
  };

  const handleSelectAndAdvance = (
    categoryKey: string, 
    itemRef: string | null
  ) => {
    if (itemRef !== null && customization[categoryKey as keyof typeof customization] === itemRef) {
      updateCustomization({[categoryKey]: undefined });
      return; 
    };

    updateCustomization({ 
      [categoryKey]: itemRef === null ? undefined : itemRef 
    });

    setTimeout(() => {
      handleNext();
    }, 250);
  };

  const checkCompletion = () => {
    const configItems = baseProduct.customization_items || [];
    
    const mandatoryKeys = configItems
      .filter(item => item.required)
      .map(item => item.category);
      
    return isComplete(mandatoryKeys, []);
  };

  const handleAddToCart = () => {
    if (!checkCompletion()) {
      toast.error("Por favor, preencha todos os itens obrigatórios. (*)");
      return;
    };

    addItem({
      id: baseProduct.id,
      name: baseProduct.name,
      price: baseProduct.initial_price,
      image: baseProduct?.images_url?.[0] || "",
      customizable: true
    }, customization);

    toast.success("Produto adicionado ao carrinho!");
  };

  const getItemsForCurrentStep = () => {
    if (!currentStep) return [];
    return customizationItems.filter(item => 
      item.category === currentStep.id && item.available
    );
  };

  const getGroupedItems = (items: CustomizationItemsModel[]) => {
    return items.reduce((groups: Record<string, CustomizationItemsModel[]>, item) => {
      const style = item.metadata?.style || 'Outros';

      if (!groups[style]) {
        groups[style] = []
      };

      groups[style].push(item);
      return groups;
    }, {});
  };

  const renderContent = () => {
    if (!currentStep) return null;

    if (currentStep.id === 'texto_personalizado') {
      return (
        <div className="flex flex-col gap-4">
          <MultiTextInput />
          <div className="bg-green-50 p-2 rounded-xl text-xs text-primary">
            <p>Dica¹: Caso adicione mais de uma palavra, será incluso um VALOR EXTRA.</p>
          </div>
          <div className="bg-green-50 p-2 rounded-xl text-xs text-primary">
            <p>Dica²: O máximo de letras por mistério é 10.</p>
          </div>
          <div className="bg-green-50 p-2 rounded-xl text-xs text-primary">
            <p>Dica³: Dependendo da quantidade de letras/palavras será acrescido um valor ao valor final.</p>
          </div>
        </div>
      );
    };

    if (currentStep.id === 'final') {
      const completed = checkCompletion();

      return (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 
              ${completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
            `}
          >
            {completed ? <Check size={40} /> : <X size={40} />}
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {completed ? "Tudo pronto!" : "Personalização incompleta"}
          </p>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            {completed 
              ? "Sua personalização foi concluída com sucesso." 
              : "Você precisa selecionar todos os itens obrigatórios para continuar."}
          </p>

          {completed && (
            <button 
              onClick={handleAddToCart}
              className={`flex w-full items-center justify-center px-4 py-3 transition-colors
                bg-primary text-white rounded-xl font-bold gap-3 shadow-lg hover:bg-primary/90 
                ${!completed ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </button>
          )}
        </div>
      );
    };

    const stepItems = getItemsForCurrentStep();
    
    const renderSkipButton = currentStep.isOptional && (
      <button 
        type="button"
        aria-label="Pular"
        title="Pular"
        onClick={() => handleSelectAndAdvance(currentStep.id, null)}
        className={`w-full p-3 mb-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium 
          hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer
        `}
      >
        <span>Prefiro sem {currentStep.title}</span>
      </button>
    );

    if (currentStep.isGrouped) {
      const grouped = getGroupedItems(stepItems);

      return (
        <div className="space-y-6 pb-4">
          {renderSkipButton}
          
          {Object.entries(grouped).map(([style, items]) => (
            <div key={style}>
              <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider pl-1 border-b pb-1">
                {style}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {items.map(item => (
                  <CardCustomization 
                    key={item.id} 
                    item={item} 
                    isSelected={customization[currentStep.id as keyof typeof customization] === item.ref}
                    onSelect={() => handleSelectAndAdvance(currentStep.id, item.ref)}
                  />
                ))}
              </div>
            </div>
          ))}

          {stepItems.length === 0 && (
            <p className="text-center text-gray-400 py-10">Nenhum item disponível nesta categoria.</p>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col pb-4">
        {renderSkipButton}

        <div className="grid grid-cols-2 gap-4">
          {stepItems.map(item => (
            <CardCustomization 
              key={item.id} 
              item={item} 
              isSelected={customization[currentStep.id as keyof typeof customization] === item.ref}
              onSelect={() => handleSelectAndAdvance(currentStep.id, item.ref)}
            />
          ))}
        </div>
          {stepItems.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              Nenhum item disponível nesta categoria.
            </p>
          )}
      </div>
    );
  };

  if (!baseProduct.customization_items) {
    return (
      <div className="p-8 text-center text-gray-500">
        Configuração de produto inválida ou incompleta.
      </div>
    );
  };

  const progressPercentage = ((currentStepIndex + 1) / wizardSteps.length) * 100;
  
  return (
    <div 
      className={`flex flex-col font-sans h-full overflow-hidden rounded-xl m-4 
        bg-gray-50 border border-gray-100 shadow-sm
      `}
    >
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden m-6 relative">
        <header className="shrink-0 mb-6 z-10">
          <div className="w-full bg-gray-200 h-1.5 rounded-full mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div>
            <motion.h2 
              key={currentStep?.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900"
            >
              {currentStep?.title} {currentStep?.isOptional ? '' : '*'}
            </motion.h2>

            <motion.div 
              key={currentStep?.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-sm mt-1"
            >
              <div className='flex items-center gap-1'>
                <span>{currentStep?.subtitle}</span>
                {currentStep.imageHelper && (
                  <button 
                    type="button"
                    aria-label="Exemplo"
                    title="Veja um exemplo"
                    onClick={() => setIsOpenImageHelperModal(true)}
                    className="flex items-center text-primary hover:text-primary/80 text-sm font-medium cursor-pointer"
                  >
                    <span className='hover:underline'>(?)</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={currentStepIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full min-h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer 
          className={`shrink-0 mt-4 pt-4 flex justify-between gap-4 z-10
            border-t border-gray-200 bg-gray-50
          `}
        >
          <button
            onClick={handleBack}
            className={`flex flex-1 items-center justify-center gap-1 px-4 py-3 rounded-xl font-medium 
              text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors 
            `}
          >
            <ChevronLeft size={18} />
            <span>Voltar</span>
          </button>

          {currentStepIndex < wizardSteps.length - 1 && (
            <button
              onClick={handleNext}
              className={`flex flex-1 items-center justify-center gap-1 px-4 py-3 rounded-xl font-medium 
                text-white bg-secondary hover:bg-secondary/90 shadow-sm cursor-pointer transition-colors 
              `}
            >
              <span>Próximo</span>
              <ChevronRight size={18} />
            </button>
          )}
        </footer>

        <CustomModal
          modalOpen={isOpenImageHelperModal}
          onClose={() => setIsOpenImageHelperModal(false)}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0 }}
            className="flex flex-col items-center justify-center p-2 gap-4 transition-all"
          >
            <div className="relative w-full h-80 shrink-0">
              <Image
                src={currentStep?.imageHelper || ''}
                alt="preview"
                draggable="false"
                fill
                loading="eager"
                className="aspect-square rounded-lg object-cover shadow-sm"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="flex w-full items-center justify-end gap-2">
              <button 
                type="button"
                onClick={() => setIsOpenImageHelperModal(false)}
                className="flex w-full px-4 py-2 rounded-lg bg-gray-100 items-center justify-center font-medium cursor-pointer"
              >
                <span>Fechar</span>
              </button>
            </div>
          </motion.div>
        </CustomModal>

        <CustomModal
          modalOpen={isDeleteCustomizationModalOpen}
          onClose={() => setDeleteCustomizationModalOpen(false)}
        >
          <div className="flex flex-col items-center justify-center p-2 gap-4">
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold">
                Deseja salvar sua personalização?
              </p>
              <span className="text-xs text-gray-400">
                Sua personalização ficará salva para quando voltar.
              </span>
            </div>

            <div className="flex w-full items-center justify-end gap-2">
              <button 
                type="button"
                aria-label="Não"
                onClick={() => {
                  setDeleteCustomizationModalOpen(false);
                  resetCustomization();
                  router.back();
                }}
                className={`flex w-full px-4 py-2 rounded-lg items-center justify-center 
                  bg-gray-100 hover:bg-gray-200 font-medium cursor-pointer
                `}
              >
                <span>Não</span>
              </button>
              <button 
                type="button"
                aria-label="Sim"
                onClick={() => {
                  setDeleteCustomizationModalOpen(false);
                  router.back();
                }}
                className={`flex w-full px-4 py-2 rounded-lg items-center justify-center
                  bg-primary hover:bg-primary/90 text-white font-medium cursor-pointer 
                `}
              >
                <span>Sim</span>
              </button>
            </div>
          </div>
        </CustomModal>
      </main>
    </div>
  );
};