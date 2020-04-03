//Importando a conexão com o banco
const connection = require('../database/connection')

module.exports = {
    //Função que lista os produtos cadastrados de um determinado mercado
    async index(request, response) {
        const { page = 1 } = request.query
        const supermarket_id = request.headers.auth

        const [count] = await connection('products').count()

        //Depois precisará adicionar um método de listar todos os produtos
        const produtos = await connection('products').where('supermarket_id',supermarket_id)
        .join('supermarkets', 'supermarkets.id', '=', 'products.supermarket_id')
        .limit(10)
        .offset((page - 1) * 10)
        .select(['products.*', 'supermarkets.marca', 'supermarkets.rua', 'supermarkets.numero',
        'supermarkets.bairro', 'supermarkets.cidade', 'supermarkets.estado'])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(produtos)
    },

    //Método que cadastra um produto no BD
    async create(request, response) {
        const { nome, descricao, preco } = request.body
        const supermarket_id = request.headers.auth

        const[id] = await connection('products').insert({
            nome,
            descricao,
            preco,
            supermarket_id,
        })

        return response.json({ id })
    },

    //Método que exclui um produto no BD
    async delete(request, response) {
        const { id } = request.params
        const supermarket_id = request.headers.auth

        const product = await connection('products').where('id', id).select('supermarket_id').first()

        if(supermarket_id !== product.supermarket_id) {
            return response.status(401).json({ error: 'Operação não permitida' })
        }

        await connection('products').where('id', id).delete()
        return response.status(204).send()
    }
}