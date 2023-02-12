'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class local_validation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  local_validation.init({
    CDG: DataTypes.BOOLEAN,
    ITG: DataTypes.BOOLEAN,
    JRG: DataTypes.BOOLEAN,
    SFG: DataTypes.BOOLEAN,
    PRN: DataTypes.BOOLEAN,
    COG: DataTypes.BOOLEAN,
    CBG: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'local_validation',
  });
  return local_validation;
};