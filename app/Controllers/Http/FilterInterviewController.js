'use strict'

const Interview = use('App/Models/Interview');

class FilterInterviewController {

    async interviewsByCity({ request }) {
        const { active, city, user } = request.get();
        const interview = Interview.query()
            .select('cities.id', 'cities.name')
            .rightJoin('cities', 'interviews.city_id', 'cities.id')

        if (active)
            interview.where('cities.active', active)

        if (city)
            interview.where('interviews.city_id', city);

        if (user)
            interview.where('interviews.user_id', user);

        return await interview.count('interviews.id AS count').groupBy('cities.id');
    }

    async interviewsByUser({ request }) {
        const { active, user } = request.get();
        const interview = Interview.query()
            .select('users.id', 'users.name')
            .innerJoin('users', 'interviews.user_id', 'users.id')

        if (active)
            interview.where('users.active', active)

        if (user)
            interview.where('interviews.user_id', user);

        return await interview.count('interviews.id AS count').groupBy('users.id');
    }

    async avarageByCity() {
        const interview = await Interview.query()
            .select(
                'searches.type AS search',
                'cities.name AS city',
                'interviews.updated_at'
            ).innerJoin('searches', 'interviews.search_id', 'searches.id')
            .innerJoin('cities', 'interviews.city_id', 'cities.id')
            .innerJoin('answers', 'interviews.id', 'answers.interview_id')
            .where('cities.active', true)
            .avg('answers.rate AS avarage')
            .groupBy('interviews.city_id', 'searches.id')
            .orderBy('cities.name', 'searches.type')

        return interview;
    }

    async interviewsHistoric({ request }) {
        const page = request.get().page || 1;

        const interview = await Interview.query()
            .select(
                'searches.type AS search',
                'interviews.client_name',
                'cities.name AS city',
                'quests.question',
                'answers.rate',
                'answers.note',
                'users.name AS user',
                'interviews.updated_at'
            ).innerJoin('searches', 'interviews.search_id', 'searches.id')
            .innerJoin('cities', 'interviews.city_id', 'cities.id')
            .innerJoin('users', 'interviews.user_id', 'users.id')
            .innerJoin('answers', 'interviews.id', 'answers.interview_id')
            .innerJoin('quests', 'answers.quest_id', 'quests.id')
            .where('cities.active', true)
            .groupBy('answers.id')
            .orderBy('interviews.id', 'searches.type', 'cities.name')
            .paginate(page, '200')

        return interview;
    }
}

module.exports = FilterInterviewController
