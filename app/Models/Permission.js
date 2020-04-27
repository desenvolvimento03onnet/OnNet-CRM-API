'use strict'

const Model = use('Model')

class Permission extends Model {

    users() {
        return this.belongsToMany('App/Models/User')
    }
}

module.exports = Permission
