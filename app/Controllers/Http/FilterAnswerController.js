'use strict'

const Answer = use('App/Models/Answer');

class FilterAnswerController {

    async findByCity({ params }) {

        // const answer = await Answer.query().with('interview.city').where('interveiw')

        const answer = await Answer.query()
            .leftJoin('interviews', 'answers.interview_id', 'interviews.id')
            .where('city_id', params.id).with('interview.city').fetch();

        return answer
    }

    async findByInterview({ params }) {
        const answer = await Answer.query().where('interview_id', params.id).with('interview').fetch();

        return answer;
    }

    async findByQuest({ params, request }) {
        const answer = await Answer.query().where('quest_id', params.id).with('quest').fetch();
        const rate = request.get('rate');

        console.log(rate);

        return answer;
    }

}

module.exports = FilterAnswerController
