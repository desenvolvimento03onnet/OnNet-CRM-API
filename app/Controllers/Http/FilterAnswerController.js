'use strict'

const Answer = use('App/Models/Answer');
const Interview = use('App/Models/Interview');
const Quest = use('App/Models/Quest');

class FilterAnswerController {

    async getInterviews(search_id, city, begin, end) {
        const interview = Interview.ids()
            .where('search_id', search_id)

        if (city)
            interview.where('city_id', city);

        if (begin)
            interview.where('created_at', '>=', begin + ' 00:00:00');

        if (end)
            interview.where('created_at', '<=', end + ' 23:59:59');

        return await interview;
    }

    async countRates({ params, request, response }) {
        const { quest, city, begin, end } = request.get();

        const interview = await this.getInterviews(params.id, city, begin, end);

        if (!quest)
            return response.status(500).json({error: "Não foi possível encontrar o parâmetro 'quest'"});

        const answer = await Answer.query()
            .select('answers.rate')
            .whereIn('answers.interview_id', interview)
            .where('answers.quest_id', quest)
            .count('answers.id AS count')
            .groupBy('answers.rate')
            .orderBy('answers.rate')

        return answer;
    }

}

module.exports = FilterAnswerController