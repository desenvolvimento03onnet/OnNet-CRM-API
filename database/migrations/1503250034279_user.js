'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('username', 32).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table.integer('permission_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('permissions')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
