'use client';

import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/data/context/CartContext";
import ProductCarrousel from "./ProductCarrousel";
import SeeMoreProducts from "./SeeMoreProducts";
import ProductModel from "@/data/models/Product.model";
import { CustomButton } from "./buttons/CustomButton";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import { removeAccentsAndSpacesToURL } from "@/data/functions/removeAccentsAndSpaces";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";
import { useMediaQuery } from "@/data/hook/useMediaQuery";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { SupportButton } from "./buttons/SupportButton";

interface ProductPageLayoutProps {
  product: ProductModel;
  cachedProducts: ProductModel[];
  className?: string;
};

export default function ProductPageLayout({ 
  product, 
  cachedProducts 
}: ProductPageLayoutProps) {
  const { addItem } = useCart();
  const [descExpanded, setDescExpanded] = useState(false);
  const [showReadMoreDesktop, setShowReadMoreDesktop] = useState(false);
  const [showReadMoreMobile, setShowReadMoreMobile] = useState(false);
  const contentDesktopRef = useRef<HTMLDivElement>(null);
  const contentMobileRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const isMdUp = useMediaQuery("(min-width: 768px)");

  const sortedCustomizationItems = useMemo(() => {
    if (!product?.customization_items) return [];

    return [...product.customization_items]
      .filter((item) => item.available)
      .sort((a, b) =>
        a.category.localeCompare(b.category)
      );
  }, [product.customization_items]);

  const handleCopyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado para a área de transferência.");
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.initial_price,
      image: product?.images_url?.[0] || "",
      customizable: false,
      customizationPrice: 0,
    });
    
    toast.success("Produto adicionado ao carrinho!", { duration: 1500 });
  };

  useEffect(() => {
    const desktopEl = contentDesktopRef.current;
    const mobileEl = contentMobileRef.current;

    setShowReadMoreMobile(!!mobileEl && mobileEl.scrollHeight > 160);
    setShowReadMoreDesktop(!!desktopEl && desktopEl.scrollHeight > 160);
  }, [product.desc]);

  if (!product.desc) return null;

  return (
    <div className="flex flex-col font-sans h-full">
      <div>
        <div className="shrink-0 px-8 lg:px-12">
          <DynamicBreadcrumb 
            mode={"user"} 
            product={product}
            className="mt-14 py-4 lg:mt-16 lg:py-6" 
          />
          <hr className="lg:hidden border-muted-foreground/50" />
        </div>

        <div className="flex flex-col lg:hidden mt-4 px-8">
          <h2 className="text-2xl font-bold">
            {product.name}
          </h2>

          {product.available ? (
            <div className="flex flex-col">
              <span className="text-primary font-bold">
                Disponível ✓
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-red-500 font-bold">
                Produto Indisponível ✗
              </span>
            </div>
          )}

          <div className="flex relative shrink-0 mt-auto pt-2 items-end justify-between"> 
            <div className="flex justify-center items-baseline gap-1">
              <span className="font-bold text-2xl">
                {formatCurrency(product.initial_price)}
              </span>
            </div>
          </div>

          {product.customizable && (
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs">
                *Ao personalizar o produto, o preço final poderá ser diferente.
              </p>
            </div>
          )}
        </div>

        <div className="flex shrink-0 mt-8 lg:mt-0">
          {product.images_url?.length ? (
            <ProductCarrousel 
              product={product}
              gridMode={isMdUp}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-60 gap-4 w-full">
              <span className="text-gray-400 text-sm">
                Produto Sem Imagens
              </span>
            </div>
          )}

          <div className="hidden lg:flex lg:grow w-full flex-col h-full">
            <div className="hidden lg:flex flex-col px-6">
              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              {product.available ? (
                <div className="flex flex-col">
                  <span className="text-primary font-bold">Disponível ✓</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-red-500 font-bold">Produto Indisponível ✗</span>
                </div>
              )}

              <div className="flex relative shrink-0 mt-auto pt-2 items-end justify-between"> 
                <div className="flex justify-center items-baseline gap-1">
                  <span className="font-bold text-2xl">
                    {formatCurrency(product.initial_price)}
                  </span>
                </div>
              </div>

              {product.customizable && (
                <div className="flex flex-col">
                  <p className="text-gray-400 text-xs">
                    *Ao personalizar o produto, o preço final poderá ser diferente.
                  </p>
                </div>
              )}
            </div>

            <div className="hidden lg:flex flex-col px-6 mt-4">
              <div className="flex items-center justify-center gap-4 w-full mb-6">
                <span className="font-medium text-sm">
                  Compartilhar: 
                </span>
                <div className="flex gap-4 items-center">
                  <Link 
                    aria-label="Compartilhar no WhatsApp"
                    title="Compartilhar no WhatsApp"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`https://api.whatsapp.com/send?text=*Olha%20só%20esse%20produto%20incrível%20que%20encontrei%20na%20Veritas%20Ateliê!*%0A${window.location.href}`}
                    className="flex items-center text-sm gap-1 hover:underline"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </Link>
                  <button 
                    type="button"
                    aria-label="Copiar link para a área de transferência"
                    title="Copiar link para a área de transferência"
                    onClick={handleCopyLinkToClipboard}
                    className="flex items-center text-sm gap-1 cursor-pointer hover:underline"
                  >
                    <IoMdCopy className="w-4 h-4" />
                    <span>Copiar Link</span>
                  </button>
                </div>
              </div>

              {product.customizable && (
                <div className="flex flex-col gap-4">
                  <span className="font-bold text-sm">
                    Pode ser personalizado com:
                  </span>
                  {product.customization_items && (
                    <div className="flex flex-col">
                      {sortedCustomizationItems.map((item, index) => (
                        <div
                          key={index} 
                          className="flex ml-4 font-medium text-sm text-secondary"
                        >
                          <span className="mr-2">•</span>
                          <span>{item.category_name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {product.customizable ? (
                <div className="flex flex-col my-6">
                  <CustomButton
                    type="button"
                    aria-label="Ir para página de personalização"
                    title="Ir para página de personalização"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => router.push(`/personalizar/${removeAccentsAndSpacesToURL(product.name)}`)}
                  >
                    <span>Personalizar agora</span>
                  </CustomButton>
                </div>
              ) : (
                <div className="flex flex-col">
                  <CustomButton
                    type="button"
                    aria-label="Adicionar ao carrinho"
                    title="Adicionar ao carrinho"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={handleAddToCart}
                  >
                    <span>Adicionar ao Carrinho</span>
                  </CustomButton>
                </div>
              )}

              <div className="hidden lg:flex flex-col gap-4 pt-6 lg:w-lg xl:w-full">
                <p className="font-bold text-sm">Descrição do Produto</p>

                <div className="relative">
                  <div
                    ref={contentDesktopRef}
                    className={`relative overflow-hidden transition-all duration-300 ${
                      descExpanded ? 'max-h-250' : 'max-h-40'
                    }`}
                  >
                    <div className="prose prose-sm max-w-none font-medium text-sm text-gray-500 whitespace-pre-line">
                      <ReactMarkdown>{product.desc}</ReactMarkdown>
                    </div>

                    {showReadMoreDesktop && !descExpanded && (
                      <div className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none
                        bg-linear-to-t from-background-alternative to-transparent `}
                      />
                    )}
                  </div>

                  {showReadMoreDesktop && (
                    <div
                      className={`absolute inset-x-0 flex justify-center ${
                        descExpanded ? 'mt-2 static' : 'bottom-0 pb-2'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setDescExpanded((prev) => !prev)}
                        className={`z-10 rounded-full px-4 py-1 text-sm font-medium text-secondary 
                          bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:text-primary
                        `}
                      >
                        {descExpanded ? 'Ler menos' : 'Ler mais'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <SupportButton 
                title="Relatar problema ou falar com suporte"
                messageToSupport={`Olá, encontrei um erro no seu produto "${product.name}" na Veritas Ateliê!`} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8 px-8 lg:px-32">
          {product.customizable ? (
            <div className="flex flex-col lg:hidden mb-6">
              <CustomButton
                type="button"
                aria-label="Ir para página de personalização"
                title="Ir para página de personalização"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => router.push(`/personalizar/${removeAccentsAndSpacesToURL(product.name)}`)}
              >
                <span>Personalizar agora</span>
              </CustomButton>
            </div>
          ) : (
            <div className="flex flex-col lg:hidden mb-6">
              <CustomButton
                type="button"
                aria-label="Adicionar ao carrinho"
                title="Adicionar ao carrinho"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={handleAddToCart}
              >
                <span>Adicionar ao Carrinho</span>
              </CustomButton>
            </div>
          )}

          <div className="flex lg:hidden items-center justify-center gap-4 w-full mb-6">
            <span className="font-medium text-sm">
              Compartilhar: 
            </span>
            <div className="flex gap-4 items-center">
              <Link 
                aria-label="Compartilhar no WhatsApp"
                title="Compartilhar no WhatsApp"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://api.whatsapp.com/send?text=*Olha%20só%20esse%20produto%20incrível%20que%20encontrei%20na%20Veritas%20Ateliê!*%0A${window.location.href}`}
                className="flex items-center text-sm gap-1 hover:underline"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </Link>
              <button 
                type="button"
                aria-label="Copiar link para a área de transferência"
                title="Copiar link para a área de transferência"
                onClick={handleCopyLinkToClipboard}
                className="flex items-center text-sm gap-1 cursor-pointer hover:underline"
              >
                <IoMdCopy className="w-4 h-4" />
                <span>Copiar Link</span>
              </button>
            </div>
          </div>

          {product.customizable && (
            <div className="flex flex-col lg:hidden gap-4">
              <span className="font-bold text-sm">
                Pode ser personalizado com:
              </span>
              {product.customization_items && (
                <div className="flex flex-col">
                  {sortedCustomizationItems.map((item, index) => (
                    <div
                      key={index} 
                      className="flex ml-4 font-medium text-sm text-secondary"
                    >
                      <span className="mr-2">•</span>
                      <span>{item.category_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col lg:hidden gap-4 pt-6">
            <p className="font-bold text-sm">Descrição do Produto</p>

            <div className="relative">
              <div
                ref={contentMobileRef}
                className={`relative overflow-hidden transition-all duration-300 ${
                  descExpanded ? 'max-h-250' : 'max-h-40'
                }`}
              >
                <div className="prose prose-sm max-w-none font-medium text-sm text-gray-500 whitespace-pre-line">
                  <ReactMarkdown>{product.desc}</ReactMarkdown>
                </div>

                {showReadMoreMobile && !descExpanded && (
                  <div className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none
                    bg-linear-to-t from-background-alternative to-transparent `}
                  />
                )}
              </div>

              {showReadMoreMobile && (
                <div
                  className={`absolute inset-x-0 flex justify-center ${
                    descExpanded ? 'mt-2 static' : 'bottom-0 pb-2'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setDescExpanded((prev) => !prev)}
                    className={`z-10 rounded-full px-4 py-1 text-sm font-medium text-secondary 
                      bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:text-primary
                    `}
                  >
                    {descExpanded ? 'Ler menos' : 'Ler mais'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden">
            <hr className="border-muted-foreground/50 my-4" />
            <SupportButton
              title="Relatar problema ou falar com suporte"
              messageToSupport={`Olá, encontrei um erro no seu produto "${product.name}" na Veritas Ateliê!`}
            />
          </div>
        </div>
      </div>

      {cachedProducts?.length > 1 ? (
        <div className="flex flex-col pt-6">
        <div className="flex ml-8 lg:ml-12">
          <span className="font-bold uppercase">
            Mais Produtos
          </span>
        </div>
        <div className="overflow-hidden">
          <SeeMoreProducts 
            atualProductId={product.id} 
            cachedProducts={cachedProducts}
            className="ml-4 lg:ml-8"
          />
        </div>
      </div>
      ) : null}
    </div>
  );
};