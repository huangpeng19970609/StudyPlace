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
     return () => window.removeEventListener('mousemove', handleWindowMouseMove);
   }, []);
   ```

2. 是

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

3. 