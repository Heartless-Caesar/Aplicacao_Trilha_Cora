'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class local_codes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  local_codes.init({
    CBG_code: DataTypes.STRING,
    COG_code: DataTypes.STRING,
    PRN_code: DataTypes.STRING,
    SFG_code: DataTypes.STRING,
    JRG_code: DataTypes.STRING,
    ITG_code: DataTypes.STRING,
    CDG_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'local_codes',
  });
  return local_codes;
};