const { knexInsert } = require('./knexCommands')

function addChallenge(challengeData) {
  const challenge = omit(challengeData.challenge, ['authorUrl'])
  challenge.author_url = challengeData.challenge.authorUrl
  console.log(challenge)
  return knexInsert('challenges', challenge)
}

function omit(model, keys) {
  const allKeys = Object.keys(model)
  const keysToKeep = allKeys.filter(key => !keys.includes(key))
  const clone = {}
  keysToKeep.forEach(key => {
    clone[key] = model[key]
  })
  return clone
}

module.exports = addChallenge
