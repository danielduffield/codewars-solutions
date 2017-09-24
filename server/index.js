require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const { knexSelectAll } = require('./utils/knexCommands.js')

const readSolution = require('./utils/readSolution.js')

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

app.use(jsonParser)
app.use(express.static('server/public'))

app.get('/solution/:name', (req, res) => {
  knexSelectAll('challenges').then(data => console.log(data))
  readSolution(req.params.name)
    .then(solution => {
      res.send(JSON.stringify({ solution })).status(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/submit-url', (req, res) => {
  console.log(req.body.url)
  const challengeApiUrl = parseUrl(req.body.url)
  getCodewarsChallenge(challengeApiUrl).then(response => {
    res.status(201).send(response.body)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

function getCodewarsChallenge(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, body) => err ? reject(err) : resolve(response))
  })
}

function parseUrl(url) {
  return url.replace(/codewars.com\/kata\//, 'codewars.com/api/v1/code-challenges/')
}

module.exports = server
