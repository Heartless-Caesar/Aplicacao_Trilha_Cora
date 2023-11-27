"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("certificados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      origem: {
        type: Sequelize.STRING,
      },
      destino: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER, // Use the correct data type
        allowNull: false,
        references: {
          model: "Users", // This should match the table name in your "User" model
          key: "id", // This should match the primary key in your "User" model
        },
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
    await queryInterface.dropTable("certificados");
  },
};
