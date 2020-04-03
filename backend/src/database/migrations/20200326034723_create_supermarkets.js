//Migration para criar a tabela de supermercados

/*Nas migrations, o método up faz um código, e o down terá que desfaze-lo,
Por exemplo, se o up está criando a tabela, o down deve deletá-la.*/

exports.up = function(knex) {
    return knex.schema.createTable('supermarkets', (table) => {
        table.string('id').primary()
        table.string('marca').notNullable()
        table.string('email').notNullable()
        table.string('senha').notNullable()
        table.string('rua').notNullable()
        table.string('numero').notNullable()
        table.string('bairro').notNullable()
        table.string('cidade').notNullable()
        table.string('estado', 2).notNullable()
        //ADICIONAR FOTO
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('supermarkets')
}
