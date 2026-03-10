export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2") 
    .replace(/(-\d{4})\d+?$/, "$1");
};

export function onlyNumbers(value: string) {
  return value.replace(/[^0-9.]/g, "");
}

export function onlyLetters(value: string) {
  return value.replace(/[^a-zA-Z]/g, "");
};

export function normalizePriceInput(value: string) {
  let cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");

  if (parts.length > 2) {
    cleaned = `${parts[0]}.${parts.slice(1).join("")}`;
  };

  const [integer, decimal] = cleaned.split(".");

  if (decimal !== undefined) {
    cleaned = `${integer}.${decimal.slice(0, 2)}`;
  };

  return cleaned;
};

export function priceStringToCents(value: string) {
  if (!value) return 0;
  return Math.round(parseFloat(value) * 100);
};

export function centsToPriceString(cents?: number) {
  if (!cents) return "";
  return (cents / 100).toFixed(2);
};