'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  useCustomization 
} from '@/data/context/CustomizationContext';
import { useCart } from '@/data/context/CartContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  ShoppingCart, 
  Trash
} from 'lucide-react';
import CardCustomization from './CardCustomization';
import MultiTextInput from './inputs/MultiTexts';
import ProductModel from '@/data/models/Product.model';
import { 
  CustomizationItemsModel 
} from '@/data/models/CustomizationItems.model';
import { 
  CustomizationItemsCategoryModel 
} from '@/data/models/CustomizationItemsCategory';
import { 
  CustomizationItemConfig, 
  Step
} from '@/data/types/customization.type';
import CustomModal from './modals/CustomModal';
import WizardStepsBreadcrumb from './WizardStepsBreadcrumb';
import { calculateCustomizationPrice } from '@/data/functions/calculateCustomizationPrice';

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
    subtitle: 'Escolha o modelo do Crucifixo.', 
    isGrouped: true 
  },
  'entremeios': { 
    subtitle: 'Escolha um modelo de Entremeio.', 
    isGrouped: true, 
  },
  'letras': {
    subtitle: 'Escolha o design das letras.',
    isGrouped: true,
  },
  'cordoes': { 
    subtitle: 'Escolha a cor do Cordão.',
    isGrouped: true,
  },
  'contas': { 
    subtitle: 'Escolha a cor das Contas (Ave Maria).',
    isGrouped: true,
  },
  'contas_talhadas': { 
    subtitle: 'Escolha o estilo das Contas Talhadas (Podem ser usadas como contas maiores ou menores).',
    isGrouped: true,
  },
  'texto_personalizado': { 
    subtitle: 'Escreva o nome ou palavra desejada para criar uma personalização única.',
    isGrouped: true,
  },
  'embalagens': { 
    subtitle: 'Precisa de embalagem para presente? Escolha a opção desejada.',
    isGrouped: true,
  },
  'final': { 
    subtitle: 'Confira seu pedido antes de finalizar.' 
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
  const [
    isPendingCustomizationModalOpen, 
    setPendingCustomizationModalOpen
  ] = useState(Object.keys(customization).length > 0 && true);
  const [
    isDeleteCustomizationModalOpen, 
    setDeleteCustomizationModalOpen
  ] = useState(false);
  const [
    isOpenImageHelperModal, 
    setIsOpenImageHelperModal
  ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const wizardSteps = useMemo(() => {
    const defaultCategoryOrder: Record<string, number> = {
      'contas_menores_(ave-maria)': 1,
      'contas_maiores_(pai_nosso)': 2,
      entremeios: 3,
      crucifixos: 4,
      letras: 5,
      'micangas_p/_acabamentos': 6,
      cordoes: 7,
      embalagens: 999,
    };

    const categoriesMap = new Map(
      categories.map((category) => [category.category_name, category])
    );

    const productConfigItems = [...(baseProduct.customization_items ?? [])]
      .filter((item) => item.available)
      .sort((a, b) => {
        const categoryA = categoriesMap.get(a.category);
        const categoryB = categoriesMap.get(b.category);

        const orderA =
          categoryA?.display_order ??
          defaultCategoryOrder[a.category] ??
          1000;

        const orderB =
          categoryB?.display_order ??
          defaultCategoryOrder[b.category] ??
          1000;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return (a.category_name || a.category).localeCompare(
          b.category_name || b.category,
          'pt-BR',
          { sensitivity: 'base' }
        );
      });

    const steps = productConfigItems.flatMap((configItem) => {
      const categoryData = categoriesMap.get(configItem.category);

      const uiData = UI_METADATA[configItem.category];

      const fallbackDisplayName =
        configItem.category_name ||
        configItem.category
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

      const displayName = categoryData?.name ?? fallbackDisplayName;

      const displaySubtitle =
        categoryData?.description ??
        uiData?.subtitle ??
        `Selecione uma opção de ${displayName}.`;

      const currentStep = {
        id: configItem.category,
        imageHelper: categoryData?.image_url ?? '',
        title: displayName,
        subtitle: displaySubtitle,
        isGrouped: true,
        isOptional: !configItem.required,
        isVirtual: false,
      };

      if (configItem.category === 'letras') {
        return [
          {
            id: 'texto_personalizado',
            imageHelper: '',
            title: 'Personalização',
            subtitle: UI_METADATA['texto_personalizado']?.subtitle ?? '',
            isGrouped: false,
            isOptional: true,
            isVirtual: true,
          },
          currentStep,
        ];
      }

      return [currentStep];
    });

    steps.push({
      id: 'final',
      imageHelper: '',
      title: 'Revisão',
      subtitle: UI_METADATA['final']?.subtitle ?? '',
      isGrouped: false,
      isOptional: false,
      isVirtual: true,
    });

    return steps;
  }, [baseProduct.customization_items, categories]);

  const currentStep = wizardSteps[currentStepIndex];

  const handleNext = () => {
    if (!currentStep) return;

    const nextIndex = currentStepIndex + 1;
    const hasText = customization.frase && customization.frase.length > 0;

    if (wizardSteps[nextIndex]?.id === 'letras' && !hasText) {
      setDirection(1);
      setCurrentStepIndex(prev => prev + 2);
      return;
    };

    if (currentStepIndex < wizardSteps.length - 1) {
      setDirection(1);
      setCurrentStepIndex(prev => prev + 1);
    };
  };

  const handleBack = () => {
    if (!currentStep) return;

    const prevIndex = currentStepIndex - 1;
    const hasText = customization.frase && customization.frase.length > 0;

    if (wizardSteps[prevIndex]?.id === 'letras' && !hasText) {
      setDirection(-1);
      setCurrentStepIndex(prev => prev - 2);
      return;
    };

    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(prev => prev - 1);
    } else {
      setDeleteCustomizationModalOpen(true);
    };
  };

  const handleStepClick = (step: Step) => {
    setCurrentStepIndex(wizardSteps.findIndex(
      s => s.id === step.id
    ));
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

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      if (!checkCompletion()) {
        toast.error("Por favor, preencha todos os itens obrigatórios. (*)");
        return;
      };
  
      const finalPrice = await calculateCustomizationPrice(baseProduct, customization);
  
      addItem({
        id: baseProduct.id,
        name: baseProduct.name,
        price: baseProduct.initial_price,
        customizationPrice: finalPrice || 0,
        image: baseProduct?.images_url?.[0] || "",
        customizable: true
      }, customization);
  
      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao adicionar produto ao carrinho!");
    } finally {
      setIsLoading(false);
    };
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
        <div className="flex flex-col gap-2 mt-4">
          <div className="bg-white py-3 px-4 rounded-lg text-xs text-primary font-medium">
            <p>{`Dica¹: Dependendo da quantidade de letras/palavras, poderá ser cobrado um VALOR EXTRA.`}</p>
          </div>
          <div className="bg-white py-3 px-4 rounded-lg text-xs text-primary font-medium">
            <p>{`Dica²: 1 (uma) palavra com até 10 letras não afetará o VALOR FINAL.`}</p>
          </div>
          <div className="bg-white py-3 px-4 rounded-lg text-xs text-primary font-bold">
            <p>{`Dica³: O máximo de letras por mistério é 10.`}</p>
          </div>
          <MultiTextInput product={baseProduct} />
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

          <div className="flex flex-col">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {completed ? "Tudo pronto!" : "Personalização incompleta"}
            </p>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              {completed 
                ? "Sua personalização foi concluída com sucesso." 
                : "Você precisa selecionar todos os itens obrigatórios (*) para continuar."}
            </p>
          </div>

          {completed && (
            <button 
              onClick={handleAddToCart}
              className={`flex w-full md:w-1/2 items-center justify-center px-4 py-3 transition-colors
                bg-primary text-white rounded-xl font-bold gap-3 shadow-lg hover:bg-primary/90 
                ${!completed ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${isLoading ? 'cursor-wait' : ''}
              `}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}</span>
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
        className={`w-full px-3 py-2 border-2 border-dashed mb-4
          border-gray-300 rounded-xl text-gray-500 font-medium 
          hover:border-gray-400 hover:bg-gray-50 transition-colors 
          flex items-center justify-center gap-2 cursor-pointer text-sm
        `}
      >
        <span>Prefiro sem {currentStep.title} (Pular)</span>
      </button>
    );

    if (currentStep.isGrouped) {
      const grouped = getGroupedItems(stepItems);

      return (
        <div className="space-y-6 pb-4 pt-4">
          {renderSkipButton}
          
          {Object.entries(grouped).map(([style, items]) => (
            <div key={style}>
              <h4 className={`text-xs font-bold mb-3 uppercase
                text-gray-400 tracking-wider pl-1 border-b pb-1`}
              >
                {style}
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map(item => (
                  <CardCustomization 
                    key={item.id} 
                    item={item} 
                    isSelected={customization[
                      currentStep.id as keyof typeof customization
                    ] === item.ref}
                    onSelect={() => handleSelectAndAdvance(currentStep.id, item.ref)}
                  />
                ))}
              </div>
            </div>
          ))}

          {stepItems.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              Nenhum item disponível nesta categoria.
            </p>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col pt-4 pb-4">
        {renderSkipButton}

        <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
          {stepItems.map(item => (
            <CardCustomization 
              key={item.id} 
              item={item} 
              isSelected={customization[
                currentStep.id as keyof typeof customization
              ] === item.ref}
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
      className={`flex flex-col font-sans overflow-hidden rounded-xl
        bg-gray-50 border border-gray-100 shadow-sm w-full h-full
      `}
    >
      <header className={`shrink-0 z-10 border-b 
        border-gray-200 bg-white p-4 w-full`}
      >
        <div className="hidden lg:block mb-4">
          <WizardStepsBreadcrumb
            steps={wizardSteps}
            currentStep={currentStep}
            onStepClick={(e) => handleStepClick(e)}
          />
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
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
            className="text-xl md:text-2xl font-bold text-gray-900 mt-2"
          >
            {currentStep?.title} {currentStep?.isOptional ? '' : '*'}
          </motion.h2>

          <motion.div 
            key={currentStep?.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-sm"
          >
            <div className='flex text-xs md:text-sm items-center gap-1'>
              <span>{currentStep?.subtitle}</span>
              {currentStep.imageHelper && (
                <button 
                  type="button"
                  aria-label="Exemplo"
                  title="Veja um exemplo"
                  onClick={() => setIsOpenImageHelperModal(true)}
                  className={`flex items-center text-primary 
                    hover:text-primary/80 text-sm font-medium cursor-pointer
                  `}
                >
                  <span className='hover:underline'>(?)</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 flex flex-col min-h-0 overflow-hidden px-6 relative">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
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
      </main>

      <footer 
        className={`shrink-0 flex justify-end z-10
          border-t border-gray-200 bg-white p-3 w-full
        `}
      >
        <div className='flex justify-end gap-4 w-full lg:w-1/2'>
          {Object.keys(customization).length > 0 && (
            <button
              onClick={() => {
                resetCustomization();
                setCurrentStepIndex(0);
                toast.success("Sua personalização foi limpa com sucesso.");
              }}
              className={`flex flex-1 items-center justify-center gap-2 sm:px-4 sm:py-3 rounded-xl font-medium 
                text-white bg-red-400 hover:bg-red-500 cursor-pointer transition-colors 
              `}
            >
              <Trash size={18} />
              <span className='hidden sm:block'>
                Limpar
              </span>
            </button>
          )}

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
        </div>
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
              aria-label="Salvar"
              onClick={() => {
                setDeleteCustomizationModalOpen(false);
                router.back();
              }}
              className={`flex w-full px-4 py-2 rounded-lg items-center justify-center
                bg-primary hover:bg-primary/90 text-white font-medium cursor-pointer 
              `}
            >
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </CustomModal>

      <CustomModal
        modalOpen={isPendingCustomizationModalOpen}
        onClose={() => setPendingCustomizationModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center p-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-lg">
              Já existe uma personalização pendente. 
            </p>
            <span className="font-medium text-sm text-secondary">
              Deseja usar os itens anteriores na sua nova personalização?
            </span>
          </div>

          <div className="flex w-full items-center justify-end gap-2">
            <button 
              type="button"
              aria-label="Não"
              onClick={() => {
                setPendingCustomizationModalOpen(false);
                resetCustomization();
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
                setPendingCustomizationModalOpen(false);
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
    </div>
  );
};