webpack： 静态模块打包工具

模块：独立开发

打包： es6 转为es5

gulp是一种前端自动化任务工具，但不适合使用模块化开发，只适合于简单的依赖，强调的是自动化

模块化开发我们需要使用**Webpack**，附带各种模块化开发。

- webpack模块化 依赖   node环境
- node环境依赖 npm环境（node packages manager



## 一、webpack的安装

### 1、安装Node.js

- node -v 查看node版本，Node.js自带了管理工具npm
- npm install webpack@3.6.0 -g全局安装webpack
- webpack --version
- 后续我们可能会使用局部安装，即--save -dev是开发时候的依赖，项目打包以后不能继续使用



### 2、初步使用打包webpack

2.1 --将main.js的文件（及其依赖的包） 打包到 dist下命名为bundle.js

dist为distribution意为发布，故存放打包后

src存放源码

```js
webpack ./src/main.js ./dist/bundle.js
```

### 3、Webpack的智能化

需求： cmd中直接输入 webpack直接自动执行打包

**webpack.config.js**

```js
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
}
```

↑这样是不成功的，因为要求path是一个绝对的路径，所以我们可以动态的获得这个绝对路径，

我们在这里需要引用path这个包，但引用这个包就需要用到了node

```js
const path = require('path')
```

#### 3,.1使用node,进行初始化！

```js
npm init
---------
 
package name: (10_webpack) firstweb
version: (1.0.0)
description:
entry point: (webpack.config.js) index.js
test command:
git repository:
keywords:
author: 
license: (ISC)
About to write to D:\WEB Study\workspace\10_webpack\package.json:
```

```js
// 去node里的path包里找
这样写，就可以直接 cmd里敲 webpack便自动打包了
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  }
}
```



#### 3.2 npm run XXX

在package.json中有这样的一段代码，我们在运行npm run test 的时候会自动执行对应的内容

我们使用 npm run build 就相当于 执行了webpack

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

#### 3.3 全局与局部

- webpack优先执行本地的，除了全局安装webpack以外，局部也需要安装webpack，为了项目的兼容，防止项目webpack版本不一致
- npm install webpack@3.6.0 --save-def 执行这个命令安装本地webpack
- --save-def让其打包以后删除对应无效文件
- 对应的package.json会出现这样的内容，这是我们开发时候的依赖

```json
  "devDependencies": {
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11"
  }
```

注意：只要在终端上 敲 webpack ，会执行全局的webpack

但我们想使用局部的webpack，故我们应使用 npm run build 这个我们之前的脚本命令

### 3.4 webpack拓展插件 loader

若是不知道如何使用，去webpack官网上查阅便好

- 步骤一： 通过npm安装需要使用的loader
- 步骤二：在webpack.config.js中的moudule下的关键字进行配置其规则

## 二、我的第一次使用webpack打包

### 1、第一步 npm init

因为是模块化开发肯定需要package.json！故我们先npm init

### 2、依赖文件与main入口文件

这是sum.js文件，是我们入口函数需要依赖的文件

```js
function add (a, b){
  return a+b
}
function sub (a, b){
  return a-b
}
module.exports = {
  add,
  sub
}
```

这是man.js文件，即入口函数，在这里我们将sum.js来引用进来

```js
// main是一个入口函数
const { add, sub } = require('../js/sum.js') // CommonJS的语法
import { add,sub } from "../js/sum.js"
console.log( add(20,30))
console.log( sub(20,30))
```

这是我们需要演示的html文件，在html文件中我们引用了我们解压后的入口文件

```html
<body>
<!--
  <script src="./src/main.js"></script>这样引用肯定不对，因为浏览器不认识commonJS代码
  所以我们引用的应该是打包的那个文件！
-->
<script src="./dist/bundle.js"></script>
</body>
```

### 3、第三步 得到打包的js文件

新建一package.config.js的配置文件! 实现输入webpack就可以自动打包的功能！

```js
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' 
  }
}
```

但在真正开发中，我们建议这样

```json
 在package.json中使用脚本语言来执行对应的命令
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
这样我们就可以输入 npm run build 便等同于webpack
```

## 三、less、css这类文件的处理

### 1、引用CSS文件打包

```
npm install --save-dev css-loader
npm install style-loader --save-dev    --save-dev是开发的时候的依赖
```

 **webpack.config.js** 配置：注意下写法，我放错过一次！！

```js
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}

```

- 注意一下！style-loader 是对CSS进行加载到DOM的作用，没有style-loader就无法渲染！
- user里使用多个loader里面的时候，是从右向左的！所以style-loader要放在第一个！

### 2、引用less文件打包

#### 2.1在css下创建special.less文件

```less
 @fontsize: 50px;

 @fontColor: orange;

body {

​	font-szie:  @fontsize: 50px;

​	color:  @fontColor: orange

}
```

#### 2.2JS文件上引用该less

npm run build执行，便会去package.json寻找“scripts”的build命令，根据build的内容“webpack”会去寻找webpack.config.js这个文件，根据这个文件寻找到对应的入口与出口和依赖，进行编译

但会报错的！因为我们没有适当的loader对处理这个文件类型，我们需要去webpack官网去寻找对应loader。

安装：

npm install less-loader less --save-dev 安装less与less-loader！webpack不能帮我们编译less，而是less是真正将其less转为CSS的！ less-loader才是我们打包使用的！



2、将对应的rules对象内容拿过来，放置webpack.config.js.

less用了三个loader， style-loader， css-loader，less-loader，

less-loader对less文件进行处理，css-loader将其less转为css，style-loader将css渲染到DOM

#### 2.3使用babel将ES6打包为ES5

​	const 定义变量等这些语法在大部分浏览器是不支持的，使用babel

之前的做法 引用 js的静态文件

现在我们

babel-loader@7 

babel-core

preset是配置的意思，

我们可以使用官网上的下载命令，

```
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
```

并根据官网的要求进行配置

```
其 test属性的js，会打包以js文件为结尾的文件
exclude： node_modules|bower_components 排除这些文件，不要进行转换！
options是配置的意思，
根据我们之前写的option里的应该是presets： ['es2015']
```

## 四、webpack处理图片

若我们引用一个CSS文件，其CSS文件的backgound：url（。。。）引用了一张背景图片，此时我们npm run build会失败

我们需要去官网，需要使用 url-loader

```
npm install--save -dev url-loader
```

然后配置webpack.config.js的rules规则，更改下limit符合的要求

发现：将jpg图片变成了jpeg

- 当加载的图片大于limit，会报错误，我们需要使用file-loader模块进行加载

  file-loader不需要配置，仅需要安装！再次刷新页面其实图片还是没有加载出来

- 原因：base64不需要一个单独的文件进行处理！大于limit的需要打包，会生成一张图片

  解决：我们使用的应该是打包以后的图片！但绝不应该在原CSS更改路径，而是应该在

  webpack.config.js

```js
module.exports = {
    entry:
    output: {
    	path: 
    	filename:
    	// 在打包的时候，将在其在对应url的路径前面 加上当前文件的 dist/
    	publicPath: 'dist/'
	},
    
}
```

如果我们想生成特定的名字，在其weboackage.config.js下有rules

结果：在dist文件夹下生成了一个img文件夹，之下有一个我们自定义命名的图片

```json
use： [
    {
        loader: 'url-loader',
        option: {
            limit: 13000，
            name: 'img/[name].[hash:8].[ext]'
        },
        // name 对图片命名规则，img会在img文件夹之下，后面的name取出原来的name名字，并将其对应的图片创建在img下，哈希值也是一个变量，我们需要一个八位的哈希值，拓展名也是一个变量，可能是不同的后缀名
		     
    }
]
```

## 五、Webpack使用Vue

既然想使用vue就要求我们node_modules中有vue模块，即需要我们npm 安装vue

则 对应js就可以，import Vue from ’vue‘ ←不写路径，便去model_modules引用（它做了exports default vue这种操作！）

```
npm install vue --save
注意一下没有dev！因为我们需要在运行的时候也要使用Vue！并不是开发时依赖
```

```js
import Vue from 'vue'  // 这里是导入！导入modules中的vue
const app = new Vue({
    el: '#app',
    ......
})
```

注意会出现版本报错信息：

runtime-only: 不可以允许有任何的template（一个Vue实例相当于一个Template编译）

我们需要这样runtime-compiler：可以有template，因为compiler可以帮我们编译template

解决办法： 

​	在webpackage.config.js中配置

```js
module.exports = {
	entry: 
	ouput：
	module:
	resolve: {
		alias: {
    // 当有vue的使用,  以后再编译的时候他会按照我们文件夹的路径去寻找！去module下的对应这个文件使用
    // 就可以解决runtime-only的问题！
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
}
```

### 1、template与el、Vue的由来！

若同时有el、template（里面写相关页面标签），

Vue的执行的时候会把template里面的那些标签 复制到对应el绑定的标签上。

新的问题：template里面的代码太多了怎么办？

解决方案：

```js
这个思想就是使用template逐层替换
const APP = {
    template: `
		<div>123</div>
		`,
 	data () {
        return {
            
        }
    },
    methods: { }
}
↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
new Vue({
   el: '#app',
   // 这个template 会替换掉对应绑定的标签上面的内容，而根据<APP/> 会寻找是否有这个标签存在
   template: '<APP><App/>',
   components: {
       'App' {
		 template: APP  // 这个APP是最上面我们定义的！
   	}
   }
})
```

后来 我们就可以直接将 const APP这个东西写出一个单独的，单独使用引入便可以！

再后来，虽然const APP这个东西已经单独拿出来了，但我们仍然想继续分离JS与style、html代码，故 发明了Vue！！！

```js
import Vue from 'vue'
import App from './vue/App.vue' // 以vue后缀为结尾！我们模块化开发的思想！
new Vue({
   el: '#app',
   template: '<APP><App/>',
   components: {
       'App' {
		 template: APP  // 这个APP是最上面我们定义的！
   	}
   }
})
---------------------------------------
该APP是一个Vue格式！不累述
```

### 2、使用Vue

我们此时npm Install build其实是不成功的，因为vue文件我们没有办法将其打包

像以前一样，下载一个打包使用的loader，一个编译使用的loader

```
npm install --save-dev vue-loader vue-template-compiler
```

继续在webpackage.config.js的配置

```
{
	test: /\.vue$/,
	use: ['vue-loader']
}
```

继续执行npm install build依然失败，在package.json查看版本15.4.2，14以后需要安装插件，将其更改为^13.0.0安装大于13的版本，但小于14的版本，再npm install根据更新的版本进行安装

利用这种方式！

我们还可以在一个Vue文件中引用另一个文件，并在components中注册对应的vue组件

## 六、plugin插件

什么插件？对现有功能的扩充，比如打包优化、文件压缩

oader与plugin的区别

loader用于转换某些类型的模块，是一个转换器

plugin是插件，是拓展

![](D:\WEB Study\前端笔记\10_Vue笔记_Billbill\webpack_images\1.png)

### 1、index.html打包进dist

开发阶段不需要使用该配置！可以注释掉

index.html文件是存放在项目的根目录下的，我们需要将其打包进dist

使用插件： HTMLWebpackPlugin

```
npm install html-webpack-plugin --save-dev
```

修改webpack.config.js下配置：

```js
先引入： const HtmlWebpackPlugin = require('html-webpack-plugin')
.......
plugins: [
	new webpack.BannerPlugin('最终版权归XXX')
	new htmlWEbpackPlugin({
		template: "index.html"
	})
]
```

由于 生成的 dist目录下的index,html会自动帮我们做 bundle.js的引入，故我们之前写的公共路径是多余的要去掉了！

其依赖根目录下index.html的模板！

### 2、压缩js

开发阶段不建议压缩

删除所有空格，变量使用简单的符号来代替

```
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

引用与配置

```js
cosnt uglifyJsPlugin =require('uglifyjs-webpack-plugin')
......
plugin: {
	new uglifyJsPlugin()
}
```

### 3、搭建本地服务器

使用Express框架，时时监听我们的代码，将其暂缓到内存当中

安装

```
npm install webpack-dev-server@2.9.3
```

配置webpack.config.js

```js
devServer: {
	// 设置服务哪一个文件夹
	contentBase: './dist',
    // 是否实时监听
    inline: true
    // 设置端口，默认在8080端口
}
注意此时我们进行本地服务，webpack-dev-server来运行这种实时服务！	
```

想使用这个命令需要在全局中安装才可以使用，

但我们仅在局部安装了，我们可以，但不建议！

```
指定下 文件夹的指令 使用相对路径来执行，虽然执行失败了
./node_modules/.bin/webpack-dev-server
```

真正的方法，在对应的package.json配置其脚本命令!

```json
// 这样我们执行 npm run dev ！优先会在本地里来！不再是全局了！
dev："webpack-dev-server"
dev："webpack-dev-server --open" 加上--open自动打开默认浏览器
现在我们 npm run dev就可以测试我们的项目了！
```

### 4、抽离插件

建立build文件夹的base.config.js文件，base里存放公共的配置

在build文件及一下创建dev.config.js存放运行的配置

prod.config.js存放 打包后的的配置

开发我们需要 base +dev

打包以后需要 prod+bas

```js
dev.config.js下只有
module.exports = {
    const webpackMergr = require('webpack-merge')
    const baseConfig = require('./base.config')
    module.exports = webpackMerge(baseConfig,{
        plugins: [
            new uglifyjswebpackPlugin()
        ]
})
```

```js
prod.config.js下
const uglifyjswebpackPlugin = require('uglifyjs-webpack-plugin')
const webpackMergr = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpackMerge(baseConfig,{
	plugins: [
		new uglifyjswebpackPlugin()
	]
})
```

1、但这有三个config了，我们应该怎么办？

安装： npm install webpack-merge  这个插件可以让两个配置文件进行依赖，是一个dev开发依赖,

则原来的webpack-config,js其实可以删除了

更改对应脚本："build": "webpack --config ./build/prod.config.js",

"dev": "webpack-dev-server --open --config ./build/dev.config.js"

## 七、Vue-Cli 脚手架

**注意： npm install  build的本质是使用node来运行一个js文件，本来JS文件只能在浏览器上运行，现在node给予了我们运行环境与底层地址，将js文件直接编译成二进制代码！**

简单的demo程序没必要脚手架，一旦涉及到大型项目

我们需要考虑 ，每个项目都要这样配置，及其浪费时间

1. 目录结构
2. 项目结构
3. 项目的部署
4. 项目的热更新
5. 代码的单元测试

作用：vue-Command-line-interface，命令行界面，快速搭建Vue开发环境与对应的webpack配置

```
npm install -g @vue/cli
```

虽然现在已经脚手架 4.0了，我们可以再了解了解2.0与3.0的使用

### 1、Vue Cli 2.0的初始化

```js
vue init webpack 项目名称 //这个项目名字最外部文件夹的名字 
```

### 2、 runtime-only 与  runtimecompiler的区别：

以后我们都会使用runtime-only，使用render函数代替template与components

主要区别：

​	**runtimecompiler：** 

​			先import导入对应vue，然后在components注册 

​			template ----> ast ---> render ---->  vdom ---->  dom

​	**runtimeonly**

​			render  h => h(APP)  使用了一个箭头函数！

​			 render ---->  vdom ---->  dom

```js
	 render = function（h） { return h(APP)  } 
	// h是一个函数，原名称为createElement，本意为创建元素
	h（APP）最终会替换掉你绑定的el内容！
```

原理：

​		template ----> ast ---> render ---->  vdom ---->  dom

​		直接通过render到了Vdom，显然这里的性能更高

### 3、vue文件的Template谁处理了？

注意先前我们解析Vue文件，需要Vue-loader来加载Vue文件，解析需要使用vue-template-compiler，即将Vue的template将其解析为render函数的！故我们当时引用的是类似于APP的这种对象！是一种开发时依赖。

总结：如果你依然使用template引入，components注册，那么使用runtimecompiler跟以前一样

但建议使用runtimeonly使用，性能较好

### 4、Vue-cli-3.0的初始化

区别：

​	vue-cli3设计原则是0配置，清除了build与config的配置！如果想改配置也是可以改的！

​	提供了Vue UI命令，提供了可视化的配置

​	移除了static文件，新增了public文件夹。index.html进入到了public文件夹下 

```js
1、cmd中创建对应文件夹，并初始化
vue create 文件夹名称
-------------------
 我们选择手动配置
```

![](D:\WEB Study\前端笔记\10_Vue笔记_Billbill\webpack_images\2.png)

2、设置项目需要安装的，目前我们仅需要选择Bebel！

![image-20200404202739145](C:\Users\淼淼淼淼呀\AppData\Roaming\Typora\typora-user-images\image-20200404202739145.png)

- Babel将ES6转为ES5
- TypeScript比较复杂，略
- PWA 先进的WEB APP的支持，增加了很多的功能
- Linter（即ESLinter对脚手架检测）
- UnitTesting 单元测试
- E2ETesting端到端测试

3、某些配置文件存放单独文件呢？还是package.json

在这里我们选择单独！

![](D:\WEB Study\前端笔记\10_Vue笔记_Billbill\webpack_images\3.png)

4、因为我们选择是手动的，来询问我们是否要保存该文件模板，以便以后使用？

![image-20200404203430957](C:\Users\淼淼淼淼呀\AppData\Roaming\Typora\typora-user-images\image-20200404203430957.png)

5、正式完成，进入下载

![](D:\WEB Study\前端笔记\10_Vue笔记_Billbill\webpack_images\4.png)

### 5、main.js的render

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

看一下原本使用的el标签，被$mount('#app')替换掉了，他们几乎是等价的关系，两者都可以
```

### 6、VueCli3的配置去哪里了？

①Vue UI查看配置

②在cli-service中有自定义配置

### 7、箭头函数的this

箭头函数的this是最近的作用域，即向外层一层一层寻找ths，直至找到this

### 9、url中的哈希（hash）与history

以这种方式更改url，监听哈希值从而实现路由的映射，寻找渲染哪一个组件，并将其渲染到DOM

```js
location.hash = 'bbb'
其url后会加上bbb这个路径，并不会刷新！
```

```js
pushState----------------------------
他其实是一个栈结构！先进后出
history.pushState({},'','home') 其url增加home，并且网页不会刷新
history.pushState({},'','home2')改变为home2
history.pushState({},'','home3')改变为home3

back-------------------------------------------------------
//若使用 back方法
history.back()  便 home3 回到home2 继续执行回到home1 其实很类似栈结构
history.forward() 即前进一个页面，等同于history.go(1)

replaceState-------------------------------
history.replaceState({},'','home')这里是替换，故无法返回，不是栈结构，不会保留记录

go方法------------------------------------------------
history.go(-1) 弹出一个页面，即等同于history.back()
history.go(-2) 即后退两个页面
history.go(2) 即前进两个页面
```

### 10、什么是前端渲染、后端渲染？

1. 第一阶段：后端渲染，单纯的后端：即 html+css+java 在服务器先执行好，直接渲染（早期的方式，没有ajax），根据不同的url，解析对应的url映射到不同的页面。这便是后端路由（Controller管理），处理URL与页面之间的关系。
2. 第二阶段：前后端分离阶段（SSM）
3. 第三阶段SPA：前端渲染（url改变不向服务器发送请求，不要随便刷新）：html+css+js全部都被下载好到前端了，根据前端路由不同的url去在前端寻找对应的html、css与js代码，前端管理映射关系，后端不管了。一个url对应一个组件。

什么是路由器？就是映射关系。



### 11、Vue-Router

```
一旦路由改变，便会触发
```

1、我们新建router文件夹下有index.js来配置路由

- 引入路由
- 使用路由
- 将VueRouter传入Vue实例

```js
import VueRouter from 'vue-router'

Vue,use(VueRouter
// 在这里写关系！一个映射关系就是一个对象！
 const routes = [
  {
    path: '',
    components: 
  },
]

 const router = new VueRouter({

​	// 在routes配置映射关系！！	

​	routes

})
 // 将router挂载到对应的Vue

export default router
 
```

2、 在main.js，我们在入口函数

```js
对应的mianjs
import router from './router/index.js'  //也可以不写index.js，会自动寻找index

new Vue ( {

​	el: '#app',
// router与对应的el绑定了
​	router: router,

​	render; h=> h{app }

})
```

3、配置路径

```js
import Home = '../components/Home '
const routes = [
  {
    path: 'home',
    components: Home 
  },
```

4、配置好以后，url改变渲染对应的页面？

在App.vue的入口页面，添加对应内容

router-view是router占位标签，router-link为跳转

```vue
<router-link to="home">去home！</router-link> // 最后会被渲染成一个a标签！#/home
点击该按钮，路径会改变，将对应home组件替换对应Vue
<router-view></router-view> // 动态渲染
```

5、一进入App.vue即进入主页，使用重定向,

在router文件夹下的index.js

```js
const router = [
	{
		path: '',
        redirect: '/home'
	}
]
```

6、我们的路径 localhost：8080/#/home，有一个#不好看，如何去掉这种hash格式呢？

```js
// 使用history模式！！#符号便没有了
 const router = new VueRouter({

​	// 在routes配置映射关系！！	
    
​	routes
	mode: 'history'
})
```

7、router-link其他属性

- to属性 指定跳转的路径
- tag=“button” 将router-link渲染成button，而不是a标签了！
- 增加replace，内部使用history.replace()进行跳转，使得用户无法后退
- router-link-active,当我们点击哪一个按钮的时候，便会给对应router-link渲染的标签添加该类（好处：当我们点击哪一个按钮哪一个按钮就实现高光，这个功能极其容易使用

### 11、事件实现router跳转

```js
对应Vue实例当中，
homeClick() {
	// 不要使用history.pushState('/home')不要绕过router！
	this.$router.push('/home') // push即pushState
    this.$router.replace('/home')// 即replaceState
}
```

### 12、动态路由 params

某些情况下，我们的path的路径是不一定的，比如/user/userId，/user/zhangsan

```js
============
index.js下
const router = [
	{
		path: '/user/:abcccc',
        component: User
	}
]
============
对应app.vue页面
<router-link :to="'/user/' + userId"> </router-link>
// userId是由该vue下data的返回对象对应的userId
============
```

```vue
User.vue
我们希望在Vue界面下，显示出用户的ID
<script>
	export default {
        name: "User",
        computed: {
            userId() {
                // 当前哪一个路由是活跃状态我就拿哪个路由！
                return this.$route.paramers.abcccc
            }
        }
    }
</script>
其他：
我们直接在
		<h1>{{$route.params.abcccc}</h1
我们不需要写this了	
```

备注：

$route到底是什么？

是指 router这个VueRouter对象里面的routes，而routes里面有很多路由，而$route便是当前routes哪一个活跃的路由

```js
 const router = new VueRouter({

​	// 在routes配置映射关系！！	

​	routes

})
```

### 13、路由的懒加载

执行 npm run build 打包文件以后，参看dist文件下有static文件夹，

static有js与css的打包文件和index.html

其js有app、mainifst、vendor三个js文件，

- app当前应用程序开发的所有业务代码

- mainifst为打包的代码作底层支撑，比如导入导出、复杂的处理

- vendor文件提供第三方vue、vue-router、axios、bs

  

什么懒加载？把不同路由对应的不同组件与页面会打包成一个js文件，将不同不同的的路由放置不同的js文件中，从先实现路由的懒加载。

主要作用：将其js文件分开成不同的代码块，当访问哪个路由便调用哪一个

懒加载使用的方式：如下

```js
一个懒加载对应一个js文件！
const Home = () => import('../components/Home') 
const routes = [
	{
		path: '/home',
        component: Home,
	}
]
```

### 13、路由嵌套

1. 创建对应子组件，并且在路由映射中配置对应的子路由
2. 在组件内部使用 <router-view>标签

```js
第一步如下
const News = () => import ('../components/News')
const routes = [
	{
		path: '/home',
        component: Home,
        children: [
            {
                path: 'news',
                components: News,
            }
        ]
	}
]
```

```vue
子路由如何显示呢？
在其父页 Home.vue中， 
<router-link to="/home/news">新闻标签</router-link>
对应子路由会在下面渲染组件
<router-view></router-view>
```

### 14、路由传递参数 query

- 原本的 url路径上 拼接的 ？即跟着的就是query，?name=huangpeng&age=18就是一种query查询

准备工作：创建新的组件，配置好路由的映射，添加跳转的router-link

```js
query对应的是一个对象，使用key作为传递方式
1、配置路由
const Profile = () => import '../components/Profile'
const routes = [
    {
        path: '/profile',
        components: Profile
    }
]

```

```vue
2、router-link链接
可以这样写语法：
<router-link :to="{path: '/profile',query: {name:'huangpeng',age: '18'}}">
</router-link> 
这样跳转的路径变为：
					localhost:8080/path?name=huangpeng&age=18
```

```vue
在对应的Profile.vue中，取出其query参数
	$route.query.name 就可以取出来！
```

代码实现：

```js
const routes = [
    {
        path: '/profile',
        components: Profile，
        query: {
  			name: 'huang',
        	age: 19
      }
    }
]
```

### 15、$route与$router的区别

1、所有组件的this.$router都指向同一个地方

- $router指的是 ，就是这router！任何一个组件里$router里的组件都是这个router！
- 而这个router就是我们router文件夹下的index.js路由总配置，我们new出来的

```js
import router from './router/index.js' 
```

2、$route当前活跃的routes里的某一个路由

我们那些params、query、name、meta这里都有独立的属性

3、拓展：

​	为什么这里有一个$router属性？

答：

1. ​	所有的组件都会继承Vue的原型

   ```js
   我们在main.js中，
   	Vue.prototype.test = function() {
   		console.log('test')
   	}
   则在其他的Vue文件中，可以调用这个方法 this.test() 便可以执行！
   ```

### 16、全局导航守卫

1、我们的需求

我们希望路由跳转的时候，其网页的title也跟着变化，虽然能实现，但是每一个Vue页面都需要这样进行修改！故我们使用导航守卫

```js
我们在对应的Vue页面，将其Vue实例中对应改变
created () {
	document.title = '用户界面'
}
```

2、导航守卫

在其router下index.js中

我们叫作前置守卫

```js
先在对应的routes中，
const routes = [
    {  
    	path: '/home',
        component: Home,
        meta: {
            // 在meta里添加属性title
            title: '首页'
        }
    }
    {
    	.......
    }
]
-------------------------
这个router是我们new出来的
router.beforeEach((to, from, next) => {
    // 从form 跳转到 to
    // 注意一下！！！这to 和 from 都是一个 route对象，故我们需要在对应router中进行修改
    document.title = to.matched[0].meta.title
    next()   // 必须调用这一步，否则无法进行下一步
})
```

3、补充

- 什么是meta？  答： 元数据，描述数据的数据

- 由于存在嵌套关系，直接to.meta.title拿不到该元数据，故我们使用to.matched[0]拿嵌套第一个就可以

- beforeEach我们叫作前置守卫，（前置回调，在跳转之前进行回调）

- 与之对应的有 afterEach（to，from） 没有next函数，因为跳转完了，不需要next函数！

  ```js
  afterEach ( (to, from) =>{
      console.log('后置钩子没有next')
  })
  ```

  他们是**全局守卫**

  当然路由局部守卫 beforeEnter：（to,from,next) => {  `````    }

### 生命周期函数：

```js
beforeCreate(){  }
created() {
	//创建组件时候回调
},
    // 在之前会先判断是否有el属性？是否有template？ 如果有的话 进行render函数
beforeMount() {  }
	// 在这里替换掉el，即渲染
mounted() {
     //template挂载组件时回调
},
    // 一直在循环检测，响应式检测,重新渲染虚拟DOM，将真实DOM更改，更新补丁
beforeUpdate() { }
updated() {
     //页面刷新时候调用
},
// 当我们销毁DOM（跳转/退出页面时候）  
beforeDestroy() 
destroyed() {
    // 销毁时调用
}
```

### 17、Vue-router-keep-alive

- keep-alive 是Vue内置的一个组件，可以包含组件的保留状态（避免重新渲染）
- router-view也是一个组件。如果直接包含在keep-alive中，里面路径匹配到视图组件都会被缓存

需求： 当我们跳转的时候，希望原先的网页可以保存我们状态。比如说 我们处于主页的子列表的 新闻界面下，跳转到其他页面再回到主页面时候，主页就默认回到了默认的新闻列表，而并非消息界面。

原理： 因为跳转页面会触发 destroyed声明周期函数，再次回到home触发created周期函数，故keep-alive让其不再触发生命函数

A、没有成功的解决方案：

```vue
<keep-alive>
    // 这样做确实不会销毁了
	<router-view></router-view>
</keep-alive>
```

但是！状态其实并没有保存，回来时候并没有回到消息列表，因为点击“首页”我们设置了重定向便会自动跳到新闻这里，但实现了缓存

**B、依旧不行的解决方案：**去掉缺省值，即原本的重定向规则，增加activated（） 函数

注意 ！！activated函数必须在keep-alive有用，换句话说被保存状态时候才是有效的！！

```js
在Home.vue下
export default {
	data: {
        return() {
            path: '/home/news'
        }
    },
    activated() {
        this.$router.push(this.path)
    },
    deactivated() {
        this.path = this.$route.path
    }
}
```

这种方法依旧失败，因为$route记录的是当下活跃的路由，而我们我们进入到一个新的页面的时候，这个活跃路由就已经变了，而Home.vue下进入活跃的路由，始终是这个路由，即原地不动！！

C、路由的局部导航

此时记录的是 上一个点击的路由状态

```js
在Home.vue下
export default {
	data: {
        return() {
            path: '/home/news'
        }
    },
	beforeRouteLeave(to,form,next){
    	this.path = this.$route.path;
        next()
    }
}
```

**现在我们希望每一次加载的时候，有些路由被缓存，有些路由不被缓存，如何实现？**

```js
在Home.vue下
export default {
    name: 'Profile'
	data: {
        return() {
            path: '/home/profile'
        }
    },
}
----------------- name: 'Profile'使用这个东西！！！将缓存排除在外
则在APP.vue中
<keep-alive exclude="Profile，User">  记住要有对应的name属性，在这里不要随便加空格！！
	<router-view></router-view>	
</keep-alive>
```



### 18、TabBar实现

1. 去看代码，重写代码，感悟代码，别的没用

   ```vue
   
   ```


### 19、路径别名

新建vue.config.js文件夹

```js
const path = require('path');
function resolve(dir) {
  return path.join(__dirname,dir)
}
module.exports = {
  chainWebpack: (config) => {
      config.resolve.alias
          .set('@$', resolve('src'))
          .set('assets',resolve('src/assets'))
          .set('components',resolve('src/components'))
          .set('layout',resolve('src/layout'))
          .set('base',resolve('src/base'))
          .set('static',resolve('src/static'))
          .set('views',resolve('src/views'))
          .set('tabber',resolve('src/components/tabber'))
  }
}

```

## 八、Promise

### 1、初认Promise？

- 异步编程的解决方案，ES6提供

- 什么时候是异步事件呢？

  1、函数的回调

  2、网络的请求

  ```js
  setTimeout(() => {
  	console.log('hello') 
  },1000)
  ```

- 初用Promi创建Promise对象需要传入一个函数，其中函数有两参数resolve、reject，其中resolve与reject也是函数

- 假设 每一次setTimeout的执行都是一次网络的请求

  ```js
  像这样使用，但如果是这样使用，和之前的回调地狱没有区别了
  new Promise((resolve, reject) => {
  	setTimeout(() => {
  		console.log('hello,1111') 
          setTimeout(() => {
              console.log('hello!2222')
              setTimeout(()=>{
                  console.log('3333')
              },1000)
          },1000)
  	},1000)
  })
  
  ```

  ```js
   // 如果有resolve，那么便会有then，then里面也是一个函数
  
  第一次 发送网络请求的代码全部都在Promise里面，
  第一次对应拿到结果的处理的代码都在then里
  
  第二次Promise是第二次发送网络请求的代码
  第二次then是第二次拿到结果的处理代码
  
  确实代码变得很复杂，但是逻辑变得很清楚！
  
  new Promise((resolve,reject) => {
      setTimeout(() => {
          resolve()
      },1000)
  }).then(() => {
      console.log('hello,1111') 
      return new Promise((resolve,reject) => {
          setTimeout(() => {
              resolve()
          },1000)
      })
  }).then(() => {
      console.log('hello!2222')
      return .......
      ..............
  })
  ```

  ```js
  resolve是then，reject失败是catch
  new Promise((resolve,reject) => {
      setTimeout(() => {
          //resolve()
          reject('失败！')
      },1000)
  }).then(() => {
      console.log('hello,1111') 
  }).catch((err) => {
          console.log('处理失败')
  })
  =================
  我们也可以then中用两个函数参数表示，这样成功调用第一个参数，失败调用第二个参数！
  new Promise((resolve,reject) => {
      setTimeout(() => {
          //resolve()
          reject('失败！')
      },1000)
  }).then(() => {
      	console.log('hello,1111') 
  	}，err => {
      	console.log('处理失败')
  })
  ```

  

- 当我们有异步操作，我们应使用Promise进行异步的封装

### 2、Promise三种状态

- pending 等待状态，正在进行网络请求，或者定时器没有到时间
- fulfill：满足状态，主动回调resolve便是该状态，并会调用then函数
- reject：拒绝状态，主动回调reject，并调用.catch（）

### 3、Promise的简便写法

这种写法建立在 非异步事件上,Promise考虑到我们可能有很多事件是非异步事件

```js
new Promise((resolve,reject) => {
    resolve('123')
}).then( res => {
    console.log( res )
    // 看这种方法是更加的简洁
    return Promise.resolve( res + '111111' )  ←←←←←这种方式仅适合非异步
}).then( res=> {
    console.log(res)
})
```

再后来有更加简便的方法，省略掉Promise返回对象，在内部帮我们做好

```js
new Rromise ((resolve, reject) => {
	setTimeout({
    	// 发送请求
        resolve('你好res，')
    },1000)
}).then(res => {
        console.log(res)
         // 请求成功，返回请求
        return res + '111'
}).then( res=> {
		console.log(res)        
})
```

### 4、all方法

```js
all 里面放可以遍历的对象，比如数组
Promise.all([
    new Promise((resolve,reject) => {
        $.ajax({
            url: 'XXX',
            success: function(data) {
                resolve(data)
            }
        })
    }),
    new Promise((resolve,reject) => {
        $.ajax({
            url: 'XXX',
            success: function(data) {
                resolve(data)
            }
        })
    })
    // results 保存了 第一个promise的data和第二个promise的data
]).then( results => {
    // 当两个new Promise都成功以后，再执行这个
    console.log(results)
})
```

