const express = require('express')
const nunjucks = require('nunjucks')
const router = require('./routes/index.js')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.set('view engine', 'html')
nunjucks.configure('./views', {
    express: app,
    watch: true
})

app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))


app.use(router)

app.listen(PORT, ()=>{
    console.log('server onload')
})