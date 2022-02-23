const express = require('express')
const router = express.Router()
const boardController = require('./board.controller.js')
const {Auth} = require('../../util/auth.js')



router.get('/list', Auth, boardController.list)

router.get('/list/:num', Auth, boardController.list)

router.get('/write', Auth, boardController.getWrite)

router.post('/write', boardController.postWrite)

router.get('/view', Auth, boardController.getView)

router.post('/view', boardController.postView)

router.post('/comment', boardController.deleteComment)

router.get('/update', Auth, boardController.getUpdate)

router.post('/update', boardController.postUpdate)

router.post('/scrap', boardController.postScrap)

router.post('/likes', boardController.postLikes)

router.post('/delete', boardController._delete)

module.exports = router