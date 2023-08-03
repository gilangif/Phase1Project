'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/account.json"))
    data.forEach((item) => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Accounts", data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Accounts", data, {})
  }
};
