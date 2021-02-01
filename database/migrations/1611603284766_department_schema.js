"use strict";

const Schema = use("Schema");

class DepartmentSchema extends Schema {
  up() {
    this.create("departments", (table) => {
      table.increments();

      table.string("name");

      table.timestamps();
    });
  }

  down() {
    this.drop("departments");
  }
}

module.exports = DepartmentSchema;
