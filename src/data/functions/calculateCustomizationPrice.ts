// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calculateCustomizationPrice(customization: any) {
  const { crucifixo, entremeio, frase, cordao, conta } = customization;
  
  let price = 0;

  if (customization.length > 0 || customization.conta && customization.cordao && customization.crucifixo) price += 20;
  
  if (entremeio) price += 5;
  if (entremeio === '17' || entremeio === '18' || crucifixo === '15') price += 5;
  if (frase?.length > 10) price += 2;
  
  return price;
}