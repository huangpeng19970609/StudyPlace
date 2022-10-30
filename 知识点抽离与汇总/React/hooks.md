### 	00 | 前言

https://react.docschina.org/

https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/#tldr

https://zhuanlan.zhihu.com/p/56975681#:~:text=useCallback%20%E7%9A%84%E7%9C%9F%E6%AD%A3%E7%9B%AE%E7%9A%84%E8%BF%98%E6%98%AF%E5%9C%A8%E4%BA%8E%E7%BC%93%E5%AD%98%E4%BA%86%E6%AF%8F%E6%AC%A1%E6%B8%B2%E6%9F%93%E6%97%B6%20inline%20callback%20%E7%9A%84%E5%AE%9E%E4%BE%8B%EF%BC%8C%E8%BF%99%E6%A0%B7%E6%96%B9%E4%BE%BF%E9%85%8D%E5%90%88%E4%B8%8A%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%20shouldComponentUpdate%20%E6%88%96%E8%80%85%20React.memo,inline%20callback%20%E7%9A%84%E6%9C%AA%E6%9D%A5%EF%BC%8C%20React.memo%20%E5%92%8C%20React.useCallback%20%E4%B8%80%E5%AE%9A%E8%AE%B0%E5%BE%97%E9%9C%80%E8%A6%81%E9%85%8D%E5%AF%B9%E4%BD%BF%E7%94%A8%EF%BC%8C%E7%BC%BA%E4%BA%86%E4%B8%80%E4%B8%AA%E9%83%BD%E5%8F%AF%E8%83%BD%E5%AF%BC%E8%87%B4%E6%80%A7%E8%83%BD%E4%B8%8D%E5%8D%87%E5%8F%8D%E2%80%9C%E9%99%8D%E2%80%9D%EF%BC%8C%E6%AF%95%E7%AB%9F%E6%97%A0%E6%84%8F%E4%B9%89%E7%9A%84%E6%B5%85%E6%AF%94%E8%BE%83%E4%B9%9F%E6%98%AF%E8%A6%81%E6%B6%88%E8%80%97%E9%82%A3%E4%B9%88%E4%B8%80%E7%82%B9%E7%82%B9%E7%82%B9%E7%9A%84%E6%80%A7%E8%83%BD%E3%80%82.%20%E8%AF%9D%E9%A2%98%E7%A8%8D%E6%89%AF%E8%BF%9C%E4%B8%80%E7%82%B9%E3%80%82.

1. 要启用 Hook，所有 React 相关的 package 都必须升级到 16.8.0 或更高版本

2. 依赖列表省略函数

   

3. 

### useState

#### 00 | 场景

1. 修改多个state值

   虽然可以如此，还是推荐**state 切分成多个 state 变量**

   ```js
   function Box() {
     const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
     return (...)
   }
   useEffect(() => {
     function handleWindowMouseMove(e) {
       // 展开 「...state」 以确保我们没有「丢失」
       setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
     }
     window.addEventListener('mousemove', handleWindowMouseMove);
     return () => window.removeEventListener('mousemove', handleWindowMouseMove
                                            );
   }, []);
   ```


### useCallback

- 起因：该函数将在每个渲染中重新创建， 每一次handleClick都是不同的函数对象

  ```js
  function MyComponent() {
   // handleClick is re-created on each render
    const handleClick = () => {
      console.log('Clicked!');
   };
  ```

- 场景：某些情况下你需要保留功能实例

  1. 包装在`React.memo()`的内部的组件
  2. 当函数用作其他钩子的依赖项时

- `handleClick`变量在渲染之间始终具有与回调函数相同的对象`MyComponent`。

  ```js
  import React, { useCallback } from 'react';  
  function MyComponent() {
   // handleClick is the same function object
    const handleClick = useCallback(() => {
      console.log('Clicked!');
   }, []);
   // ... 
  }
  ```

### useRef

#### 作用

1. 「ref」 对象是一个 `current` 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性
2. 跨渲染周期”保存数据

####  场景

1. effect只在【更新时】使用

   即我们需要区分首次渲染、还是后续渲染，方案是使用一个可变的ref存储值表示阶段。并在effect中检查此标识。利用跨周期的特性。	

2. 定时器Id

   ```js
     useEffect(() => {
       timerID.current = setInterval(()=>{
           setCount(count => count + 1);
       }, 1000); 
     }, []);
   ```

   

3. 如何获取上一轮的【props】与【state】

   这是一个案例。

   ```jsx
   function Counter() {
       const [count, setCount] = useState(0);
       const prevCountRef = useRef();
       useEffect(() => {
           prevCountRef.current = count;
       })
       const preCount = prevCountRef.current;
       return <h1>Now: {count}, before: {prevCount}</h1>;
   }
   ```

   - 首次渲染
     1. count为【0】
     2. prevCount为 【null】
     3. 渲染界面成功
     4. useEffect生效，prevCountRef.current 存储 【0】
   - 第二次渲染
     1. count 为 【100】
     2. prevCount 为 【0】
     3. 页面渲染成功
     4. prevCount  为【100】

### useEffect

#### 场景

> 1. 【useEffect】在依赖列表中省略函数是否安全
> 2.  effect的依赖项频繁变化，我们选择忽略state

1. effect的依赖项频繁变化，我们选择忽略state

   ```js
   function Counter() {
     const [count, setCount] = useState(0);
     useEffect(() => {
       const id = setInterval(() => {
         // ❌ setCount(count + 1);
         setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
       }, 1000);
       return () => clearInterval(id);
     }, []); // ✅ 我们的 effect 不适用组件作用域中的任何变量
     return <h1>{count}</h1>;
   }
   ```

2. 

#### state依赖state

**方案：** 尝试用 [`useReducer` Hook](https://react.docschina.org/docs/hooks-reference.html#usereducer) 把 state 更新逻辑移到 effect 之外

#### 场景-如何正确地请求数据

1. 变量的数组为空，则在更新组件时钩子根本不会运行，因为它不必监视任何变量

2. asycn

   - Effect 只能是一个同步函数，因为其应保证清理函数被立即调用

   ```js
   useEffect(() => {
       async function fetchMyAPI() {
           let url = 'http://something/' + productId
           const response = await myFetch(url)
       }
    
       fetchMyAPI()
   }, [productId])
   ```

#### 场景-函数当做effect的依赖

1. 我应该把函数当做effect的依赖吗？

   - ❗**只有** 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略

     ```js
     function Example({ someProp }) {
       useEffect(() => {
         function doSomething() {
           console.log(someProp);    
         }
         doSomething();
       # // ✅ 安全（我们的effect仅用到了`someProp`）}
       }, [someProp]); 
     ```

   - **推荐的修复方案：把那个函数移动到你的 effect 内部**（便于你effect更加直观的看出用了哪些prop与state）

     1. 如果这个函数无法放于effect内部

        - 尝试将此函数移动到你的组件之外
        - 尝试 effect 之外调用它，再用effect依赖其返回值触发

     2. useCallback

        万不得已下，**把函数加入 effect 的依赖但 把它的定义包裹** 进 [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback) Hook（确保了它不随渲染而改变，除非 *它自身* 的依赖发生了改变）

        ````jsx
        function ProductPage({ productId }) {
          // ✅ Wrap with useCallback to avoid change on every render
          const fetchProduct = useCallback(() => {
            // ... Does something with productId ...
          }, [productId]); // ✅ All useCallback dependencies are specified
        
          return <ProductDetails fetchProduct={fetchProduct} />;
        }
        # 子
        function ProductDetails({ fetchProduct }) {
          useEffect(() => {
            fetchProduct();
          }, [fetchProduct]); // ✅ All useEffect dependencies are specified
          // ...
        }
        ````

#### **无限重复请求**

1. 移除你使用的依赖固然是一个解决办法，但是建议你从根源入手
2. 把它们放到effect里
3. 提到组件外面
4. 或者用`useCallback`包一层
5. `useMemo` 以避免重复生成对象

#### effect是如何读取到最新的`count` 状态值的

effect 函数本身\*在每一次渲染中都不相同

#### 123