const fs = require('fs-extra')
const path = require('path')

function readSolution(name) {
  const solutionPath = path.join(__dirname, '../solutions/' + name + '.js')
  return fs.readFile(solutionPath, 'utf8')
}

module.exports = readSolution
