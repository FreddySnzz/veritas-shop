export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2") 
    .replace(/(-\d{4})\d+?$/, "$1");
};

export function onlyNumbers(value: string) {
  return value.replace(/[^0-9.,]/g, "");
}

export function onlyLetters(value: string) {
  return value.replace(/[^a-zA-Z]/g, "");
};