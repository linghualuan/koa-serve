const User = require('../model/user.model')

async function createUser(username, password) {
    const res = await User.create({username, password})
    return res.dataValues
}

async function getUserInfo({...args}) {
    const whereOpt = {...args}
    const res = await User.findOne({
        attributes: ['id', 'username', 'password', 'is_admin'],
        where: whereOpt,
    })
    return res ? res.dataValues : null
}

async function updateUserPassword({...args}) {
    const whereOpt = { ...args }
    const res = await User.update({
        password: whereOpt.hash
    }, {
        where: {
            id: whereOpt.id
        }
    })
    return res
}

async function getAllUser() {
    const res = await User.findAll()
    // console.log('00000000', res)
    return res
}

module.exports = {
    createUser,
    getUserInfo,
    updateUserPassword,
    getAllUser,
}