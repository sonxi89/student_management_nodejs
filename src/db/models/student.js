'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.Score, {
        foreignKey: 'student_code',
        sourceKey: 'student_code',
      });
      Student.hasMany(models.Award, {
        foreignKey: 'student_code',
        sourceKey: 'student_code',
      });
    }
  }
  Student.init(
    {
      student_code: DataTypes.STRING, //Mã SV
      student_name: DataTypes.STRING, //Tên SV
      student_dob: DataTypes.DATEONLY, //Ngày sinh
      class_code: DataTypes.STRING, //Mã lớp
      student_position: DataTypes.STRING, //chức vụ của SV
    },
    {
      sequelize,
      modelName: 'Student',
    },
  );
  return Student;
};
