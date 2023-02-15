"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("local_codes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cbg: {
        type: Sequelize.STRING,
      },
      cog: {
        type: Sequelize.STRING,
      },
      prn: {
        type: Sequelize.STRING,
      },
      sfg: {
        type: Sequelize.STRING,
      },
      jrg: {
        type: Sequelize.STRING,
      },
      itg: {
        type: Sequelize.STRING,
      },
      cdg: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("local_codes");
  },
};
