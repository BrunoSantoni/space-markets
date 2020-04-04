//https://medium.com/trainingcenter/mascara-de-cpf-com-react-javascript-a07719345c93

function cnpjMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{1})/, '$1.$2') 
    .replace(/(\d{3})(\d{1})/, '$1.$2')
    .replace(/(\d{3})(\d{1})/, '$1/$2')
    .replace(/(\d{4})(\d{1})/, '$1-$2')  
    .replace(/(-\d{2})\d+?$/, '$1')
}

export default cnpjMask