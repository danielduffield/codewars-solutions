const fs = require('fs-extra')
const path = require('path')

const getCodewarsChallenge = require('./getCodewarsChallenge.js')
const parseApiData = require('./parseApiData.js')
// const { knexInsert } = require('./knexCommands.js')

function fetchAllChallenges() {
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

function populateDatabase(existingIds) {
  console.log('EXISTING IDS: ', existingIds)
  fetchAllChallenges().then(challengeList => {
    console.log('SOLUTION CHALLENGES: ', challengeList)
    challengeList.forEach(challengeData => {
      if (existingIds.includes(challengeData.challenge.id)) {
        console.log('Found duplicate: ', challengeData.challenge.id)
      }
    })
  })
}

module.exports = populateDatabase
