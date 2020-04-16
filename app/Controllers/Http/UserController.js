'use strict'

const User = use('App/Models/User');

class UserController {

    async index() {
        const users = await User.all();

        return users;
    }

    async store({ request }) {
        const { permissions, ...data } = request.only(['name', 'username', 'password', 'active']);
        const user = await User.create(data);

        if (permissions && permissions.length > 0) {
            await user.permissions().attach(permissions);
            search.permissions = await user.permissions().fetch();
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
