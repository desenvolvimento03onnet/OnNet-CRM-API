'use strict'

const Schema = use('Schema')

class PermissionSchema extends Schema {
  up() {
    this.create('permissions', (table) => {
      table.increments()
      table.string('type', 32).notNullable()
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
