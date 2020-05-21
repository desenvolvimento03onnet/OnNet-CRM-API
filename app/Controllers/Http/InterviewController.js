'use strict'

const Interview = use('App/Models/Interview');
const SearchQuest = use('App/Models/SearchQuest');

class InterviewController {

  async index({ request }) {
    const { beginDate, city, endDate, search, user } = request.get();
    const interviews = Interview.query();

    if (beginDate)
      interviews.where('interview_date', '>=', beginDate);

    if (city)
      interviews.where('city_id', city).with('city');

    if (endDate)
      interviews.where('interview_date', '<=', endDate);

    if (search)
      interviews.where('search_id', search).with('search');

    if (user)
      interviews.where('user_id', user).with('user');

    return await interviews.orderBy('interview_date', 'DESC').fetch();
  }

  async store({ request, response, auth }) {
    const { search_id, ...data } = request.only(['client_name', 'interview_date', 'city_id', 'search_id']);
    const searchQuest = await SearchQuest.query().where('search_id', search_id).fetch();
    let quests = [];

    searchQuest.rows.forEach(element => {
      quests.push(element.quest_id);
    });

    if (quests && quests.length) {
      const interview = await Interview.create({ 'user_id': auth.user.id, 'search_id': search_id, ...data });

      await interview.quests().attach(quests);
      interview.quests = await interview.quests().fetch();

      return interview;
    }
    else
      response.status(400).json({ message: 'No quests related to this search' })

  }

  async show({ params }) {
    const interview = await Interview.query().where('id', params.id).with('search').with('city').fetch();

    return interview.rows[0];
  }

  async update({ params, request }) {
    const { quests, ...data } = request.body;
    const interview = await Interview.findOrFail(params.id);

    interview.merge(data);
    await interview.save();

    if (quests && quests.length > 0) {
      await interview.quests().sync(quests);
      interview.quests = await interview.quests().fetch();
    }

    return interview
  }

  async destroy({ params }) {
    const interview = await Interview.findOrFail(params.id);

    interview.delete();
  }

}

module.exports = InterviewController
