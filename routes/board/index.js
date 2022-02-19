const express = require('express')
const router = express.Router()
const boardController = require('./board.controller.js')


router.get('/list/:num', boardController.list)


module.exports = router