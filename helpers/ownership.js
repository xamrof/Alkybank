const { Role } = require('../database/models')

const validationDb = require('./validationDb')
const { ErrorObject } = require('./error')

const ownership = async (userAuth, idQuery) => {
  idQuery = parseInt(idQuery)
  if (!userAuth) {
    throw new ErrorObject('Restricted access: Authentication required to make this query', 403)
  }
  const idUser = parseInt(userAuth.id)
  const userRoleId = parseInt(userAuth.roleId)
  try {
    const schema = { where: { id: userRoleId } }
    const role = await validationDb(schema, Role, true)
    const userRole = role.name

    return new Promise((resolve, reject) => {
      if (idUser !== idQuery && userRole !== 'ADMIN') {
        reject(new ErrorObject('Restricted access: User is not authorized to make this request', 403))
      }
      resolve()
    })
  } catch (error) {
    throw new ErrorObject(`Restricted access: ${error.message}`, error.statusCode)
  }
}

module.exports = ownership
