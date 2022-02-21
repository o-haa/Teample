const express = require('express')
const router = express.Router()
const {alertmove} = require('../../util/alert.js')
const {promisePool, insert, update, del} = require('../../db2.js')

<<<<<<< HEAD
router.get('/login', (req, res)=>{
    res.render('./user/login.html')
=======
router.get('/login',(req, res)=>{
    res.render('./user/index.html') 
>>>>>>> juchan
})

router.post('/login', async(req,res)=>{
    try{
        let {userid, userpw} = req.body
        let sql = "SELECT * FROM user WHERE userid=? , userpw=?"
        // let sql = "SELECT * FROM user"
        let arr = [userid, userpw]
        const [rows,fields] = await promisePool.query(sql,arr)
        req.session.arr[0]
        req.session.arr[1]

    } catch(err){
        res.send(alertmove('/user/login','아이디와 패스워드를 확인하세요'))
    }

})





module.exports = router;
