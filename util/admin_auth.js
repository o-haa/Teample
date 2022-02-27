const {alertMove} = require('./alert.js')

const adminAuth = (req, res, next) => {
    const {user} = req.session
    if (user.level == 1) {
        next()
    } else {
        res.send(alertMove('최고관리자로 접속 후 이용해주세요', '/'))
    }
}

module.exports = {
    adminAuth
}