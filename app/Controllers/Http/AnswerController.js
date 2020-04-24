'use strict'

const Answer = use('App/Models/Answer');

class AnswerController {

  async index({ request }) {
    const { interview, quest, search } = request.get()
    const answer = Answer.query().with('interview').with('quest');

    if (interview)
      answer.where('interview_id', interview);

    if (quest)
      answer.where('quest_id', quest);

    if (search)
      answer.innerJoin('interviews', 'answers.interview_id', 'interviews.id')
        .where('interviews.search_id', search);

    return await answer.fetch();
  }

  async show({ params }) {
    const answer = await Answer.query()
      .where('id', params.id).with('interview.search').with('quest').fetch();

    return answer;
  }

  async update({ params, request }) {
    const data = request.only(['rate', 'note']);
    const answer = await Answer.findOrFail(params.id);

    answer.merge(data);
    await answer.save();

    return answer;
  }

  async destroy({ params }) {
    const answer = await Answer.findOrFail(params.id);

    answer.delete();
  }

}

module.exports = AnswerController
