const {alertMove} = require('./alert.js')

const Auth = (req, res, next) => {
    const {user} = req.session
    if (user != undefined) {
        next()
    } else {
        res.send(alertMove('접근 권한이 없습니다. 로그인 후 이용해주세요', '/user/login'))
    }
}

module.exports = {
    Auth
}