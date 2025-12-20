'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useCustomization } from "@/data/context/CustomizationContext";

export default function MultiTextInput() {
  const { customization, updateCustomization } = useCustomization();
  const [texts, setTexts] = useState<string[]>(customization.frase || ['']);

  const handleAdd = () => {
    if (texts.length < 5) {
      setTexts([...texts, ""]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRemove = (indexToRemove: any) => {
    setTexts(texts.filter((_, index) => index !== indexToRemove));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (indexToUpdate: any, value: any) => {
    const newTexts = [...texts];
    newTexts[indexToUpdate] = value;
    setTexts(newTexts);
  };

  const handleSubmitText = () => {
    updateCustomization({ frase: texts });
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex flex-col mb-4 gap-2">
        <span className="font-bold text-secondary">
          Texto <span className='text-muted-foreground font-light text-sm'>(Opcional)</span>
        </span>
        <span className='text-muted-foreground font-light text-sm'>
          (Caso adicione mais de uma palavra, valor adicional será incluso.)
        </span>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {texts.map((text, index) => (
          <div key={index} className="flex gap-2 w-full items-center">
            <input
              type="text"
              value={text}
              className="bg-background-alternative-v2 text-secondary font-bold py-2 px-4 rounded-lg cursor-text flex-1 focus:outline-0"
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Texto ${index + 1}`}
              maxLength={10}
              title="Por favor, digite apenas letras e números"
              onBlur={handleSubmitText}
            />
            
            <button 
              onClick={() => handleRemove(index)}
              title="Remover este texto"
              className="hover:opacity-75 transition-opacity"
            >
              <MinusCircle className="text-red-500 w-6 h-6 cursor-pointer" />
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
    </div>
  );
}