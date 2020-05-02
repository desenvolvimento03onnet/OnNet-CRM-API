'use strict'

const Search = use('App/Models/Search');

class FilterSearchController {

    async findExceptQuest({ params, request }) {
        const { active } = request.get();
        let ids = [];

        const subquery = await Search.query()
            .select('searches.id')
            .innerJoin('search_quests', 'searches.id', 'search_quests.search_id')
            .leftJoin('quests', 'search_quests.quest_id', 'quests.id')
            .where('quests.id', params.id).fetch();

        subquery.toJSON().forEach(quest => {
            ids.push(quest.id);
        })

        const search = Search.query()
            .whereNotIn('id', ids);

        if (active)
            search.where('active', active);

        return await search.fetch()
    }

}

module.exports = FilterSearchController
