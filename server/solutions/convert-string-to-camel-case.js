function toCamelCase(str) {
  const split = str.includes('-') ? str.split('-') : str.split('_')
  let camelCased = ''
  split.forEach((word, index) => {
    camelCased += (index === 0 ? word : word[0].toUpperCase() + word.substring(1))
  })
  return camelCased
}
