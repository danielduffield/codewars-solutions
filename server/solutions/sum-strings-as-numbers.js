function sumStrings(a,b) {
  const c = []
  let overflow = 0
  const greater = a.split('').length > b.split('').length ? a.split('').length: b.split('').length
  for (let i = 0; i < greater; i++) {
    if (!a.split('').reverse()[i]) {
      overflow ? c.push((parseInt(b.split('').reverse()[i], 10) + overflow).toString()) : c.push(b.split('').reverse()[i])
      overflow = 0
    }
    if (!b.split('').reverse()[i]) {
      overflow ? c.push((parseInt(a.split('').reverse()[i], 10) + overflow).toString()) : c.push(a.split('').reverse()[i])
      overflow = 0
    }
    if (!a.split('').reverse()[i] || !b.split('').reverse()[i]) {
      continue
    }
    let sum = parseInt(a.split('').reverse()[i]) + parseInt(b.split('').reverse()[i])
    overflow ? sum += overflow : sum
    overflow = 0
    if (sum > 9) {
      overflow = parseInt(sum.toString()[0])
      c.push(sum.toString()[1])
    }
    else {
      overflow = 0
      c.push(sum)
    }
  }
  if (overflow) c.push(overflow)
  let summed = c.reverse()
  while (summed[0] === '0' || summed[0] === 0) {
    summed.shift()
  }
  return summed.join('')
}
