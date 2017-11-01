function persistence(num) {
    if (num < 10) return 0
    let toParse = num.toString(10).split('')
    let count = 0
    let result
    do {
        result = toParse
            .reduce((a,b) => a * b)
            .toString(10)
            .split('')
        toParse = result
        count++

    } while (result.length > 1)
    return count
}
