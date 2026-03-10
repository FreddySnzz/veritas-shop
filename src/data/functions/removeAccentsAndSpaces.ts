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
  productName: string,
  productId: string
): string {
  const str = `${removeAccentsAndSpacesToURL(productName)}-${productId}`;

  return str;
};