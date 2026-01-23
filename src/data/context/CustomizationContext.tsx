'use client';

import { 
  createContext, 
  useContext, 
  ReactNode, 
  useSyncExternalStore
} from 'react';
import { useLocalStorage } from '@/data/hook/useLocalStorage';
import { Customization } from '@/data/types/customization.type';

const INITIAL_CUSTOMIZATION: Customization = {
  cordao: undefined,
  conta: undefined,
  styleLetra: undefined,
  crucifixo: undefined,
  entremeio: undefined,
  frase: undefined,
  product: undefined,
};

interface CustomizationContextType {
  customization: Customization;
  updateField: <K extends keyof Customization>(field: K, value: Customization[K]) => void;
  updateCustomization: (updates: Partial<Customization>) => void;
  resetCustomization: () => void;
  isComplete: () => boolean;
  isLoaded: boolean;
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);
const emptySubscribe = () => () => {};

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [storedCustomization, setStoredCustomization] = useLocalStorage<Customization>(
    'product_customization',
    INITIAL_CUSTOMIZATION
  );

  const updateField = <K extends keyof Customization>(
    field: K,
    value: Customization[K]
  ) => {
    setStoredCustomization(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCustomization = (updates: Partial<Customization>) => {
    setStoredCustomization(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetCustomization = () => {
    setStoredCustomization(INITIAL_CUSTOMIZATION);
  };

  const currentCustomization = isMounted ? storedCustomization : INITIAL_CUSTOMIZATION;

  const isComplete = () => {
    const itemsToCheck = currentCustomization.customizationItems || []; 
    const OPTIONAL_STEPS = ['final', 'texto', 'letra', 'entremeio'];
    const STEP_TO_STATE_KEY: Record<string, string> = {
      'cordao': 'cordao',
      'conta': 'conta', 
      'letra': 'letra',  
      'crucifixo': 'crucifixo',
      'entremeio': 'entremeio',
      'texto': 'frase'
    };

    return itemsToCheck.every((stepId) => {
      if (OPTIONAL_STEPS.includes(stepId)) return true;

      const stateKey = STEP_TO_STATE_KEY[stepId] || stepId;
      const value = currentCustomization[stateKey as keyof typeof currentCustomization];

      return value !== null && value !== undefined && value !== '';
    });
  };

  if (!isMounted) return null; 

  return (
    <CustomizationContext.Provider
      value={{
        customization: currentCustomization,
        updateField,
        updateCustomization,
        resetCustomization,
        isComplete,
        isLoaded: isMounted,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export function useCustomization() {
  const context = useContext(CustomizationContext);
  
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  };
  
  return context;
};