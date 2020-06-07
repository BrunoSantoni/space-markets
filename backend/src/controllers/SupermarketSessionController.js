const bcrypt = require('bcryptjs')
const Supermarket = require('../models/Supermarket')

module.exports = {
  async create(req, res) {
    const { mail, password } = req.body

    const market = await Supermarket.findOne({ market_mail: mail })

    if (!market) {
      return res.status(401).json({ error: 'Mercado não cadastrado' })
    }

    const passwordMatch = await bcrypt.compare(password, market.market_password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })
    }

    const { _id, market_name } = market

    return res.json({
      _id,
      market_name,
    })
  },
}
