const { exec } = require('../db/mysql')

const login = (username, password) => {
    let sql = `SELECT * FROM admins where username='${username}' and password='${password}'`
    return exec(sql).then(row => {
        return row[0] || {}
    })
}

const userLogin = (username, password) => {
    let sql = `SELECT * FROM users where username='${username}' and password='${password}'`
    return exec(sql).then(row => {
        return row[0] || {}
    })
}
// 获取所有用户
const getAllUsers = () => {
    let sql = `SELECT users.*,admins.username AS create_username FROM users
    LEFT JOIN admins ON users.createby = admins.id`
    return exec(sql).then(row => {
        return row || []
    })
}
//获取所有管理员
const getAllAdmins = () => {
    let sql = `SELECT * FROM admins`
    return exec(sql).then(row => {
        return row || []
    })
}
//删除用户
const deleteUser = (id) => {
    let sql = `DELETE FROM users WHERE id = '${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}

// 新增用户
const insertUser = (username, name, createId) => {
    let nowTime = new Date();
    let timeData = nowTime.getFullYear()+"-" + (nowTime.getMonth()+1) + "-" + nowTime.getDate() + " " + nowTime.getHours()+ ":" + nowTime.getMinutes() + ":" + nowTime.getSeconds();
    let sql = `INSERT INTO users(username,PASSWORD,NAME,createby,createtime) VALUES ('${username}','123456','${name}','${createId}','${timeData}')`
    return exec(sql).then(row => {
        return row || []
    })
}
//修改用户
const updataUser = (id, username, name) => {
    let sql = `UPDATE users SET NAME='${name}',  username='${username}' WHERE id='${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}



//删除用户
const deleteAdmin = (id) => {
    let sql = `DELETE FROM admins WHERE id = '${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}

// 新增管理员
const insertAdmin = (username, name, createname, city) => {
    let nowTime = new Date();
    console.log("username",username, "name",name, "createname",createname, "city",city)
    let timeData = nowTime.getFullYear()+"-" + (nowTime.getMonth()+1) + "-" + nowTime.getDate() + " " + nowTime.getHours()+ ":" + nowTime.getMinutes() + ":" + nowTime.getSeconds();
    let sql = `INSERT INTO admins(username,PASSWORD,NAME,createtime,city,createname) 
                          VALUES ('${username}','123456','${name}','${timeData}','${city}','${createname}')`
    return exec(sql).then(row => {
        return row || []
    })
}
//修改管理员
const updataAdmin = (id, username, name, city) => {
    let sql = `UPDATE admins SET NAME='${name}', username='${username}', city='${city}' WHERE id='${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}

//修改个人信息
const updataPerson = (id, name, city) => {
    let sql = `UPDATE admins SET NAME='${name}', city='${city}' WHERE id='${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}

//查询个人信息
const getPerson = (id) => {
    let sql = `select * from  admins  WHERE id='${id}'`
    return exec(sql).then(row => {
        return row || []
    })
}

module.exports = {
    login,
    userLogin,
    getAllUsers,
    getAllAdmins,
    deleteUser,
    insertUser,
    updataUser,
    deleteAdmin,
    insertAdmin,
    updataAdmin,
    updataPerson,
    getPerson
}