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
        done()
      })
    })
  })
})
