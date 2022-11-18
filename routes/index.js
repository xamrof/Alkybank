const express = require('express')

const usersRouter = require('./users')
const transactionsRouter = require('./transactions')
const categoriesRouter = require('./categories')
const loginRouter = require('../routes/login')
const authUser = require('../middlewares/authUser')

const router = express.Router()

// example of a route with index controller get function

router.use('/users', authUser, usersRouter)
router.use('/transactions', authUser, transactionsRouter)
router.use('/categories', authUser, categoriesRouter)
router.use('/auth/login', loginRouter)

module.exports = router
