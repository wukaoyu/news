import request from './helper.js'


// 获取新闻分页信息
export async function getNewsPage(data = {}) {
    return request({
      url:'/news/getNewsPage',
      method:'POST',
      data: data
    })
}

// 添加新闻
export async function insertNews(data = {}) {
    return request({
      url:'/news/insertNews',
      method:'POST',
      data: data
    })
}

// 添加新闻
export async function getOneNew(data = {}) {
    return request({
      url:'/news/getOneNew',
      method:'POST',
      data: data
    })
}

// 修改新闻
export async function updataNews(data = {}) {
    return request({
      url:'/news/updataNews',
      method:'POST',
      data: data
    })
}

// 删除新闻
export async function deleteNews(data = {}) {
    return request({
      url:'/news/deleteNews',
      method:'POST',
      data: data
    })
}