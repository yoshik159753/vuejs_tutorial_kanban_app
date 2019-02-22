import Vue from 'vue'
import 'es6-promise/auto' // プロミスをポリフィルする
import App from './App'
import router from './router'
import store from './store' // Vuex のストアインスタンスをインポート

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // インポートしたストアインスタンスを `store` オプションとして指定
  render: h => h(App)
})
