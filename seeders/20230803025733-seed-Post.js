'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/post.json', 'utf-8'))
    const result = data.map(el=>{
      let obj = {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      delete obj.id
      console.log(obj);
      return obj
    })
    return queryInterface.bulkInsert('Posts', result )
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
};
