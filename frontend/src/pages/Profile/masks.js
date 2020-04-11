export function priceMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{1})/, '$1.$2') 
    .replace(/(\d{3})(\d{1})/, '$1.$2')
    .replace(/(\d{3})(\d{1})/, '$1/$2')
    .replace(/(\d{4})(\d{1})/, '$1-$2')  
    .replace(/(-\d{2})\d+?$/, '$1')
}