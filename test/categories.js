const chaiHTTP = require('chai-http')
const chai = require('chai')
const { assert } = require('chai')
const server = require('../app')
const { suite, test } = require('mocha')

chai.use(chaiHTTP)

// estos test no incluyen manejo del JWT. si se agregan middlewares se debe modificar

suite('Tests for Categories Routes', function () {
  const testReqBody = {
    name: 'testCategory',
    description: 'testCategory'
  }
  const updateReqBody = {
    name: 'updateCategory',
    description: 'updateCategory'
  }
  let categoryID
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

  suite('Create categories: POST-route', function () {
    test('Succesfully create category', function (done) {
      chai
        .request(server)
        .post('/categories')
        .set('x-access-token', token)
        .send(testReqBody)
        .end((err, res) => {
          categoryID = res.body.body.id
          assert.equal(res.status, 200)
          assert.hasAllKeys(res.body, ['status', 'code', 'message', 'body'])
          assert.equal(res.body.message, 'Category created successfully')
          assert.equal(res.body.body.name, 'testCategory')
          assert.equal(res.body.body.description, 'testCategory')
          done()
        })
    })
    test('Validation Error', function (done) {
      chai
        .request(server)
        .post('/categories')
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400)
          assert.equal(res.body.message, 'Validation errors')
          assert.equal(res.body.errors.length, 1)
          done()
        })
    })
  })
  suite('Update categories: PUT-route', function () {
    test('Succesfully Update category', function (done) {
      chai
        .request(server)
        .put(`/categories/${categoryID}`)
        .set('x-access-token', token)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'User updated successfully')
          assert.equal(res.body.body.name, 'updateCategory')
          assert.equal(res.body.body.description, 'updateCategory')
          done()
        })
    })
    test('Trying to update unexistent category', function (done) {
      chai
        .request(server)
        .put('/categories/0')
        .set('x-access-token', token)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 400)
          done()
        })
    })
  })
  suite('Get categories: GET-route', function () {
    test('Get all categories', function (done) {
      chai
        .request(server)
        .get('/categories')
        .set('x-access-token', token)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Categories retrieved successfully')
          assert.hasAllKeys(res.body, ['status', 'code', 'message', 'body'])
          done()
        })
    })
    test('Get categories by ID', function (done) {
      chai
        .request(server)
        .get(`/categories/${categoryID}`)
        .set('x-access-token', token)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Category retrieved successfully')
          done()
        })
    })
    test('trying to get unexistent categories', function (done) {
      chai
        .request(server)
        .get('/categories/0')
        .set('x-access-token', token)
        .send(updateReqBody)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
  suite('Delete categories', function () {
    test('succesfully delete category', function (done) {
      chai
        .request(server)
        .delete(`/categories/${categoryID}`)
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.message, 'Category deleted successfully')
          done()
        })
    })
    test('Trying to delete unexistent user', function (done) {
      chai
        .request(server)
        .delete('/categories/0')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
})
