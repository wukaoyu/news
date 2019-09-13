import request from './helper.js'

export async function login(data = {}) {
    return request({
        url:'/users/login',
        method:'GET',
        ...data
      })
}