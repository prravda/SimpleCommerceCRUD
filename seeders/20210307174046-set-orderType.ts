'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderStatus', [
      {
        status: 'Accepted',
      },
      {
        status: 'Completed',
      },
      {
        status: 'Rejected',
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('OrderStatus', null, {});
  }
};
