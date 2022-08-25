"use strict";

const fields = require("../constants/fields");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "produks",
      fields(Sequelize, {
        kode_produk: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        nama_produk: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        qty: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        image_produk: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("produks");
  },
};
