const env = process.env.NODE_ENV

//配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "7777",
        port: "3306",
        database: "news"
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "7777",
        port: "3306",
        database: "news"
    }
}

module.exports = { MYSQL_CONF }