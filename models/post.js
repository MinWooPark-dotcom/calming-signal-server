'use strict';
const { model } = require('mongoose');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
      static associate(models) {
      models.Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id'}),
      models.Post.hasMany(models.Comment, { foreignKey: 'postId', sourceKey: 'id'});
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