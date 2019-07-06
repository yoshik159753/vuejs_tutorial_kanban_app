import axios from 'axios'

// Auth API モジュールで利用する HTTP クライアントをモック化
const mockAuth = adapter => {
  const injector = require('inject-loader!@/api/auth')
  const clientMock = injector({
    './client': axios.create({ adapter })
  })
  // !!!typo!!! defalut => default
  return clientMock.default
}

describe('Auth API モジュール', () => {
  describe('login', () => {
    const token = '1234567890abcdef'
    const userId = 1
    const address = 'foo@domain.com'
    const password = '12345678'

    describe('成功', () => {
      it('token、userId が取得できること', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({ data: { token, userId }, status: 200 })
          })
        }

        const auth = mockAuth(adapter)
        auth.login({ address, password })
          .then(res => {
            expect(res.token).to.equal(token)
            expect(res.userId).to.equal(userId)
          })
          .then(done)
      })
    })

    describe('失敗', () => {
      it('エラーメッセージを取得できること', done => {
        const message = 'failed login'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = { data: { message }, status: 401 }
            reject(err)
          })
        }

        const auth = mockAuth(adapter)
        auth.login({ address, password })
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
