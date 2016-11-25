var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

//引入配置
var config = require('./webpack.config');

config.vue = {
    loaders:{
        css:ExtractTextPlugin.extract("css")
    }
};


config.plugins = [


    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:'"production"'
        }
    }),

    //压缩代码

    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings:false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),

    //公共模块提取
    new webpack.optimize.CommonsChunkPlugin({
        name:'vendors',
        filename:'vendors.js',
    }),




    //提取CSS为单文件
    new ExtractTextPlugin("../[name].[contenthash].css"),
    new HtmlWebpackPlugin({
        filename:'../index.html',
        template:path.resolve(__dirname,'../app/index/index.html'),
        inject:true
    })
];


module.exports = config;