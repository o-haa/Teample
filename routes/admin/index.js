const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller.js')
const {Auth} = require('../../util/auth.js')


router.get('/', adminController.admin)

router.get('/login', Auth, adminController.adminCheck)

router.post('/login', adminController.login)

router.get('/logout', Auth, adminController.logout)

router.get('/list', Auth, adminController.adminList)

router.get('/info', Auth, adminController.adminInfo)

// router.get('/update', adminController.getUpdate)

// router.post('/update', adminController.postUpdate)


module.exports = router