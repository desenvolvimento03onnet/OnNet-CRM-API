"use strict";

const Model = use("Model");

class Answer extends Model {
  interview() {
    return this.belongsTo("App/Models/Interview");
  }

  quest() {
    return this.belongsTo("App/Models/Quest");
  }

  department() {
    return this.belongsTo("App/Models/Department");
  }
}

module.exports = Answer;
