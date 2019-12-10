const { db } = require("../Scheam/config")
const UserSchema = require("../Scheam/user")
const encrypt = require("../util/encrypt")

const User = db.model("users", UserSchema)

exports.reg = async ctx=>{
    const user = ctx.request.body
    const username = user.username
    const password = user.password

    await new Promise((resolve, reject)=>{
        User.find({username}, (err, data)=>{
            if(err) reject(err)
            if(data.length!==0){
                return resolve("")
            }

            const _user = new User({
                username,
                password:encrypt(password)
            })

            _user.save((err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })

        })
    })
    .then( async data=>{
        if(data){
            await ctx.render("isOk",{
                status:"注册成功"
            })
        }else{
            await ctx.render("isOk",{
                status:"用户名已存在"
           })
        }
    } )
    .catch( async err=>{
        await ctx.render("isOk",{
            status:"注册失败"
       })
    } )
}


