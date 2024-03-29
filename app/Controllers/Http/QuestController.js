"use strict";

const Quest = use("App/Models/Quest");

class QuestController {
  async index({ request }) {
    const { user, ...params } = request.get();
    const quests = Quest.query().with("searches").with("user").where(params);

    if (user) quests.where("user_id", user);

    return await quests.orderBy("created_at", "DESC").fetch();
  }

  async store({ request, auth }) {
    const { searches, ...data } = request.only([
      "question",
      "searches",
      "active",
      "need_department",
      "need_os",
    ]);
    const quest = await Quest.create({ user_id: auth.user.id, ...data });

    if (searches && searches.length >= 0) {
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

    if (searches && searches.length >= 0) {
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

module.exports = QuestController;
