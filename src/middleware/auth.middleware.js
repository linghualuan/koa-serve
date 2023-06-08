const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError,
        jsonWebTokenError,
        oldPasswordCannotEmpty,
        newPasswordCannotEmpty,
        hasNoAdminAuthority,
} = require('../constant/err.type')

// 验证token
const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch(err) {
        switch(err.name) {
            case 'TokenExpiredError':
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                return ctx.app.emit('error', jsonWebTokenError, ctx)
        }
    }
    await next()
}

// 判断新旧密码
const authOldAndNewPassword = async (ctx, next) => {
    // 用户输入的新旧密码
    const { oldPassword, newPassword } = ctx.request.body

    if(!oldPassword) {
        return ctx.app.emit('error', oldPasswordCannotEmpty, ctx)
    }
    if(!newPassword) {
        return ctx.app.emit('error', newPasswordCannotEmpty, ctx)
    }

    await next()
}

// 判断是否是管理员
const authIsAdmin = async (ctx, next) => {
    const { is_admin } = ctx.state.user
    if(is_admin) {
        await next()
    }else {
        return ctx.app.emit('error', hasNoAdminAuthority, ctx)
    }
}

module.exports = {
    auth,
    authOldAndNewPassword,
    authIsAdmin,
}