require('dotenv').config()
const express = require('express')
const app = express()

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

app.use(express.static('server/public'))

module.exports = server
