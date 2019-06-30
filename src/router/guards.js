import store from '../store'

// ナビゲーションガードの関連の実装

export const authorizeToken = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth || !store.state.auth.token) {
      // マッチしたルートにおいて、メタフィールドに `requiresAuth` が付与されている場合は
      // ログインした際に付与される認証トークンがあるかどうかチェックする
      // 注意：
      // このアプリケーションでは簡略化のため `auth.token` があるかどうかのみで
      // ログイン済みであるかどうかチェックしているが、
      // 本来ならば付与された認証トークンをバックエンドの API 経由などで検証するべき
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
}
