import { mount, createLocalVue } from '@vue/test-utils'
// ??? { Vuex } のように波括弧があるとエラーになる。どういうこと？メソッド扱いになる？ ???
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

// ローカルな Vue コンストラクタを作成
const localVue = createLocalVue()

// ローカルな Vue コンストラクタに Vuex をインストール
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // `KbnLoginForm` コンポーネントのログインボタンのクリックをトリガーする **ヘルパー関数**
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // KbnLoginForm コンポーネントのスタブの設定
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    // Vue Router のモック設定
    $router = {
      push: sinon.spy()
    }

    // login アクションの動作確認のための Vuex 周りの設定
    actions = {
      login: sinon.stub() // login アクションのモック
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView
    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページのルートにリダイレクトすること', done => {
        // login アクションを成功とする
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // プロセスのフラッシュ
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject') // spy でラップ
      })

      afterEach(() => {
        loginView.vm.throwReject.restore() // spy のラップ解除
      })

      it('エラー処理が呼び出されること', done => {
        // login アクションを失敗とする
        const message = 'login faild'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // プロセスのフラッシュ
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
