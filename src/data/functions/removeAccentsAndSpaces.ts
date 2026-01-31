import ProductModel from "../models/Product.model";

export function removeAccentsAndSpaces(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/\s+/g, '_');
};

export function removeDots(str: string) {
  return str.replace(/\./g, '');
};

export function removeAccentsAndSpacesToURL(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/\s+/g, '-');
};

export function mountProductUrl(
  product: ProductModel,
): string {
  const str = `${removeAccentsAndSpacesToURL(product.name)}-${product.available ? 'available' : 'out-of-stock'}`;

  return str;
};