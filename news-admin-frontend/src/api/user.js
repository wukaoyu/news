import request from './helper.js'

export async function login(data = {}) {
    return request({
        url:'/login-test',
        method:'GET',
        ...data
      })
}