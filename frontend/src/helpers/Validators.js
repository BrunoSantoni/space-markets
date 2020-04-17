export function validateUser(marca) {
  return marca.length < 3 ? 'Nome do mercado deve conter mais de 3 caracteres' : ''
}

export function validateMail(email) {
  return email.indexOf('@') === -1 ? 'E-mail deve ser válido' : ''
}

export function validatePassword(senha) {
  return senha.length < 6 || senha.length > 20 ? 'Senha deve conter entre 6 e 20 caracteres' : ''
}

export function validateCnpj(cnpj) {
  return cnpj.length !== 18 ? 'CNPJ deve conter 14 caracteres' : ''
}

export function validateCep(cep) {
  return cep.length !== 9 ? 'CEP deve conter 8 caracteres' : ''
}