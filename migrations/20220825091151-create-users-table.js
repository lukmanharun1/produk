"use strict";

const fields = require("../constants/fields");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      fields(Sequelize, {
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
