import {ADD_ONE_BOARD_API, DELETE_ONE_BOARD_API, UPDATE_ONE_BOARD_API, ALL_BOARD_DATA_API} from './config'
import {SERVER_HOST} from '@/config/host'
import http from '@/utils/request'

// 查询AOI数据接口
export function getAoiData () {
  return new Promise((resolve, reject) => {
    http.get(SERVER_HOST + ALL_BOARD_DATA_API).then(res => {
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

// 增加一个主板数据
export function addBoardInfo (boardInfo) {
  return new Promise((resolve, reject) => {
    http.post(SERVER_HOST + ADD_ONE_BOARD_API, boardInfo).then(res => {
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}
// 修改一个主板数据
export function updateBoardInfo (boardInfo) {
  return new Promise((resolve, reject) => {
    http.post(SERVER_HOST + UPDATE_ONE_BOARD_API, boardInfo).then(res => {
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

// 删除一个主板数据
export function deleteBoardInfo (idObj) {
  return new Promise((resolve, reject) => {
    http.post(SERVER_HOST + DELETE_ONE_BOARD_API, idObj).then(res => {
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}
