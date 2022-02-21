const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')

router.get('/', (req, res)=>{
    const {user} = req.session
    res.render('./index.html', {
        user
    })
})

/* User */
router.use('/user', userRouter)

/* Board */
router.use('/board', boardRouter)


module.exports = router