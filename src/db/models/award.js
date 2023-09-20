'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Award.belongsTo(models.Student, {
        foreignKey: 'student_code',
        targetKey: 'student_code',
      });
      Award.belongsTo(models.AcademicYear, {
        foreignKey: 'year_code',
        targetKey: 'year_code',
      });
    }
  }
  Award.init(
    {
      student_code: DataTypes.STRING, //năm hoc 2022-2023
      year_code: DataTypes.STRING,
      award_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Award',
    },
  );
  return Award;
};
