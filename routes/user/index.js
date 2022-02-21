const express = require('express')
const router = express.Router()
const {alertMove} = require('../../util/alert.js')
const {promisePool, insert, update, del} = require('../../db2.js')

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
        res.send('Internal Server Error')
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    })
    res.send(alertMove('로그아웃 되었습니다.', '/'))
})

router.get('/join',(req,res)=>{
    res.render('./user/join.html')
})

router.post('/join',(req,res)=>{
    let {userid, userpw, username, nickname, birth, gender, phone, mobile, level} = req.body
    
})
    





module.exports = router;
