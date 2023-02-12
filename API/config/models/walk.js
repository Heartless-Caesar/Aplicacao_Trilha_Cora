'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class walk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  walk.init({
    start_location: DataTypes.STRING,
    start_time: DataTypes.TIME,
    start_date: DataTypes.DATE,
    finish_time: DataTypes.TIME,
    finish_date: DataTypes.DATE,
    finish_location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'walk',
  });
  return walk;
};