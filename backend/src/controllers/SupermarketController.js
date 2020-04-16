const crypto = require('crypto')

const Supermarket = require('../models/Supermarket')

const Joi = require('joi')

module.exports = {

  async index(req, res) {
    await Supermarket.find(function(err, data) {
      if(err) { return console.log(err) }
      return res.json(data)
    })
  },

  async create(req, res) {
    const { market_name, market_mail, market_password, market_cnpj, market_cep, market_street,
      market_number, market_neighborhood, market_city, market_uf,
      market_latitude, market_longitude } = req.body
    const { key, url = '' } = req.file

    let flag = false

    const market_id = market_name.replace(/ /g,'') + crypto.randomBytes(2).toString('HEX')

    //Validando os dados
    const schema = Joi.object().keys({
      market_name: Joi.string().required().error(new Error('Nome do mercado não pode estar em branco')),
      market_mail: Joi.string().required().email().error(new Error('E-mail não pode estar em branco')),
      market_password: Joi.string().min(6).max(20).error(new Error('Senha precisa ter entre 6 e 20 caracteres')),
      market_cnpj: Joi.string().required().min(14).max(20).error(new Error('CNPJ deve ter 14 caracteres')),
      market_cep: Joi.string().required().length(9).error(new Error('CEP deve ter 8 dígitos')),
      market_street: Joi.string().required().error(new Error('Informe um CEP para preencher o endereço')),
      market_number: Joi.string().required().max(4).error(new Error('Informe um número para o endereço')),
      market_neighborhood: Joi.string().required().error(new Error('Informe um CEP para preencher o endereço')),
      market_city: Joi.string().required().error(new Error('Informe um CEP para preencher o endereço')),
      market_uf: Joi.string().required().length(2).error(new Error('Informe um CEP para preencher o endereço')),
      market_latitude: Joi.number().required().error(new Error('Informe um CEP para preencher o endereço')),
      market_longitude: Joi.number().required().error(new Error('Informe um CEP para preencher o endereço'))
    })

    const message = Joi.validate(req.body, schema, (err, res) => {
      if(err) {
        flag = true
        return err.message
      }
    })

    console.log(message)

    if(!flag){
      await Supermarket.create({
        market_id,
        market_name,
        market_mail,
        market_password,
        market_cnpj,
        market_cep,
        market_street,
        market_number,
        market_neighborhood,
        market_city,
        market_uf,
        market_latitude,
        market_longitude,
        market_picture_key: key,
        market_picture_url: url
      })
  
      return res.json({market_id})
    } else {
      return res.json({message})
    }
    
  }
}