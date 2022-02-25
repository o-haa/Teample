
/* user middlewares */
const {promisePool} = require('../../db2.js')
const {alertMove} = require('../../util/alert.js')
const {paging} = require('../../util/paging.js')

const getBoard = async (req, res) => {
    try {
        const {user} = req.session
        const page = req.params.num
        const count = 10
        let sql = 'SELECT idx, title, DATE_FORMAT(date, "%Y-%m-%d") AS date, view, likes FROM user LEFT JOIN board ON user.userid=board.userid WHERE board.userid=?'
        const [rows, fields] = await promisePool.query(sql, [user.userid])
        pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./user/profile/user_board.html', {
            result,
            page,
            pageNum,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const getComment = async (req, res) => {
    try {
        const {user} = req.session
        const page = req.params.num
        const count = 10
        let sql = 'SELECT cid, comment, DATE_FORMAT(c_date, "%Y-%m-%d %r") AS date, bid FROM user LEFT JOIN comment ON user.userid=comment.c_userid WHERE c_userid=?'
        const [rows, fields] = await promisePool.query(sql, [user.userid])
        pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./user/profile/user_comment.html', {
            result,
            page,
            pageNum,
            user
        })
    } catch {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const getScrap = async (req, res) => {
    try {
        const {user} = req.session
        const page = req.params.num
        const count = 10
        let sql = 'SELECT s_idx, s_userid, idx, title, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM scrap LEFT JOIN board ON scrap.bid=board.idx WHERE s_userid=?;'
        const [rows, fields] = await promisePool.query(sql, [user.userid])
        pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./user/profile/user_scrap.html', {
            user,
            result,
            page,
            pageNum
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }    
}

const postScrap = async (req, res) => {
    try {
        const {userid} = req.session.user
        const {idx} = req.body
        let sql = 'DELETE FROM scrap WHERE s_userid=? AND bid=?'
        await promisePool.query(sql, [userid, idx])
        res.send(alertMove('해당 스크랩이 삭제되었습니다.', '/user/scrap/1'))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}



module.exports = {
    getBoard,
    getComment,
    getScrap,
    postScrap
}
