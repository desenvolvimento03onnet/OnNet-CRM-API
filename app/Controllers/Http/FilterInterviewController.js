'use strict'

const Interview = use('App/Models/Interview');

class FilterInterviewController {

    async findByCity({ params }) {
        const interview = await Interview.query().where('city_id', params.id).with('city').fetch();

        return interview;
    }

    async findBySearch({ params }) {
        const interview = await Interview.query().where('search_id', params.id).with('search').fetch();

        return interview;
    }

    async findByUser({ params }) {
        const interview = await Interview.query().where('user_id', params.id).with('user').fetch();

        return interview;
    }

    async interviewsByCity() {
        const interview = Interview.query()
            .select('cities.id', 'cities.name')
            .rightJoin('cities', 'interviews.city_id', 'cities.id')
            .count('interviews.id')
            .groupBy('cities.id')

        return interview;
    }

    async interviewsByUser() {
        const interview = Interview.query()
            .select('users.id', 'users.name')
            .rightJoin('users', 'interviews.user_id', 'users.id')
            .count('interviews.id')
            .groupBy('users.id')

        return interview;
    }

}

module.exports = FilterInterviewController
