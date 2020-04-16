'use strict'

const Model = use('Model')

class Interview extends Model {

    city() {
        return this.belongsTo('App/Models/City');
    }

    quests() {
        return this.belongsToMany('App/Models/Quest').pivotModel('App/Models/Answer');
    }

    search() {
        return this.belongsTo('App/Models/Search');
    }

    user() {
        return this.belongsTo('App/Models/User');
    }

}

module.exports = Interview
