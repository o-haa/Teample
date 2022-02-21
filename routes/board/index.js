const express = require('express')
const router = express.Router()
const boardController = require('./board.controller.js')


router.get('/list/:num', boardController.list)

router.get('/write', boardController.getWrite)

router.post('/write', boardController.postWrite)

router.get('/view', boardController.getView)

// router.post('/view', boardController.postView)

router.get('/update', boardController.getUpdate)

// router.post('/update', boardController.postUpdate)

router.post('/delete', boardController._delete)

module.exports = router