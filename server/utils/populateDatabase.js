const fs = require('fs-extra')
const path = require('path')

const getCodewarsChallenge = require('./getCodewarsChallenge.js')
const parseApiData = require('./parseApiData.js')
// const { knexInsert } = require('./knexCommands.js')

function populateDatabase() {
  const filePath = path.join(__dirname, '../solutions')
  console.log(filePath)
  const loadingFiles = fs.readdir(filePath)
  return loadingFiles.then(files => {
    return Promise.all(files.map(buildChallenge))
  })
}

function buildChallenge(fileName) {
  const url = 'https://www.codewars.com/kata/' + fileName.replace('.js', '')
  return getCodewarsChallenge(url).then(response => {
    const challengeData = parseApiData(JSON.parse(response.body))
    return challengeData
  }).catch(err => console.log('Couldn\'t fetch: ', err))
}

module.exports = populateDatabase
