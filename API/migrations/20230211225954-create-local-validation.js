'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('local_validations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CDG: {
        type: Sequelize.BOOLEAN
      },
      ITG: {
        type: Sequelize.BOOLEAN
      },
      JRG: {
        type: Sequelize.BOOLEAN
      },
      SFG: {
        type: Sequelize.BOOLEAN
      },
      PRN: {
        type: Sequelize.BOOLEAN
      },
      COG: {
        type: Sequelize.BOOLEAN
      },
      CBG: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('local_validations');
  }
};