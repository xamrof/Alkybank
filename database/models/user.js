'use strict'
// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require('sequelize')

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate (models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' })
      User.hasMany(models.Transaction, { foreignKey: 'userId' })
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      avatar: { type: DataTypes.STRING, allowNull: true },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
      paranoid: true
    }
  )
  return User
}
