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
      Student.belongsTo(models.Class, {
        foreignKey: 'class_name',
        sourceKey: 'class_name',
      });
    }
  }
  Student.init(
    {
      student_code: DataTypes.STRING, //Mã SV
      student_name: DataTypes.STRING, //Tên SV
      student_dob: DataTypes.DATEONLY, //Ngày sinh
      class_name: DataTypes.STRING, //Mã lớp
      majors_name: DataTypes.STRING, //
      faculty_name: DataTypes.STRING, //
      student_position: DataTypes.BOOLEAN, //
    },
    {
      sequelize,
      modelName: 'Student',
    },
  );
  return Student;
};
