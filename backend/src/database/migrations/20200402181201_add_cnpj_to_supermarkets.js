//Migration para adicionar o campo CNPJ na tabela de mercados.

exports.up = function(knex) {
  return knex.schema.table('supermarkets', function(table) {
    table.string('cnpj', 14).defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.table('supermarkets', function(table) {
    table.dropColumn('cnpj')
  })  
}
