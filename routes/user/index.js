const express = require('express')
const router = express.Router()
const {alertMove} = require('../../util/alert.js')
const {promisePool} = require('../../db2.js')

router.get('/login', (req, res)=>{
    res.render('./user/login.html')
})

router.post('/login', async (req,res)=>{
    try{
        let {userid, userpw} = req.body
        let sql = "SELECT * FROM user WHERE userid=? AND userpw=?"
        // let sql = "SELECT * FROM user"
        let arr = [userid, userpw]
        const [rows,fields] = await promisePool.query(sql, arr)
        if (rows[0] != undefined) {
            req.session.user = rows[0]
            res.redirect('/')
        } else {
            res.send(alertMove('회원정보가 일치하지 않습니다.', '/user/login'))
        }
    } catch(err){
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
})

router.get('/join',(req,res)=>{
    res.render('./user/join.html')
})

router.post('/join', async (req,res)=>{
    try{
        let {userid, userpw, username, nickname, birth, gender, phone, mobile, level} = req.body
        console.log(userid)
        let sql1 = "SELECT nickname FROM user WHERE nickname=?"
        const [rows, fields] = await promisePool.query(sql1, [nickname])
        if (rows[0] != undefined) {
            res.send(alertMove('중복된 닉네임입니다.', '/user/join'))
        } else {
            let sql2 = "INSERT INTO user (userid, userpw, username, nickname, birth, gender, phone, mobile) VALUES (?,?,?,?,?,?,?,?)"
            let sqlArr = [userid, userpw, username, nickname, birth, gender, phone, mobile, level]
            const [rows,fields] = await promisePool.query(sql2,sqlArr)
            console.log(rows)
            res.send(alertMove('회원가입을 환영합니다!', '/user/login'))
        }
    } catch(err){
        console.log(err)
        if (err.errno == 1062) {
            res.send(alertMove('중복된 아이디입니다.', '/user/join'))
        } else {
            res.status(500).send('<h1>Internal Server Error</h1>')
        }
    }
}) 


router.get('/welcome',async (req,res)=>{
    const {user} = req.session
    let sql = "SELECT userid, username, gender, phone, mobile FROM user WHERE userid=?"
    const [rows, fields] = await promisePool.query(sql,[user.userid])
    res.send(rows[0])

})


router.get('/profile', (req, res)=>{
    const {user} = req.session
    res.render('./user/profile.html', {
        user
    })
})

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    })
    res.send(alertMove('로그아웃 되었습니다.', '/'))
})


module.exports = router;

