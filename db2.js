require('dotenv').config()
const mysql = require('mysql2')

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE
const config = { host, user, password, database }

const pool = mysql.createPool(config)

const promisePool = pool.promise()

module.exports = {
    promisePool
}


