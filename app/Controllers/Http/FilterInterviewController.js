'use strict'

const Interview = use('App/Models/Interview');

class FilterInterviewController {

    async interviewsByCity({ request }) {
        const { active } = request.get();
        const interview = Interview.query()
            .select('cities.id', 'cities.name')
            .rightJoin('cities', 'interviews.city_id', 'cities.id')

        if (active)
            interview.where('cities.active', active)

        return await interview.count('interviews.id AS count').groupBy('cities.id');
    }

    async interviewsByUser({ request }) {
        const { active } = request.get();
        const interview = Interview.query()
            .select('users.id', 'users.name')
            .innerJoin('users', 'interviews.user_id', 'users.id')

        if (active)
            interview.where('users.active', active)

        return await interview.count('interviews.id AS count').groupBy('users.id');
    }

}

module.exports = FilterInterviewController
