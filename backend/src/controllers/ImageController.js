/* eslint-disable no-shadow */
const Supermarket = require('../models/Supermarket')

const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
  /* Retorna a imagem do usuário para ser exibida no perfil na web */
  async show(req, res) {
    const { auth } = req.headers

    // SELECT market_picture_url FROM Supermarket WHERE Supermarket_id
    await Supermarket.find(
      { _id: auth },
      { _id: 0, market_picture_url: 1 },
      (err, data) => {
        if (err) {
          return res.json(err)
        }
        return res.json(data)
      },
    )
  },

  /* Atualiza a imagem de perfil do mercado */
  async update(req, res) {
    const { auth } = req.headers
    const { public_id, url = '' } = req.file
    let flag = false

    const market = await Supermarket.findById(auth)

    await Supermarket.updateOne(
      { _id: auth },
      {
        market_picture_url: url,
        market_picture_key: public_id,
      },
      (err, data) => {
        if (err) return res.status(400).json({ message: 'Não foi possível alterar a sua foto de perfil' })
        flag = true
      },
    )

    if (flag) {
      await cloudinary.v2.uploader.destroy(market.market_picture_key, (err) => {
        if (err) return res.status(400).json({ message: 'A imagem não foi deletada no Cloudinary' })
        return res.status(204).send()
      })
    }
  },
}
