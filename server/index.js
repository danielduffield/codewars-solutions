require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

app.use(jsonParser)
app.use(express.static('server/public'))

app.post('/submit-url', (req, res) => {
  console.log(req.body.url)
  getCodewarsChallenge(req.body.url).then(response => {
    res.status(201).send(response)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

function getCodewarsChallenge(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, body) => {
      if (err) return reject(err)
      return resolve(response)
    })
  })
}

module.exports = server
