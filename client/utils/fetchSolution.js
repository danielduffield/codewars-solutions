function fetchSolution(challengeName) {
  return fetch('/solution/' + challengeName)
    .then(responseData => responseData.json())

}

module.exports = fetchSolution
