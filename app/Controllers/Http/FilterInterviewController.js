'use strict'

const Interview = use('App/Models/Interview');

class FilterInterviewController {

    async interviewsByCity({ request }) {
        const { search, active, city, user, begin, end } = request.get();
        const interview = Interview.query()
            .select('cities.id', 'cities.name')
            .rightJoin('cities', 'interviews.city_id', 'cities.id')

        if (search)
            interview.where('search_id', search);

        if (active)
            interview.where('cities.active', active);

        if (city)
            interview.where('interviews.city_id', city);

        if (user)
            interview.where('interviews.user_id', user);

        if (begin)
            interview.where('interview_date', '>=', begin + ' 00:00:00');

        if (end)
            interview.where('interview_date', '<=', end + ' 23:59:59');

        return await interview.count('interviews.id AS count')
            .groupBy('cities.id')
            .orderBy('cities.created_at', 'DESC');
    }

    async interviewsByUser({ request }) {
        const { search, active, user, begin, end } = request.get();
        const interview = Interview.query()
            .select('users.id', 'users.name')
            .innerJoin('users', 'interviews.user_id', 'users.id')

        if (search)
            interview.where('search_id', search)

        if (active)
            interview.where('users.active', active);

        if (user)
            interview.where('interviews.user_id', user);

        if (begin)
            interview.where('interview_date', '>=', begin + ' 00:00:00');

        if (end)
            interview.where('interview_date', '<=', end + ' 23:59:59');

        return await interview.count('interviews.id AS count')
            .groupBy('users.id')
            .orderBy('users.created_at', 'DESC');
    }

    async getFilteredInterview({ request }) {
        const {
            begin,
            end,
            city,
            search,
            user,
            client_name
        } = request.body;

        var { paginate, page, perPage } = request.get();
        const interviews = Interview.query().with('city').with('search').with('user');

        page = page ? page : 1;
        perPage = perPage ? perPage : 200;

        if (begin)
            interviews.where('interview_date', '>=', begin);

        if (city)
            interviews.where('city_id', city);

        if (end)
            interviews.where('interview_date', '<=', end);

        if (search)
            interviews.where('search_id', search);

        if (user)
            interviews.where('user_id', user);

        if (client_name)
            interviews.where('client_name', 'LIKE', '%' + client_name + '%');

        if (paginate === '0')
            return await interviews.orderBy('interview_date', 'DESC').paginate(1, Infinity);

        else
            return await interviews.orderBy('interview_date', 'DESC').paginate(page, perPage);
    }

}

module.exports = FilterInterviewController
