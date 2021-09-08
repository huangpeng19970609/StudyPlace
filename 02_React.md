### 1 小试牛刀

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

- 一个基本的例子， 不过这样初始化不好

  此外推荐 React 官方提供的 浏览器插件，其拓展了浏览器的控制台面板。

  ```js
  class Weather extends React.Component {
      constructor (props) {
          super(props);
          this.state = { isHot: true };
      }
      render() {
          return <h1>{this.state.isHot}</h1>
      }
  }
  ```
  
- 正确的state使用方式

  ````js
  class Car {
      render() {}
      // 在类中写赋值语法相当于直接在构造器中 进行 this.state = {...}
      state = { isHot: true}
  }
  ````
  
- setState

  1. this.setState 是 合并操作， 不过将state所有属性覆盖

  2. 每次调用 setState 都会重新执行一次 render函数！

      当然render会在初始化时也执行一次

  ```js
  change = () => {
      this.setState (
      	{
              isHot: true
          }
      )
  }
  ```

> 总结
>
> state  应该使用赋值的方式最简单也是最合适

#### 4 事件

##### 4.1 事件方法的优化

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

4. 如何访问 实例组件对象 一个优秀的方案！

   - 自定义方法： 使用 赋值 + 箭头函数 的形式

   ````js
   class Car {
       // 为什么写箭头函数，因为保证 this的指向为Car
       change = () => {
           this.setState({});
       }
   }
   ````

##### 4.2 关于事件

- 使用 onXxxx 属性来指定事件的函数 【注意大小写】
  1. 其使用的是 指定react 规定的事件， 而不是使用Dom原生。 目的是兼容
  2. 使用的是事件委托 即委托事件于最外层即可。

- react 希望不要滥用 ref， 故可以通过 e.target来回调想要的数据

  ````js
  <div onBlur={ this.eventBlur }
  
  eventBlur (event) {....}
  ````

##### 4.3  受控组件 与 非受控组件

- 现用现取 即为 非受控组件
- 类似于双绑机制， state同步的便是 受控组件。 依赖state

```js
<form action = 'xxx' onSubmit = {this.handleSubmit}
	// 非受控
	<input type='txt' name='user' ref= { c => this.userDom = c }
	// 受控
	<input type='txt' onChange = 'this.onChange'
```

##### 4.4 事件与 函数的柯里化

- 请看如下的示范

  > 事件绑定理应是 一个函数, 此处也应该返回一个函数
  >
  > 故我们巧用 函数柯里化, 帮助我们回调传参

  ```js
  <input onChange = { this.saveFormData('username') }
  
  saveFormData: type => {
      return 
          (e) => {
          	this.setState( {[type], e.target.value} )
          }
      }
  }
  
  # 当然可以不用函数柯里化!也是极其常见的方法
  <input onChange = { e => this.saveFormData('userName', e.traget.value)  }
  ```

  > - 高阶函数
  >
  >   通俗, 函数的 开始 与 结尾 其一为函数, 便可以称呼为高阶函数
  >
  >   1. 满足 其函数的参数为函数,则就可以称为高阶函数
  >   2. 其调用返回的值 为函数则可以称呼为高阶函数
  >
  >   举例: 
  >
  >   ```js
  >   setTimeout 传入函数参数
  >   数组的大多数方法也是高阶函数
  >   promise也传入函数了!
  >   ```
  >
  > - 函数柯里化
  >
  >   简而言之, 函数再次调用函数
  >
  >   ```js
  >   add(1)(2)(3)
  >   ```

#### 5 props

- 传递props给与组件内部

  ````js
  ReactDom.render(<Person name="tom" age="18"/>)
  ````

- 调用

  ````js
  {this.props.name}
  ````

- 批量传递props

  ```` js
  # 相当于解构赋值， 可视作语法糖， 将 p 的属性一一赋予 props
  <Person {...p} /> 
  ````

  1. 关于解构赋值

     解构赋值可以用于函数传参

     ````js
     function hello (...numbers) {
         numbers[0]\ numbers[1]、 numbers[2] 这种来访问
     }
     还比如可以如此
     let p3 = { ...p3, name: '黄鹏'}
     ````

  2. 此处批量传递仅是语法糖，且按理 扩展语算符不可解构对象，但此处居然可以了，

     - 这里使用的原因 因为 react + babel 令其可以使用 ...p 这种形式
     - ...arr 是可以的， ...obj 是不可以的, 对于扩展预算符

- props的限制

  1. 初次认识 props 校验 、 默认值

  ````js
  class Person extneds React.Component {}
  Person.propTypes = {
      name: React.PropTypes.string // 这是 React15的版本
  }
  // 不过也可以如此
  # 你首先要引入 prop-types文件来使用 => 令全局有 PropType 对象
  Person.propTypes = {
      name: PropTypes.string // 这是 React15的版本
      sex: PropTypes.string.isRequired,
      speak: PropTypes.func
  }
  
  
  #默认值
  Person.defaultProps {
      sex: 1,
  }
  ````

  2. 更好的写法

     ```js
     class Person extends React.Component {
         static propTypes: {},
     	static defaultProps: {}
     }
     ```

  3. 函数组件使用props

     - 首先要明确的是 函数组件是无实例产生的， 故无法通过this来访问
       1. refs 无法获取
       2. state 无法获取
       3. props借助传参可以实现

     ````js
     function Person (props) {
         // 可以访问props
     }
     
     Person.propTypes = {}
     Person.defaultProps = {}
     
     <Person name="18">
     ````

#### 6 构造器

> 1. 为什么constructor 是可有可无的, 什么时候要用？
> 2. 关于 其中的super一定要用吗？

1. constructor一定要有吗？

   - 初始化 state时， 例如你要在构造器中初始化 state

   - 事件函数绑定实例时 比如 

     ```js
     // 实例属性     原型属性
     this.change = this.change.bind(this);
     ```

2. 为什么一定要先super ？

   ```js
   class Person extends React.Component {
       constructor (props) {
           super(props)
       }
   }
   ```

   - 若你想要 通过 this的实例方式来访问 props 那么你需要如此做

     ```js
     this.props.xxx
     ```

     但其实 construcor 本身接收参数便可以获得props，

     故super完全可以省略。

#### 7 refs

> 官方不建议使用 this.$refs的形式，因为存在效率问题，不希望 refs有过多的对象！

1. 官方不建议的写法

   ````js
   <input ref='input'>
       
   # 
   通过此访问，且此时是真实dom 
   this.$refs.input
   ````

2. 极其建议的一种写法

   - 唯一的缺点是 每次进行更新的时候会执行两次。
     1. 第一次初始化，赋予 null
     2. 第二次才是真正的节点
   - 当 ref为内联函数时， 会将dom节点作为回调参数

   ```js
   <input ref => curNode = this.inputVal = curNode;
   ```

   - 当然可以用普通函数形式

     ````js
     <input ref = "{this.saveDom}" />
     
     saveDom (node) {
     	this.inputNode = node;
     }
     ````

3. createRef

   - 由于用几个便要创建几个，显得很不方便。大多数还是内联函数好用。

   ````js
   class Person {
       # this.myRef1.current访问 dom
       myRef1 = React.createRef(); 
   	myRef2 = React.createRef(); 
   }
   
   <input ref={this.myRef1}
   <input ref={this.myRef2}
   ````

   

### 2  生命周期（旧）

> 例子 
>
> 1. 一个重复添加定时器的错误例子

原因: 每一次进行 setState 都会导致 render函数

````js
<div style={ {opcity: this.state.opcity } } // react语法 + 表达式

render() {
    setInterval(
    	() => {
            this.state.opcity--;
            this.setState ( {} );
        },
        1000
    )
}
````

> 2. 为什么生命周期是 是方法， 而不是赋值函数。 这跟this的绑定有关系。
>
>    你当然可以把生命周期写成 赋值 + 箭头函数的形式，完全没问题！
>
>    ECMAScript 2015 提供了一种简明地定义以生成器函数作为值的属性的方法。可是作声明函数，是一种简写手段

````js
方法：             render() {}

而不是这种赋值函数   render = () =>

render() {} 是一种简写语法， 其
````

1. 在内部 会如此调用 person.render(); 通过实例对象调用原型上的render方法【隐式this】

   故不会有任何的this指向问题！所以此处使用了简写。 

2. 而比如 onClick = 'change' 其函数不通过实例调用，会导致丢失。故必须要使用箭头函数的形式才可以解决此问题！

#### 0 construcor

- 什么时候要用 constructor?
  1. 为对应的方法显示绑定this指向时
  2. 对state进行初始化的声明式
- 这种情景下都有更好的方案来替换， 故一般情况 【construcor】可忽略

#### 1 render

- render会被调用多少次？

  1. 每一次 setState时候都会调用一次
  2. 初始化时候会被调用一次

  答： n + 1次

#### 2 componentWillMount

组件将要挂载回调函数

#### 3 componentDidMount 

组件挂载回调函数

#### 4 componentWillUnMount

将要卸载组件

#### 5 componentWillReceiveProps

警告： 初次无效！接收的是 空， 第二次才会真正接收到props

##### 6 shouldComponentUpdate

`setState`会触发这里， 这里相当于阀门，控制是否update

##### 7 componentWillUpdate

`forceUpdate`会直接从这里触发往下走

接下来 render => componentDidMount

123



### 3 生命周期【新】

