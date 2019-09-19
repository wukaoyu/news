const express = require('express');
const router = express.Router();
const { login, getAllUsers, getAllAdmins, deleteUser, insertUser, updataUser, deleteAdmin, insertAdmin, updataAdmin, updataPerson, getPerson } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

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

// 获取所有用户信息
router.post('/getAllUsers',(req,res,next) => {
    // console.log(username)
    const result = getAllUsers();
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});

// 获取所有管理员信息
router.post('/getAllAdmins',(req,res,next) => {
    // console.log(username)
    const result = getAllAdmins();
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});

// 获取用户分页信息
router.post('/getUserPage', (req, res ,next) => {
    const result = getAllUsers();
    let lists=[],newArry=[],hasmore,total = 0
    const resultData = result.then(data => {
        if (data) {    
            let {current, pageSize} = req.body.data
            lists = data
            pageSize=parseInt(pageSize)
            current=(parseInt(current) - 1)*pageSize
            //.slice(start,end):start必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推
            newArry=lists.slice(current,current+pageSize)
            console.log(current,current+pageSize)
            hasmore=current+pageSize > lists.length ? false : true
            total = lists.length
            // console.log(newArry)
            return new SuccessModel(newArry)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.send({
            list: data,
            hasmore,
            total
        })
    })
})
 
// 删除用户
router.post('/deleteUser',(req,res,next) => {
    const { id } = req.body.data
    const result = deleteUser(id);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});
 
// 新增用户
router.post('/insertUser',(req,res,next) => {
    const { username, name, createId } = req.body.data
    const result = insertUser(username, name, createId);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});

// 修改用户
router.post('/updataUser',(req,res,next) => {
    const { username, name, id } = req.body.data
    const result = updataUser(id, username, name);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});

// 获取管理员分页信息

router.post('/getAdminPage', (req, res ,next) => {
    const result = getAllAdmins();
    let lists=[],newArry=[],hasmore,total = 0
    const resultData = result.then(data => {
        if (data) {    
            let {current, pageSize} = req.body.data
            lists = data
            pageSize=parseInt(pageSize)
            current=(parseInt(current) - 1)*pageSize
            //.slice(start,end):start必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推
            newArry=lists.slice(current,pageSize+pageSize)
            hasmore=current+pageSize > lists.length ? false : true
            total = lists.length
            // console.log(newArry)
            return new SuccessModel(newArry)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.send({
            list: data,
            hasmore,
            total
        })
    })
})
 
// 删除管理员
router.post('/deleteAdmin',(req,res,next) => {
    const { id } = req.body.data
    const result = deleteAdmin(id);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});
 
// 新增管理员
router.post('/insertAdmin',(req,res,next) => {
    const { username, name, createname, city } = req.body.data
    const result = insertAdmin(username, name, createname, city);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});
 
// 修改管理员
router.post('/updataAdmin',(req,res,next) => {
    const {id, username, name, city } = req.body.data
    const result = updataAdmin(id, username, name, city);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});
 
// 修改个人信息
router.post('/updataPerson',(req,res,next) => {
    const {id, name, city } = req.body.data
    const result = updataPerson(id, name, city);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});
 
// 查询个人信息
router.post('/getPerson',(req,res,next) => {
    const { id } = req.body.data
    const result = getPerson(id);
    const resultData = result.then(data => {
        if (data) {
            return new SuccessModel(data)
        }
        return new ErrorModel('异常错误')
    })
    resultData.then(data => {
        res.json(data)
    })
});
module.exports = router;