'use strict'

const Permission = use('App/Models/Permission')

class PermissionController {

  async index() {
    const permission = await Permission.all();

    return permission;
  }

  async store({ request }) {
    const data = request.only(['type', 'level']);
    const permission = await Permission.create(data);

    return permission;
  }

  async show({ params }) {
    const permission = await Permission.findOrFail(params.id);

    return permission;
  }

  async update({ params, request }) {
    const data = request.only(['type', 'level', 'active']);
    const permission = await permission.findOrFail(params.id);

    permission.merge(data);
    await permission.save();

    return permission;
  }

  async destroy({ params }) {
    const permission = await Permission.findOrFail(params.id);

    permission.delete();
  }
}

module.exports = PermissionController
