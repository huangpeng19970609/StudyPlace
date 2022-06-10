### 00 | 前言

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



### useRef

- 「ref」 对象是一个 `current` 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性

#### 00 | 场景

1. effect只在【更新时】使用

   即我们需要区分首次渲染、还是后续渲染，方案是使用一个可变的ref存储值表示阶段。并在effect中检查此标识。

2. 如何获取上一轮的【props】与【state】

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

1. 【useEffect】在依赖列表中省略函数是否安全

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
        - 万不得已下，**把函数加入 effect 的依赖但 把它的定义包裹** 进 [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback) Hook（确保了它不随渲染而改变，除非 *它自身* 的依赖发生了改变）

2.  effect的依赖项频繁变化，我们选择忽略state

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

#### 03 | state依赖state

**方案：** 尝试用 [`useReducer` Hook](https://react.docschina.org/docs/hooks-reference.html#usereducer) 把 state 更新逻辑移到 effect 之外

···