const showdown = require('showdown')
const converter = new showdown.Converter()

function parseApiData(response) {
  const url = response.url.replace('https://www.codewars.com/kata/', '')
  const name = response.name
  const id = response.id
  const author = response.createdBy.username
  const authorUrl = response.createdBy.url.replace('https://www.codewars.com/users/', '')
  const difficulty = response.rank.name
  let description = converter.makeHtml(response.description)
  description = description.replace(/<h1/g, '<h2')

  return {
    challenge: { url, name, id, author, authorUrl, difficulty },
    description: description
  }
}

module.exports = parseApiData
