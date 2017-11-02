function comp(array1, array2) {
  if (array1 === [] || array2 === []) return true
  if (!array1 || !array2) return false
  let isSame = true

  const squared = array1
    .map(num => Math.pow(num, 2))

  const sorted1 = squared.sort((a, b) => a - b)
  const sorted2 = array2.slice().sort((a, b) => a - b)

  sorted1.forEach((num, index) => {
    if (!(num === sorted2[index])) {
      isSame = false
    }
  })
  return isSame
}
