'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeQuestSchema extends Schema {
  up() {
    this.create('type_quests', (table) => {
      table.increments()
      table.string('type').notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('type_quests')
  }
}

module.exports = TypeQuestSchema
