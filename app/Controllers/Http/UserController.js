'use strict'

const User = use('App/Models/User');

class UserController {

    async index({ request }) {
        const { active, username } = request.get()
        const users = User.query();

        if (active)
            users.where('active', active);

        if (username)
            users.where('username', username)

        return await users.fetch();
    }

    async store({ request }) {
        const data = request.only(['name', 'username', 'password', 'active', 'permission_id']);
        const user = await User.create(data);

        return user;
    }

    async show({ params }) {
        const users = await User.findOrFail(params.id);

        return users;
    }

    async update({ params, request }) {
        const data = request.only(['name', 'username', 'password', 'active', 'permission_id']);
        const user = await User.findOrFail(params.id);

        user.merge(data);
        await user.save();

        return user;
    }

    async destroy({ params }) {
        const user = await User.findOrFail(params.id);

        user.delete();
    }
}

module.exports = UserController
