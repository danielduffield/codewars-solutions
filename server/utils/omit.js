function omit(model, keys) {
  const allKeys = Object.keys(model)
  const keysToKeep = allKeys.filter(key => !keys.includes(key))
  const clone = {}
  keysToKeep.forEach(key => {
    clone[key] = model[key]
  })
  return clone
}

module.exports = omit
