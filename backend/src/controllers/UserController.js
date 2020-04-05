const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*')

    return response.json(users)
  },

  async create(request, response) {
    const { user_name, user_mail, user_cpf, user_password } = request.body

    const [id] = await connection('users').insert({
      user_name,
      user_mail,
      user_cpf,
      user_password,
    })

    return response.json({ id })
  }
}