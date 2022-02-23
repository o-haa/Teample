const express = require('express')
const router = express.Router()
const {alertMove} = require('../../util/alert.js')
const {promisePool} = require('../../db2.js')
const {Auth} = require('../../util/auth.js')
const userController = require('./user.controller.js')
const Connection = require('mysql/lib/Connection')

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
<<<<<<< HEAD
            let sqlArr = [userid, userpw, username, nickname, birth, gender, phone, mobile]
=======
            let sqlArr = [userid, userpw, username, nickname, birth, gender, phone, mobile
            ]
>>>>>>> jungHwan
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

router.post('/profile', async (req, res)=>{
    try {
        const {userid} = req.body
        let sql = "DELETE FROM user WHERE userid=?"
        await promisePool.query(sql, [userid])
        req.session.destroy(()=>{
            req.session
        })
        res.send(alertMove('탈퇴처리가 완료되었습니다. 이용해주셔서 감사합니다.', '/'))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
})

router.get('/profile/update', Auth, (req, res)=>{
    const {user} = req.session
    res.render('./user/profile_update.html', {
        user
    })
})

router.post('/profile/update', async (req, res)=>{
    try {
        const {userid} = req.session.user
        const {userpw, nickname, phone, mobile} = req.body
        let sql = "UPDATE user SET userpw=?,nickname=?,phone=?,mobile=? WHERE userid=?"
        let sqlArr = [userpw, nickname, phone, mobile, userid]
        await promisePool.query(sql, sqlArr)
        req.session.destroy(()=>{
            req.session
        })
        res.send(alertMove('회원정보가 수정되었습니다. 다시 로그인 해주세요', '/'))
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    })
    res.send(alertMove('로그아웃 되었습니다.', '/'))
})

/* data router */
router.get('/board/:num', Auth, userController.getBoard)

router.get('/comment/:num', Auth, userController.getComment)

router.get('/scrap/:num', Auth, userController.getScrap)

router.post('/scrap', userController.postScrap)


module.exports = router;

