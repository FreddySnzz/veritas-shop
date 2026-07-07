import { formatDateShowingOnlyYear } from "./formatDate";

export function generateOrderNumber(): string {
  const prefix = `${formatDateShowingOnlyYear(new Date())}`;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ1234567890';
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return `${prefix}-${code}`;
}