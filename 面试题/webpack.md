> 极客时间程柳锋老师的「玩转 webpack」课程
>
> https://github.com/Cosen95/blog/issues/48

### 1 常见 loader 和 plugin

- 常见loader

  1. 样式：style-loader、css-loader、less-loader、sass-loader等

     - post-css： 根据browserlist，解决css在不同浏览器的兼容
     - postcss-preset-env： 解决CSS新特性兼容问题

  2. 文件：

     raw-loader （文件原始内容）

     file-loader (文件夹中，再以相对引用)

     url-loader

  3. 编译：babel-loader、、ts-loader等

  4. 校验测试: eslint-loader等

- 常见plugin

  1. webpack内置`UglifyJsPlugin` 压缩和混淆代码
  2. webpack内置`CommonsChunkPlugin`，提高打包效率，将第三方库和业务代码分开打包
  3. `html-webpack-plugin`可以根据模板自动生成html代码，并自动引用css和js文件
  4. `DefinePlugin` 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
  5. `HotModuleReplacementPlugin` 热更新
  6. `CleanWebpackPlugin` 自动删除打包资源
  7. ignore-plugin 忽略部分文件
  8. mini-css-extract-plugin 分离样式文件

### 2 为什么loader是反向的？

函数组合编程。

有两种函数组合的方式，一种是pipe，另一种是compose。前者从左向右组合函数，后者方向相反。

Webpack选择了compose方式，而不是pipe的方式而已，在技术上实现从左往右也不会有难度

### 3 若postcss打包less的时候 @import的时候要注意什么？

- 按理应该 less-css-loader => post-css-loader => css-loader => style-loader

⭐`@import 的语法是在 js中的（此时负责的模块为 css - loader ）`，

- 故此时 css-loader => style-loader， 不会被解析， 你应该设

  ```js
   {
              loader: "css-loader",
              options: {
                importLoaders: 2 // 回调两层 即 less -> post -> css
              }
            },
  ```

### 4 处理文件的loader有哪几种？

1.  file-loader 
2.  url-loader
    - 通过limit设置 url-loader 将较小的文件转为` base64 的URL`
3.  webpack5 提供资源模块可以更快速

### 5 loader与plugin

1. loader用于转换模块类型，本质是就是函数、翻译官，并返回对应结果。

2. 插件目的在于解决 [loader](https://webpack.docschina.org/concepts/loaders) 无法实现的**其他事**、拓展webpack功能

3. Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

   让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，

   Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

### 文件指纹

文件指纹是打包后输出的文件名的后缀。

1. Hash

   只要项目文件有修改，整个项目构建的 hash 值就会更改

2. Chunkhash

    Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash

3. Contenthash

   根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

- JS的文件指纹

  ```js
  output: {
          filename: '[name][chunkhash:8].js',
          path:__dirname + '/dist'
  }
  ```

-  css的文件指纹

  设置 MiniCssExtractPlugin 的 filename，使用 contenthash

  ```js
      plugins:[
          new MiniCssExtractPlugin({
              filename: `[name][contenthash:8].css`
          })
      ]
  ```

- 图片的文件指纹

  ````js
  rules:[{            
      test:/\.(png|svg|jpg|gif)$/,            
      use:[{                
       	loader:'file-loader',                
          options:{                    
              name:'img/[name][hash:8].[ext]'                
          }            
      }]        
  }]
  ````

### 文件监听原理

- 开启文件监听

  1. 启动 webpack 命令时，带上 --watch 参数
  2. 在配置 webpack.config.js 中设置 watch:true

- 作用

  在发现源码发生变化时，自动重新构建出新的输出文件。

- 原理

  轮询判断文件的最后编辑时间是否变化， 若变化则重新构建。

  其并不会自动的 【增量更新】， 而是需要手动刷新页面。

### 热更新原理

Hot Module Replacement 也可以叫做热替换，对应也有这样的插件

- 核心

  客户端 从 【服务器端】拉取更新后的文件。

1. 本地资源变化， WDS（**webpack-dev-server**）检测到，故会向浏览器推送更新，并带上构建时的hash，以此让客户端与上一次的资源进行对比。
2. 客户端对比差异后，会向WDS发起请求以获取要更改的内容。
3. 后续拿到的【增量更新】的具体处理由【HotModulePlugin】来处理。略。

### babel原理

1. 解析 以生成 AST

   词法分析 + 语法分析

2. 转换

   将AST的节点变更为新的AST

3. 生成

   以新的AST为基础生成代码。

### 优化webpack构建速度

这真的很广很广

1. 压缩代码的速度提升

   - 多线程。

     压缩代码转换AST，但我们可以开启多线程的压缩代码。我们使用并行的方案。

     如 一些压缩插件的开启 parallel参数。

   - 开启缓存。 new ParallelUglifyPlugin() 实例化时，你可以

     `cacheDir`：缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回

     1. babel-loader 开启缓存
     2. terser-webpack-plugin 开启缓存

2. 忽略一些不需要打包的文件

   - exclude、include
   - noParse 
   - IgnorePlugin 

3. TreeShaking

   打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的bundle中去掉.

   但这需要你开发中尽可能使用ES6 Module的模块。

4. 使用 `DllPlugin` 将更改不频繁的代码进行单独编译。这将改善引用程序的编译速度，即使它增加了构建过程的复杂性。

5. 保证webpack的版更新。

6. 减少resolve参数中对文件进行的判断处理，如extensions后缀尝试。

7. 更多的性能优化，请参考官方的webpack构建速度提升

### webpack的作用

1. 模块打包
   - 模块转换
   - 依赖关系树
2. 编译兼容 （loader）
   - polyfill： 新语法新特性的实现
   - 浏览器兼容
3. 能力拓展 （plugin）
   - 如按需加载
   - 如代码压缩



### 模块打包的原理

webpack是如何这些模块合并到一起的？那你应该先了解打包的流程。

https://zhuanlan.zhihu.com/p/363928061

- 原理

  1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler

  2. 编译

     - 从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容

     - 并且会找寻其依赖模块、递归遍历分析，以形成依赖树 

       （ 找到该 Module 依赖的 Module、递归地进行编译处理）

     - 过程中，webpack会【发布订阅】，以此达到【hooks】，从而让【plugin】监听关键的事件节点，让其插件任务执行，以达到能力拓展。

  3. 输出

     将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

- compiler对象

  是全局单例，把控webpack打包的构建流程。

- 【compilation】是每一次构建上下文对象，它包含了本次构建的所有信息。而每次【热更新、重新部署】又会生成新的【compilation】，以负责更新构建过程。



### 代码分割

> 均衡乱中求.
>
> 【源代码直接上线】的场景、【打包成唯一脚本min.bundle.js】这两种【乱】的方案中所取的【均衡】

目的： **用可接受的服务器性能压力增加来换取更好的用户体验**

### sourcemap

它是生产代码（编译压缩、打包后的代码）映射回源代码的技术。

浏览器必须支持 sourcemap技术： 浏览器就会通过`sourceURL`去获取这份映射文件。。

