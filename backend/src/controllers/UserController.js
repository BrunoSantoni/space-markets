const User = require('../models/User')

module.exports = {
  async create(req, res) {
    const { user_name, user_mail, user_cpf, user_password } = req.body

    const user = await User.create({
      user_name,
      user_mail,
      user_cpf,
      user_password
    })

    return res.json(user)
  }
}