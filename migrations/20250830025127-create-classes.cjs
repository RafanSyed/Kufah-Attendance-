"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      className: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      teacherName: {
        type: Sequelize.STRING,
        allowNull: true, // can make a Teachers table later if needed
      },
      schedule: {
        type: Sequelize.STRING, // e.g. "MWF 10AM-11AM"
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
    await queryInterface.dropTable("Classes");
  },
};
