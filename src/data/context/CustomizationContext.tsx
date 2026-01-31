'use client';

import { 
  createContext, 
  useContext, 
  ReactNode, 
  useSyncExternalStore
} from 'react';
import { useLocalStorage } from '@/data/hook/useLocalStorage';

export interface CustomizationState {
  frase?: string[]; 
  [categoryKey: string]: string | string[] | undefined | number; 
};

const INITIAL_CUSTOMIZATION: CustomizationState = {};

interface CustomizationContextType {
  customization: CustomizationState;
  updateCustomization: (updates: Partial<CustomizationState>) => void;
  resetCustomization: () => void;
  isComplete: (requiredItems?: string[], optionalItems?: string[]) => boolean;
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

  const [storedCustomization, setStoredCustomization] = useLocalStorage<CustomizationState>(
    'product_customization',
    INITIAL_CUSTOMIZATION
  );

  const updateCustomization = (updates: Partial<CustomizationState>) => {
    setStoredCustomization(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetCustomization = () => {
    setStoredCustomization(INITIAL_CUSTOMIZATION);
  };

  const currentCustomization = isMounted ? storedCustomization : INITIAL_CUSTOMIZATION;

  const isComplete = (
    requiredItems: string[] = [], 
    optionalItems: string[] = ['texto_personalizado', 'letras', 'final']
  ) => {
    if (!requiredItems.length) return true;

    const mandatoryItems = requiredItems.filter(item => !optionalItems.includes(item));

    return mandatoryItems.every((key) => {
      const value = currentCustomization[key];
      
      if (Array.isArray(value)) return value.length > 0;
      
      return value !== null && value !== undefined && value !== '';
    });
  };

  if (!isMounted) return null; 

  return (
    <CustomizationContext.Provider
      value={{
        customization: currentCustomization,
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