'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CouponType', [
      {
        coupon_name: '5000KRWDiscount',
        discount_type: 'Absolute',
        discount_value: 5000,
        refundable: false,
      },
      {
        coupon_name: '5PercentDiscount',
        discount_type: 'Percentage',
        discount_value: 5,
        refundable: true,
      },
  ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CouponType', null, {}); 
  }
};
