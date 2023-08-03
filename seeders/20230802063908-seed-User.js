'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/user.json"))
    data.forEach((item) => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Users", data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", data, {})
  }
};
