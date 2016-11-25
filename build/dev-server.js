
//使用 webpack-dev-middleware 搭建基本的开发环境当文件改变的时候，这个中间件不会再服务旧的包，你可以直接帅新浏览器就能看到最新的效果，这样你就不必等待构建的时间，所见即所得。
// 引入必要的模块
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.conf');
//创建一个express实例
var app = express();
//调用webpack并把配置传递过去
var compiler = webpack(config);
//使用webpack-dev-middleware中间件
var devMiddleware = require('webpack-dev-middleware')(compiler,{
    publicPath:config.output.publicPath,
    stats:{
        colors:true,
        chunks:false
    }
})

//使用webpack-hot-middleware 中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler);

//webpack插件，监听html文件改变事件
compiler.plugin('compilation',function (compilation) { 
    compilation.plugin('html-webpack-plugin-after-emit',function (data,cb) { 
        //发布事件
        hotMiddleware.publish({action:'reload'});
        cb();
     })
 })
//注册中间件
app.use(devMiddleware)
//注册热加载
app.use(hotMiddleware)
//监听 8888 端口，开启服务
app.listen(8888,function (err) { 
    if(err){
        console.log(err);
        return
    }
    console.log('listening at http://localhost:8888');
 })