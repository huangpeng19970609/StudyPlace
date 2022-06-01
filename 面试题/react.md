###  1 jsx的本质 

- 执行 React.createElement
- 形成VDOM， 并传入函数 

是谁在做这件事情？

- babel ： 解析JSX语法代码转为JS代码

### 2 React的合成事件 (事件机制)

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



### 3 函数组件 与 class组件的区别

1. 函数组件无生命周期、类组件有生命周期

   （**类组件是通过各种生命周期函数来包装业务逻辑的**）

   函数组件因为 Hooks的提出焕然一新

2. 函数组件无状态、类组件有状态

3. 类中this总是指向此实例，函数组件不一定。

### 4 React hook

v16.8 （2019年）的React Hook 将【函数组件】变得更要优雅。



### 5 React 的 setState 是 异步还是同步的？

答案：不一定。

但 setState  的更新可能是同步的。因为 state、props的更新可能是同步的。

setState的回调任务，可能是异步也可能是同步。

- 在【原生事件】、【setTimeout】这种异步事件中，它表现的便是同步。

  由React控制之外的事件中调用setState是同步更新的。

  原因： 在执行异步代码的时候 ， 当前的执行栈中是同步的。

- 而在 【合成事件】、【生命周期钩子函数】上，表现的是异步。

  由React控制的事件处理程序，以及生命周期函数调用setState不会同步更新state 。

### 6 React-Redux

- 为什么我们需要Redux

  React 有props 与 state， props代表获取父级分发下来的属性，state代表组件内部自行管理的状态。

  故 React没有数据向上回溯的能力。即React的数据只能向下分发。

  1. 大多的时候发现React根本无法让两个组件互相交流，而我们总是通过提升state放置于共有的父组件来管理实现的。
  2. 子组件改变父组件state， 只能通过触发父组件声明好的回调。

  故我们现在需要一个更专业的工具来帮助我们实现此步骤。

- Redux

  1. 回调通知state -> action，更像是 依赖派发的 过程

     action是一个发送的事件 （data、action.type）

  2. 根据回调(action)处理 -> reducer， 依赖派发的结果

     reducer是一个匹配函数

  3. store (通过state、reducer来共同完成)

     state 仅是数据结构

      store负责存储状态并可以被react api回调，发布action

- Redux-React

  1. 为什么需要Provider

     这是一个普通的高阶组件，我们需要提供store，目的是它会将state分发给所有被connect的组件。

     不管它在哪里，被嵌套多少层。

     故 connect函数才是重点。

  2. connect函数

     参数一： mapStateToProps，注入你需要的Redux状态至props

     参数二： mapDispatchToProps，注入你需要的action至props， 他总是dispatch(action)

     dispatch 包裹它的目的便是为了触发reducer。

     柯里化函数参数： 将要绑定的组件本身

- 总结
  1. 顶层分发状态，让React组件被动地渲染。
  2. [监听事件](https://www.zhihu.com/search?q=监听事件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A90782136})，事件有权利回到所有状态顶层影响状态。

### 7 实现一个简单的Redux

```js
function createStore(reducer) {
  let listeners = [];
  let currentState;
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach((l) => l());
  }
  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== fn);
    };
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

### 8 useEffect 依赖传空数组和 componentDidMount 有什么区别吗？

### 9 useeffect 和 useLayouteffect 区别

### 10 React.memo()和 React.useMemo()

### 11 useCallback 和 useMemo

### 12 React.fiber 了解吗？造成卡顿的原因是什么？react.fiber 里面是怎么解决的？中断更新之后，下次是如何找到要更新的位置的？

### 13 高阶组件里面如何防止 ref 丢失？

### 14 hooks 实现原理？不用链表可以用其他方法实现吗？

### 15 能在 if 判断里面写 hooks 吗？为什么不能？

### 16 redux 怎么挂载中间件的？它的执行顺序是什么样的？

### 17 redux 里面 dispatch 是如何正确找到 reducer 的？

