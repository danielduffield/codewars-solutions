function tribonacci(signature,n){
  if (n === 0) return []
  if (n < 3) return signature.slice(0, n)

  const golden = signature.slice()
  for (let i = 0; i < (n - 3); i++) {
    const nextInSequence = (golden[golden.length - 1]) + (golden[golden.length - 2]) + (golden[golden.length - 3])
    golden.push(nextInSequence)
  }
  return golden
}
