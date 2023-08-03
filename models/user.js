"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Account, { foreignKey: "AccountId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Form name cannot be empty !" },
          notEmpty: { args: true, msg: "Form name cannot be empty !" },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Form date cannot be empty !" },
          notEmpty: { args: true, msg: "Form date cannot be empty !" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Form gender cannot be empty !" },
          notEmpty: { args: true, msg: "Form gender cannot be empty !" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Form phone cannot be empty !" },
          notEmpty: { args: true, msg: "Form phone cannot be empty !" },
        },
      },
      AccountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
