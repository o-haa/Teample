function paging(page, count, rows) {
    let start = page*count - count
    let end = page*count
    let result = []
    for (let i=start; i<end; i++) {
        if (i > rows.length-1) { break }
        result.push(rows[i])
    }
    return result
}

module.exports = {
    paging
}