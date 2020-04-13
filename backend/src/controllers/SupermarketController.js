const crypto = require('crypto')

const Supermarket = require('../models/Supermarket')

module.exports = {
  async create(req, res) {
    const { market_name, market_mail, market_password, market_cnpj, market_street,
      market_number, market_neighborhood, market_city, market_uf,
      market_latitude, market_longitude } = req.body
    const { key, url = '' } = req.file

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
      market_latitude,
      market_longitude,
      market_picture_key: key,
      market_picture_url: url
    })

    return res.json({market_id})
  }
}