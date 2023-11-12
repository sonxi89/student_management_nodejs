'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classs.belongsTo(models.Major, {
        foreignKey: 'majors_code',
        targetKey: 'majors_code',
      });
    }
  }
  Classs.init(
    {
      class_code: DataTypes.STRING, //năm hoc 2022-2023
      class_name: DataTypes.STRING,
      majors_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Classs',
    },
  );
  return Classs;
};
