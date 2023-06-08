const Goods = require('../model/goods_model')

// 添加商品
const addGoods = async (goodsInfo) => {
    const res = await Goods.create(goodsInfo)
    return res ? res.dataValues : null
}

// 根据id查询是否存在商品
const handleGoodsInfo = async (id) => {
    const res = await Goods.findOne({
        where: {
            id
        }
    })
    return res ? res.dataValues : null
}

// 根据id更改商品信息
const uodateGoodsInfoById = async (id, args) => {
    const res = await Goods.update(args, {
        where: {
            id
        }
    })
    return res
}

module.exports = {
    addGoods,
    handleGoodsInfo,
    uodateGoodsInfoById,
}