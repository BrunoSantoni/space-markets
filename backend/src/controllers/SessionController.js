//Importando a conexão
const connection = require('../database/connection')

module.exports = {
    //Método de login
    async create(request, response) {
        const { id, senha } = request.body

        const supermarket = await connection('supermarkets')
        .where('id', id)
        .where('senha', senha)
        .select('marca').first()

        if(!supermarket) {
            return response.status(400).json({ error: 'ID ou senha incorretos!' })
        }

        return response.json(supermarket)
    }
}