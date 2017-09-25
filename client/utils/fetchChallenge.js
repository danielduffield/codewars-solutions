function fetchChallenge(url) {
  const prefix = 'https://www.codewars.com/kata/'
  if (!url.startsWith(prefix)) {
    url = prefix + url
  }
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
