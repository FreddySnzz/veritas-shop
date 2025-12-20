export function calculateCustomizationPrice(customization: any) {
  const { crucifixo, entremeio, frase } = customization;
  
  let price = 20;
  
  if (entremeio) price += 5;
  if (entremeio === '17' || entremeio === '18' || crucifixo === '15') price += 5;
  if (frase.length > 10) price += 2;
  
  return price;
}