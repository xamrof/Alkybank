const express = require('express')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const userSchemaPOST = require('../schemas/userSchema-Post')
const userSchemaPUT = require('../schemas/userSchema-PUT')

const {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser
} = require('../controllers/users')
const IDinParamsSchema = require('../schemas/paramsID')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      requires:
 *        -firstName
 *        -lastName
 *        -email
 *        -password
 *        -avatar
 *        -date
 *      properties:
 *        firstName:
 *          type: string
 *          description: This is the firstName of the user
 *        lastName:
 *          type: string
 *          description: This is the lastName of the user
 *        email:
 *          type: string
 *          description: This is the email of the user
 *        password:
 *          type: alphanumeric
 *          description: This is the password of the user
 *        avatar:
 *          type: string
 *          description: This is the avar of the user
 *        date:
 *          type: date
 *          description: This is the date of the user
 *
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: returns the list of all the users
 *    tags: [users]
 *    responses:
 *      200:
 *         description: the list of the users
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/users'
 *    security:
 *     - ApiKeyAuth: []
 */
router.get('/', getUser)

/**
 * @swagger
 * /users/{id}:
 *    get:
 *       summary: Get the users by id
 *       tags: [users]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *            type: integer
 *           required: true
 *           description: The user id
 *       responses:
 *          200:
 *            description: The user description by id
 *            contents:
 *              application/json:
 *              schema:
 *                $ref: '#/components/schemas/users'
 *          404:
 *            description: The user was not found
 *    security:
 *     - ApiKeyAuth: []
 */
router.get('/:id', validationMiddleware(IDinParamsSchema), getUserId)

/**
 * @swagger
 * /users:
 *  post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/users'
 *     responses:
 *          200:
 *            description: The user was succesfully created
 *            contents:
 *              application/json:
 *              schema:
 *                $ref: '#/components/schemas/users'
 *          500:
 *            description: Some server
 *     security:
 *      - ApiKeyAuth: []
 */
router.post('/', validationMiddleware(userSchemaPOST), postUsers)

/**
 /
* @swagger
* /users/{id}:
*  put:
*    summary:  Update an existing users
*    tags: [users]
*    description: Update an existing users by Id
*    parameters:
*       - name: id
*         in: path
*         description: ID of users to return
*         required: true
*         schema:
*           type: integer
*           format: int64
*    requestBody:
*            description: Update a users
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/users'
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/users'
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/users'
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/users'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/users'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/

router.put('/:id', validationMiddleware(userSchemaPUT), putUsers)

/**
 /
* @swagger
* /categories/{id}:
*  delete:
*    summary:  Delete a users
*    tags: [users]
*    description: Delete a users
*    parameters:
*       - name: id
*         in: path
*         description: ID of users to delete
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/users'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/users'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: users not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
router.delete('/:id', validationMiddleware(IDinParamsSchema), deleteUser)

module.exports = router
