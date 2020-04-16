'use strict'

const Model = use('Model')

class SearchQuest extends Model {

    search() {
        return this.belongsTo('App/Models/Search');
    }

    quest() {
        return this.belongsTo('App/Models/Quest');
    }

}

module.exports = SearchQuest
