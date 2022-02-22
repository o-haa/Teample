const express = require('express')
const router = express.Router()
const {alertMove} = require('../../util/alert.js')
const {promisePool} = require('../../db2.js')
const {Auth} = require('../../util/auth.js')

router.get('/login', (req, res)=>{
    res.render('./user/login.html')
})

router.post('/login', async (req,res)=>{
    try{
        let {userid, userpw} = req.body
        let sql = "SELECT * FROM user WHERE userid=? AND userpw=?"
        let arr = [userid, userpw]
        const [rows,fields] = await promisePool.query(sql, arr)
        if (rows[0] != undefined) {
            if (rows[0].access == 'true') {
                req.session.user = rows[0]
                res.redirect('/')
            } else {
                res.send(alertMove('관리자로부터 이용 정지된 계정입니다.', '/'))
            }
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
            res.render('./user/welcome.html',{
                user:req.body
            })
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


router.get('/profile', Auth, (req, res)=>{
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

