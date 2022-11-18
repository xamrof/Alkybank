const { User } = require('../database/models')

const validationDb = require('../helpers/validationDb')
const { decoded } = require('../helpers/jwtFuntions')
const { ErrorObject } = require('../helpers/error')

const authUser = async (req, res, next) => {
  const token = req.headers['x-access-token']

  try {
    const { id } = decoded(token)

    const schema = { where: { id } }
    const userAuth = await validationDb(schema, User, true)

    req.userAuth = userAuth
  } catch (error) {
    const httpError = new ErrorObject(`Invalid Token: ${error.message}`, error.statusCode)
    next(httpError)
  }

  next()
}

module.exports = authUser
