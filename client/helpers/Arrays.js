function truncateByLines(text, linesCount) {
    return text
        .split(/\r?\n/)
        .slice(0, linesCount)
        .reduce((acc, current) => {
            return acc + "\n" + current
        })
}

/**
 * Arrays.range(1, 4)
 * [1, 2, 3, 4]
 */
function range(start, count) {
    return Array.apply(0, new Array(count)).map((_, i) => i + start)
}

export default {
    range,
    truncateByLines
}