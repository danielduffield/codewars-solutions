const fs = require('fs-extra')
const path = require('path')
// const { knexInsert } = require('./knexCommands.js')

function populateDatabase() {
  const filePath = path.join(__dirname, '../solutions')
  console.log(filePath)
  const loadingFiles = fs.readdir(filePath)
  loadingFiles.then(files => files.forEach(buildChallenge))
}

function buildChallenge(fileName) {
  console.log('Building :', fileName)
}

module.exports = populateDatabase
