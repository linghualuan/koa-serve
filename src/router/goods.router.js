const Router = require('koa-router')

const router = new Router({ prefix: '/goods' })

const { upload, goodsList, updateGoods } = require('../controller/goods.controller')

const { authIsAdmin, auth } = require('../middleware/auth.middleware')
const { verificationOfGoods, queryGoodsId, updateGoodsInfoById } = require('../middleware/goods.middleware')

router.post('/upload', auth, authIsAdmin, upload)

router.post('/goodsList', verificationOfGoods, goodsList)

router.put('/updateGoods/:id', queryGoodsId, updateGoodsInfoById, updateGoods)

module.exports = router