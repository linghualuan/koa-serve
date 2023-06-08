module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
    },
    userAlreadyExited: {
        code: '10002',
        message: '用户已经存在',
        result: '',
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: '',
    },
    userNotExit: {
        code: '10004',
        message: '用户不存在',
        result: '',
    },
    userLoginFail: {
        code: '10005',
        message: '登录失败，请重试',
        result: '',
    },
    passwordError: {
        code: '10006',
        message: '密码错误',
        result: '',
    },

    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: '',
    },
    jsonWebTokenError: {
        code: '10102',
        message: '无效的token',
        result: '',
    },
    oldPasswordCannotEmpty: {
        code: '10103',
        message: '旧密码不能为空',
        result: '',
    },
    newPasswordCannotEmpty: {
        code: '10104',
        messge: '新密码不能为空',
        result: '',
    },
    oldPasswordError: {
        code: '10105',
        message: '旧密码错误',
        result: '',
    },
    oldCannotBeSameNew: {
        code: '10106',
        message: '新密码不能和旧密码相同',
        result: '',
    },
    hasNoAdminAuthority: {
        code: '10201',
        message: '您没有管理员权限',
        result: '',
    },
    FileUploadFailure: {
        code: '10202',
        message: '文件上传失败，请重试',
        result: '',
    },
    FileFormatError: {
        code: '10203',
        message: '文件格式错误',
        result: '',
    },

    itemAdditionFailure: {
        code: '10301',
        message: '商品上传失败',
        result: '',
    },
    InvalidItemId: {
        code: '10401',
        message: '无效的商品id',
        result: '',
    },
    failToUpdateGoodsInfo: {
        code: '10402',
        message: '修改商品失败，请重试',
        result: '',
    }
}