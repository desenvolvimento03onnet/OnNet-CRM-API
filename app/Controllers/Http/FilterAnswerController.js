"use strict";

const Answer = use("App/Models/Answer");
const Interview = use("App/Models/Interview");

class FilterAnswerController {
  async getInterviews(search_id, city, begin, end) {
    const interview = Interview.ids().where("search_id", search_id);

    if (city) interview.where("city_id", city);

    if (begin) interview.where("interview_date", ">=", begin + " 00:00:00");

    if (end) interview.where("interview_date", "<=", end + " 23:59:59");

    return await interview;
  }

  async countRates({ params, request, response }) {
    const { quest, city, department, begin, end } = request.get();

    const interview = await this.getInterviews(params.id, city, begin, end);

    if (!quest)
      return response
        .status(500)
        .json({ error: "Não foi possível encontrar o parâmetro 'quest'" });

    const answer = Answer.query()
      .select("answers.rate")
      .whereIn("answers.interview_id", interview)
      .where("answers.quest_id", quest);

    if (department) answer.where("answers.department_id", department);

    return await answer
      .count("answers.id AS count")
      .groupBy("answers.rate")
      .orderBy("answers.rate");
  }

  async getNotesByQuest({ params, request }) {
    const page = request.get().page || 1;

    const answer = Answer.query()
      .innerJoin("interviews", "answers.interview_id", "interviews.id")
      .where("answers.quest_id", params.id)
      .where("answers.note", "IS NOT", null)
      .with("interview")
      .orderBy("interviews.interview_date", "DESC")
      .paginate(page, 50);

    return await answer;
  }
}

module.exports = FilterAnswerController;
