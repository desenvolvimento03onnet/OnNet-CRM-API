'use strict'

const Model = use('Model')

class City extends Model {
    user() {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = City
