"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("certificates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cdg: {
        type: Sequelize.BOOLEAN,
      },
      itg: {
        type: Sequelize.BOOLEAN,
      },
      jrg: {
        type: Sequelize.BOOLEAN,
      },
      sfg: {
        type: Sequelize.BOOLEAN,
      },
      prn: {
        type: Sequelize.BOOLEAN,
      },
      cog: {
        type: Sequelize.BOOLEAN,
      },
      cbg: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("certificates");
  },
};
