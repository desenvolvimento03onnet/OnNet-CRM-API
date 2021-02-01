"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestSchema extends Schema {
  up() {
    this.table("quests", (table) => {
      table.boolean("need_department").defaultTo(false);
      table.boolean("need_os").defaultTo(false);
    });
  }

  down() {
    this.table("quests", (table) => {
      table.dropColumn("need_department");
      table.dropColumn("need_os");
    });
  }
}

module.exports = QuestSchema;
