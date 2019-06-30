// サーバー本体となるファイル

// Node.js の require スタイルでインポート
const bodyParser = require('body-parser')

// `Express` アプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
  // HTTP リクエストの body の内容を JSON として解析するようミドルウェアをインストール
  app.use(bodyParser.json())

  // ユーザー情報
  const users = {
    'foo@domain.com': {
      password: '12345678',
      userId: 1,
      token: '1234567890abcdef'
    }
  }

  // ログイン API のエンドポイント '/auth/login'
  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]
    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: 'ログインに失敗しました。' })
      } else {
        res.json({ userId: user.userid, token: user.token })
      }
    } else {
      res.status(404).json({ message: 'ユーザーが登録されていません。' })
    }
  })
}
