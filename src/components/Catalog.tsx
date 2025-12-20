'use client';

import { useState, useEffect } from 'react';
import * as motion from "motion/react-client"
import { AlertCircle } from 'lucide-react';
import { initialData } from '../data/constants/products';
import { Alert, AlertDescription } from './ui/alert';
import { CustomizationCatalogButton } from './buttons/CatalogButton';
import MultiTextInput from './inputs/MultiTexts';
import { Crucifixos, Entremeios } from '@/data/types/products.type';
import Sidebar from './Sidebar';
import { useCustomization } from '@/data/context/CustomizationContext';

const RosarioCatalog = () => {
  const [view, setView] = useState('catalog'); // catalog ou admin
  const [products, setProducts] = useState(initialData);
  const [maintence, setMaintence] = useState(false);
  const { customization, updateCustomization } = useCustomization();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // --- CORREÇÃO AQUI ---
  useEffect(() => {
    // Verifica se estamos no navegador antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const savedProducts = window.localStorage.getItem('veritas_products');
      const savedMaintence = window.localStorage.getItem('veritas_maintence');

      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
      if (savedMaintence) {
        setMaintence(JSON.parse(savedMaintence));
      }
    }
  }, [setProducts, setMaintence]); 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveProducts = (newProducts: any) => {
    setProducts(newProducts);
    // Opcional: Salvar products no localStorage também se desejar persistência
    if (typeof window !== 'undefined') {
       window.localStorage.setItem('veritas_products', JSON.stringify(newProducts));
    }
  };

  // --- CORREÇÃO AQUI ---
  const saveMaintence = (status: boolean) => {
    setMaintence(status);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('veritas_maintence', JSON.stringify(status));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleEstoque = (category: keyof typeof products, id: any) => {
    const newProducts = { ...products };
    const item = newProducts[category].find(p => p.id === id);
    if (item) item.available = !item.available;
    saveProducts(newProducts);
  };

  const crucifixoComponent = () => {
    const availableCrucifixos = products.crucifixos.filter(c => c.available);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedCrucifixos = availableCrucifixos.reduce((groups: Record<string, any[]>, item: Crucifixos) => {
      // Agrupamento seguro: usa style ou 'Outros' se style for undefined
      const groupKey = item.style || 'Outros';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
  
      groups[groupKey].push(item);
      return groups;
    }, {});
  
    return (
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center mb-4 gap-2">
          <span className="font-bold text-secondary">
            Crucifixo
          </span>
        </div>
    
        {Object.entries(groupedCrucifixos).map(([categoryName, items]) => (
          <div key={categoryName} className="mb-6 last:mb-0">
            <div className="flex items-center mb-3 gap-2">
              <span className="font-medium text-secondary text-sm capitalize">
                {categoryName}:
              </span>
            </div>
    
            <div className="grid grid-cols-2 gap-3">
              {(items as any[]).map((crucifixo: Crucifixos) => (
                <button
                  key={crucifixo.id}
                  onClick={() => updateCustomization({ crucifixo: crucifixo.ref })}
                  className={`p-4 rounded-2xl border lg:border-2 transition-all ${
                    customization?.crucifixo === crucifixo.ref
                      ? 'border-details'
                      : 'border-gray-100 hover:border-details/30'
                  }`}
                >
                  <div
                    className="w-30 h-40 rounded-xl mx-auto mb-2 shadow-md bg-gray-800"
                    // style={{ backgroundColor: "#323232" }} // Use classes tailwind sempre que possível
                  />
                  <div className="flex flex-col text-sm font-medium text-center">
                    <span>{crucifixo.style}</span>
                    <span className='text-muted-foreground font-light text-xs'>
                      Ref: {crucifixo.ref}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const entremeioComponent = () => {
    const availableEntremeios = products.entremeios.filter(e => e.available);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedEntremeios = availableEntremeios.reduce((groups: Record<string, any[]>, item: Entremeios) => {
      const groupKey = item.style || 'Outros';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
  
      groups[groupKey].push(item);
      return groups;
    }, {});
  
    return (
      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center mb-4 gap-2">
          <span className="font-bold text-secondary">
            Entremeio <span className='text-muted-foreground font-light text-sm'>(Opcional)</span>
          </span>
        </div>
    
        {Object.entries(groupedEntremeios).map(([categoryName, items]) => (
          <div key={categoryName} className="mb-6 last:mb-0">
            <div className="flex items-center mb-3 gap-2">
              <span className="font-medium text-secondary text-sm capitalize">
                {categoryName}:
              </span>
            </div>
    
            <div className="grid grid-cols-2 gap-3">
              {(items as any[]).map((entremeio: Entremeios) => (
                <button
                  key={entremeio.id}
                  onClick={() => updateCustomization({ entremeio: entremeio.ref })}
                  className={`p-4 rounded-2xl border lg:border-2 transition-all ${
                    customization?.entremeio === entremeio.ref
                      ? 'border-details'
                      : 'border-gray-100 hover:border-details/30'
                  }`}
                >
                  <div
                    className="w-30 h-30 rounded-xl mx-auto mb-2 shadow-md bg-gray-200"
                    // style={{ backgroundColor: "#e1e1e1" }}
                  />
                  <div className="flex flex-col text-sm font-medium text-center">
                    <span>{entremeio.name}</span>
                    <span className='text-muted-foreground font-light text-xs'>
                      Ref: {entremeio.ref}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (maintence && view === 'catalog') {
    return (
      <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-2">Site em Manutenção</div>
            Estamos trabalhando para melhorar sua experiência. Volte em breve!
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
              <button
                onClick={() => setView('catalog')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ver Catálogo
              </button>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintence}
                  onChange={(e) => saveMaintence(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-lg font-semibold">Modo Manutenção</span>
              </label>
            </div>

            {Object.entries(products).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4 capitalize">
                  {category}
                </h2>
                <div className="grid gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {'color' in item && item.color && (
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
                        <div>
                          <div className="font-semibold">{item.ref}</div>
                          {'style' in item && item.style && (
                            <div className="text-sm text-gray-500">{item.style}</div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleEstoque(category as keyof typeof products, item.id)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          item.available
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.available ? 'Em Estoque' : 'Esgotado'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans w-screen p-4 md:p-8">
      <div className="mx-auto pb-4">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6">
            <h3 className="flex items-center font-bold text-secondary mb-4 gap-2">
              Cor do Cordão
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {products.cordoes.filter(c => c.available).map((cordao) => (
                <button
                  key={cordao.id}
                  onClick={() => updateCustomization({ cordao: cordao.ref })}
                  className={`p-4 rounded-2xl border lg:border-2 transition-all ${
                    customization?.cordao === cordao.ref
                      ? 'border-details'
                      : 'border-gray-100 hover:border-details/30'
                  }`}
                >
                  <div
                    className="w-30 h-30 rounded-xl mx-auto mb-2 shadow-md"
                    style={{ backgroundColor: cordao.color }}
                  />
                  <div className="flex flex-col text-sm font-medium text-center">
                    <span>{cordao.name}</span>
                    <span className='text-muted-foreground font-light text-xs'>Ref: {cordao.ref}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center mb-4 gap-2">
              <span className="font-bold text-secondary ">
                Cor das Contas 
              </span>
              <span className='text-muted-foreground font-light text-sm'>
                (bolinhas)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {products.contas.filter(c => c.available).map((conta) => (
                <button
                  key={conta.id}
                  onClick={() => updateCustomization({ conta: conta.ref })}
                  className={`p-4 rounded-2xl border lg:border-2 transition-all ${
                    customization?.conta === conta.ref
                      ? 'border-details'
                      : 'border-gray-100 hover:border-details/30'
                  }`}
                >
                  <div
                    className="w-30 h-30 rounded-xl mx-auto mb-2 shadow-md"
                    style={{ backgroundColor: conta.color }}
                  />
                  <div className="flex flex-col text-sm font-medium text-center">
                    <span>{conta.name}</span>
                    <span className='text-muted-foreground font-light text-xs'>Ref: {conta.ref}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <MultiTextInput />

          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center mb-4 gap-2">
              <span className="font-bold text-secondary ">
                Estilo das Letras <span className='text-muted-foreground font-light text-sm'>(Opcional)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {products.letras.filter(l => l.available).map((styleLetra) => (
                <button
                  key={styleLetra.id}
                  onClick={() => updateCustomization({ styleLetra: styleLetra.ref })}
                  className={`p-4 rounded-2xl border lg:border-2 transition-all ${
                    customization?.styleLetra === styleLetra.ref
                      ? 'border-details'
                      : 'border-gray-100 hover:border-details/30'
                  }`}
                >
                  <div
                    className="w-30 h-30 rounded-xl mx-auto mb-2 shadow-md"
                    style={{ backgroundColor: "#000000" }}
                  />
                  <div className="flex flex-col text-sm font-medium text-center">
                    <span>{styleLetra.name}</span>
                    <span className='text-muted-foreground font-light text-xs'>Ref: {styleLetra.ref}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {crucifixoComponent()}

          {entremeioComponent()}
          
          <div className="flex items-center justify-center">
            <motion.div 
              className="w-full md:w-1/3 lg:w-1/5 xl:w-1/6 mt-12"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CustomizationCatalogButton onClick={toggleExpanded} />
            </motion.div>
          </div>
        </div>
      </div>
      <Sidebar open={expanded} onClose={() => setExpanded(false)} />
    </div>
  );
};

export default RosarioCatalog;