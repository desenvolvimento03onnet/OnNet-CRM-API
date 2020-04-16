'use strict'

const Schema = use('Schema')

class SearchQuestSchema extends Schema {
  up() {
    this.create('search_quests', (table) => {
      table.increments()
      table.integer('search_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('searches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('quest_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('quests')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('search_quests')
  }
}

module.exports = SearchQuestSchema
