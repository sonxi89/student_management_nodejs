'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AcademicYear.hasMany(models.Score, {
        foreignKey: 'year_code',
        sourceKey: 'year_code',
      });

      AcademicYear.hasMany(models.Award, {
        foreignKey: 'year_code',
        sourceKey: 'year_code',
      });
    }
  }
  AcademicYear.init(
    {
      year_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AcademicYear',
    },
  );
  return AcademicYear;
};
