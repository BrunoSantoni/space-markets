//Import da biblioteca de criptografia (crypto) e da conexão
const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    //Método que lista todos os supermercados cadastrados
    async index(request, response) {
        const supermarkets = await connection('supermarkets').select('*')

        return response.json(supermarkets)
    },

    //Método que cadastra um mercado no BD.
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