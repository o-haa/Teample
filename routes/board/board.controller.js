
/* middlewares */
const {promisePool, insert, del, update} = require('../../db2.js')
const {alertMove} = require('../../util/alert.js')
const {paging} = require('../../util/paging.js')

const list = async (req, res)=>{
    try{
        const {user} = req.session
        const page = req.params.num
        const count = 10
        let sql = 'SELECT idx, title, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date, likes, view FROM board ORDER BY idx DESC'
        const [rows, fields] = await promisePool.query(sql)
        const pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./board/index.html', {
            page,
            result,
            pageNum,
            user
        })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

const getWrite = (req, res) => {
    res.render('./board/write.html')
}

const postWrite = (req, res) => {
    const {title, content} = req.body
    const {nickname, userid} = req.session.user 
    let sql = "INSERT INTO board (title, content, nickname, date, userid) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)"
    let sqlArr = [title, content, nickname, userid]
    insert(sql, sqlArr)
    res.send(alertMove('게시글이 작성되었습니다.', '/board/list/1'))
}

const getView = async (req, res) => {
    const {user} = req.session
    const {idx} = req.query
    let sql1 = 'UPDATE board SET view=board.view+1 WHERE idx=?'
    await promisePool.query(sql1, [idx])
    // console.log(idx)
    let sql2 = 'SELECT idx, title, content, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date, likes, view, userid FROM board WHERE idx=?'
    const [rows, fields] = await promisePool.query(sql2, [idx])
    res.render('./board/view.html', {
        rows: rows[0],
        user
    })
}

const getUpdate = async (req, res) => {
    const {idx} = req.query
    // console.log(req.query)
    let sql = 'SELECT idx, title, content FROM board WHERE idx=?'
    const [rows, fields] = await promisePool.query(sql, [idx])
    // console.log(rows)
    res.render('./board/update.html', {
        rows: rows[0]
    })
}

const postUpdate = (req, res) => {
    const {idx} = req.query
    const {title, content} = req.body
    console.log(req.query)
    console.log(idx, title, content)
    let sql = 'UPDATE board SET title=?, content=? WHERE idx=?'
    update(sql, [title, content, idx])
    res.send(alertMove('글이 수정되었습니다.', '/board/list/1'))

}


const _delete = (req, res) => {
    const {user} = req.session
    const {idx} = req.body
    let sql = "DELETE FROM board WHERE idx=?"
    del(sql, [idx])
    res.send(alertMove('게시글이 삭제되었습니다.', '/board/list/1'))
}

module.exports = {
    list,
    getWrite,
    postWrite,
    getView,
    getUpdate,
    postUpdate,
    _delete
}
