const crypto = require('crypto')

const Supermarket = require('../models/Supermarket')

module.exports = {
  async create(req, res) {
    const { market_name, market_mail, market_password, market_cnpj, market_street,
      market_number, market_neighborhood, market_city, market_uf, market_picture } = req.body

    const { key } = req.file

    const market_id = market_name.replace(/ /g,'') + crypto.randomBytes(2).toString('HEX')
    await Supermarket.create({
      market_id,
      market_name,
      market_mail,
      market_password,
      market_cnpj,
      market_street,
      market_number,
      market_neighborhood,
      market_city,
      market_uf,
      market_picture,
      market_picture_key: key,
      market_picture_url: ''
    })

    return res.json({market_id})
  }
}