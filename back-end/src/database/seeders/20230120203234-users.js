'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users', [{
   id: 1, 
   name: 'Admin',
   email: 'adm@deliveryapp.com', 
   password: 'a4c86edecc5aee06eff8fdeda69e0d04',
   role: 'administrator'
   }, 
  {
    id: 2 ,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com' ,
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller' ,
  },
  {
    id: 3 ,
    name: 'Zé Birita',
    email: 'zebirita@email.com' ,
    password: '3791f9895496912998dcd2786f81bc72',
    role: 'customer' ,
  }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
