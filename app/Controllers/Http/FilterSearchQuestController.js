'use strict'

const SearchQuest = use('App/Models/SearchQuest');

class FilterSearchQuestController {

    async findBySearch({ params }) {
        const searchQuest = SearchQuest.query()
            .innerJoin('quests', 'search_quests.quest_id', 'quests.id')
            .where('search_quests.search_id', params.id)

        return await searchQuest.with('search').with('quest').fetch();
    }

    async findByQuest({ params }) {
        const searchQuest = SearchQuest.query()
            .innerJoin('searches', 'search_quests.search_id', 'searches.id')
            .where('search_quests.quest_id', params.id)

        return await searchQuest.with('search').with('quest').fetch();
    }

}

module.exports = FilterSearchQuestController
