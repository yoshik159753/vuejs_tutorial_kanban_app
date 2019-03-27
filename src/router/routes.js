// '@' は webpack の alias 機能。'@' と src がマッピングされている。
// '../../src/components/templates/...' というように相対パス指定も可。
// 配下のファイルは相対パス指定で、配下にいないファイルは '@' 指定、という切り分け(?)
import KbnBoardView from '@/components/templates/KbnBoardView.vue'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'
import KbnTaskDetailModal from '@/components/templates/KbnTaskDetailModal.vue'

export default [{
  path: '/',
  component: KbnBoardView,
  // meta はルートメタフィールドの定義。
  // Vue Router においてログインしているかどうかチェックを行う。
  meta: { requiresAuth: true }
}, {
  path: '/login',
  component: KbnLoginView
}, {
  path: '/tasks/:id',
  component: KbnTaskDetailModal,
  meta: { requiresAuth: true }
}, {
  path: '*',
  redirect: '/'
}]
