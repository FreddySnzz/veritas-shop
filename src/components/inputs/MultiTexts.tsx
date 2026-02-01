'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useCustomization } from "@/data/context/CustomizationContext";
import { onlyLetters } from '@/data/functions/inputMasks';

export default function MultiTextInput() {
  const { customization, updateCustomization } = useCustomization();
  const [texts, setTexts] = useState<string[]>(customization.frase || ['']);

  const handleAdd = () => {
    if (texts.length < 5) {
      setTexts([...texts, ""]);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const newTexts = texts.filter((_, index) => index !== indexToRemove);
    setTexts(newTexts);
    updateCustomization({ frase: newTexts });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (indexToUpdate: number, value: any) => {
    const newTexts = [...texts];
    newTexts[indexToUpdate] = value;
    setTexts(newTexts);
  };

  const handleSubmitText = () => {
    updateCustomization({ frase: texts });
  };

  return (
    <section id='texts' className="bg-white rounded-2xl p-4">
      <div className="flex flex-col gap-3 w-full">
        {texts.map((text, index) => (
          <div key={index} className="flex gap-1 items-center">
            <input
              type="text"
              value={text}
              className="bg-background-alternative-v2 text-secondary font-bold py-2 px-3 rounded-lg cursor-text flex-1 focus:outline-0"
              onChange={(e) => handleChange(index, onlyLetters(e.target.value))}
              placeholder={`Texto ${index + 1}`}
              maxLength={10}
              title="Por favor, digite apenas letras e números"
              onBlur={handleSubmitText}
            />
            
            <button 
              onClick={() => handleRemove(index)}
              title="Remover este texto"
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <MinusCircle className="text-red-500 w-6 h-6" />
            </button>
          </div>
        ))}

        {texts.length < 5 && (
          <div className={`flex ${texts.length === 0 ? 'justify-center' : 'justify-center'} mt-1`}>
            <button 
              onClick={handleAdd} 
              className="flex items-center gap-2 text-secondary font-semibold hover:opacity-80 transition-opacity"
            >
              <PlusCircle className="text-secondary w-6 h-6 cursor-pointer" />
              <span>Adicionar Texto</span>
            </button>
          </div>
        )}
        
        {texts.length === 5 && (
          <span className="text-xs text-red-400 text-center">
            Limite máximo de 5 textos atingido.
          </span>
        )}
      </div>
    </section>
  );
}