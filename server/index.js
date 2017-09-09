require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

app.use(jsonParser)
app.use(express.static('server/public'))

app.post('/submit-url', (req, res) => {
  console.log(req.body.url)
  res.sendStatus(201)
})

module.exports = server
