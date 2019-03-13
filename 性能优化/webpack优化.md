###  开始

介绍一个插件 speed-measure-webpack-plugin 可以直观的看到那些环节打包用来多少时间

开发环境和生产 都可以看到



```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

// 把配置项传进去
module.exports = smp.wrap(config);
```



 

![speed](/Users/syolmm/Desktop/speed.png)





#### 2 webpack-bundle-analyzer 可视化打包 看看有什么东西被打包进去了



```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    plugins: [
        // 可以添加端口号 具体的配置查看 npm相关文档
        new BundleAnalyzerPlugin({ analyzerPort: 8888 }),
    ]
};
```





#### 3 优化 提取css



​	只能在webpack4 

* 提取的css其实是没有压缩的，所以需要使用插件来压缩 optimize-css-assets-webpack-plugin 



```javascript
// webpack.prod.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[id].[contenthash].css'
        })
    ],
    module: {
        rules: [
          {
            test: /\.(le|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          },
        ]
      },
};
```



#### 4 DLL 和 DLLReferencePlugin

根据上面的图我们可以看到体积大的是被react 全家桶和babel占用了。现在单独放在一个js中。

将模块预先编译，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存，而不是去编译这些模块(webpack的内置插件)

[DllReferencePlugin](https://link.juejin.im/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23dllreferenceplugin)

将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块(webpack的内置插件)



```javascript
const path = require('path');
const webpack = require('webpack');
const CleanWebpaclPlugin = require('clean-webpack-plugin');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        // 将 lodash 模块作为入口编译成动态链接库
        vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux']
    },
    output: {
        // 指定生成文件所在目录
        // 由于每次打包生产环境时会清空 dist 文件夹，因此这里我将它们存放在了 public 文件夹下
        path: path.resolve(__dirname, 'public/vendor'),
        // 指定文件名
        filename: '[name].dll.js',
        // 存放动态链接库的全局变量名称，例如对应 vendor 来说就是 vendor_dll_lib        // 这个名称需要与 DllPlugin 插件中的 name 属性值对应起来
        // 之所以在前面 _dll_lib 是为了防止全局变量冲突
        library: '[name]_dll_lib'
    },
    plugins: [
        new CleanWebpaclPlugin(['vendor'], {
            root: path.resolve(__dirname, 'public')
        }),
        new FirendlyErrorePlugin(),                // 接入 DllPlugin
        new webpack.DllPlugin({
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            // 由于每次打包生产环境时会清空 dist 文件夹，因此这里我将它们存放在了 public 文件夹下
            path: path.join(__dirname, 'public', 'vendor', '[name].manifest.json'),
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            // 例如 vendor.manifest.json 中就有 "name": "vendor_dll_lib"            name: '[name]_dll_lib'
        })
    ],
    performance: {
        // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
        hints: "warning",        // 开发环境设置较大防止警告
        // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
        maxEntrypointSize: 5000000,         // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000
    }}
```





#### 5 babel/polyfill

babel也占据了一大部分 Babel/polyfill 按需加载  "useBuiltIns": "usage" 兼容IE11以上

* 提取babel

#### 6 splitChunks

https://www.webpackjs.com/plugins/split-chunks-plugin/

