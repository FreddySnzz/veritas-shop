export function formatAndCapitalize (text: string): string {
  if (!text) return "";
  const spacedText = text.replace(/_/g, " ");
  return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
};