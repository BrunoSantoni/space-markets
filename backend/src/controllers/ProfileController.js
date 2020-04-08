const Supermarket = require('../models/Supermarket')
const Product = require('../models/Product')

module.exports = {
  //Função para retornar a imagem do usuário para o front;
  async profileImage(req, res) {
    const auth = req.headers.auth
    
    //SELECT market_picture_url FROM Supermarket
    await Supermarket.find({market_id: auth}, {_id: 0, market_picture_url: 1}, function(err, data) {
      if(err) { return console.log(err) }
      return res.json(data)
    })
  },

  async index(req, res) {
    const auth = req.headers.auth

    const products = await Product.find({market_id: auth})

    return res.json(products)
  }
}