const fs = require('fs-extra')
const path = require('path')

const getCodewarsChallenge = require('./getCodewarsChallenge.js')
const addChallenge = require('./addChallenge.js')

function fetchAllChallenges() {
  const filePath = path.join(__dirname, '../solutions')
  const loadingFiles = fs.readdir(filePath)
  return loadingFiles.then(files => {
    return Promise.all(files.map(buildChallenge))
  })
}

function buildChallenge(fileName) {
  const url = 'https://www.codewars.com/kata/' + fileName.replace('.js', '')
  return getCodewarsChallenge(url).catch(err => console.log('Couldn\'t fetch: ', err))
}

function filterExisting(fetchedChallenges, existingIds) {
  console.log('EXISTING: ', existingIds)
  return fetchedChallenges
    .filter(challengeData => !existingIds.includes(challengeData.challenge.id))
}

function populateDatabase(existingIds) {
  let fetchedData = []
  return fetchAllChallenges().then(challengeList => {
    fetchedData = challengeList
    return filterExisting(challengeList, existingIds)
  }).then(newChallenges => {
    console.log('NEW CHALLENGES TO INSERT: ', newChallenges)
    const challenges = {
      complete: fetchedData,
      inserts: Promise.all(newChallenges.map(challengeData => addChallenge(challengeData)))
    }
    return challenges
  })
}

module.exports = populateDatabase
