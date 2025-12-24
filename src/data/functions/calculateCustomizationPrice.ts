// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calculateCustomizationPrice(customization: any) {
  const { crucifixo, entremeio, frase, conta, cordao } = customization;
  let letras;

  if (frase) {
    letras = frase.join("");
  };
  
  let price = 0;

  if (customization.length > 0 || conta && cordao && crucifixo) price += 20;
  
  if (entremeio) price += 5;
  if (entremeio === '17' || entremeio === '18' || crucifixo === '15') price += 5;
  if (letras?.length > 10) price += 2;
  if (letras?.length > 20) price += 1;
  if (letras?.length > 30) price += 1;
  if (letras?.length > 40) price += 1;
  if (letras?.length == 50) price += 1;

  return price;
}