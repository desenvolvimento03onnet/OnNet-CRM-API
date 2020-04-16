'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {

  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  permissions() {
    return this.belongsToMany('App/Models/Permission').pivotModel('App/Models/UserPermission')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

}

module.exports = User
