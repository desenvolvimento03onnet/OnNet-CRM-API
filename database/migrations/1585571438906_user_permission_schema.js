'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPermissionSchema extends Schema {
  up() {
    this.create('user_permissions', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('permission_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('permissions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_permissions')
  }
}

module.exports = UserPermissionSchema
