'use strict'

const User = use('App/Models/User');

class UserController {

    async index({ request }) {
        const { active } = request.get()
        const users = User.query();

        if (active)
            users.where('active', active);

        return await users.fetch();
    }

    async store({ request }) {
        const { permissions, ...data } = request.only(['name', 'username', 'password', 'active', 'permissions']);
        const user = await User.create(data);

        if (permissions && permissions.length > 0) {
            await user.permissions().attach(permissions);
            user.permissions = await user.permissions().fetch();
        }

        return user;
    }

    async show({ params }) {
        const users = await User.findOrFail(params.id);

        return users;
    }

    async update({ params, request }) {
        const { permissions, ...data } = request.only(['name', 'username', 'password', 'active']);
        const user = await User.findOrFail(params.id);

        user.merge(data);
        await user.save();

        if (permissions && permissions.length > 0) {
            await user.permissions().sync(permissions);
            user.permissions = await user.permissions().fetch();
        }

        return user;
    }

    async destroy({ params }) {
        const user = await User.findOrFail(params.id);

        user.delete();
    }
}

module.exports = UserController
