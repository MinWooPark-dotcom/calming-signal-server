"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Location.hasMany(models.User, {
        foreignKey: "locationId",
        sourceKey: "id",
      });
    }
  }
  Location.init(
    {
      name: DataTypes.STRING,
      number: DataTypes.NUMBER,
      longitude: DataTypes.NUMBER,
      latitude: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
