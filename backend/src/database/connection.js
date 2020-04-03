//Arquivo que configura a conexão
//Importando o framework de BD knex e a configuração do knexfile e criando a conexão

const knex = require('knex')
const config = require('../../knexfile')

const connection = knex(config.development)

module.exports = connection