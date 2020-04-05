exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('user_name').notNullable()
    table.string('user_mail').notNullable()
    table.string('user_cpf').notNullable()
    table.string('user_password').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
