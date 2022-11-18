'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate (models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'userId' })
      Transaction.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Transaction.init(
    {
      description: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Transaction',
      paranoid: true

    }
  )
  return Transaction
}
