'use strict'
const webpack = require('webpack')
const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const TimeStamp = new Date().getTime()
module.exports = {
    publicPath: "./",
    devServer: {
        // proxy: {
        //     '/api': {
        //         // target: 'http://10.99.10.11', //接口
        //         target: 'http://www.ftchinese.com',
        //         changeOrigin: true, //允许跨域
        //         ws: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         },
        //         productionSourceMap:false //打包时不会生产.map文件,加快打包速度

        //     }
        // }
        proxy: 'https://api-cn-dhc-test.daimler.com',
        port: 8085
    }
}