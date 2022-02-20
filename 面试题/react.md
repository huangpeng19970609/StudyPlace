###  jsx的本质 

- 执行 React.createElement
- 形成VDOM， 并传入函数 

是谁在做这件事情？

- babel ： 解析JSX语法代码转为JS代码

### React的合成事件

https://juejin.cn/post/6955636911214067720#heading-28

````js
    render() {
        return <h1 onClick= {change} >{this.state.isHot}</h1>
    }
````

- 【是什么】合成事件

  本应在真实DOM上注册事件， 仅是一个【noop函数】（空函数）

  document 注册了【事件监听器】， 即 document 统一管理所有的事件

- 【为什么要叫】合成事件

  除了事件委托，它更是帮我们合成了原生事件。

  1. 如 input的 onChange事件其可能会有 多个事件【blur、input、change等】多个事件来对应

- 【为什么使用】合成事件？

  1. 事件委托，让document统一管理，防止事件绑定在原生元素事件上的复杂情况。
  2. 兼容性， 合成事件可以抹平【不同浏览器的差异】

 `react`对事件是如何合成的。

 `react`事件是怎么绑定的。

`react`事件触发流程。

#### 01 |  事件合成-> 插件机制

- 【registrationNameModules】

  记录React合成事件 与 【对应的事件插件】的关系。

  ````json
  {
      onBlur: SimpleEventPlugin,
      onClick: SimpleEventPlugin,
      onClickCapture: SimpleEventPlugin,
      onChange: ChangeEventPlugin,
      onChangeCapture: ChangeEventPlugin,
      onMouseEnter: EnterLeaveEventPlugin,
      onMouseLeave: EnterLeaveEventPlugin,
      ...
  }
  ````

- 【registrationNameDependencies】模块

  记录合成事件比如 `onClick` 和原生事件 `click`对应关系

  ````js
  {
      onBlur: ['blur'],
      onClick: ['click'],
      onClickCapture: ['click'],
      onChange: ['blur', 'change', 'click', 'focus', 'input', 'keydown', 'keyup', 'selectionchange'],
      onMouseEnter: ['mouseout', 'mouseover'],
      onMouseLeave: ['mouseout', 'mouseover'],
      ...
  }
  
  ````

- 事件插件

  【SimpleEventPlugin】、【EnterLeaveEventPlugin】

  事件插件 以 【对象形式】实现，用作【事件统一处理函数】

#### 02 | 事件的初始化

*注册事件*

- 先【namesToPlugins】
- 再【recomputePluginOrdering】
- 最后 【**`publishEventForPlugin`**】

> 主要形成了上述的几个重要对象，构建初始化React合成事件和原生事件的对应关系，合成事件和对应的事件处理插件关系

#### 03 | 事件绑定



### 函数组件 与 class组件的区别

1. 函数组件无生命周期、类组件有生命周期

   （**类组件是通过各种生命周期函数来包装业务逻辑的**）

   函数组件因为 Hooks的提出焕然一新

2. 函数组件无状态、类组件有状态

3. 类中this总是指向此实例，函数组件不一定。

### React hook

v16.8 （2019年）的React Hook 将【函数组件】变得更要优雅。

