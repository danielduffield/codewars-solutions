function nextBigger(n) {
  const digits = n.toString().split('')
  if (digits.length < 1 || hasDescendingDigits(digits)) return -1
  let nextBigger = null
  let digitsSearched = 1
  while (!nextBigger) {
    digitsSearched++
    const swapped = swapEndDigits(digits, digitsSearched)
    if (swapped > n) nextBigger = swapped
  }
  return nextBigger
}

function arrayToNum(array) {
  return parseInt(array.join(''), 10)
}

function swapEndDigits(array, numToSwap) {
  const swapped = array.slice(0, array.length - numToSwap)
  const finalDigits = array.slice(array.length - numToSwap, array.length)
  const newFinalDigits = []

  if (hasDescendingDigits(finalDigits)) return arrayToNum(array)
  if (finalDigits.length === 2) return arrayToNum([...swapped, finalDigits[1], finalDigits[0]])

  const nextBiggerDigit = arrayStringsToNums(finalDigits).reduce((a, b) => a > finalDigits[0] && (a < b || b <= finalDigits[0]) ? a : b)
  const nextBiggerDigitIndex = finalDigits.findIndex(num => parseInt(num, 10) === nextBiggerDigit)
  newFinalDigits.push(nextBiggerDigit)

  const toSort = finalDigits.filter((num, index) => index !== nextBiggerDigitIndex)
  toSort.sort((a, b) => a - b).forEach(num => newFinalDigits.push(num))
  newFinalDigits.forEach(num => swapped.push(num))
  return arrayToNum(swapped)
}

function hasDescendingDigits(array) {
  let isDescending = true
  const nums = array.map(string => parseInt(string, 10))
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] < nums[i + 1]) isDescending = false
  }
  return isDescending
}

function arrayStringsToNums(array) {
  return array.map(string => parseInt(string, 10))
}
