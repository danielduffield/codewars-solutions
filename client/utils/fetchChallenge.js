import showdown from 'showdown'
const converter = new showdown.Converter()

function fetchChallenge(url) {
  return fetch('/submit-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ url })
  })
  .then(response => response.json())
  .then(apiData => parseApiData(apiData))
}

function parseApiData(response) {
  const url = response.url
  const name = response.name
  const id = response.id
  const author = response.createdBy.username
  const authorUrl = response.createdBy.url
  const difficulty = response.rank.name
  let description = converter.makeHtml(response.description)
  description = description.replace(/<h1/g, '<h2')

  return {
    challenge: { url, name, id, author, authorUrl, difficulty },
    description: description
  }
}

module.exports = fetchChallenge
