'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/data/hook/useLocalStorage';
import { Customization } from '@/data/types/customization.type';

const INITIAL_CUSTOMIZATION: Customization = {
  cordao: undefined,
  conta: undefined,
  styleLetra: undefined,
  crucifixo: undefined,
  entremeio: undefined,
  frase: undefined,
};

interface CustomizationContextType {
  customization: Customization;
  updateField: <K extends keyof Customization>(field: K, value: Customization[K]) => void;
  updateCustomization: (updates: Partial<Customization>) => void;
  resetCustomization: () => void;
  isComplete: () => boolean;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [customization, setCustomization] = useLocalStorage<Customization>(
    'custom_rosario',
    INITIAL_CUSTOMIZATION
  );

  const updateField = <K extends keyof Customization>(
    field: K,
    value: Customization[K]
  ) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCustomization = (updates: Partial<Customization>) => {
    setCustomization(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetCustomization = () => {
    setCustomization(INITIAL_CUSTOMIZATION);
  };

  const isComplete = () => {
    return Boolean(
      customization.cordao &&
      customization.conta &&
      customization.crucifixo
    );
  };

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        updateField,
        updateCustomization,
        resetCustomization,
        isComplete,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  
  return context;
}