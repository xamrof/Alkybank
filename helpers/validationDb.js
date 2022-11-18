const { ErrorObject } = require('./error')

const validationDb = async (schema, model, match) => {
  try {
    const response = await model.findOne(schema)

    return new Promise((resolve, reject) => {
      if (match) {
        if (response === null) {
          reject(new ErrorObject(`${Object.keys(schema.where)[0]}: ${Object.values(schema.where)} not found in database`, 404))
        }
        resolve(response)
      }
      if (response === null) {
        resolve()
      }
      reject(new ErrorObject(`${Object.keys(schema.where)[0]}: ${Object.values(schema.where)} exist in database`, 400))
    })
  } catch (error) {
    throw new ErrorObject('Database connection failed', error.statusCode)
  }
}

module.exports = validationDb
