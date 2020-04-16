'use strict'

const SearchQuest = use('App/Models/SearchQuest');

class FilterSearchQuestController {

    async findBySearch({ params }) {
        const searchQuest = await SearchQuest.query().where('search_id', params.id).with('search').with('quest').fetch();

        return searchQuest;
    }

    async findByQuest({ params }) {
        const searchQuest = await SearchQuest.query().where('quest_id', params.id).with('search').with('quest').fetch();

        return searchQuest;
    }

}

module.exports = FilterSearchQuestController
