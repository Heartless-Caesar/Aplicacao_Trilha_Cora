"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("local_validations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CDG: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ITG: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      JRG: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      SFG: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      PRN: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      COG: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      CBG: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable("local_validations");
  },
};
