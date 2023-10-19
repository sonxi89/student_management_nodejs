'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.belongsTo(models.Student, {
        foreignKey: 'student_code',
        targetKey: 'student_code',
      });
    }
  }
  Score.init(
    {
      student_code: DataTypes.STRING, //năm hoc 2022-2023
      year_code: DataTypes.STRING,
      course_score_hk: DataTypes.DECIMAL(5, 2).UNSIGNED,
      course_score_tl: DataTypes.DECIMAL(5, 2).UNSIGNED,
      conduct_score: DataTypes.STRING,
      score_d: DataTypes.INTEGER,
      score_fail: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Score',
    },
  );
  return Score;
};
