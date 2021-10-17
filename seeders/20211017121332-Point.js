
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
     await queryInterface.bulkDelete('Points', null, {});
   await queryInterface.bulkInsert('Points',[
    {
      id:"0x9C0Ba067D1737a73ee546329f58E8af2d16E9934",
      point: 9999,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:"0xBE5C953DD0ddB0Ce033a98f36C981F1B74d3B33f",
      point: 9999,
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
     await queryInterface.bulkDelete('Points', null, {});
  }
};
