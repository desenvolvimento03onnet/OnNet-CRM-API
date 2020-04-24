'use strict'

const Interview = use('App/Models/Interview');

class FilterInterviewController {

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
            .innerJoin('users', 'interviews.user_id', 'users.id')
            .count('interviews.id')
            .groupBy('users.id')

        return interview;
    }

}

module.exports = FilterInterviewController
