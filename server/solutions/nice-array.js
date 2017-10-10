function isNice(array){
  if (array.length < 1) return false
  let niceness = true
  array.sort((a, b) => a - b)
    .forEach((num, index) => {
      const adjacent = array.findIndex(element => (num + 1 === element || num - 1 === element))
      if (adjacent === -1) niceness = false
    })
  return niceness
}
