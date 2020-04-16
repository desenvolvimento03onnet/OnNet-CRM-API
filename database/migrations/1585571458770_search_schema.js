'use strict'

const Schema = use('Schema')

class SearchSchema extends Schema {
  up() {
    this.create('searches', (table) => {
      table.increments()
      table.string('type').notNullable().unique()
      table.boolean('active').notNullable().defaultTo(true)
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down() {
    this.drop('searches')
  }
}

module.exports = SearchSchema
