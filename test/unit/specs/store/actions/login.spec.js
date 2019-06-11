// サポートページより修正 https://gihyo.jp/book/2018/978-4-297-10091-9/support
// import Vue from 'vue'
import * as types from '@/store/mutation-types'

// login アクション内の依存関係をモック化する
const mockLoginAction = login => {
  // inject-loader を使ってアクション内の依存関係をモック化するための注入関数を取得する
  const actionsInjector = require('inject-loader!@/store/actions')

  // 注入関数で Auth API モジュールをモック化する
  const actionsMocks = actionsInjector({
    '../api': {
      Auth: { login }
    }
  })

  return actionsMocks.default.login
}

describe('login アクション', () => {
  const address = 'foo@domain.com'
  const password = '12345678'
  let commit
  let future

  describe('Auth.login が成功', () => {
    const token = '1234567890abcdef'
    const userId = 1

    beforeEach(done => {
      const login = authInfo => Promise.resolve({ token, userId })
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // login アクションの実行
      future = action({ commit }, { address, password })
      // サポートページより修正 https://gihyo.jp/book/2018/978-4-297-10091-9/support
      // Vue.nextTick(done)
      future.then(() => done())
    })

    it('成功となること', () => {
      // commit が呼ばれているかチェック
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.login が失敗', () => {
    beforeEach(done => {
      const login = authInfo => Promise.reject(new Error('login failed'))
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // login アクションの実行
      future = action({ commit })
      // サポートページより修正 https://gihyo.jp/book/2018/978-4-297-10091-9/support
      // Vue.nextTick(done)
      future.catch(() => done())
    })

    it('失敗となること', done => {
      // commit が呼ばれていないかチェック
      expect(commit.called).to.equal(false)

      // エラーが投げられているかチェック
      future.catch(err => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })
})
