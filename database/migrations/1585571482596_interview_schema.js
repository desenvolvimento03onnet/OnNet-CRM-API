'use strict'

const Schema = use('Schema')

class InterviewSchema extends Schema {
  up() {
    this.create('interviews', (table) => {
      table.increments()
      table.string('client_name').notNullable()
      table.date('interview_date').notNullable()
      table.boolean('finished').notNullable().defautTo(false)
      table.integer('search_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('searches')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.integer('city_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
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
    this.drop('interviews')
  }
}

module.exports = InterviewSchema
