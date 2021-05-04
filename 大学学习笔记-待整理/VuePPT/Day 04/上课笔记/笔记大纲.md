### 一. 组件化开发

#### 1.1. 父子组件的访问

* children/refs
* parent/root



#### 1.2. slot的使用

* 基本使用
* 具名插槽
* 编译的作用域
* 作用域插槽



### 二. 前端模块化

#### 2.1. 为什么要使用模块化

* 简单写js代码带来的问题
* 闭包引起代码不可复用.
* 自己实现了简单的模块化
* AMD/CMD/CommonJS

#### 2.2. ES6中模块化的使用

* export
* import



### 三. webpack

#### 3.1. 什么是webpack

* webpack和gulp对比
* webpack依赖环境
* 安装webpack



#### 3.2. webpack的起步

* webpack命令
* webpack配置: webpack.config.js/package.json(scripts)



#### 3.3. webpack的loader

* css-loader/style-loader
* less-loader/less
* url-loader/file-loader
* babel-loader



#### 3.4. webpack中配置Vue

* vue-loader



#### 3.5. webpack的plugin



#### 3.6. 搭建本地服务器

* webpack-dev-server



#### 3.7. 配置文件的分离





### 四. Vue CLI

#### 4.1. 什么是CLI

* 脚手架是什么东西.
* CLI依赖webpack,node,npm
* 安装CLI3 -> 拉去CLI2模块



#### 4.2. CLI2初始化项目的过程



#### 4.3. CLI2生产的目录结构的解析





export(导出)/import(导入)



.vue



dist -> distribution(发布)



>webpack ./src/main.js ./dist/bundle.js



开发时依赖

运行时依赖