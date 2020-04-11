const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const auth = req.headers.auth
    console.log(auth)

    await User.findOne({user_mail: auth}, function(err, data) {
      if(err) { return console.log(err) }
      console.log(data)
    })
  },

  async create(req, res) {
    const { user_name, user_mail, user_cpf, user_password, user_picture } = req.body

    console.log(user_picture)
    const user_profile_picture = new Buffer.from(user_picture.split(",")[1],"base64")

    const user = await User.create({
      user_name,
      user_mail,
      user_cpf,
      user_password,
      user_profile_picture
    })

    return res.json(user)
  }
}