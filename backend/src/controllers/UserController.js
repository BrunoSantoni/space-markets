const User = require('../models/User')
const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
  async show(req, res) {
    const { auth } = req.headers

    await User.findOne({ user_mail: auth }, async (err, data) => {
      if (err) {
        return res.json(err)
      }
      return res.json(data)
    })
  },

  async create(req, res) {
    const {
      user_name,
      user_mail,
      user_cpf,
      user_password,
      user_picture,
    } = req.body
    const uploadedImage = await cloudinary.v2.uploader
      .upload(user_picture)
      .then((response) => response)

    const user = await User.create({
      user_name,
      user_mail,
      user_cpf,
      user_password,
      user_profile_picture_url: uploadedImage.secure_url,
      user_profile_picture_key: uploadedImage.public_id,
    })

    return res.json(user)
  },
}
