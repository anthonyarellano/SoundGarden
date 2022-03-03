'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users',
      [
        {
          email: 'demo@user.io',
          username: 'VarianWrynn',
          hashedPassword: bcrypt.hashSync('dualwield')
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['VarianWrynn', 'FakeUser1'] }
    }, {});
  }
};
