require('dotenv').config()
const express = require('express')
const app = express()

app.listen(process.env.PORT, () => console.log('Listening on PORT...'))

app.use(express.static('server/public'))

app.get('/', (req, res) => res.send('Success!'))
