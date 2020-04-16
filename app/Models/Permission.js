'use strict'

const Model = use('Model')

class Permission extends Model {

    users() {
        return this.belongsToMany('App/Models/User').pivotModel('App/Models/UserPermission');
    }
}

module.exports = Permission
