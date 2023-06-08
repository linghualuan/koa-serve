const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, updateUserPassword, getAllUser } = require('../service/user.service')
const { userRegisterError, oldPasswordError, oldCannotBeSameNew } = require('../constant/err.type')
const { JWT_SECRET, TOKEN_TIME } = require('../config/config.default')
const bcrypt = require('bcryptjs')

// 用户注册
async function userRegister(ctx) {
    const { username, password } = ctx.request.body

    try {
        const res = await createUser(username, password)
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                username: res.username,
            }
        }
    }catch(err) {
        ctx.app.emit('error', userRegisterError, ctx)
    }
}

// 用户登录
async function userLogin(ctx) {
    try {
        const { username } = ctx.request.body
        const { password, ...res } = await getUserInfo({username})
        ctx.body = {
            code: 0,
            message: '用户登录成功',
            result: {
                token: jwt.sign(res, JWT_SECRET, { expiresIn: TOKEN_TIME })
            }
        }
    }catch(err) {
        console.error('用户登录失败', err)
        return ctx.app.emit('error', userLoginFail, ctx)
    }
}

// 更新密码
const updatePassword = async (ctx) => {
    // // 从token中获取的id
    const { id } = ctx.state.user
    // // 使用id出来的用户信息
    const res = await getUserInfo({id})

    const { oldPassword, newPassword } = ctx.request.body

    if(bcrypt.compareSync(oldPassword, res.password)) {
        if(oldPassword === newPassword) {
            return ctx.app.emit('error', oldCannotBeSameNew, ctx)
        }else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(newPassword, salt)
            const res = await updateUserPassword({ hash, id })
            console.log('res', res)
            if(res[0] === 1) {
                ctx.body = {
                    code: 0,
                    message: '更改密码成功',
                    result: '',
                }
            }
        }

    }else {
        return ctx.app.emit('error', oldPasswordError, ctx)
    }
}

// 获取所有用户的信息
const getAllUserList = async (ctx) => {
    const res = await getAllUser()
    ctx.body = {
        code: 0,
        message: '获取用户列表成功',
        data: res,
    }
}

module.exports = {
    userRegister,
    userLogin,
    updatePassword,
    getAllUserList,
}