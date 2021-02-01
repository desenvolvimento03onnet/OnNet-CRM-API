"use strict";

const Department = use("App/Models/Department");

const data = [
  { name: "Comercial" },
  { name: "SAC" },
  { name: "Serviços" },
  { name: "Suporte" },
];

class DepartmentSeeder {
  async run() {
    await Department.createMany(data);
  }
}

module.exports = DepartmentSeeder;
