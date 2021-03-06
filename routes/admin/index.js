const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller.js')
const {Auth} = require('../../util/auth.js')
const {adminAuth} = require('../../util/admin_auth.js')


router.get('/', adminController.admin)

router.get('/home', Auth, adminController.adminCheck)

router.post('/home', adminController.login)

router.get('/logout', Auth, adminController.logout)

router.get('/list', Auth, adminAuth, adminController.adminList)

router.get('/info', Auth, adminAuth, adminController.adminInfo)

router.post('/info', adminController.postAdminInfo)


module.exports = router