const { knexInsert } = require('./knexCommands.js')
const omit = require('./omit.js')

function addChallenge(challengeData) {
  const challenge = omit(challengeData.challenge, ['authorUrl'])
  challenge.author_url = challengeData.challenge.authorUrl
  console.log(challenge)
  return knexInsert('challenges', challenge)
}

module.exports = addChallenge
