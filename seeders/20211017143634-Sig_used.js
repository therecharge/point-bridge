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
   await queryInterface.bulkInsert('Sig_useds',[
    {
      id:"Signature1",
      used: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:"Signature2",
      used: true,
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
    await queryInterface.bulkDelete('Sig_useds', null, {});
  }
};
