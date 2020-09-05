'use strict'

const Schema = use('Schema')

class QuestSchema extends Schema {
  up() {
    this.alter('quests', (table) => {
      table.integer('type_quest_id')
        .unsigned()
        .references('id')
        .inTable('type_quests')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
  }

  down() {
    this.drop('quests')
  }
}

module.exports = QuestSchema
