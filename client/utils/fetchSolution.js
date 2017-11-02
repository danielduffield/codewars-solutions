function fetchSolution(challengeName) {
  const parsedName = parseCodewarsName(challengeName)
  return fetch('/solution/' + parsedName)
    .then(responseData => responseData.json())

}

function parseCodewarsName(name) {
  return name.split('').map(char => char.toLowerCase()).join('')
    .replace(/ /g, '-').replace('!', '').replace(':', '').replace('.', '').replace(/"/g, '')
}

export default fetchSolution
