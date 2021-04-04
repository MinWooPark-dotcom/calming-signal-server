'use strict';
const { model } = require('mongoose');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.User.hasMany(models.Post, { foreignKey: 'userId', sourceKey: 'id'});
      models.Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id'});
    }
  };
  Post.init({
    userId: DataTypes.NUMBER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    category: DataTypes.STRING,
    numOfViews: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};