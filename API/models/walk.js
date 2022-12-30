"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class walk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      walk.hasOne(models.user);
    }
  }
  walk.init(
    {
      start_local: DataTypes.STRING,
      finish_local: DataTypes.STRING,
      start_date: DataTypes.DATE,
      finish_date: DataTypes.DATE,
      start_time: DataTypes.TIME,
      finish_time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "walk",
    }
  );
  return walk;
};
