const User = require('../models/User')

module.exports = {
  //FUNÇÃO PARA LOGAR O USUÁRIO
  async create(req, res) {
    const { mail, password } = req.body

    //SELECT * FROM User WHERE user_mail = mail and user_password = password
    const user = await User.findOne({ user_mail: mail, user_password: password })

    if(!user) {
      return res.status(400).json({ error: 'E-mail ou senha incorretos!' })
    }

    return res.json(user)
  }
}