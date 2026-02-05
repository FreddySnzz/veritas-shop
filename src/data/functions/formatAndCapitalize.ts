interface CurrencyOptions {
  currency?: 'BRL' | 'USD' | 'EUR';
};

export function formatAndCapitalize(text: string): string {
  if (!text) return "";

  const spacedText = text.replace(/_/g, " ");
  return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
};

export function formatCurrency(
  value: number, 
  options?: CurrencyOptions
): string {
  if (!value) return "";

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: options?.currency || 'BRL',
  }).format(value);
};