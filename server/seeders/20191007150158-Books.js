'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Books', [{
        title: 'John Wick',
        author:'Joseph Nelson',
        genre: 'Drama',
        description: 'A must watch',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Books', null, {});
  }
};
