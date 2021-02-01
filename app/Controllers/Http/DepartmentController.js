"use strict";

const Department = use("App/Models/Department");

class DepartmentController {
  async index() {
    const departments = Department.query();

    return await departments.orderBy("name").fetch();
  }

  async store({ request }) {
    const data = request.only("name");

    const department = await Department.create(data);

    return department;
  }

  async show({ params }) {
    const department = await Department.findOrFail(params.id);

    return department;
  }

  async update({ params, request }) {
    const data = request.body;
    const department = await Department.findOrFail(params.id);

    department.merge(data);
    await department.save();

    return department;
  }

  async destroy({ params }) {
    const department = await Department.findOrFail(params.id);

    department.delete();
  }
}

module.exports = DepartmentController;
