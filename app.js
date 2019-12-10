const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const log = require('koa-logger')
const router = require('./routers/router')
const body = require("koa-body")
const {join} = require('path')

const app = new Koa

app.use(log())

app.use(body())

app.use(static(join((__dirname),'public')))

app.use(views(join(__dirname,'views'),{
    extension:"pug"
}))

app .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000,()=>{
        console.log('服务器启动成功,监听3000端口')
    })

