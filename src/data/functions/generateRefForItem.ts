import { CustomizationItemsModel } from "../models/CustomizationItems.model";

const PREFIX_MAP: Record<string, string> = {
  cordoes: 'cd',
  contrapinos: 'cp',
  entremeios: 'em',
  entremeios_passantes: 'ep',
};

export function generateRefNumber(
  items: CustomizationItemsModel[], 
  itemType: string
): string {
  const normalizedItemType = itemType.toLowerCase().trim();
  let prefix = PREFIX_MAP[normalizedItemType];

  if (!prefix) {
    const consonant = normalizedItemType.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    
    if (consonant && consonant.length >= 2) {
      prefix = consonant.slice(0, 2).join('');
    } else {
      prefix = normalizedItemType.slice(0, 2); 
    };
  };

  prefix = prefix.toLowerCase();

  const lastItemRef = items
    .filter(item => item.ref.startsWith(`${prefix}-`))
    .map(item => {
      const parts = item.ref.split('-');
      return parseInt(parts[1], 10);
    })
    .sort((a, b) => b - a)[0];

  const newNumber = (lastItemRef || 0) + 1;
  return `${prefix}-${newNumber.toString().padStart(4, '0')}`;
};