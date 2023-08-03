'use strict';

const { DataTypes, INET, INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts', 'UserId',{
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key:'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'UserId', {})
  }
};
