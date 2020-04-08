const Supermarket = require('../models/Supermarket')

module.exports = {
  async create(req, res) {
    const { id, password } = req.body

    const market = await Supermarket.findOne({ market_id: id, market_password: password })

    if(!market) {
      return res.status(400).json({ error: 'ID ou senha incorretos!' })
    }

    return res.json(market)
  }
}