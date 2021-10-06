### 前言

1. 原生JS开发是命令式， 而Vue是声明式

2. vue的github上的名称为 `vue-next`, 指代vue3

3. vue3的源码使用 ts 开发，请务必要学会ts，然后删除这一行！

4. 国外环境使用react 要远 大于 vue， 而国内正好相反

5. 如何更好的使用vsCode代码片段

   代码片段确实非常好用，但是其由于是json格式，导致创建一个代码块文件非常麻烦。

   File => Prefrence => User Snippests

   ⭐ 借助网站 => snippet-generator.app来帮助我们生成json文件的格式

### 基本语法

1. v-once

2. v-pre

3. v-clock

4. v-bind、v-bid:class、v-bind:style

   - ⭐ v-bind也可以动态的去绑定属性

    ```js
    <div :[key] = "xxx">
    ```

   - 批量绑定属性

     ```js
     <div :bind="info" />
     
     info: {name: '1', sex: 'man' } => 即<div name="1" sex="man">
     ```

     

5. watch的写法也是支持 get、set形式，虽然少见

### 冷知识

#### vue-cli的简单机理

- vue的脚手架

  "serve": "vue-cli-service serve" => 会去node_modules => .bin文件下的vue-cli_service执行

- webpack

  "serve": "webpack serve" => .bin =>webpack

在`vue-cli-service`中其`require('../lib/Service')`其只是一个映射文件，真正位置为node_modules文件夹下的 cli-service下

更详细略。

#### Vite

> 目前三大框架并都未移植Vite下，但Vite的未来前景是非常令人期待的！
>
> webpack项目越复杂，其速度越慢，而vite的高速非常卓越

1. vite是一个基于ES模块的开发服务器，HRM快
2. 构建执行，预设rollup，生成优化后的生产资源.....
3. 试试vite, 
   - 会自动打包js文件
   - 自动补齐后缀名, 不过还是建议不省略，因为vsCode可以更好快速定位其他文件
   - 可以缓存上一次打包的未修改文件，令hrm速度快
   - ..........

#### vite与vue

1. vue3的初始化也略有变化





