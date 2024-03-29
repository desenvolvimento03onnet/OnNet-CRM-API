'use strict'

const City = use('App/Models/City');

class CityController {

  async index({ request }) {
    const { active, user } = request.get();
    const cities = City.query().with('user');

    if (active)
      cities.where('active', active);

    if (user)
      cities.where('user_id', user);

    return await cities.orderBy('created_at', 'DESC').fetch();
  }

  async store({ request, auth }) {
    const data = request.only('name', 'active');
    const city = await City.create({ 'user_id': auth.user.id, ...data });

    return city;
  }

  async show({ params }) {
    const city = await City.findOrFail(params.id);

    return city;
  }

  async update({ params, request }) {
    const data = request.body;
    const city = await City.findOrFail(params.id);

    city.merge(data);
    await city.save();

    return city;
  }

  async destroy({ params }) {
    const city = await City.findOrFail(params.id);

    city.delete();
  }

}

module.exports = CityController
