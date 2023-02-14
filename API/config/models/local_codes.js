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
    cbg_code: DataTypes.STRING,
    cog_code: DataTypes.STRING,
    prn_code: DataTypes.STRING,
    sfg_code: DataTypes.STRING,
    jrg_code: DataTypes.STRING,
    itg_code: DataTypes.STRING,
    cdg_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'local_codes',
  });
  return local_codes;
};