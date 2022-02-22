
/* board middlewares */
const {promisePool} = require('../../db2.js')
const {alertMove} = require('../../util/alert.js')
const {paging} = require('../../util/paging.js')

const list = async (req, res)=>{
    try{
        const {user} = req.session
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
            pageNum,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const getWrite = (req, res) => {
    res.render('./board/write.html')
}

const postWrite = async (req, res) => {
    try {
        const {title, content} = req.body
        const {nickname, userid} = req.session.user 
        let sql = "INSERT INTO board (title, content, nickname, date, userid) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)"
        let sqlArr = [title, content, nickname, userid]
        await promisePool.query(sql, sqlArr)
        res.send(alertMove('게시글이 작성되었습니다.', '/board/list/1'))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const getView = async (req, res) => {
    try {
        const {user} = req.session
        const {idx} = req.query
        let sql1 = 'UPDATE board SET view=board.view+1 WHERE idx=?'
        await promisePool.query(sql1, [idx])
        let sql2 = `SELECT idx, title, content, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date, likes, view, userid, comment, DATE_FORMAT(c_date, "%Y-%m-%d %r") AS c_date, c_nickname, cid, c_userid 
                    FROM board LEFT JOIN comment ON board.idx=comment.bid WHERE board.idx=?;`
        const [rows, fields] = await promisePool.query(sql2, [idx])
        res.render('./board/view.html', {
            rows,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const postView = async (req, res) => {
    try {
        const {userid, nickname} = req.session.user
        const {bid,comment} = req.body
        let sql = "INSERT INTO comment (comment, c_nickname, c_date, bid, c_userid) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)"
        let sqlArr = [comment, nickname, bid, userid]
        await promisePool.query(sql, sqlArr)
        res.send(alertMove('댓글이 작성되었습니다.', `/board/view/?idx=${bid}`))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const deleteComment = async (req, res) => {
    try {
        const {bid, cid} = req.body
        let sql = "DELETE FROM comment WHERE cid=?"
        await promisePool.query(sql, [cid])
        res.send(alertMove('댓글이 삭제되었습니다.', `/board/view/?idx=${bid}`))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const getUpdate = async (req, res) => {
    try {
        const {idx} = req.query
        let sql = 'SELECT idx, title, content FROM board WHERE idx=?'
        const [rows, fields] = await promisePool.query(sql, [idx])
        res.render('./board/update.html', {
            rows: rows[0]
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const postUpdate = async (req, res) => {
    try {
        const {idx} = req.query
        const {title, content} = req.body
        let sql = 'UPDATE board SET title=?, content=? WHERE idx=?'
        await promisePool.query(sql, [title, content, idx])
        res.send(alertMove('글이 수정되었습니다.', '/board/list/1'))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const postScrap = async (req, res) => {
    try {
        const {idx, userid} = req.body
        let sql = "INSERT INTO scrap (s_userid, bid) VALUES (?, ?)"
        await promisePool.query(sql, [userid, idx])
        res.send(alertMove('해당 게시글이 스크랩되었습니다. 프로필 페이지에서 확인 가능합니다.', `/board/view/?idx=${idx}`))
    } catch {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const _delete = async (req, res) => {
    try {
        const {idx} = req.body
        let sql1 = "DELETE FROM board WHERE idx=?"
        await promisePool.query(sql1, [idx])
        let sql2 = "DELETE FROM comment WHERE bid=?"
        await promisePool.query(sql2, [idx])
        res.send(alertMove('게시글이 삭제되었습니다.', '/board/list/1'))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

module.exports = {
    list,
    getWrite,
    postWrite,
    getView,
    postView,
    deleteComment,
    getUpdate,
    postUpdate,
    postScrap,
    _delete
}
