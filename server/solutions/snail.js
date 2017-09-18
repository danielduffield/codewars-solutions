function snail(array) {
  const rows = array.length
  if (rows === 0 || array[0] === []) return []
  if (rows === 1) return array[0]

  const flattened = array.reduce((a, b) => a.concat(b))
  const endPointCoords = [Math.floor(rows / 2), Math.floor((rows - 1) / 2)]
  const flatEndPoint = endPointCoords[0] * rows + endPointCoords[1]

  let currentIndex = flatEndPoint
  let finalMove = false
  let spacesToMove = 1

  const counted = []
  counted.push(flattened[currentIndex])

  const move = {
    right: (current, lengthToMove) => {
      for (let i = 1; i <= lengthToMove; i++) {
        counted.push(flattened[current + i])
      }
      currentIndex += lengthToMove
    },
    left: (current, lengthToMove) => {
      if (lengthToMove === rows) {
        console.log('bam')
        lengthToMove -= 1
        finalMove = true
      }
      for (let i = 1; i <= lengthToMove; i++) {
        counted.push(flattened[current - i])
      }
      currentIndex -= lengthToMove
    },
    up: (current, lengthToMove) => {
      for (let i = 1; i <= lengthToMove; i++) {
        counted.push(flattened[current - i * rows])
      }
      currentIndex -= lengthToMove * rows
    },
    down: (current, lengthToMove) => {
      for (let i = 1; i <= lengthToMove; i++) {
        counted.push(flattened[current + i * rows])
      }
      currentIndex += lengthToMove * rows
    }
  }

  if (rows % 2 === 0) {
    move.right(currentIndex, spacesToMove)
    move.up(currentIndex, spacesToMove)
    spacesToMove++
  }
  while (finalMove === false) {
    move.left(currentIndex, spacesToMove)
    if (finalMove === true) break
    move.down(currentIndex, spacesToMove)
    spacesToMove++
    move.right(currentIndex, spacesToMove)
    move.up(currentIndex, spacesToMove)
    spacesToMove++
  }
  return counted.reverse()
}
