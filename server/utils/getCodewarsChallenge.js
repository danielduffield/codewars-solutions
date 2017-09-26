const request = require('request')

function getCodewarsChallenge(url) {
  const apiUrl = url.replace(/codewars.com\/kata\//, 'codewars.com/api/v1/code-challenges/')
  return new Promise((resolve, reject) => {
    request.get(apiUrl, (err, response, body) => err ? reject(err) : resolve(response))
  })
}

module.exports = getCodewarsChallenge
