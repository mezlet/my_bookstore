'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        email: 'admin@gmail.com',
        hash: '$2y$12$uOmj20ODtSV7M3vwtvUP/.pt.JuAQe8s9N74vtJOcLoN2H3uIhW.a',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Users', null, {});
  }
};
