const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const supermarkets = await connection('supermarkets').select('*')

        return response.json(supermarkets)
    },

    async create(request, response) {
        const { marca, email, senha, rua, numero, bairro, cidade, estado } = request.body

        //replace está tirando os possíveis espaços do nome
        const id = marca.replace(/ /g,'') + crypto.randomBytes(2).toString('HEX')

        await connection('supermarkets').insert({
            id,
            marca,
            email,
            senha,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        })

        return response.json({ id })
    }
}