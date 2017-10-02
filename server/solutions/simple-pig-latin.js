function pigIt(str){
  return str.split(' ').map(word => {
    return word.substring(1) + word.split('')[0] + 'ay'
    }).join(' ')
}
