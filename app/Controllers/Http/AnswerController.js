'use strict'

const Answer = use('App/Models/Answer');

class AnswerController {

  async index() {
    const answer = await Answer.query().with('interview.search').with('quest').fetch();

    return answer;
  }

  async show({ params }) {
    const answer = await Answer.query()
      .where('id', params.id).with('interview.search').with('quest').fetch();

    return answer;
  }

  async update({ params }) {
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
