const express = require('express');
const router = express.Router();
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
 
const getCookieTime = () => {
  let d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  return d.toGMTString();
}

//获取数据接口
router.post('/login',(req,res,next) => {
    const {username, password} = req.body.data
    // console.log(username)
    const result = login(username,password);
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