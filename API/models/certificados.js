"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class certificados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      certificados.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  certificados.init(
    {
      origem: DataTypes.STRING,
      destino: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "certificados",
    }
  );
  return certificados;
};
