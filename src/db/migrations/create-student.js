'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Student', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_code: {
        type: Sequelize.STRING,
      },
      student_name: {
        type: Sequelize.STRING,
      },
      student_dob: {
        type: Sequelize.DATEONLY,
      },
      class_name: {
        type: Sequelize.STRING,
      },
      majors_name: {
        type: Sequelize.STRING,
      },
      faculty_name: {
        type: Sequelize.STRING,
      },
      student_position: {
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
    await queryInterface.dropTable('Student');
  },
};
