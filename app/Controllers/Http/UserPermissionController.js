'use strict'

const UserPermission = use('App/Models/UserPermission')

class UserPermissionController {

  async index({ request }) {
    const { permission, user } = request.get();
    const userPermissions = UserPermission.query().with('user').with('permission');

    if (permission)
      userPermissions.where('permission_id', permission);

    if (user)
      userPermissions.where('user_id', user);

    return await userPermissions.fetch();
  }

  async show({ params }) {
    const userPermission = await UserPermission.findOrFail(params.id);

    return userPermission;
  }

  async destroy({ params }) {
    const userPermission = await UserPermission.findOrFail(params.id);

    userPermission.delete();
  }
}

module.exports = UserPermissionController
