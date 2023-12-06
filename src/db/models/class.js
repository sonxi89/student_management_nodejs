'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Majors, {
        foreignKey: 'majors_name',
        targetKey: 'majors_name',
      });
      Class.hasMany(models.Student, {
        foreignKey: 'class_name',
        sourceKey: 'class_name',
      });
    }
  }
  Class.init(
    {
      class_name: DataTypes.STRING,
      majors_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Class',
    },
  );
  return Class;
};
