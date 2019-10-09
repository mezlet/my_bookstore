'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Comments', [{
        comment: 'I love the book',
        book_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Comments', null, {});
    
  }
};
