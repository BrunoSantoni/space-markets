const crypto = require('crypto')

const Supermarket = require('../models/Supermarket')

const validator = require('../Validators/validators')

const Joi = require('joi')

module.exports = {

  async index(req, res) {
    await Supermarket.find(function(err, data) {
      if(err) { return console.log(err) }
      return res.json(data)
    })
  },

  async currentSupermarket(req, res) {
    const auth = req.headers.auth

    await Supermarket.find({_id: auth}, function(err, data) {
      if(err) return console.log(err)
      return res.json(data)
    })
  },

  //Função para retornar a imagem do usuário para o front;
  async profileImage(req, res) {
    const auth = req.headers.auth
    
    //SELECT market_picture_url FROM Supermarket
    await Supermarket.find({market_id: auth}, {_id: 0, market_picture_url: 1}, function(err, data) {
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

    const message = Joi.validate(req.body, validator.supermarketValidatorCreate,(err, res) => {
      if(err) {
        flag = true
        return err.message
      }
    })

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
  },

  async update(req, res) {
    const auth = req.headers.auth
    const { market_mail, market_password, market_cep, market_street, market_number,
      market_neighborhood, market_city, market_uf, market_latitude, market_longitude } = req.body

    let flag = false

    const message = Joi.validate(req.body, validator.supermarketValidatorUpdate,(err, res) => {
      if(err) {
        flag = true
        return err.message
      }
    })

    if(!flag) {
      await Supermarket.updateOne({_id: auth}, {
        market_mail,
        market_password,
        market_cep,
        market_street,
        market_number,
        market_neighborhood,
        market_city,
        market_uf,
        market_latitude,
        market_longitude
      }, function(err, affected, resp) {
        if(err) return console.log(err)
      })
  
      return res.status(204).send()
    } else {
      return res.json({message})
    }    
  },
}