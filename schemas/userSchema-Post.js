const { checkSchema } = require('express-validator')

const userSchemaPOST = checkSchema({
  firstName: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isAlpha: true,
    errorMessage: 'Enter valid first Name'
  },
  lastName: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isAlpha: true,
    errorMessage: 'Enter valid Last name'
  },
  email: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isEmail: true,
    errorMessage: 'Enter valid email'
  },
  password: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isAlphanumeric: true,
    errorMessage: 'enter Alphanumeric password'
  }
})

module.exports = userSchemaPOST
