import Image from "next/image";
import CordaoModel from "@/data/models/Cordao.model";
import LetraModel from "@/data/models/Letra.model";
import EntremeioModel from "@/data/models/Entremeio.model";
import ContaModel from "@/data/models/Conta.model";
import CrucifixoModel from "@/data/models/Crucifixo.model";
import { CustomizationItems, ItemsCustomizationTypes } from "@/data/types/customization.type";
import { ToggleCustomizationItemAvailableSwitch } from "../buttons/ToggleCustomizationItemAvailableSwitch";
import { BackButton } from "../buttons/BackButtom";
import CardButton from "../buttons/CardButton";

interface ItemData {
  itemType: ItemsCustomizationTypes;
  items: CustomizationItems;
};

export default function ManageCustomizationItemsInventory({ items, itemType }: ItemData) {
  const renderItemType = (itemType: ItemsCustomizationTypes, items: CustomizationItems) => {
    switch (itemType) {
      case ItemsCustomizationTypes.cordoes:
        return items.cordoes.length > 0 && items.cordoes.map((cordao: CordaoModel) => (
          <div key={cordao.id}> 
            <CardButton 
              className="bg-white"
              pushRoute={`/admin/estoques/itens-personalizacao/cordoes/editar/${cordao.id}`}
            >
              {cordao.image_url ? (
                <div className="relative w-40 h-40 shrink-0">
                  <Image
                    src={cordao.image_url}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div 
                  className={`shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl bg-gray-200`}
                  style={{ backgroundColor: cordao.color }}
                >
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}

              <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                <p className="text-sm font-bold truncate text-secondary">
                  Cor: {cordao.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                  Ref: {cordao.ref}
                </p>
                <div className="absolute flex items-center gap-3 top-[calc(100%-6rem)]">
                  <span className={`font-medium ${cordao.available ? 'text-green-600' : 'text-red-500'}`}>
                    Disponível:
                  </span>
                  <ToggleCustomizationItemAvailableSwitch
                    idProduct={cordao.id}
                    available={cordao.available}
                    itemType={ItemsCustomizationTypes.cordoes}
                  />
                </div>
              </div>
            </CardButton>
          </div>
        ));
      case ItemsCustomizationTypes.contas:
        return items.contas.length > 0 && items.contas.map((conta: ContaModel) => (
          <div key={conta.id}> 
            <CardButton 
              className="bg-white"
              pushRoute={`/admin/estoques/itens-personalizacao/contas/editar/${conta.id}`}
            >
              {conta.image_url ? (
                <div className="relative w-40 h-40 shrink-0">
                  <Image
                    src={conta.image_url}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div 
                  className={`shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl bg-gray-200`}
                  style={{ backgroundColor: conta.color }}
                >
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}

              <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                <p className="text-sm font-bold truncate text-secondary">
                  Cor: {conta.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                  Ref: {conta.ref}
                </p>
                <div className="absolute flex items-center gap-3 top-[calc(100%-6rem)]">
                  <span className={`font-medium ${conta.available ? 'text-green-600' : 'text-red-500'}`}>
                    Disponível:
                  </span>
                  <ToggleCustomizationItemAvailableSwitch
                    idProduct={conta.id}
                    available={conta.available}
                    itemType={ItemsCustomizationTypes.contas}
                  />
                </div>
              </div>
            </CardButton>
          </div>
        ));
      case ItemsCustomizationTypes.letras:
        return items.letras.length > 0 && items.letras.map((letra: LetraModel) => (
          <div key={letra.id}> 
            <CardButton 
              className="bg-white"
              pushRoute={`/admin/estoques/itens-personalizacao/letras/editar/${letra.id}`}
            >
              {letra.image_url ? (
                <div className="relative w-40 h-40 shrink-0">
                  <Image
                    src={letra.image_url}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className={`shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl bg-gray-200`}>
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}

              <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                <p className="text-sm font-bold truncate text-secondary">
                  Cor: {letra.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                  Ref: {letra.ref}
                </p>
                <div className="absolute flex items-center gap-3 top-[calc(100%-6rem)]">
                  <span className={`font-medium ${letra.available ? 'text-green-600' : 'text-red-500'}`}>
                    Disponível:
                  </span>
                  <ToggleCustomizationItemAvailableSwitch
                    idProduct={letra.id}
                    available={letra.available}
                    itemType={ItemsCustomizationTypes.letras}
                  />
                </div>
              </div>
            </CardButton>
          </div>
        ));
      case ItemsCustomizationTypes.crucifixos:
        return items.crucifixos.length > 0 && items.crucifixos.map((crucifixo: CrucifixoModel) => (
          <div key={crucifixo.id}> 
            <CardButton 
              className="bg-white"
              pushRoute={`/admin/estoques/itens-personalizacao/crucifixos/editar/${crucifixo.id}`}
            >
              {crucifixo.image_url ? (
                <div className="relative w-40 h-40 shrink-0">
                  <Image
                    src={crucifixo.image_url}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className={`shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl bg-gray-200`}>
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}

              <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                <p className="text-sm font-bold truncate text-secondary">
                  Tipo: {crucifixo.style}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                  Ref: {crucifixo.ref}
                </p>
                <div className="absolute flex items-center gap-3 top-[calc(100%-6rem)]">
                  <span className={`font-medium ${crucifixo.available ? 'text-green-600' : 'text-red-500'}`}>
                    Disponível:
                  </span>
                  <ToggleCustomizationItemAvailableSwitch
                    idProduct={crucifixo.id}
                    available={crucifixo.available}
                    itemType={ItemsCustomizationTypes.crucifixos}
                  />
                </div>
              </div>
            </CardButton>
          </div>
        ));
      case ItemsCustomizationTypes.entremeios:
        return items.entremeios.length > 0 && items.entremeios.map((entremeio: EntremeioModel) => (
          <div key={entremeio.id}> 
            <CardButton 
              className="bg-white"
              pushRoute={`/admin/estoques/itens-personalizacao/entremeios/editar/${entremeio.id}`}
            >
              {entremeio.image_url ? (
                <div className="relative w-40 h-40 shrink-0">
                  <Image
                    src={entremeio.image_url}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className={`shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl bg-gray-200`}>
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}

              <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                <p className="text-sm font-bold truncate text-secondary">
                  Tipo: {entremeio.style}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                  Ref: {entremeio.ref}
                </p>
                <div className="absolute flex items-center gap-3 top-[calc(100%-6rem)]">
                  <span className={`font-medium ${entremeio.available ? 'text-green-600' : 'text-red-500'}`}>
                    Disponível:
                  </span>
                  <ToggleCustomizationItemAvailableSwitch
                    idProduct={entremeio.id}
                    available={entremeio.available}
                    itemType={ItemsCustomizationTypes.entremeios}
                  />
                </div>
              </div>
            </CardButton>
          </div>
        ));
      default:
        return null;
    };
  };
  
  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto content-start gap-4 mx-6 pb-4 scrollbar-hide">
        {renderItemType(itemType, items)}
      </div>
      <div className="shrink-0 mt-auto bg-background-alternative pt-2 z-10">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/admin/estoques/itens-personalizacao" />
        </div>
      </div>
    </div>
  );
};