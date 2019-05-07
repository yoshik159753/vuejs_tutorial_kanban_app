// 仕組み: Mocha がデフォルトで採用する BDD という考え方で、コードがどう振る舞うべきか規定している。

import { mount } from '@vue/test-utils'
import KbnButton from '@/components/atoms/KbnButton.vue'

// describe でテスト対象のカテゴライズ
describe('KbnButton', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      describe('デフォルト', () => {
        // it で個別のテスト対象の定義と振る舞うべきコメントを付与
        it('kbn-button クラスを持つ button 要素で構成されていること', () => {
          const button = mount(KbnButton)
          // expect でテスト対象に期待される振る舞いの定義
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button')

          // ここのブロックのテストを意訳すると次の通り。
          // 「KbnButton のプロパティの type の デフォルト は
          //   kbn-button クラスを持つ button 要素で構成されていること」
        })
      })

      describe('button', () => {
        it('kbn-button クラスを持つ button 要素で構成されていること', () => {
          const button = mount(KbnButton, {
            propsData: { type: 'button' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button')
        })
      })

      describe('text', () => {
        it('kbn-button-text クラスを持つ button 要素で構成されていること', () => {
          const button = mount(KbnButton, {
            propsData: { type: 'text' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button-text')
        })
      })
    })

    describe('disabled', () => {
      describe('デフォルト', () => {
        it('disabled 属性が付与されていないこと', () => {
          const button = mount(KbnButton)
          expect(button.attributes().disabled).to.be.an('undefined')
        })
      })

      describe('true', () => {
        it('disabled 属性が付与されていること', () => {
          const button = mount(KbnButton, {
            propsData: { disabled: true }
          })
          expect(button.attributes().disabled).to.equal('disabled')
        })
      })

      describe('false', () => {
        it('disabled 属性が付与されていないこと', () => {
          const button = mount(KbnButton)
          expect(button.attributes().disabled).to.be.an('undefined')
        })
      })
    })
  })

  describe('イベント', () => {
    describe('click', () => {
      it('発行されていること', () => {
        const button = mount(KbnButton)
        button.trigger('click')
        expect(button.emitted().click.length).to.equal(1)
      })
    })
  })

  describe('スロット', () => {
    describe('コンテンツ挿入あり', () => {
      it('挿入されていること', () => {
        const button = mount(KbnButton, {
          slots: { default: '<p>hello</p>' }
        })
        expect(button.text()).to.equal('hello')
      })
    })

    describe('コンテンツ挿入なし', () => {
      it('挿入されていないこと', () => {
        const button = mount(KbnButton)
        expect(button.text()).to.equal('')
      })
    })
  })
})
