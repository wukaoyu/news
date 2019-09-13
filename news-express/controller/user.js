const { exec } = require('../db/mysql')

const login = () => {
    let sql = `SELECT * FROM users`
    return exec(sql).then(row => {
        return row[0] || {}
    })
}

module.exports = {
    login
}