'use strict'

const Search = use('App/Models/Search');

class FilterSearchController {

    async findExceptSearch({ params }) {
        const search = await Search.query()
            .where('id', '!=', params.id)
            .with('quests').fetch();

        return search;
    }

}

module.exports = FilterSearchController
