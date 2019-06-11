// アクションが実装されたファイルを格納するファイル

/* eslint-disable no-unused-vars */
import * as types from './mutation-types'
import { Auth, List, Task } from '../api'
/* eslint-enable no-unused-vars */

export default {

  // 分割代入で各プロパティを個別に処理。
  // 分割代入は ES2015 以降の記法。

  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch(err => { throw err })
  },

  fetchLists: ({ commit }) => {
    // TODO:
    throw new Error('fetchLists action should be implemented')
  },

  addTask: ({ commit }) => {
    // TODO:
    throw new Error('addTask action should be implemented')
  },

  updateTask: ({ commit }) => {
    // TODO:
    throw new Error('updateTask action should be implemented')
  },

  removeTask: ({ commit }) => {
    // TODO:
    throw new Error('removeTask action should be implemented')
  },

  logout: ({ commit }) => {
    // TODO:
    throw new Error('logout action should be implemented')
  }
}
