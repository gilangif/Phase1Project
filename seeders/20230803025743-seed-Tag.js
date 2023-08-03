'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/tag.json', 'utf-8'))
    const result = data.map(el=>{
      let obj = {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      delete obj.id
      return obj
    })
    return queryInterface.bulkInsert('Tags', result )
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {})
  }
};
