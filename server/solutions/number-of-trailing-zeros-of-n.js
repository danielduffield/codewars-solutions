function zeros(num) {
  const kMax = getBaseLog(5, num)
  let zeros = 0
  for (let k = 1; k <= kMax; k++) {
    zeros += num / Math.pow(5, k)
  }
  return Math.floor(zeros)
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x)
}
