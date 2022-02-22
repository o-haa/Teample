const {alertMove} = require('./alert.js')

const adminAuth = (req, res, next) => {
    const {user} = req.session
    if (user.userid == 'admin') {
        next()
    } else {
        res.send(alertMove('관리자로 접속 후 이용해주세요', '/user/login'))
    }
}

module.exports = {
    adminAuth
}