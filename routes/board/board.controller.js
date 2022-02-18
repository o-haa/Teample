
/* middlewares */
const {promisePool, insert, del, update} = require('../../db2.js')


const list = async (req, res)=>{
    let sql = `select * from tester`
    const [rows, fields] = await promisePool.query(sql)
    res.send(rows)    
}

module.exports = {
    list
}