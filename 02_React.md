### 1、 小试牛刀

1. react.js：React核心库。

2. react-dom.js：提供操作DOM的react扩展库。

3. babel.min.js：解析JSX语法代码转为JS代码的库。

````js
# 首先要引入这三个基本的库

<script type="text/babel">
    const VDOM = (
    	<h2 id="test">123</h2>
    )
    ReactDom.render(VDOM, document.querySelector(' #App')); // 即可渲染
</script>
````

> 关于虚拟Dom
>
> 虚拟dom属性相对于原生属性极少，因为虚拟dom由react使用，不关心无关样式、属性。
>
> 不过虚拟dom依旧会转为 dom

#### 1 jsx规则

- VDOM防止变量时要使用花括号 此外虚拟dom在jsx里不要写引号

  ```js
  const a = <h2 id={myId} >
  ```

- 样式类名 应使用 clasName 而不是 class

  内联样式应以键值对形式

  ````html
  #1
  const a = <h2 className = "test">123</h2>
  
  #2 必须是 表达式 且是键值对， 故两个括号
  const b = <span style={{color: "white"}}></span>
  
  #
  ````

- 标签转换

  React中 的虚拟dom 

  1. 若是 小写标签，回自动转为html标签
  2. 若是 大写标签，认为其是组件，并渲染组件方式。

- 遍历

  1. react中的 {} 内仅可写 表达式，初次之外可以写数组，会自动遍历
  2. 但 {obj} 这种形式是不可的、

  ```js
  <ul>
      arr.map((item, index) => <li key={index}>{item}</li>)
  </ul>
  ```

- 模块与组件

  1. 模块指 js文件模块化，即js复用、抽离
  2. 组件值 局部功能的集合， 组成这部分的功能的资源是各种各样的。

#### 2 函数式组件 与 类组件

1. 函数式组件

```js
function Person() {
    # this 指向的是undefined, 由于React开启严格模式  “use strick”
    “use strick” // 函数的局部式是支持开启严格模式的！
    return <h2>222</h2>
}
ReactDom.render(<Person />, xxx)
```

2. 类组件

```js
class Person extend React.Component {
    render() {
        # 此时 render中的this指向为当前 组件的实例对象
        return {
            <div></div>
        }
    }
}
# new Person => 调用render => vdom转为 dom
ReactDom.render(<Person />, xxx)
```

#### 3 state

>  若我们想要使用 state => 则是类组件
>
> 不用state => 函数式组件， 仅适用于简单组件
>
> - class 才有资格谈实例， 才有可以访问到组件的实例对象的state

- 一个基本的例子

  此外推荐 React 官方提供的 浏览器插件，其拓展了浏览器的控制台面板。

  ```js
  class Weather extends React.Component {
      constructor (props) {
          super(props);
          this.state = isHot: true;
      }
      render() {
          return <h1>{this.state.isHot}</h1>
      }
  }
  ```
  
- setState

  1. this.setState 是 合并操作， 不过将state所有属性覆盖

  2. 每次调用 setState 都会重新执行一次 render函数！

      当然render会在初始化时也执行一次

  ```js
  change () {
      this.setState (
      	{
              isHot: true
          }
      )
  }
  ```

#### 4 访问 实例组件对象

1.   如何访问 实例组件对象

   > 为了访问到 其组件内部实例的 state 属性， 可以通过外部声明函数的形式， 将this闭包来访问。
   >
   >  但这种其实过于分散，不利于开发。

   - 当然真实开发这并不这么写

   ```js
   #1
   let that;
   function change () {
       that.state.hot = false;
   }
   class Weather extends React.Component {
       constructor (props) {
           super(props);
           this.state = isHot: true;
           # 2
           that = this;
       }
       render() {
           return <h1 onClick="{change}">{this.state.isHot}</h1>
       }
   }
   ```

2. 如何访问 实例组件对象 

   ```js
   class xxx {
       render() {
           return <h1 onClick="{this.change}">{this.state.isHot}</h1>
       }
       # 那如此
       change() { console.log(this) }
   }
   # 但此时 你会发现 this 的指向 为 undefined
   原因:
   onClick = this.change 
   再次点击 相当于 change 调用, 故this指向不对。 可视作this的默认绑定形式
   ```

3. 如何访问 实例组件对象 

   > 1. 实例不存在 change， 故寻找原型change函数
   > 2. 原型上 change的 this 通过显示绑定
   > 3. 给实例添加change属性， 则每次onClick事件调用优先访问实例上属性

   ````js
   class xxx {
       constructor() {
           this.change = this.change.bind(this);
       }
       render() {
           return <h1 onClick="{this.change}">{this.state.isHot}</h1>
       }
       # 那如此
       change() { console.log(this) }
   }
   ````

4. 





