var path = require('path');
var HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口文件，path.resolve()方法，可以结合我们给点的2个参数最后生成绝对路径
    //最终指向的就是我们的index.js文件   
    entry: {
        index:path.resolve(__dirname, '../app/index/index.js'),
        vendors:[
            'Vue'
        ]
    },
    //输出配置
    output: {
        //输出的路径就是当前项目下output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],//忽略后缀
        //vue2解决Failed to mount component: template or render function not defined. 
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    module: {
        //使用vue-loader 加载.vue结尾文件
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, 
        //编译es6
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },
        //加载图片,小于limit字节把图片转换为base64
        {
            test:/\.(png|jpg|gif|svg)$/,
            loader:'url',
            query:{
                limit:10000,
                name:'[name].[ext]?[hash:7]'
            }
        }
        
        ]
    },
    plugins: [
        //使用html-webpack-plugin插件自动引入js文件插件可以创建html文件，并自动将依赖写入html文件中
        new HtmlWebPackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, '../app/index/index.html'),
            inject: true
        })
    ]
}