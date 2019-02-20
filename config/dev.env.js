'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 開発環境: 開発向けの設定。本番環境の変数値をマージによって継承
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true            // `true` で上書き
})
