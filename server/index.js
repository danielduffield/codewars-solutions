require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const server = require('http').Server(app)
const io = require('socket.io').listen(server)

const getCodewarsChallenge = require('./utils/getCodewarsChallenge.js')
const readSolution = require('./utils/readSolution.js')
const { knexSelectAll } = require('./utils/knexCommands.js')
const addChallenge = require('./utils/addChallenge.js')
const populateDatabase = require('./utils/populateDatabase.js')

server.listen(process.env.PORT, () => console.log('Listening on PORT...'))

let challengeIdList = []
let fetchedData = []

knexSelectAll('challenges').then(existingData => {
  existingData.forEach(challenge => challengeIdList.push(challenge.id))
  populateDatabase(challengeIdList).then(challenges => {
    challenges.inserts.then(insertedChallenges => {
      insertedChallenges.forEach(challenge => {
        challengeIdList.push(challenge[0].id)
      })
      console.log('CHALLENGE ID LIST: ', challengeIdList)
    })
    console.log('COMPLETE: ', challenges.complete)
    fetchedData = [...fetchedData, ...challenges.complete]
  })
})

app.use(jsonParser)
app.use(express.static('server/public'))

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
  getCodewarsChallenge(req.body.url).then(challengeData => {
    if (!challengeIdList.includes(challengeData.challenge.id)) {
      fetchedData = [...fetchedData, ...challengeData]
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

io.sockets.on('connection', newConnection)

function newConnection(socket) {
  console.log('CONNECTED: ', socket.id)
  socket.emit('fetchedData', fetchedData)
}
