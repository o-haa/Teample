
/* middlewares */
const {promisePool, insert, del, update} = require('../../db2.js')
const {alertMove} = require('../../util/alert.js')
const {paging} = require('../../util/paging.js')

const list = async (req, res)=>{
    try{
        const page = req.params.num
        const count = 5
        let sql = 'SELECT idx, title, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date, likes, view FROM board ORDER BY idx DESC'
        const [rows, fields] = await promisePool.query(sql)
        const pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./board/index.html', {
            page,
            result,
            pageNum
        })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

const getWrite = (req, res) => {
    res.render('./board/write.html')
}

module.exports = {
    list,
    getWrite
}