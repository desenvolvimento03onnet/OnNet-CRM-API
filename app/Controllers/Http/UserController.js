'use strict'

const User = use('App/Models/User');

class UserController {

    async index({ request }) {
        const { active, username, searcher } = request.get()
        const users = User.query().with('permission');

        if (active)
            users.where('users.active', active);

        if (username)
            users.where('users.username', username)

        if(searcher)
            users.innerJoin('interviews', 'users.id', 'interviews.user_id')

        // return await users.orderBy('users.created_at', 'DESC').fetch();
        return await users.groupBy('users.id').fetch();
    }

    async store({ request }) {
        const data = request.only(['name', 'username', 'password', 'active', 'permission_id']);
        const user = await User.create(data);

        return user;
    }

    async show({ params }) {
        const users = await User.query().with('permission').where('id', params.id).fetch();

        return users.rows[0];
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
