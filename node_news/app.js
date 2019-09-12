const querystring = require("querystring")
const handUserRouter = require("./src/router/user");

const getPostData = (req) => {
    const promist = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve ({});
            return
        }
        if (req.header['content-type'] !== 'application/json') {
            resolve({});
            return
        }
        let postData = '';
        req.on('data',chunk => {
            postData += chunk
        })
        if (!postData) {
            resolve({});
            return
        }
        resolve(
            JSON.parse(postData)
        );
    })
    return promist
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json');

    //获取path
    const url = req.url;
    req.path = url.split("?")[0];

    // 解析query
    req.query = querystring.parse(url.split("?")[1]);

    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(";").forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split("=");
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })
    getPostData(req).then(postData => {
        req.body = postData;    
        const userResult = handUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                ) 
            })
            return
        }
        
        //没有路由，返回404
        res.writeHead(404,{"Content-type":"text/plain"});
        res.write("404 Not Found\n");
        res.end()
    })
}

module.exports = serverHandle