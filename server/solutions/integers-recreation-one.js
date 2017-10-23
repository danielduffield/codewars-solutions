function listSquared(m, n) {
  const results = []
  for (let i = 0; i < (n - m); i++) {
    const divisors = findDivisors(m + i)
    const squaredSum = divisors
      .map(num => Math.pow(num, 2))
      .reduce((a, b) => a + b)
    if (Math.pow(squaredSum, 0.5) === Math.floor(Math.pow(squaredSum, 0.5))) {
      results.push([m + i, squaredSum])
    }
  }
  return results
}

function findDivisors(num) {
  if (num === 0) return 0
  const half = num * 0.5 + 1
  const divisors = []
  for (let i = 0; i < half; i++) {
    num % i === 0 ? divisors.push(i) : divisors
  }
  if (num !== 1) divisors.push(num)
  return divisors
}
