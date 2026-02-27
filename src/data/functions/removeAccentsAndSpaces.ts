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
  available: boolean
): string {
  const str = `${removeAccentsAndSpacesToURL(
    productName)}-${available ? 'available' : 'out-of-stock'}
  `;

  return str;
};