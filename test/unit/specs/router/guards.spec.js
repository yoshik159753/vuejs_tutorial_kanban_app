import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// App コンポーネント
const App = {
  name: 'app',
  render: h => h('router-view')
}

// Top コンポーネント
const Top = {
  name: 'top',
  render: h => h('p', ['top'])
}

// Login コンポーネント
const Login = {
  name: 'login',
  render: h => h('p', ['login'])
}

// ナビゲーションガードを実装するファイル内で依存する Vuex Store をモック化するヘルパー関数
const mockAuthorizeToken = store => {
  const injector = require('inject-loader!@/router/guards')
  const storeMock = injector({
    '../store': store
  })
  return storeMock.authorizeToken
}

// Vue アプリケーションをセットアップするヘルパー関数
const setup = state => {
  // Vuex ストアを設定
  const store = new Vuex.Store({ state })

  // Vue Router の設定
  const router = new VueRouter({
    routes: [{
      path: '/',
      component: Top,
      meta: { requiresAuth: true }
    }, {
      path: '/login',
      component: Login
    }]
  })

  // ナビゲーションガードである authorizeToken フックをインストール
  router.beforeEach(mockAuthorizeToken(store))

  // App でマウントしてラッパーを返す
  return mount(App, {
    localVue,
    store,
    router
  })
}

// ローカルな Vue コンストラクタを作成
const localVue = createLocalVue()

// ローカルな Vue コンストラクタに Vue Router と Vuex をインストール
localVue.use(VueRouter)
localVue.use(Vuex)

describe('beforeEach ガードフック', () => {
  describe('認証トークンあり', () => {
    it('そのまま解決すること', () => {
      const app = setup({
        auth: {
          token: '1234567890abcdef',
          userId: 1
        }
      })
      expect(app.text()).to.equal('top')
    })
  })

  describe('認証トークンなし', () => {
    it('/login にリダイレクトして解決すること', () => {
      const app = setup({})
      expect(app.text()).to.equal('login')
    })
  })
})
