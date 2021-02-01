"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AnswerSchema extends Schema {
  up() {
    this.table("answers", (table) => {
      table.integer("os").unsigned();
      table
        .integer("department_id")
        .unsigned()
        .references("id")
        .inTable("departments");
    });
  }

  down() {
    this.table("answers", (table) => {
      table.dropColumn("os");

      table.dropForeign("department_id");
      table.dropColumn("department_id");
    });
  }
}

module.exports = AnswerSchema;
