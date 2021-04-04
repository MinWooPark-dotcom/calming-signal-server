'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log("🚀 ~ file: user.js ~ line 13 ~ User ~ associate ~ models", models.User)
      // define association here
      models.User.hasMany(models.Post, { foreignKey: 'userId', sourceKey: 'id'});
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