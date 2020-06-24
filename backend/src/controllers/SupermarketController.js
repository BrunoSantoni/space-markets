const Joi = require('joi')
const Supermarket = require('../models/Supermarket')

const validator = require('../Validators/validators')

module.exports = {
  /* Retorna todos os mercados para serem exibidos na map_screen do mobile */
  async index(req, res) {
    await Supermarket.find((err, data) => {
      if (err) {
        return res.json(err)
      }
      return res.json(data)
    })
  },

  /* Retorna dados do mercado logado na web para que possa ser alterado */
  async show(req, res) {
    const { auth } = req.headers

    await Supermarket.find({ _id: auth }, (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  },

  /* Faz a inserção do mercado no banco de dados */
  async create(req, res) {
    const {
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
    } = req.body
    const { public_id, url = '' } = req.file

    let flag = false

    // Validando os dados

    const message = Joi.validate(
      req.body,
      validator.supermarketValidatorCreate,
      (err) => {
        if (err) {
          flag = true
          return err.message
        }
      },
    )

    if (!flag) {
      const { market_name: name, market_mail: mail } = await Supermarket.create(
        {
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
          market_picture_url: url,
          market_picture_key: public_id,
        },
      )

      return res.json({ name, mail })
    }
    return res.json({ message })
  },

  /* Atualiza os dados de um mercado já cadastrad
  (menos a imagem, ela é feita em uma função separada) */
  async update(req, res) {
    const { auth } = req.headers
    const {
      market_mail,
      market_password,
      market_cep,
      market_street,
      market_number,
      market_neighborhood,
      market_city,
      market_uf,
      market_latitude,
      market_longitude,
    } = req.body

    let flag = false

    const message = Joi.validate(
      req.body,
      validator.supermarketValidatorUpdate,
      (err) => {
        if (err) {
          flag = true
          return err.message
        }
      },
    )

    if (!flag) {
      await Supermarket.updateOne(
        { _id: auth },
        {
          market_mail,
          market_password,
          market_cep,
          market_street,
          market_number,
          market_neighborhood,
          market_city,
          market_uf,
          market_latitude,
          market_longitude,
        },
      )

      return res
        .status(204)
        .json({ success: 'Informações alteradas com sucesso' })
    }
    return res.json({ message })
  },
}
