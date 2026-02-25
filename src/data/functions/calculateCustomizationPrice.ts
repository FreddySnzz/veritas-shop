import { getCustomizationItemByRefAction } from "@/app/actions/customizationItems.action";
import ProductModel from "../models/Product.model"

export async function calculateCustomizationPrice(
  baseProduct: ProductModel, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customization: any
) {
  let price = 0;

  if (baseProduct.customizable) {
    for (const [key, value] of Object.entries(customization)) {
      if (!key) return;

      const item = await getCustomizationItemByRefAction(value as string);

      if (!item || !item.length) continue;
      price += item[0].price_addon;
    };

    let letras;
  
    if (customization.frase) {
      letras = customization.frase.join("");
    };
  
    if (letras?.length > 10) price += 2;
    if (letras?.length > 20) price += 1;
    if (letras?.length > 30) price += 1;
    if (letras?.length > 40) price += 1;
    if (letras?.length == 50) price += 1;
  };
  
  return price;
};