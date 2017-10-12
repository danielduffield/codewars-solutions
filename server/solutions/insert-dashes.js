function insertDash(num) {
  const split = num.toString().split('')
  return split.map((digit, index) => digit % 2 !== 0 && split[index + 1] % 2 === 1
    ? (digit + '-') : digit).join('')
}
