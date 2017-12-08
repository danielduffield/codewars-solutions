function elevatorDistance(floors) {
  return floors.map((floor, index) =>  floors[index + 1] || floors[index + 1] === 0
      ? floor - floors[index + 1] : 0).reduce((a, b) => Math.abs(a) + Math.abs(b))
}
