function validBraces(braces) {
  const valid = /\(\)|\{\}|\[\]/
  while (valid.test(braces)) {
    braces = braces.replace(/\(\)|\{\}|\[\]/, '')
  }
  return !braces.length
}
