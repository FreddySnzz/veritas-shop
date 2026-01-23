'use client'

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/data/hook/useMediaQuery";
import { useCustomization } from "@/data/context/CustomizationContext";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCustomizerWizard from "@/components/ProductCustomizationWizard";
import { ProductTypes } from "@/data/types/products.type";
import ProductModel from "@/data/models/Product.model";
import { getCachedProductsAction } from "../actions/cache.actions";

export default function Customization() {
  const isMdDown = useMediaQuery("(min-width: 768px)");
  const { customization } = useCustomization();
  const [product, setProduct] = useState<ProductModel>();

  async function getProduct() {
    const products = await getCachedProductsAction();
    const product = products?.find((p: ProductModel) => p.name === customization?.product);

    setProduct(product);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const baseProduct = {
    id: product?.id || '',
    type: customization?.productType as ProductTypes,
    name: product?.name || '',
    price: product?.initial_price || 0,
    image: product?.image_url || '',
    customizable: product?.customizable || false,
    customizationItems: product?.customization_items || []
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="user" />
      <main className="flex-1 flex flex-col mt-16 bg-background-alternative overflow-hidden">
        <ProductCustomizerWizard baseProduct={baseProduct} />
      </main>
      {isMdDown && <Footer />}
    </div>
  );
};
