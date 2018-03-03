'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      { title: 'My 28th birthday', startDate: '2018-09-03 07:00:00', endDate: '2018-09-04 00:00:00', description: 'There will be cake!' },
      { title: 'First day of Codaisseur', startDate: '2018-02-12 09:30:00', endDate: '2018-02-12 18:00:00', description: 'Let the coding begin!' }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
