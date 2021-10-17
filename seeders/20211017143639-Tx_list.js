'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Tx_lists',[
    {
      id:"Signature1",
      confirms: -1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:"Signature2",
      confirms: -1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Tx_lists', null, {});
  }
};
