const Suggest = require('../models/Suggest')
const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
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
}
