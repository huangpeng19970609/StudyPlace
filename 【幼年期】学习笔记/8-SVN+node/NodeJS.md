-----

# 菜鸟教程-Node.js

### 1、Node.js应用三部分

- 引入required模块，通过require指令载入Node.js模块
- 创建服务器，通过服务器接收请求，发送响应信息
- 浏览器发送Http请求，服务器接收请求后返回响应的数据



### 2、npm

使用npm命令

```js
npm install express    =>   	express的包便会放在node_modules文件夹之下

# 之后我们引用就仅需要这样使用
var express = require('express')
```

### 3、全局安装与本地安装

本地安装

1. 会将安装包放在./node_moudles下运行（我们运行npm命令其实便是在该文件夹下运行）

   备注： 若没有这个文件夹，便会在当前运行路径下创建一个

2. 本地安装会使用require来引用安装的包

全局安装

1. 将安装包放置你node的安装目录或user/local
2. 可以在命令行中直接使用

```js
npm install express
npm install express -g
```

npm list -g 查看全局安装信息

### 4、package.json

1. 位于node_moudles的目录之下，每一个模块都有其package.json文件，定义包属性。

   - name: 包名
   - version该包的版本号
   - description该包的描述
   - homepage包的官网url-
   - **dependencies** 依赖的包列表。如果依赖包没有安装，npm会自动安装依赖包到node_module下
   - respositroy: 包代码存放位置。比如git、svn
   - main： 指定程序的主入口。 require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js

2. 在我们项目的底部，也有 package.json

   - npm install 会自动下载 依赖、开发依赖的模块将其安装在node_modules文件夹下

   - 我们可以使用npm init 来自动生成这个package.json

   - scripts字段

     npm的命令行缩写, 比如 npm run test

   - dependencies、devDependencies

     前者是运行时依赖, npm 命令的  --save便是安装在运行依赖

     后者是开发时依赖，npm 中 --save -dev

卸载模块：

```js
# 比如卸载 express
npm uninstall express
// 卸载完以后可以查看 npm ls
```

### 5、REPL（交互式解释器）

类似于Windows下的终端，在终端中输入命令，并接收系统的响应。

而Node自带了交互式解释器。可以执行如下:

​	作用： 更好的调试JavaScript的代码

- 读取:  读取用户输入
- 执行： 执行输入的数据结构
- 打印： 输出结果
- 循环 ，直至用户 crtl+c 两次退出

使用方式：

​	在其终端 输入 node

### 6、Node.js 回调函数

首先要明确： 异步编程依赖 回调函数 实现，但不能单独认为使用回调就是异步函数。

备注： 一般回调函数都会作为 最后一个参数出现。

- 阻塞代码

```js
var fs = require('fs')
var data = fs.readFileSync('input.txt')
console.log(data.toString())
console.log('执行成功')
```

```js
# 执行结果
$ node main.js
菜鸟教程官网地址：www.runoob.com

程序执行结束!
```

- 非阻塞代码

  ```js
  var fs = require("fs");
  
  fs.readFile('input.txt', function (err, data) {
      if (err) return console.error(err);
      console.log(data.toString());
  });
  
  console.log("程序执行结束!");
  ```

  ```js
  # 执行结果
  $ node main.js
  程序执行结束!
  菜鸟教程官网地址：www.runoob.com
  ```

阻塞的写法未使用回调函数，必须等待文件读取以后才可以执行。

而第二个非阻塞的写法，不需要等待文件读取。而是执行在读取同时执行其他代码。

### 7、事件循环

Node.js虽然是单进程单线程应用程序，但是V8引擎提供了异步调用的接口，故可以处理大量并发。

- Node.js中几乎所有API皆支持回调函数
- Node.js所有事件机制都是在设计模式中观察者模式中实现的。
- Node.js单线程会进入事件循环，直至没有事件观察者出现。每一个异步事件都会有观察者。

#### 7.1事件驱动程序

Node.js使用事件驱动模式。

web server接收到请求，一旦接收到， 就对其处理。然后去服务下一个请求。当请求完成，便会放回处理队列，当到达队列开头该结果便被返回给用户。

![image-20200510143241048](C:\Users\HuangPeng\AppData\Roaming\Typora\typora-user-images\image-20200510143241048.png)

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件

1. eventEmitter.emit 是触发事件（事件请求）
2. eventEmitter.on是绑定处理事件的处理器（事件处理）
3. 事件的请求和处理是分开的，所以是异步。

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
 
// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}
 
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});
 
// 触发 connection 事件 
eventEmitter.emit('connection');
 
console.log("程序执行完毕。");
_____________________________________________________________________
```

```js
# 处理结果
$ node main.js
连接成功。
数据接收成功。
程序执行完毕。
```

#### 7.2 node应用程序如何工作

执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数

```js
var fs = require('fs')
fs.readFile('input.txt', function(err, data) {
  if(err) return console.error(err)
  else console.log(data.toString())
})
console.log('最后一行的')
```

- fs.readFile() 是异步函数

### 8、EventEmitter

在Node.js中所有的异步I/O操作会在完成时发送一个事件到事件的队列。

Node.js中所有对象都会分发事件。比如fs.readStream对象在文件打开时候会触发一个事件。

所有这些产生事件的对象都是events.EventEmiiter的实例.