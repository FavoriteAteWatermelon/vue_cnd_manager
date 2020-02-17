import * as types from './mutation-types'
const mutations = {
  [types.SET_OPENED] (state, opened) {
    state.opened = opened
  },
  [types.SET_LOGIN] (state, isLogin) {
    state.isLogin = isLogin
  }
}
export default mutations
