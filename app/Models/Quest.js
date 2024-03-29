'use strict'

const Model = use('Model')

class Quest extends Model {

    searches() {
        return this.belongsToMany('App/Models/Search').pivotModel('App/Models/SearchQuest');
    }

    interviews() {
        return this.belongsToMany('App/Models/Interview').pivotModel('App/Models/Answer');
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

}

module.exports = Quest
