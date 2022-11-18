'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      { name: 'ADMIN', description: 'This is an admin role', createdAt: new Date(), updatedAt: new Date() },
      { name: 'STANDARD', description: 'This is a standard role', createdAt: new Date(), updatedAt: new Date() }
    ]

    await queryInterface.bulkInsert('Roles', roles, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
