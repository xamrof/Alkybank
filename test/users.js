
const chaiHTTP = require('chai-http')
const chai = require('chai')
const { assert } = require('chai')
const server = require('../app')
const { suite, test } = require('mocha')
const { decoded } = require('../helpers/jwtFuntions')

chai.use(chaiHTTP)

suite('Tests for Users Routes', function () {
  const createBodyRequest = {
    firstName: 'userCreate',
    lastName: 'userCreate',
    email: 'userCreate@email.com',
    password: 'passwordCreate'
    // lleva avatar??
  }
  const updateBodyRequest = {
    email: 'updated@email.com',
    firstName: 'updatedName',
    lastName: 'updatedLastname',
    password: 'passwordUpdate'
  }

  let testUserID
  let token

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

  suite('create User ', function () {
    test('succesfull creation of user', function (done) {
      chai
        .request(server)
        .post('/users')
        .set('x-access-token', token)
        .send(createBodyRequest)
        .end((err, res) => {
          payload = decoded(res.body.body)
          testUserID = payload.payload.id
          assert(res.status, 500)
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'User created successfully')
          // assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          // assert.equal(res.body.body.firstName, "userCreate");
          // assert.equal(res.body.body.lastName, "userCreate");
          done()
        })
    })

    test('Email already exists ', function (done) {
      chai
        .request(server)
        .post('/users')
        .set('x-access-token', token)
        .send(createBodyRequest)
        .end((err, res) => {
          assert.equal(res.status, 400)
          done()
        })
    })

    test('Validation Errors', function (done) {
      chai
        .request(server)
        .post('/users')
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400)
          assert.equal(res.body.message, 'Validation errors')
          assert.hasAllKeys(res.body, [
            'message',
            'statusCode',
            'status',
            'isOperational',
            'errors'
          ])
          assert.equal(res.body.errors.length, 4)
          done()
        })
    })
  })

  suite('Update User', function () {
    test('Successfull user update', function (done) {
      chai
        .request(server)
        .put(`/users/${testUserID}`)
        .set('x-access-token', token)
        .send(updateBodyRequest)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'User updated successfully')
          // assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          // assert.equal(res.body.body.firstName, "updatedName");
          // assert.equal(res.body.body.lastName, "updatedLastname");
          done()
        })
    })
    test('Trying update inexistent User', function (done) {
      chai
        .request(server)
        .put('/users/0')
        .set('x-access-token', token)
        .send(updateBodyRequest)
        .end((err, res) => {
          assert.equal(res.status, 400)
          done()
        })
    })
  })

  suite('Get Users', function () {
    test('Get user by ID', function (done) {
      chai
        .request(server)
        .get(`/users/${testUserID}`)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'User retrieved successfully')
          done()
        })
    })
    test('Get All Users', function (done) {
      chai
        .request(server)
        .get('/users/')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Users retrieved successfully')
          // assert.hasAllKeys(res.body, ["status", "code", "message", "body"]);
          done()
        })
    })
    test('Trying to get Unexistent User', function (done) {
      chai
        .request(server)
        .get('/users/0')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })

  suite('Delete User', function () {
    test('succesfully delete User', function (done) {
      chai
        .request(server)
        .delete(`/users/${testUserID}`)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'User deleted successfully')
          done()
        })
    })
    test('Trying to delete unexistent user', function (done) {
      chai
        .request(server)
        .delete('/users/0')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
})
//
