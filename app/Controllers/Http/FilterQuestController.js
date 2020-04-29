'use strict'

const Quest = use('App/Models/Quest');

class FilterQuestController {

    async findExceptSearch({ params }) {
        let ids = [];

        const subquery = await Quest.query()
            .select('quests.id')
            .innerJoin('search_quests', 'quests.id', 'search_quests.quest_id')
            .leftJoin('searches', 'search_quests.search_id', 'searches.id')
            .where('searches.id', params.id)
            .orderBy('quests.id', 'desc').fetch();

        subquery.toJSON().forEach(quest => {
            ids.push(quest.id);
        })

        const quest = await Quest.query()
            .whereNotIn('id', ids).fetch();

        return quest;
    }

}

module.exports = FilterQuestController
