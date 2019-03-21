import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'api/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'api/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'api/user/userinfo',
    method: 'get',
    params: { token }
  })
}

