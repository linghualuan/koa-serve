const Router = require('koa-router')

const router = new Router({prefix: '/users'})

const { userLogin, userRegister, updatePassword, getAllUserList } = require('../controller/user.controller')

const { userValidtor, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')

const { auth, authOldAndNewPassword } = require('../middleware/auth.middleware')

router.post('/register', userValidtor, verifyUser, crpytPassword, userRegister)

router.post('/login', userValidtor, verifyLogin, userLogin)

router.patch('/updatepwd', auth, authOldAndNewPassword, updatePassword)

router.get('/getalluser', getAllUserList)

module.exports = router