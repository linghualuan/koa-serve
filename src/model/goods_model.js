const { DataTypes } = require("sequelize")

const seq = require('../db/sq')

const Goods = seq.define('koa-goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goods_piece: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    goods_size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goods_color: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

// Goods.sync({ force: true })

module.exports = Goods