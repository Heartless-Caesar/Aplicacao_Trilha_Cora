"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Locals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locals.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Locals.init(
    {
      corumba: DataTypes.BOOLEAN,
      cocal: DataTypes.BOOLEAN,
      pire: DataTypes.BOOLEAN,
      frans: DataTypes.BOOLEAN,
      jara: DataTypes.BOOLEAN,
      ita: DataTypes.BOOLEAN,
      itab: DataTypes.BOOLEAN,
      cid_go: DataTypes.BOOLEAN,
      ferr: DataTypes.BOOLEAN,
      calc: DataTypes.BOOLEAN,
      bene: DataTypes.BOOLEAN,
      vila: DataTypes.BOOLEAN,
      radio: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Locals",
    }
  );
  return Locals;
};
