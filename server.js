const express = require('express')
const nunjucks = require('nunjucks')
const router = require('./routes/index.js')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

const maxAge = 60*60*1000
app.use(session({
    secret: 'qwer1234',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
        maxAge
    }
}))

app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(PORT, ()=>{
    console.log('server onload')
})