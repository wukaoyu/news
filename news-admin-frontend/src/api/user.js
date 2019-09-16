import request from './helper.js'

// 登录接口
export async function login(data = {}) {
    return request({
      url:'/users/login',
      method:'POST',
      data: data
    })
}

// 根据个人信息获取天气
export async function weather(data) {
  return request({
    url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(data)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
    method:'POST',
    data: data
  })
}