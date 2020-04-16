'use strict'

const Schema = use('Schema')

class AnswerSchema extends Schema {
  up() {
    this.create('answers', (table) => {
      table.increments()
      table.integer('rate').unsigned()
      table.string('note')
      table.integer('interview_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('interviews')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.integer('quest_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('quests')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down() {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
