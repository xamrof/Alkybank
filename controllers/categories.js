const createHttpError = require('http-errors')

const { Category } = require('../database/models')

const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const validationDb = require('../helpers/validationDb')

const getCategories = catchAsync(async (req, res, next) => {
  try {
    const response = await Category.findAll()
    endpointResponse({
      res,
      message: 'Categories retrieved successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    const schema = { where: { id } }

    const category = await validationDb(schema, Category, true)
    endpointResponse({
      res,
      message: 'Category retrieved successfully',
      body: category
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

const createCategory = catchAsync(async (req, res, next) => {
  try {
    const { name, description } = req.body

    const schemaName = { where: { name } }
    await validationDb(schemaName, Category, false)

    const data = {
      name,
      description
    }

    const category = await Category.create(data)
    await category.save()

    endpointResponse({
      res,
      message: 'Category created successfully',
      body: category
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
        `[Error retrieving categories] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const editCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { name, description } = req.body

  if (name) {
    const schemaName = { where: { name } }
    await validationDb(schemaName, Category, false)
  }
  const schemaId = { where: { id } }

  const category = await validationDb(schemaId, Category, true)

  await category.update({ name, description })

  try {
    endpointResponse({
      res,
      message: 'User updated successfully',
      body: category
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [index - PUT]: ${error.message}`
    )
    next(httpError)
  }
})

const deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    const schema = { where: { id } }
    const response = await validationDb(schema, Category, true)

    response.destroy()

    endpointResponse({
      res,
      message: 'Category deleted successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error deleting Category] - [index - DELETE]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = { createCategory, getCategoryById, getCategories, editCategory, deleteCategory }
