require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')

const readSolution = require('./utils/readSolution.js')
const { knexSelectAll } = require('./utils/knexCommands.js')
const parseApiData = require('./utils/parseApiData.js')
const addChallenge = require('./utils/addChallenge.js')

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

app.use(jsonParser)
app.use(express.static('server/public'))

app.get('/challenge-list', (req, res) => {
  knexSelectAll('challenges').then(challenges => {
    res.send(JSON.stringify({ challenges }))
  })
})

app.get('/solution/:name', (req, res) => {
  readSolution(req.params.name)
    .then(solution => {
      res.send(JSON.stringify({ solution }))
    }).catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/submit-url', (req, res) => {
  console.log(req.body.url)
  getCodewarsChallenge(req.body.url).then(response => {
    const challengeData = parseApiData(JSON.parse(response.body))
    addChallenge(challengeData).then(() => {
      res.status(201).send(challengeData)
    })
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

function getCodewarsChallenge(url) {
  const apiUrl = 'https://www.codewars.com/api/v1/code-challenges/' + url
  return new Promise((resolve, reject) => {
    request.get(apiUrl, (err, response, body) => err ? reject(err) : resolve(response))
  })
}

module.exports = server
