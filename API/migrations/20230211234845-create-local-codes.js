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
      cbg_code: {
        type: Sequelize.STRING
      },
      cog_code: {
        type: Sequelize.STRING
      },
      prn_code: {
        type: Sequelize.STRING
      },
      sfg_code: {
        type: Sequelize.STRING
      },
      jrg_code: {
        type: Sequelize.STRING
      },
      itg_code: {
        type: Sequelize.STRING
      },
      cdg_code: {
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