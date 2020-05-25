const Joi = require('joi')

const Product = require('../models/Product')
const Suggest = require('../models/Suggest')

const validator = require('../Validators/validators')

const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
  async create(req, res) {
    const {
      suggest_id,
      product_name,
      product_description,
      product_price,
      product_user,
      product_picture_url,
      product_picture_key,
    } = req.body

    let flag = false

    const { auth } = req.headers

    const message = Joi.validate(
      req.body,
      validator.suggestProductValidatorCreate,
      (err, resp) => {
        if (err) {
          flag = true
          return err.message
        }
      },
    )

    if (!flag) {
      const prod = await Product.create({
        product_name,
        product_description,
        product_price,
        market_id: auth,
        product_picture_url,
        product_picture_key,
        product_user,
      })

      if (prod != undefined) {
        const suggest = await Suggest.findById(suggest_id)

        if (auth != suggest.market_id) {
          return res.status(401).json({ error: 'Operação não permitida' })
        }

        await suggest.remove()
      }

      /* const prod =
       await Product.find().populate('market_id', 'market_name').select('product_name') */
      return res.json(prod)
    }
    return res.json({ message })
  },
}
