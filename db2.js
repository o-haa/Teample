require('dotenv').config()
const mysql = require('mysql2')

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE
const config = { host, user, password, database }

const pool = mysql.createPool(config)

const promisePool = pool.promise()

async function insert(query, arr) {
    try {
        await promisePool.query(query, arr)
    } catch(err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

async function del(query, arr) {
    try {
        await promisePool.query(query, arr)
    } catch(err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

async function update(query, arr) {
    try {
        await promisePool.query(query, arr)
    } catch(err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

module.exports = {
    promisePool,
    insert,
    del,
    update
}


