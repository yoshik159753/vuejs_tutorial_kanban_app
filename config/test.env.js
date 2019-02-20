'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

// テスト環境: テスト環境向けの設定。開発環境の変数値をマージによって継承
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
