import request from './helper.js'

// 登录接口
export async function login(data = {}) {
    return request({
      url:'/users/login',
      method:'POST',
      data: data
    })
}

// // 根据个人信息获取天气
// export async function weather(data) {
//   return request({
//     url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(data)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
//     method:'POST',
//     data: data
//   })
// }

// 获取所有用户
export async function getAllUsers(data = {}) {
  return request({
    url:'/users/getAllUsers',
    method:'POST',
    data: data
  })
}

// 获取所有管理员
export async function getAllAdmins(data = {}) {
  return request({
    url:'/users/getAllAdmins',
    method:'POST',
    data: data
  })
}

// 获取用户分页信息
export async function getUserPage(data = {}) {
  return request({
    url:'/users/getUserPage',
    method:'POST',
    data: data
  })
}

// 删除用户
export async function deleteUser(data = {}) {
  return request({
    url:'/users/deleteUser',
    method:'POST',
    data: data
  })
}
// 新增用户
export async function insertUser(data = {}) {
  return request({
    url:'/users/insertUser',
    method:'POST',
    data: data
  })
}
// 修改用户
export async function updataUser(data = {}) {
  return request({
    url:'/users/updataUser',
    method:'POST',
    data: data
  })
}
// 得到管理员分页信息
export async function getAdminPage(data = {}) {
  return request({
    url:'/users/getAdminPage',
    method:'POST',
    data: data
  })
}

// 删除管理员
export async function deleteAdmin(data = {}) {
  return request({
    url:'/users/deleteAdmin',
    method:'POST',
    data: data
  })
}

// 新增管理员
export async function insertAdmin(data = {}) {
  return request({
    url:'/users/insertAdmin',
    method:'POST',
    data: data
  })
}

// 修改管理员
export async function updataAdmin(data = {}) {
  return request({
    url:'/users/updataAdmin',
    method:'POST',
    data: data
  })
}