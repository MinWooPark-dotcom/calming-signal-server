"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Pet.belongsTo(models.User, {
        foreignKey: "userId",
        sourceKey: "id",
      });
    }
  }
  Pet.init(
    {
      userId: DataTypes.NUMBER,
      name: DataTypes.STRING,
      breed: DataTypes.STRING,
      age: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
