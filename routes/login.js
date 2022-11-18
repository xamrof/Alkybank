const { Router } = require("express");
const postLogin = require("../controllers/login");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    login:
 *      type: object
 *      requires:
 *        -email
 *        -password
 *      properties:
 *        email:
 *          type: string
 *          description: This is the email of the login
 *        password:
 *          type: alphanumeric
 *          description: This is the password of the login
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: login
 *    tags: [login]
 *    description: login
 *    requestBody:
 *            description: login
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/login'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/login'
 *              application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: '#/components/schemas/login'
 *            required: true
 *    responses:
 *        '200':
 *          description: successfuly operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/login'
 *        '400':
 *          description: Invalid email user or ID login
 *        '404':
 *          description: not Found password user or ID login
 *        '500':
 *          description: error of server
 */
router.post("/", postLogin);

module.exports = router;
