function rgb(r, g, b) {
  const colorArray = [r, g, b]
  const hexColor = []
  colorArray.forEach(colorValue => {
    switch (true) {
      case (colorValue >= 255):
        hexColor.push('FF')
        break
      case colorValue <= 0:
        hexColor.push('00')
        break
      default:
        const hex = convertToHex(colorValue, '')
        hexColor.push(hex)
      }
  })
  return hexColor.join('')
}

function convertToHex(currentNum, total) {
  const hexAfterNine = ['A', 'B', 'C', 'D', 'E', 'F']
  const divided = Math.floor(currentNum / 16)
  const remainder = currentNum % 16
  let processedRemainder
  remainder > 9 ? processedRemainder = hexAfterNine[remainder - 10] : processedRemainder = remainder.toString()

  const newTotal = processedRemainder + total
  if (divided === 0) {
    return newTotal
  }
  else {
    return convertToHex(divided, newTotal)
  }
}
