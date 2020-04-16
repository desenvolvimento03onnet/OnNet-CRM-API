'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up() {
    this.create('cities', (table) => {
      table.increments()
      table.string('name', 60).notNullable().unique()
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
    this.drop('cities')
  }
}

module.exports = CitySchema
