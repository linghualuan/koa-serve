const path = require('path')
const { FileUploadFailure, FileFormatError, itemAdditionFailure } = require('../constant/err.type')
const { addGoods } = require('../service/goods_service')

// 上传商品图片
const upload = async (ctx) => {
    const { file } = ctx.request.files
    const fileType = ['image/jpeg', 'image/png']
    if(file) {
        if(!fileType.includes(file.mimetype)) {
            return ctx.app.emit('error', FileFormatError, ctx)
        }
        ctx.body = {
            code: 0,
            message: '上传文件成功',
            result: path.basename(file.filepath),
        }
    }else {
        return ctx.app.emit('error', FileUploadFailure, ctx)
    }
}

// 上传商品
const goodsList = async (ctx) => {
    const res = await addGoods(ctx.request.body)
    if(!res) {
        return ctx.app.emit('error', itemAdditionFailure, ctx)
    }
    ctx.body = {
        code: 0,
        message: '商品上传成功',
        result: '',
    }
}

// 根据id更改商品信息
const updateGoods = async (ctx) => {
    ctx.body = {
        code: '100401',
        message: '修改商品信息成功',
        result: '',
    }
}

module.exports = {
    upload,
    goodsList,
    updateGoods,
}