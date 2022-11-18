const createHttpError = require('http-errors')
const bcryptjs = require('bcryptjs')

const { User } = require('../database/models')

const deleteFile = require('../helpers/deleteFile')
const ownership = require('../helpers/ownership')
const pagination = require('../helpers/pagination')
const validationDb = require('../helpers/validationDb')
const { catchAsync } = require('../helpers/catchAsync')
const { encode } = require('../helpers/jwtFuntions')
const { endpointResponse } = require('../helpers/success')

const getUser = catchAsync(async (req, res, next) => {
  const { page = 0 } = req.query
  try {
    const parsePage = parseInt(page, 10)
    const limit = 10
    const offset = parsePage * limit

    const { count: totalItems, rows: users } = await User.findAndCountAll({ limit, offset })

    const pagingData = pagination(totalItems, limit, parsePage, req)

    // create token
    const payload = users
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'Users retrieved successfully',
      body: response,
      options: pagingData
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving users] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

const getUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    await ownership(req.userAuth, id)

    const schema = { where: { id } }
    const user = await validationDb(schema, User, true)

    // create token
    const payload = user
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'User retrieved successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving user] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

const postUsers = catchAsync(async (req, res, next) => {
  const { ...data } = req.body

  try {
    await ownership(req.userAuth, null)
    // Verify that email does not exist in the database
    const schema = { where: { email: data.email } }
    await validationDb(schema, User, false)

    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    data.password = bcryptjs.hashSync(data.password, salt)
    data.roleId = 2
    data.avatar = req.filePath

    const user = await User.create(data)

    // create token
    const payload = user
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'User created successfully',
      body: response
    })
  } catch (error) {
    // Checking if there are files in the request
    if (req.filePath) {
      deleteFile(req.filePath)
    }

    const httpError = createHttpError(
      error.statusCode,
      `[Error creating user] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const putUsers = catchAsync(async (req, res, next) => {
  const { ...data } = req.body
  const { id } = req.params
  let schema

  try {
    await ownership(req.userAuth, id)

    // Verify that email does not exist in the database
    if (data.email) {
      schema = { where: { email: data.email } }
      await validationDb(schema, User, false)
    }

    // Encrypt password
    if (data.password) {
      const salt = bcryptjs.genSaltSync()
      data.password = bcryptjs.hashSync(data.password, salt)
    }

    // Validate and extract user to update
    schema = { where: { id } }
    const user = await validationDb(schema, User, true)

    const oldAvatarPath = user.avatar

    if (req.filePath) {
      user.avatar = req.filePath
    }

    user.set(data)
    await user.save()

    if (req.filePath) {
      deleteFile(oldAvatarPath)
    }

    // create token
    const payload = user
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'User updated successfully',
      body: response
    })
  } catch (error) {
    // Checking if there are files in the request
    if (req.filePath) {
      deleteFile(req.filePath)
    }

    const httpError = createHttpError(
      error.statusCode,
      `[Error updating user] - [index - PUT]: ${error.message}`
    )
    next(httpError)
  }
})

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    await ownership(req.userAuth, id)

    const schema = { where: { id } }
    const user = await validationDb(schema, User, true)

    user.destroy()

    deleteFile(user.avatar)

    // create token
    const payload = user
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'User deleted successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error deleted user] - [index - DELETE]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser
}
