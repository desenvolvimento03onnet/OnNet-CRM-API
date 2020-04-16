'use strict'

const Schema = use('Schema')

class QuestSchema extends Schema {
  up() {
    this.create('quests', (table) => {
      table.increments()
      table.string('question', 255).notNullable()
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
    this.drop('quests')
  }
}

module.exports = QuestSchema
