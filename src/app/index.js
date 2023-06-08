const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors')

// 注意要以这样的方式引入
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')

const errHandler = require('./errHandler')

const app = new Koa()

app.use(cors())

const router = require('../router')

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
    }
}))

app.use(koaStatic(path.join(__dirname, '../upload')))

app.use(router.routes())

app.on('error', errHandler)

module.exports = app