const Product = require('../models/Product')

module.exports = {
  //FUNÇÃO PARA INSERIR PRODUTOS, PRECISA PASSAR O ID REAL COMO PARÂMETRO PARA O HEADERS
  async create(req, res) {
    const { product_name, product_description, product_price } = req.body
    const { key } = req.file
    
    const auth = req.headers.auth

    const prod = await Product.create({
      product_name,
      product_description,
      product_price,
      market_id: auth,
      product_picture_key: key,      
      product_picture_url: ''
    })

    //const prod = await Product.find().populate('market_id', 'market_name').select('product_name')

    return res.json(prod)
  }
}