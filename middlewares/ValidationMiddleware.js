const { validationResult } = require('express-validator')
const { ErrorObject } = require('../helpers/error.js')

// cambié la funcion y ahora no usa el validation.run() sino el checkschema()

const validationMiddleware = (schema) => {
  return [
    schema,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // si se dejara la siguiente linea se entrega el error predeterminado de express-validatos

        /* return res.status(400).json({ errors: errors.array() }); */

        // si se deja lo siguiente, se usaria el ErrorObject que está en helpers

        const errorsArray = errors.errors
        const newError = new ErrorObject('Validation errors', 400, errorsArray)

        return res.status(400).json(newError)
      }
      // next para continuar con el controlador de la ruta, en caso de que no haya error de validacion
      next()
    }
  ]
}

module.exports = validationMiddleware
