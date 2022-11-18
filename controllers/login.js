const createHttpError = require('http-errors')
const bcryptjs = require('bcryptjs')

const { User } = require('../database/models')

const validationDb = require('../helpers/validationDb')
const { catchAsync } = require('../helpers/catchAsync')
const { encode } = require('../helpers/jwtFuntions')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')

const postLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  try {
    const schema = { where: { email } }
    const user = await validationDb(schema, User, true)

    const compare = bcryptjs.compareSync(password, user.password)

    if (!compare) {
      const httpError = new ErrorObject('Invalid User or Password', 404)
      next(httpError)
    }

    const payload = { id: user.id }
    const token = await encode(payload)
    const response = { token }

    endpointResponse({
      res,
      message: 'Login successful',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
            `[User Not Found] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = postLogin
