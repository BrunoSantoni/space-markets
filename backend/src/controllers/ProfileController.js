const Supermarket = require('../models/Supermarket')
const Product = require('../models/Product')

module.exports = {

  async index(req, res) {
    const auth = req.headers.auth

    await Supermarket.find({_id: auth}, function(err, data) {
      if(err) return console.log(err)
      return res.json(data)
    })
  },

  async update(req, res) {
    const auth = req.headers.auth
    const { market_mail, market_password, market_cep, market_street, market_number,
      market_neighborhood, market_city, market_uf, market_latitude, market_longitude } = req.body

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
  },

  //Função para retornar a imagem do usuário para o front;
  async profileImage(req, res) {
    const auth = req.headers.auth
    
    //SELECT market_picture_url FROM Supermarket
    await Supermarket.find({market_id: auth}, {_id: 0, market_picture_url: 1}, function(err, data) {
      if(err) { return console.log(err) }
      return res.json(data)
    })
  }
}