const Product = require('../models/Product')

module.exports = {
  async show(req, res) {
    const { auth } = req.headers

    const products = await Product.find({ market_id: auth })
      .limit(2)
      .sort('product_price')

    return res.json(products)
  },
}
