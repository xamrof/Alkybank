'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { name: 'Incomes', description: 'here income is recorded', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Outcomes', description: 'here expenses are recorded', createdAt: new Date(), updatedAt: new Date() }
    ]
    await queryInterface.bulkInsert('Categories', categories, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
