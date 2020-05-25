const Joi = require('joi')

const supermarketValidatorCreate = Joi.object().keys({
  market_name: Joi.string()
    .required()
    .error(new Error('Nome do mercado não pode estar em branco')),

  market_mail: Joi.string()
    .required()
    .email()
    .error(new Error('E-mail deve ser válido')),

  market_password: Joi.string()
    .min(6)
    .max(20)
    .error(new Error('Senha deve conter entre 6 e 20 caracteres')),

  market_cnpj: Joi.string()
    .required()
    .min(14)
    .max(20)
    .error(new Error('CNPJ deve ter 14 caracteres')),

  market_cep: Joi.string()
    .required()
    .length(9)
    .error(new Error('CEP deve ter 8 dígitos')),

  market_street: Joi.string()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_number: Joi.number()
    .required()
    .error(new Error('Informe um número para o endereço')),

  market_neighborhood: Joi.string()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_city: Joi.string()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_uf: Joi.string()
    .required()
    .length(2)
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_latitude: Joi.number()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_longitude: Joi.number()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),
})

const supermarketValidatorUpdate = Joi.object().keys({
  market_mail: Joi.string()
    .required()
    .email()
    .error(new Error('E-mail deve ser válido')),

  market_password: Joi.string()
    .min(6)
    .max(20)
    .error(new Error('Senha deve conter entre 6 e 20 caracteres')),

  market_cep: Joi.string()
    .required()
    .length(9)
    .error(new Error('CEP deve ter 8 dígitos')),

  market_street: Joi.string()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_number: Joi.number()
    .required()
    .error(new Error('Informe um número para o endereço')),

  market_neighborhood: Joi.string()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_city: Joi.string()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_uf: Joi.string()
    .required()
    .length(2)
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_latitude: Joi.number()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),

  market_longitude: Joi.number()
    .required()
    .error(new Error('Informe um CEP para preencher o endereço')),
})

const productValidatorCreate = Joi.object().keys({
  product_name: Joi.string()
    .required()
    .max(20)
    .error(
      new Error(
        'Nome do produto não pode estar em branco ou ter mais de 20 caracteres',
      ),
    ),

  product_description: Joi.string()
    .required()
    .max(30)
    .error(
      new Error(
        'Descrição não pode estar em branco ou ter mais de 30 caracteres',
      ),
    ),

  product_price: Joi.string()
    .required()
    .error(new Error('Preço não deve ser superior a R$2.000,00')),

  product_user: Joi.boolean()
    .required()
    .error(new Error('O campo product_user deve ser preenchido')),
})

module.exports = {
  supermarketValidatorCreate,
  supermarketValidatorUpdate,
  productValidatorCreate,
}
