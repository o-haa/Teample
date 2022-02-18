
/* middlewares */
const {promisePool, insert, del, update} = require('../../db2.js')
const {alertMove} = require('../../util/alert.js')

const list = (req, res)=>{
        res.send(alertMove('메인페이지로 뿅', '/'))
}

module.exports = {
    list
}