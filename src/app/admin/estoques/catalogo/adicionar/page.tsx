'use client';

import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function AddProductCatalogPage() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [initialPrice, setInitialPrice] = useState(0);
  const [img, setImg] = useState('');
  const [available, setAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header mode="admin" />
      <main className="w-full h-screen bg-background-alternative font-sans">
        <DynamicBreadcrumb 
          className="mt-12 p-6" 
          listClassName="" 
        />
        
        <form onSubmit={() => console.log('Enviar')} className="space-y-6 px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Nome do Produto"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="h-12 bg-white focus-visible:ring-0"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desc" className="text-sm">
                Descrição (Opcional)
              </Label>
              <Input
                id="description"
                type="text"
                autoComplete="description"
                placeholder="Descrição do Produto"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="h-12 bg-white focus-visible:ring-0"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="initialPrice" className="text-sm">
                Preço
              </Label>
              <Input
                id="initialPrice"
                type="number"
                required
                onChange={(e) => setInitialPrice(parseFloat(e.target.value) || 0)}
                value={initialPrice}
                className="h-12 bg-white focus-visible:ring-0"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="image" className="text-sm">
                Imagem (Opcional)
              </Label>
              <span className="text-xs text-gray-400 mb-2">
                *.jpg / *.jpeg / *.png
              </span>
              <Input
                id="image"
                type="file"
                onChange={(e) => setImg(e.target.value)}
                value={img}
                className="bg-gray-300 focus-visible:ring-0 px-4"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="available" className="text-sm">
                Disponível
              </Label>
              <Switch 
                id="available" 
                checked={available} 
                onChange={(e) => setAvailable((e.target as HTMLInputElement).checked)} 
              />
            </div>
          </div>
        </form>
      </main>
    </>
  )
}