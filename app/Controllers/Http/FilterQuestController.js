'use strict'

const Quest = use('App/Models/Quest');

class FilterQuestController {

    async findExceptSearch({ params, request }) {
        let ids = [];

        const { active } = request.get();

        const subquery = await Quest.query()
            .select('quests.id')
            .innerJoin('search_quests', 'quests.id', 'search_quests.quest_id')
            .leftJoin('searches', 'search_quests.search_id', 'searches.id')
            .where('searches.id', params.id).fetch();

        subquery.toJSON().forEach(quest => {
            ids.push(quest.id);
        })

        const quest = Quest.query()
            .whereNotIn('id', ids);

        if (active)
            quest.where('active', active);

        return await quest.fetch();
    }

}

module.exports = FilterQuestController
