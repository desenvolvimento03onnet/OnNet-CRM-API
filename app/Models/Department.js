"use strict";

const Model = use("Model");

class Department extends Model {
  answers() {
    return this.hasMany("App/Models/Answer");
  }
}

module.exports = Department;
