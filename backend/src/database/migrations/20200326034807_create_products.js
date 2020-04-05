//Migration para criar a tabela de produtos.

exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments()
        table.string('nome').notNullable()
        table.string('descricao').notNullable()
        table.decimal('preco').notNullable()
        //ADICIONAR FOTO

        table.string('supermarket_id').notNullable()
        table.foreign('supermarket_id').references('id').inTable('supermarkets')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('products')
}
