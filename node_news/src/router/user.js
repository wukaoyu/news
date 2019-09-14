const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handUserRouter = (req, res) => {
    const method = req.method;
    
    
    // 登录接口
    if(method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                //存入cookie
                res.setHeader("Set-Cookie", `name=${data.name};path=/; httpOnly; expires=${getCookieTime()}`);
                return new SuccessModel(data)
            }
            return new ErrorModel('登录失败')
        })
    }

    //登录验证测试
    if(method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.name) {
            return Promise.resolve(new SuccessModel({
                name:req.cookie.name
            }))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handUserRouter