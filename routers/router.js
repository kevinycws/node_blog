const Router = require('koa-router')
const user = require("../control/user")
const router = new Router

router.get('/',async ctx=>{
    // await ctx.render("index.pug",{session:{}})
    await ctx.render("index.pug")
})
router.get(/^\/user\/(?=reg|login)/,async ctx=>{
    let show = /reg$/.test(ctx.path)
    await ctx.render('register',{show})
})

router.post("/user/reg",user.reg)
module.exports = router