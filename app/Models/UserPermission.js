'use strict'

const Model = use('Model')

class UserPermission extends Model {

    user() {
        return this.belongsTo('App/Models/User');
    }

    permission() {
        return this.belongsTo('App/Models/Permission');
    }

}

module.exports = UserPermission
