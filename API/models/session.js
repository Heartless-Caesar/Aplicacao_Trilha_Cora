"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      session.belongsTo(models.User);
    }
  }
  session.init(
    {
      username: DataTypes.STRING,
      valid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "session",
    }
  );
  return session;
};
