const express = require('express');
const router = express.Router();
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
 


//获取数据接口
router.get('/login',(req,res,next) => {
    const result = login();
    const resultData = result.then(data => {
        if (data.username) {
            //存入cookie
            // res.setHeader("Set-Cookie", `name=${data.name};path=/; httpOnly; expires=${getCookieTime()}`);
            return new SuccessModel(data)
        }
        return new ErrorModel('登录失败')
    })
    resultData.then(data => {
        res.json(data)
    })
});
 
module.exports = router;