const { Router } = require('express')

const {
  createCategory,
  getCategoryById,
  getCategories,
  editCategory,
  deleteCategory
} = require('../controllers/categories')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const categoriesSchemaPOST = require('../schemas/categoriesSchema-POST')
const IDinParamsSchema = require('../schemas/paramsID')

const router = Router()

/**
 * /
 * @swagger
 * components:
 *  schemas:
 *    category:
 *      type: object
 *      requires:
 *        -name
 *        -description
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the category
 *        name:
 *          type: string
 *          description: This is the name of the category
 *        deletedAt:
 *          type: date
 *          description: This is the date of delete of the transaction
 *
 */

/**
 /
* @swagger
* /categories:
*  get:
*    summary: returns the list of all categories
*    tags: [categories]
*    responses:
*      200:
*         description: the list of categories
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/category'
*    security:
*     - ApiKeyAuth: []
*/

router.get('/', getCategories)

/**
 /
* @swagger
* /categories:
*  post:
*    summary: create a new category
*    tags: [categories]
*    description: Add a new category
*    requestBody:
*            description: Create a new category
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/category'
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/category'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID user or ID category
*        '404':
*          description: not Found ID user or ID category
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/

router.post('/', validationMiddleware(categoriesSchemaPOST), createCategory)

/**
 /
* @swagger
* /categories/{id}:
*  get:
*    summary: Find category by ID
*    tags: [categories]
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to return
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
*                $ref: '#/components/schemas/category'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
router.get('/:id', validationMiddleware(IDinParamsSchema), getCategoryById)

/**
 /
* @swagger
* /categories/{id}:
*  put:
*    summary:  Update an existing category
*    tags: [categories]
*    description: Update an existing category by Id
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to return
*         required: true
*         schema:
*           type: integer
*           format: int64
*    requestBody:
*            description: Update a category
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/category'
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/category'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
router.put('/:id', validationMiddleware(IDinParamsSchema), editCategory)

/**
 /
* @swagger
* /categories/{id}:
*  delete:
*    summary:  Delete a category
*    tags: [categories]
*    description: Delete a category
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to delete
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
*                $ref: '#/components/schemas/category'
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*    security:
*     - ApiKeyAuth: []
*/
router.delete('/:id', validationMiddleware(IDinParamsSchema), deleteCategory)

module.exports = router
