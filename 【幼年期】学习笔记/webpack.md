## 1、webpack初识

### weboack静态模块打包工具

- 特点： 模块、打包（pack具有打包的意思，也引申出包裹模块的含义）

- 模块： 处理以来关系，不再考虑JS文件的先后顺序与依赖关系

  ​			CSS、图片、JSON等等都可以在webpack中当作模块使用

- 打包： 对 资源处理，将其打包成一个包或者多个包。

  打包的过程中，可以压缩图片、将scss转为css、将es6转为es5、将typeScript转为JavaScript

### 与grunt/gulp的区别

1. grunt/gulp强调是自动化，当我们配置好一系列的task处理业务后（ES6、ts转换、图片压缩、scss转换等）
2. 适合模块依赖简单的时候，仅需要简单的合并、压缩

![image-20200423230701612](C:\Users\淼淼淼淼呀\AppData\Roaming\Typora\typora-user-images\image-20200423230701612.png)

### 总结：

- grunt/gulp更加强调的是前端流程的自动化，模块化不是它的核心
- pwebpack更加强调模块化开发管理，而文件压缩合并、预处理等功能，是他附带的功能。

注意！可以这么说 webpack更加强大，其主要功能是模块化开发，但携带着gurnt/gulp的合并、压缩功能！

## 2、webpack初用

1. node环境 node -v

2. 全局、局部都安装下 webpack，全局可以通过webpack -v查看

   终端直接执行 便是调用webpack的全局，当package.json有scripts对应命令时则使用局部

3. 搭建文件目录

   ① src 源代码  ② dist 打包后文件 ③ src中的js应为index.js，我们通过index.js作为入口JS文件

4. ```json
   在npm包管理下的文件下，写好dev与build命令
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "dev": "webpack --mode development",
       "build": "webpack --mode production"
     },
   ```

5. 执行 cnpm run dev 将自动把我们src下的index.js打包至 dist下的 bundle.js文件

   到时候我们的html文件引用这个 Bundle.js就可以实现 我们的依赖合并了！

```js
使用CommonJS的语法进行导入导出				|		使用ES6的语法进行到处
//--------------------------------------------------
exported.js			注意： 这两种语法不可以同时出现在同一个JS文件中
	function add(num1, num2) {			|		export const v1 = "999";
		return num1 + num2				|		export const v2 = "888";
	}									|
	function sub(num1, num2) {			|
		return num1 - num2				|
	}									|
	module.exports { add, sub }			|
//-------------------------------------------------------------
index.js								|		import { v1,v2 } from './math.js'
	const math = require('./exported.js')
    console.log(math.add(200,100))
	console.log(math.sub(200,100))
```

### webpack.config.js

这个path由node_module而来的，所以我们需要安装包

npm init 生成 package.json

```js
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

## 3、webpack拓展使用（CSS、图片）

- ./node_modules/webpack 才可以使用本地的webpack

- 无论位于何处，终端下执行 webpack永远是全局。

- 我们使用scripts 脚本命令，npm run dev 才是运行的局部webpack

  npm run XXX ,而这个XXX正是 ./node_moudle/XXX 我们下载的本地！！！

1. webpack本身处理JS相关的依赖，但涉及到css、静态资源怎么办？使用拓展的loader！
2. 我们src目录下的main.js不仅是js文件的入口，也是css文件的引入入口，最后都在bundle.js中

```js
// 在 main.js下，
require('./css/normal.css')  其需要 css-loader进行加载css，也需要style-loader将其添加DOM上。

具体webpack配置官网很清楚
注意下，其 reules里的 加载顺序应该从右至左，所以 css-loader应该在style-loader的右边
------------------------------

less-loader 加载less， less 负责将less转换为css
```





1. 当我们想要加载图片的时候，其引用应为 img url ="XXX"，url也是一种依赖关系，需要依赖外部模块。

2. 故 需要 url-loader，在url-loader中有limit

3. 小于limit该图片被自动转换为base64的字符串，当大于limit的时候则为被视为一个图片文件

   ```
   url-loader 
   file-loader => 会经过打包在dist下生成一个文件，到时候url引用它
   			=> 但因为源路径与dist路径下不同，故依旧无法显示图片
   			故我们需要在webpackconfig.js添加 publicPath: '../dist/'
   		
   output: {
   	path: path.resolve(__dirname, 'dist'),
   	filenmae: 'bunlde.js'
   	publicPath: 'dist/'
   	name: 'img/[name.hash:8].[ext]'
   }
   ```

   ![image-20200424124648204](C:\Users\淼淼淼淼呀\AppData\Roaming\Typora\typora-user-images\image-20200424124648204.png)