'use strict'

const SearchQuest = use('App/Models/SearchQuest');

class SearchQuestController {

  async index() {
    const searchQuest = await SearchQuest.query().with('search').with('quest').fetch();

    return searchQuest;
  }

  async show({ params }) {
    const searchQuest = await SearchQuest.query().where('id', params.id).with('search').with('quest').fetch();

    return searchQuest.rows[0];
  }

  async destroy({ params }) {
    const searchQuest = await SearchQuest.findOrFail(params.id);

    searchQuest.delete();
  }

}

module.exports = SearchQuestController
