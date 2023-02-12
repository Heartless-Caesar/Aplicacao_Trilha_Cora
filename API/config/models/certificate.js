'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  certificate.init({
    CDG: DataTypes.BOOLEAN,
    ITG: DataTypes.BOOLEAN,
    JRG: DataTypes.BOOLEAN,
    SFG: DataTypes.BOOLEAN,
    PRN: DataTypes.BOOLEAN,
    COG: DataTypes.BOOLEAN,
    CBG: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'certificate',
  });
  return certificate;
};