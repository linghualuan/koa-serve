const Joi = require('joi')
const { handleGoodsInfo, uodateGoodsInfoById } = require('../service/goods_service')
const { InvalidItemId, failToUpdateGoodsInfo } = require('../constant/err.type')

// 验证商品参数
const verificationOfGoods = async (ctx, next) => {
    const { goods_name, goods_piece, goods_color, goods_size } = ctx.request.body
    const schema = Joi.object({
        goods_name: Joi.string().required(),
        goods_piece: Joi.number().required(),
        goods_color: Joi.string().required(),
        goods_size: Joi.number().required(),
    })

    const { error } = schema.validate({ goods_name, goods_piece, goods_color, goods_size })

    if(error) {
        return ctx.body = {
            code: '10204',
            message: error.message,
            result: '',
        }
    }
    await next()
}

// 根据商品id查询商品是否存在
const queryGoodsId = async (ctx, next) => {
    const res = await handleGoodsInfo(ctx.params.id)
    if(!res) {
        return ctx.app.emit('error', InvalidItemId, ctx)
    }
    ctx.state.id = ctx.params.id
    await next()
}

// 根据id更改商品信息
const updateGoodsInfoById = async (ctx, next) => {
    const res = await uodateGoodsInfoById(ctx.state.id, ctx.request.body)
    if(res[0] !== 1) {
        return ctx.app.emit('error', failToUpdateGoodsInfo, ctx)
    }
    await next()
}

module.exports = {
    verificationOfGoods,
    queryGoodsId,
    updateGoodsInfoById,
}