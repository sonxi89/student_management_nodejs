'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Major.belongsTo(models.Faculty, {
        foreignKey: 'faculty_code',
        targetKey: 'faculty_code',
      });
      Major.hasMany(models.Classs, {
        foreignKey: 'majors_code',
        sourceKey: 'majors_code',
      });
    }
  }
  Major.init(
    {
      majors_code: DataTypes.STRING, //năm hoc 2022-2023
      majors_name: DataTypes.STRING,
      faculty_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Major',
    },
  );
  return Major;
};
