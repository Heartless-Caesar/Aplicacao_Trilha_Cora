"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Walk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Walk.belongsTo(models.User);
    }
  }
  Walk.init(
    {
      start_local: DataTypes.STRING,
      finish_local: DataTypes.STRING,
      start_date: DataTypes.DATEONLY,
      finish_date: DataTypes.DATEONLY,
      start_time: DataTypes.TIME,
      finish_time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Walk",
    }
  );
  return Walk;
};
