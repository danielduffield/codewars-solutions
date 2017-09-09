require('dotenv').config()
const { describe, it, before, after } = require('mocha')
const { expect } = require('chai')
const request = require('request')
const server = require('./../../server/index.js')
const port = process.env.PORT || 3000

before(done => {
  server.listen(port, () => {
    console.log('Listening on PORT for testing.')
    done()
  })
})

after(done => {
  server.close(() => done())
})

describe('index', () => {

  describe('GET /', () => {
    it('listens for and responds to HTTP requests', done => {
      request.get('http://localhost:' + port, (err, res, body) => {
        expect(err).to.equal(null)
        expect(res).to.have.property('statusCode', 200)
        console.log('Completed GET test')
        done()
      })
    })
  })

  describe('Valid POST /submit-url', () => {
    it('handles POST requests made to /submit-url', done => {
      const options = {
        url: ('http://localhost:' + port + '/submit-url'),
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: 'https://www.codewars.com/kata/snail' })
      }
      const req = new Promise((resolve, reject) => {
        request(options, (err, res, body) => (err ? reject(err) : resolve(res)))
      })
      req.then(response => {
        expect(response.statusCode).to.equal(201)
        console.log('Completed POST test')
        done()
      })
      .catch(err => {
        expect(err).to.equal(null)
        console.log('An error occurred: ', err)
        done()
      })
    })
  })

  describe('Invalid POST /submit-url', () => {
    it('handles POST requests made to /submit-url', done => {
      const options = {
        url: ('http://localhost:' + port + '/submit-url'),
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: '' })
      }
      const req = new Promise((resolve, reject) => {
        request(options, (err, res, body) => (err ? reject(err) : resolve(res)))
      })
      req.then(response => {
        expect(response.statusCode).to.equal(400)
        console.log('Completed invalid POST test')
        done()
      })
      .catch(err => {
        expect(err).to.not.equal(null)
        console.log('An error occurred: ', err)
        done()
      })
    })
  })
})
