'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      corumba: {
        type: Sequelize.BOOLEAN
      },
      cocal: {
        type: Sequelize.BOOLEAN
      },
      pire: {
        type: Sequelize.BOOLEAN
      },
      frans: {
        type: Sequelize.BOOLEAN
      },
      jara: {
        type: Sequelize.BOOLEAN
      },
      ita: {
        type: Sequelize.BOOLEAN
      },
      itab: {
        type: Sequelize.BOOLEAN
      },
      cid_go: {
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
    await queryInterface.dropTable('Locals');
  }
};