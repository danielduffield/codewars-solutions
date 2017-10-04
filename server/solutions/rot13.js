function rot13(message){
  return message
    .split('')
    .map(char => {
      let alphabet = 'abcdefghijklmnopqrstuvwxyz'
      let isUpperCase = (char.toUpperCase() === char)
      if (!alphabet.includes(char) && !alphabet.toUpperCase().includes(char)) return char
      const letterIndex = alphabet.split('').findIndex(letter => letter === char.toLowerCase())
      isUpperCase ? alphabet = alphabet.toUpperCase() : alphabet
      return (letterIndex + 13 >= 26 ? alphabet[letterIndex + 13 - 26] : alphabet[letterIndex + 13])
    })
    .join('')
}
