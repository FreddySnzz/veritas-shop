'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useCustomization } from "@/data/context/CustomizationContext";
import { onlyLetters } from '@/data/functions/inputMasks';
import ProductModel from '@/data/models/Product.model';
import { removeAccentsAndSpaces } from '@/data/functions/removeAccentsAndSpaces';

interface MultiTextInputProps {
  product: ProductModel;
};

export default function MultiTextInput({ product }: MultiTextInputProps) {
  const { customization, updateCustomization } = useCustomization();
  const [texts, setTexts] = useState<string[]>(customization.frase || ['']);
  const textLimit = removeAccentsAndSpaces((product.name).toLowerCase()).includes('rosario') ? 20 : 5;
  
  const handleAdd = () => {
    if (textLimit === 20) {
      if (texts.length < 20) {
        setTexts([...texts, ""]);
      }
    } else {
      if (texts.length < 5) {
        setTexts([...texts, ""]);
      }
    };
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
    <section 
      id='texts' 
      className={`bg-white dark:bg-zinc-600 rounded-xl p-4`}
    >
      <div className={`flex flex-col gap-3 w-full`}>
        {texts.map((text, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-2`}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => handleChange(index, onlyLetters(e.target.value))}
              placeholder={`Texto ${index + 1}`}
              maxLength={10}
              title="Por favor, digite apenas letras e números"
              onBlur={handleSubmitText}
              className={`bg-background-alternative-v2 dark:bg-zinc-700 text-secondary dark:text-zinc-200 dark:placeholder:text-zinc-400 font-bold py-2 px-3 
                rounded-lg cursor-text flex-1 focus:outline-0 w-full
              `}
            />
            
            <button 
              title="Remover este texto"
              onClick={() => handleRemove(index)}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              <MinusCircle className="text-red-500 dark:text-red-400 w-6 h-6" />
            </button>
          </div>
        ))}

        {texts.length < textLimit && (
          <div className={`flex ${texts.length === 0 ? 
            'justify-center' : 'justify-center'} mt-1`}
          >
            <button 
              onClick={handleAdd} 
              className={`flex items-center gap-2 text-secondary dark:text-zinc-300 font-semibold 
                hover:opacity-80 transition-opacity
              `}
            >
              <PlusCircle className="text-secondary w-6 h-6 cursor-pointer" />
              <span>Adicionar Texto</span>
            </button>
          </div>
        )}
        
        {texts.length === textLimit && (
          <span className="text-xs text-red-400 dark:text-red-300 font-bold text-center">
            Limite máximo de {textLimit} textos atingido.
          </span>
        )}
      </div>
    </section>
  );
};