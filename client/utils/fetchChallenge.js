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
}

module.exports = fetchChallenge
