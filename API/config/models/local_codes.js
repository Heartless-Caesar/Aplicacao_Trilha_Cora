"use strict";
const { Model } = require("sequelize");
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
  local_codes.init(
    {
      cbg: DataTypes.STRING,
      cog: DataTypes.STRING,
      prn: DataTypes.STRING,
      sfg: DataTypes.STRING,
      jrg: DataTypes.STRING,
      itg: DataTypes.STRING,
      cdg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "local_codes",
    }
  );
  return local_codes;
};
