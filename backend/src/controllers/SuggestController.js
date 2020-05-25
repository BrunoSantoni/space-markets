const Suggest = require('../models/Suggest')
const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
  /* Retorna as sugestões de um mercado */
  async index(req, res) {
    const { auth } = req.headers

    const suggestions = await Suggest.find({ market_id: auth })

    return res.json(suggestions)
  },

  async store(req, res) {
    const {
      suggest_name,
      suggest_description,
      suggest_price,
      suggest_picture,
    } = req.body

    const { auth } = req.headers

    const uploadedImg = await cloudinary.v2.uploader
      .upload(suggest_picture)
      .then((response) => response)

    const suggestion = await Suggest.create({
      suggest_name,
      suggest_description,
      suggest_price,
      suggest_picture_url: uploadedImg.secure_url,
      suggest_picture_key: uploadedImg.public_id,
      suggest_user: true,
      market_id: auth,
    })

    return res.json(suggestion)
  },

  async delete(req, res) {
    const { id } = req.params
    const marketId = req.headers.auth

    const suggestion = await Suggest.findById(id)

    // eslint-disable-next-line eqeqeq
    if (marketId != suggestion.market_id) {
      return res.status(401).json({ error: 'Operação não permitida' })
      /* Troca o Status do código HTTP. Código de sucesso é 200, e 401 é não autorizado,
      Ou seja, o mercado não está autorizado a deletar esse produto */
    }

    await suggestion.remove()

    /* Deletar imagem do banco */
    await cloudinary.v2.uploader.destroy(
      suggestion.suggest_picture_key,
      (err, result) => {
        if (err) res.json(err)
        res.json(result)
      },
    )

    return res.status(204).send()
  },
}
