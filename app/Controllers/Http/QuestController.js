'use strict'

const Quest = use('App/Models/Quest');

class QuestController {

  async index() {
    const quest = await Quest.all();

    return quest;
  }

  async store({ request, auth }) {
    const { searches, ...data } = request.only(['question', 'searches']);
    const quest = await Quest.create({ 'user_id': auth.user.id, ...data });

    if (searches && searches.length > 0) {
      await quest.searches().attach(searches);
      quest.searches = await quest.searches().fetch();
    }

    return quest;
  }

  async show({ params }) {
    const quest = await Quest.findOrFail(params.id);

    return quest;
  }

  async update({ params, request }) {
    const { searches, ...data } = request.body;
    const quest = await Quest.findOrFail(params.id);

    quest.merge(data);
    await quest.save();

    if (searches && searches.length > 0) {
      await quest.searches().sync(searches);
      quest.searches = await quest.searches().fetch();
    }

    return quest;
  }

  async destroy({ params, request, response }) {
    const quest = await Quest.findOrFail(params.id);

    quest.delete();
  }

}

module.exports = QuestController
