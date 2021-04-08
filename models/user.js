'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post, { foreignKey: 'userId', sourceKey: 'id'});
      models.User.hasMany(models.Comment, { foreignKey: 'userId', sourceKey: 'id'});
      models.User.hasMany(models.Pet, { foreignKey: 'userId', sourceKey: 'id'});
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};