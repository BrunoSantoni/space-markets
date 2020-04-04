//Migration para adicionar o campo CNPJ na tabela de mercados.

exports.up = function(knex) {
  return knex.schema.table('supermarkets', function(table) {
    table.string('cnpj', 20).defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.table('supermarkets', function(table) {
    table.dropColumn('cnpj')
  })  
}
