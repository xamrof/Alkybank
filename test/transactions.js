const chaiHTTP = require('chai-http')
const chai = require('chai')
const { assert } = require('chai')
const server = require('../app')
const { suite, test } = require('mocha')
const { decoded } = require('../helpers/jwtFuntions')

chai.use(chaiHTTP)

// estas pruebas no contienen manejo del token. actualizar para recibir y manejar token.

suite('Test on transaction routes', function () {
  const categoryBody = {
    name: 'testTransactionCat',
    description: 'testTransactionCat'
  }
  const userBody = {
    firstName: 'testTrasactionUser',
    lastName: 'testTrasactionUser',
    email: 'testTrasactionUser@email.com',
    password: 'testTrasactionUser'
  }
  let categoryID
  let userID
  let transactionID
  let token
  // obtener token
  before((done) => {
    chai
      .request(server)
      .post('/auth/login')
      .send({
        email: 'JamiaOrt@test.com',
        password: 'theCrud'
      })
      .end((err, res) => {
        token = res.body.body.token
        done()
      })
  })

  //  crear category temporal para pruebas
  before((done) => {
    chai
      .request(server)
      .post('/categories')
      .set('x-access-token', token)
      .send(categoryBody)
      .end((err, res) => {
        categoryID = res.body.body.id
        done()
      })
  })
  // crear user temporal para pruebas
  before((done) => {
    chai
      .request(server)
      .post('/users')
      .set('x-access-token', token)
      .send(userBody)
      .end((err, res) => {
        payload = decoded(res.body.body)
        userID = payload.payload.id
        done()
      })
  })

  suite('transaction POST Routes', function () {
    test('Succesfully create transaction', function (done) {
      chai
        .request(server)
        .post('/transactions')
        .set('x-access-token', token)
        .send({
          amount: 5000,
          date: '2022/10/28',
          user: userID,
          category: categoryID,
          description: 'testDescription'
        })
        .end((err, res) => {
          payload = decoded(res.body.body)
          transactionID = payload.payload.id
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Transaction created successfully')
          done()
        })
    })
    test('Trying to Post transaction with invalid UserID', function (done) {
      chai
        .request(server)
        .post('/transactions')
        .set('x-access-token', token)
        .send({
          amount: 5000,
          date: '2022/10/28',
          user: 0,
          category: categoryID
        })
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
    test('Trying to Post transaction with invalid categoryID', function (done) {
      chai
        .request(server)
        .post('/transactions')
        .set('x-access-token', token)
        .send({
          amount: 5000,
          date: '2022/10/28',
          user: userID,
          category: 0
        })
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
    test('Validation Error', function (done) {
      chai
        .request(server)
        .post('/transactions')
        .set('x-access-token', token)
        .send({
          amount: '',
          date: '',
          user: userID,
          category: categoryID
        })
        .end((err, res) => {
          assert.equal(res.status, 400)
          assert.equal(res.body.message, 'Validation errors')
          assert.equal(res.body.errors.length, 2)
          done()
        })
    })
  })
  suite('transtaction UPDATE Routes', function () {
    test('Successfuly update transaction', function (done) {
      chai
        .request(server)
        .put(`/transactions/${transactionID}`)
        .set('x-access-token', token)
        .send({
          amount: 1,
          date: '2022/10/28',
          user: userID,
          category: categoryID
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Transaction updated successfully')
          done()
        })
    })
    test('trying to update transaction with invalid categoryID', function (done) {
      chai
        .request(server)
        .put(`/transactions/${transactionID}`)
        .set('x-access-token', token)
        .send({
          amount: 5000,
          date: '2022/10/28',
          user: userID,
          category: 0
        })
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
    test('trying to update transaction with invalid userID', function (done) {
      chai
        .request(server)
        .put(`/transactions/${transactionID}`)
        .set('x-access-token', token)
        .send({
          amount: 5000,
          date: '2022/10/28',
          user: 0,
          category: categoryID
        })
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
    test('trying to update invalid transactionID', function (done) {
      chai
        .request(server)
        .put('/transactions/0')
        .set('x-access-token', token)
        .send({
          amount: 5000,
          date: '2022/10/28',
          user: 0,
          category: categoryID
        })
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
  suite('Get transactions GET routes', function () {
    test('', function (done) {
      chai
        .request(server)
        .get('/transactions')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Transactions retrieved successfully')
          done()
        })
    })
    test('Get transactions by ID', function (done) {
      chai
        .request(server)
        .get(`/transactions/${transactionID}`)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Transaction retrieved successfully')
          done()
        })
    })
    test('Trying to get unexistent transaction', function (done) {
      chai
        .request(server)
        .get('/transactions/0')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
  suite('Delete transaction DELETE routes', function () {
    test('Succesfully delete transactions', function (done) {
      chai
        .request(server)
        .delete(`/transactions/${transactionID}`)
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Transaction deleted successfully')
          done()
        })
    })
    test('trying to delete with invalid  transaction ID', function (done) {
      chai
        .request(server)
        .delete('/transactions/0')
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
  // Borrar usuario de prueba
  after((done) => {
    chai
      .request(server)
      .delete(`/users/${userID}`)
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        console.log('User testTrasactionUser@email.com DELETE successfully')
        done()
      })
  })
  // Borrar categoria de prueba
  after((done) => {
    chai
      .request(server)
      .delete(`/categories/${categoryID}`)
      .set('x-access-token', token)
      .send()
      .end((err, res) => {
        console.log('User testTrasactionUser@email.com DELETE successfully')
        done()
      })
  })
})
