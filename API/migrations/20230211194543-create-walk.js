'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('walks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_location: {
        type: Sequelize.STRING
      },
      start_time: {
        type: Sequelize.TIME
      },
      start_date: {
        type: Sequelize.DATE
      },
      finish_time: {
        type: Sequelize.TIME
      },
      finish_date: {
        type: Sequelize.DATE
      },
      finish_location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('walks');
  }
};