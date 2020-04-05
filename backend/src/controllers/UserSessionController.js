const connection = require('../database/connection')

module.exports = {
  async create(request, response) {
    const { user_mail, user_password } = request.body

    const user = await connection('users')
    .where('user_mail', user_mail)
    .where('user_password', user_password)
    .select('user_name').first()

    if(!user) {
      return response.status(400).json({ error: 'E-mail ou senha incorretos!' })
    }

    return response.json(user)
  }
}