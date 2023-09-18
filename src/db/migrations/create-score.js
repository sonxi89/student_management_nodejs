"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Scores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_code: {
        type: Sequelize.STRING,
      },
      year_code: {
        type: Sequelize.STRING,
      },
      course_score_hk: {
        type: Sequelize.DECIMAL(5, 2).UNSIGNED,
      },
      course_score_tl: {
        type: Sequelize.DECIMAL(5, 2).UNSIGNED,
      },
      conduct_score: {
        type: Sequelize.STRING,
      },
      score_d: {
        type: Sequelize.INTEGER,
      },
      score_fail: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Scores");
  },
};
