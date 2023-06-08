module.exports = (err, ctx) => {
    let status = 500
    switch(err.code) {
        case '10001':
            status = 200
            break
        case '10002':
            status = 200
            break
        case '10003':
            status = 200
            break
        case '10004':
            status = 200
            break
        case '10005':
            status = 200
            break
        case '10006':
            status = 200
            break
        case '10101':
            status = 200
            break
        case '10102':
            status = 401
            break
        case '10103':
            status = 401
            break
        case '10104':
            status = 401
            break
        default:
            status = 500
    }
    ctx.status = status
    ctx.body = err
}