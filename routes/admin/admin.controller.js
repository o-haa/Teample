
/* admin middlewares */
const {promisePool} = require('../../db2.js')
const {alertMove} = require('../../util/alert.js')

const admin = (req, res) => {
    res.render('./admin/index.html')
}

const adminCheck = (req, res) => {
    const {user} = req.session
    if (user.userid != 'admin') {
        res.send(alertMove('관리자로 접속해주세요.', '/'))
    } else {
        res.render('./admin/admin_login.html', {
            user
        })
    }
}

const login = async (req, res) => {
    try{
        const {userid, userpw} = req.body
        let sql = "SELECT * FROM user WHERE userid=? AND userpw=? AND level=?"
        let sqlArr = [userid, userpw, 1]
        const [rows, fields] = await promisePool.query(sql, sqlArr)
        if (rows[0] != undefined) {
            req.session.user = rows[0]
            const {user} = req.session
            res.render('./admin/admin_login', {
                user
            })
        } else {
            res.send(alertMove('관리자만 접속 가능합니다.', '/'))
        }
    } catch {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

const logout = (req, res) => {
    req.session.destroy(()=>{
        res.session
    })
    res.send(alertMove('관리자 로그아웃 되었습니다.', '/'))
}

const adminList = async (req, res) => {
    const {user} = req.session
    let sql = "SELECT * FROM user"
    const [rows, fields] = await promisePool.query(sql)
    res.render('./admin/admin_list.html', {
        user,
        rows
    })
}

const adminInfo = async (req, res) => {
    const {userid} = req.query
    
}

// const getUpdate = (req, res) => {

// }

// const postUpdate = (req, res) => {

// }






module.exports = {
    admin,
    login,
    adminCheck,
    logout,
    adminList,
    adminInfo
}



