const express = require('express')
const router = express.Router()
const boardController = require('./board.controller.js')
const {alertMove} = require('../../util/alert.js')

const Auth = (req, res, next) => {
    const {user} = req.session
    if (user != undefined) {
        next()
    } else {
        res.send(alertMove('접근 권한이 없습니다. 로그인 후 이용해주세요', '/user/login'))
    }
}

router.get('/list/:num', Auth, boardController.list)

router.get('/write', boardController.getWrite)

router.post('/write', boardController.postWrite)

router.get('/view', boardController.getView)

// router.post('/view', boardController.postView)

router.get('/update', boardController.getUpdate)

router.post('/update', boardController.postUpdate)

router.post('/delete', boardController._delete)

module.exports = router