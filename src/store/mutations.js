// ミューテーションの実装となるファイル

import * as types from './mutation-types'

export default {

  // 算出プロパティ名と短縮メソッド名を活用した宣言
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Object_initializer
  // 算出プロパティ名 : 括弧 []の中に式を記述でき、それが計算されてプロパティ名として使用されます。
  // 短縮メソッド名 : キーワード "function" はもはや必要ではありません。

  [types.AUTH_LOGIN] (state, payload) {
    // TODO:
    throw new Error('AUTH_LOGIN mutation should be implemented')
  },

  [types.FETCH_ALL_TASKLIST] (state, payload) {
    // TODO:
    throw new Error('FETCH_ALL_TASKLIST mutation should be implemented')
  },

  [types.ADD_TASK] (state, payload) {
    // TODO:
    throw new Error('ADD_TASK mutation should be implemented')
  },

  [types.UPDATE_TASK] (state, payload) {
    // TODO:
    throw new Error('UPDATE_TASK mutation should be implemented')
  },

  [types.REMOVE_TASK] (state, payload) {
    // TODO:
    throw new Error('REMOVE_TASK mutation should be implemented')
  },

  [types.AUTH_LOGOUT] (state) {
    // TODO:
    throw new Error('AUTH_LOGOUT mutation should be implemented')
  }
}
