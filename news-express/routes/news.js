const express = require('express');
const router = express.Router();
const { getAllNews, insertNews, getOneNew, updataNews, deleteNews } = require("../controller/news")
const { SuccessModel, ErrorModel } = require("../model/resModel")

// 获取新闻分页信息
router.post('/getNewsPage', (req, res ,next) => {
    const result = getAllNews();
    let lists=[],newArry=[],hasmore,total = 0
    const resultData = result.then(data => {
        if (data) {    
            let {current, pageSize} = req.body.data
            lists = data
            pageSize=parseInt(pageSize)
            current=(parseInt(current) - 1)*pageSize
            //.slice(start,end):start必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推
            newArry=lists.slice(current,current+pageSize)
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

// 添加新闻
router.post('/insertNews',(req,res,next) => {
    const { title, content, createby } = req.body.data
    const result = insertNews(title, content, createby);
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

// 得到单个新闻信息
router.post('/getOneNew',(req,res,next) => {
    const { id } = req.body.data
    const result = getOneNew(id);
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

// 修改新闻信息
router.post('/updataNews',(req,res,next) => {
    const { id, title, content } = req.body.data
    const result = updataNews(id, title, content);
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

// 删除新闻信息
router.post('/deleteNews',(req,res,next) => {
    const { id } = req.body.data
    const result = deleteNews(id);
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