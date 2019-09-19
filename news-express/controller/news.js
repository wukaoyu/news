const { exec } = require('../db/mysql')


// 获取所有新闻
const getAllNews = () => {
    let sql = `SELECT newscontent.*,admins.username AS create_username FROM newscontent
    LEFT JOIN admins ON newscontent.createby = admins.id`
    return exec(sql).then(row => {
        return row || []
    })
}

// 添加新闻
const insertNews = (title, content, createby) => {
    let nowTime = new Date();
    let timeData = nowTime.getFullYear()+"-" + (nowTime.getMonth()+1) + "-" + nowTime.getDate() + " " + nowTime.getHours()+ ":" + nowTime.getMinutes() + ":" + nowTime.getSeconds();
    let sql = `INSERT INTO newscontent(NAME,content, createtime,createby) VALUES('${title}','${content}','${timeData}','${createby}')`
    return exec(sql).then(row => {
        return row || []
    })
}

// 查询单个新闻
const getOneNew = (id) => {
    let sql = `SELECT * FROM newscontent WHERE id = '${id}'`
    return exec(sql).then(row => {
        return row[0] || []
    })
}

// 修改新闻
const updataNews = (id, title, content) => {
    let sql = `UPDATE newscontent SET NAME='${title}', content='${content}' WHERE id='${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}

// 删除新闻
const deleteNews = (id) => {
    let sql = `DELETE FROM newscontent WHERE id = '${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}
module.exports = {
    getAllNews,
    insertNews,
    getOneNew,
    updataNews,
    deleteNews
}