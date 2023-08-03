"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasOne(models.User, { foreignKey: "AccountId" });
    }
  }
  Account.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "Please input valid email !" },
          notEmpty: { msg: "Form email cannot be empty !" },
          notNull: { msg: "Form email cannot be empty !" }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Form password cannot be empty !" },
          notNull: { msg: "Form password cannot be empty !" }
        }
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
      hooks: {
        async beforeCreate(data) {
          const salt = await bcrypt.genSalt(10);
          const password = await bcrypt.hash(data.password, salt);

          data.role = "user";
          data.password = password
        },
      },
    }
  );
  return Account;
};
