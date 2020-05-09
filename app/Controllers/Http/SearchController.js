'use strict'

const Search = use('App/Models/Search');

class SearchController {

  async index({ request }) {
    const { active, user } = request.get();
    const searches = Search.query().with('quests').with('user');

    if (active)
      searches.where('active', active)

    if (user)
      searches.where('user_id', user);

    return await searches.fetch();
  }

  async store({ request, auth }) {
    const { quests, ...data } = request.only(['type', 'quests', 'active']);
    const search = await Search.create({ 'user_id': auth.user.id, ...data });

    if (quests && quests.length >= 0) {
      await search.quests().attach(quests);
      search.quests = await search.quests().fetch();
    }

    return search;
  }

  async show({ params }) {
    const search = await Search.query().where('id', params.id).with('quests').with('user').fetch();

    return search.rows[0];
  }

  async update({ params, request }) {
    const { quests, ...data } = request.body;
    const search = await Search.findOrFail(params.id);

    search.merge(data);
    await search.save();

    if (quests && quests.length >= 0) {
      await search.quests().sync(quests);
      search.quests = await search.quests().fetch();
    }

    return search;
  }

  async destroy({ params }) {
    const search = await Search.findOrFail(params.id);

    search.delete();
  }

}

module.exports = SearchController
