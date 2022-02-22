const express = require('express')
const router = express.Router()
const userRouter = require('./user/index.js')
const boardRouter = require('./board/index.js')
const adminRouter = require('./admin/index.js')

router.get('/', (req, res)=>{
    const {user} = req.session
    res.render('./index.html', {
        user
    })
})

/* Admin */
router.use('/admin', adminRouter)

/* User */
router.use('/user', userRouter)

/* Board */
router.use('/board', boardRouter)


module.exports = router