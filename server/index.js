require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const getCodewarsChallenge = require('./utils/getCodewarsChallenge.js')
const readSolution = require('./utils/readSolution.js')
const { knexSelectAll } = require('./utils/knexCommands.js')
const parseApiData = require('./utils/parseApiData.js')
const addChallenge = require('./utils/addChallenge.js')
const omit = require('./utils/omit.js')
const populateDatabase = require('./utils/populateDatabase.js')

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

let challengeIdList = []

knexSelectAll('challenges').then(existingData => {
  existingData.forEach(challenge => challengeIdList.push(challenge.id))
  populateDatabase(challengeIdList).then(insertedChallenges => {
    insertedChallenges.forEach(challenge => {
      challengeIdList.push(challenge[0].id)
    })
    console.log('CHALLENGE ID LIST: ', challengeIdList)
  })
})

app.use(jsonParser)
app.use(express.static('server/public'))

app.get('/challenge-list', (req, res) => {
  const ids = []
  knexSelectAll('challenges').then(challengeData => {
    const challenges = challengeData.map(challenge => {
      ids.push(challenge.id)
      const omitted = omit(challenge, ['author_url'])
      omitted.authorUrl = challenge.author_url
      omitted.author = challenge.author
      omitted.url = challenge.url
      return omitted
    })
    challengeIdList = [...ids]
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
    if (!challengeIdList.includes(challengeData.challenge.id)) {
      addChallenge(challengeData).then(() => {
        res.status(201).send(challengeData)
      })
    }
    else res.status(201).send(challengeData)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

module.exports = server
