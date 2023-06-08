const { getUserInfo } = require('../service/user.service')
const { 
    userFormateError,
    userAlreadyExited,
    userNotExit,
    userLoginFail,
    passwordError,
} = require('../constant/err.type')

const bcrypt = require('bcryptjs')

// 判断用户输入姓名和密码是否为空
const userValidtor = async (ctx, next) => {
    const { username, password } = ctx.request.body
    console.log(username, password)
    if(!username || !password) {
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

// 判断数据库中是否已经存在该用户
const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    // 2.操作数据库
    const res = await getUserInfo({username})
    if(res) {
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
    }

    await next()
}

// 加密密码
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    // 加盐
    const salt = bcrypt.genSaltSync(10)
    // 密文
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

// 验证用户的登陆
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body

    const res = await getUserInfo({username})

    try {
        if(!res) {
            ctx.app.emit('error', userNotExit, ctx)
            return
        }
        if(!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', passwordError, ctx)
            return
        }
    }catch(err) {
        ctx.app.emit('error', userLoginFail, ctx)
        return
    }

    await next()
}

module.exports = {
    userValidtor,
    verifyUser,
    crpytPassword,
    verifyLogin,
}