// サーバー本体となるファイル

// Node.js の require スタイルでインポート
const bodyParser = require('body-parser')

// `Express` アプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
  // HTTP リクエストの body の内容を JSON として解析するようミドルウェアをインストール
  app.use(bodyParser.json())

  // TODO : ここ以降に API の実装内容を追加していく
}