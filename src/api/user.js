import { USER_LOGIN_API } from './config'
import { SERVER_HOST } from '@/config/host'
import http from '@/utils/request'
// 用户登录接口
export function userLogin (userInfo) {
  return new Promise((resolve, reject) => {
    http.post(SERVER_HOST + USER_LOGIN_API, userInfo).then(res => {
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}
