'use strict'

const Answer = use('App/Models/Answer');
const Interview = use('App/Models/Interview');
const Quest = use('App/Models/Quest');

class FilterAnswerController {

    async getQuests(search_id) {
        var quest = await Quest.query()
            .select('quests.id AS id', 'quests.question')
            .innerJoin('search_quests', 'quests.id', 'search_quests.quest_id')
            .where('search_quests.search_id', search_id)
            .orderBy('search_quests.id').fetch();

        return quest.rows;
    }

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

    async getAnswers(quests, interviews) {
        var query = [];

        for (var i = 0; i < quests.length; i++) {
            const answer = await Answer.query()
                .select('answers.rate')
                .whereIn('answers.interview_id', interviews)
                .where('answers.quest_id', quests[i].id)
                .count('answers.id AS count')
                .groupBy('answers.rate')
                .orderBy('answers.rate')

            query.push({
                quest_id: quests[i].id,
                question: quests[i].question,
                rates: answer
            })
        }

        return query;
    }

    async countRates({ params, request }) {
        const { city, begin, end } = request.get();

        const interview = await this.getInterviews(params.id, city, begin, end);

        if (interview.length > 0) {
            const quest = await this.getQuests(params.id);

            return await this.getAnswers(quest, interview);
        }

        return [];
    }

}

module.exports = FilterAnswerController