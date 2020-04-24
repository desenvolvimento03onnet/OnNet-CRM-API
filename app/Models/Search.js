'use strict'

const Model = use('Model')

class Search extends Model {

    quests() {
        return this.belongsToMany('App/Models/Quest').pivotModel('App/Models/SearchQuest');
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

}

module.exports = Search
