'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('local_codes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CBG_code: {
        type: Sequelize.STRING
      },
      COG_code: {
        type: Sequelize.STRING
      },
      PRN_code: {
        type: Sequelize.STRING
      },
      SFG_code: {
        type: Sequelize.STRING
      },
      JRG_code: {
        type: Sequelize.STRING
      },
      ITG_code: {
        type: Sequelize.STRING
      },
      CDG_code: {
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
    await queryInterface.dropTable('local_codes');
  }
};