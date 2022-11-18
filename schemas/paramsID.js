const { checkSchema } = require('express-validator')

const IDinParamsSchema = checkSchema({
  id: {
    in: ['params'],
    isInt: true,
    errorMessage: 'Enter an Interger number for ID'
  }
})

module.exports = IDinParamsSchema
