const Supermarket = require('../models/Supermarket')

module.exports = {
  async create(req, res) {
    const { mail, password } = req.body

    const market = await Supermarket.findOne({
      market_mail: mail,
      market_password: password,
    })

    if (!market) {
      return res.status(400).json({ error: 'ID ou senha incorretos!' })
    }

    return res.json(market)
  },
}
