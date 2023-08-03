'use strict';
const { Model } = require('sequelize');
const { dateFormater } = require('../helpers/dateFormater');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: 'UserId'})
      Post.belongsToMany(models.Tag, {through: 'PostTag', foreignKey: 'PostId'})
      Post.hasMany(models.PostTag, { foreignKey: "PostId"})
    }

    

    formatDate(date) {
      return dateFormater(date)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title can not be empty'
        },
        notNull: {
          args: true,
          msg: 'Title can not be empty'
        }
      }
    },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Post can not be empty'
        },
        notNull: {
          args: true,
          msg: 'Post can not be empty'
        }
      }
    },
    img: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};