import request from '../utils/request'

export async function login(username, password) { 
  return request({
    url: `/jiema/yinsu/login.php?username=${username}&password=${password}`,
    method: 'get'
  })
}