'use strict'

const Answer = use('App/Models/Answer');
const Quest = use('App/Models/Quest');

class FilterAnswerController {

    async countAnswersByQuest({ params }) {
        let answerByQuest = [];

        const quest = await Quest.query()
            .innerJoin('search_quests', 'quests.id', 'search_quests.quest_id')
            .where('search_quests.search_id', params.id)
            .where('quests.active', true)
            .orderBy('quests.id').fetch();

        for (var i = 0; i < quest.rows.length; i++) {

            const answer = await Answer.query()
                .select('answers.rate')
                .innerJoin('interviews', 'answers.interview_id', 'interviews.id')
                .innerJoin('quests', 'answers.quest_id', 'quests.id')
                .where('quests.id', quest.rows[i].quest_id)
                .where('interviews.search_id', params.id)
                .count('answers.id AS count')
                .groupBy('quests.id', 'answers.rate')
                .orderBy('answers.rate')

            answerByQuest.push({
                quest_id: quest.rows[i].quest_id,
                question: quest.rows[i].question,
                rates: answer
            })
        }

        return answerByQuest;
    }

}

module.exports = FilterAnswerController