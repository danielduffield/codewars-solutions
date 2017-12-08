function findMissingLetter(array)
{
  const isUpperCase = (array[0] === array[0].toUpperCase())
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const alphabetString = array.slice().join('').toLowerCase()
  const firstLetterIndex = alphabet
    .split('')
    .findIndex(letter => {
      return letter === alphabetString[0]
    })
  console.log(firstLetterIndex)
  const missingIndex = alphabetString
    .split('')
    .findIndex((letter, index) => {
      return alphabet[firstLetterIndex + index] !== letter
    })
  const missingLetter = alphabet[firstLetterIndex + missingIndex]
  if (isUpperCase) return missingLetter.toUpperCase()
  return missingLetter
}
