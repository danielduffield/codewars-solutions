function longestConsec(strarr, k) {
  if (!strarr.length || k <= 0 || k > strarr.length) return ''
  const lengths = strarr.map(element => element.length)
  const consecutiveLengths = lengths.map((num, index) => {
    for (let i = 1; i < k; i++) {
      if (lengths[index + i]) num += lengths[index + i]
    }
    return num
  })
  const peak = consecutiveLengths.reduce((a, b) => a > b ? a : b)
  const startIndex = consecutiveLengths.findIndex(num => num === peak)
  const longestConsecStrs = []
  for (let i = 0; i < k; i++) longestConsecStrs.push(strarr[startIndex + i])
  return longestConsecStrs.join('')
}
