import showdown from 'showdown'
const converter = new showdown.Converter()

function fetchDescription(url) {
  return fetch('/submit-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ url })
  })
  .then(response => response.json())
  .then(apiData => parseDescription(apiData))
}

function parseDescription(response) {
  let description = converter.makeHtml(response.description)
  description.replace(/<h1/g, '<h2')
  return description
}

module.exports = fetchDescription
