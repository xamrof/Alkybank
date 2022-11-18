'use strict'

const { faker } = require('@faker-js/faker')

function randomNumber (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transactions = []
    for (let i = 0; i < 20; i++) {
      transactions.push({
        description: faker.lorem.sentence(5),
        amount: randomNumber(0, 10000),
        date: faker.date.past(5),
        userId: randomNumber(1, 20),
        categoryId: randomNumber(1, 2),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Transactions', transactions, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {})
  }
}
