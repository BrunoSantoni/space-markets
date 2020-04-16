const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
  supermarketValidator() {
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        market_name: Joi.string().required(),
        market_mail: Joi.string().required().email(),
        market_password: Joi.string().min(6).max(20),
        market_cnpj: Joi.string().required().min(14).max(20),
        market_cep: Joi.string().required().length(9),
        market_street: Joi.string().required(),
        market_number: Joi.string().required().max(4),
        market_neighborhood: Joi.string().required(),
        market_city: Joi.string().required(),
        market_uf: Joi.string().required().length(2),
        market_latitude: Joi.number().required(),
        market_longitude: Joi.number().required()
      })
    })
  }
}

