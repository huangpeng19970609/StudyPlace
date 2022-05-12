### 1 event中target与currentTarget的区别

1. target返回的触发事件的元素 

   ⭐ 我们最常会用target进行 `事件委托`

   我虽然给的是一个 大的父极绑定的元素，

   但是点击哪个子元素时，event.target返回的是点击的元素节点

2. currentTarget返回绑定事件的元素

### 2 instanceof的原理

- 原理是 构造函数的 prototype 属性是否出现在对象的原型链中的任何位置、

  故instanceof总是返回的true与false

### 3 ES5 和 ES6 分别几种方式声明变量

 `let`、`const`、`class`声明的全局变量再也不会和全局对象的属性挂钩

- ES5 有俩种：`var` 和 `function`
- ES6 有六种：增加四种，`let`、`const`、`class` 和 `import`

但其本质都是 let、var、const

### 4 DOM 事件有哪些阶段？谈谈对事件代理的理解

- 事件代理： 

  事件不直接绑定到某元素上，而是绑定到该元素的父元素上， 此后再通过条件判断子元素。

  好处： 代码简洁，且开销更小

- 捕获阶段--目标阶段--冒泡阶段

  故 你可以获取 e.target 你点击的元素， 也可以获取到 e.currentTarget你绑定事件的元素

  1. **捕获阶段** (从根节点开始顺着目标节点构建一条事件路径，`即事件由页面元素接收，逐级向下，到具体的元素`)

  2. **目标阶段** (到达目标节点，`即元素本身`)
  
  3. **冒泡阶段** (从目标节点顺着捕获阶段构建的路径回去， `即跟捕获相反具体元素本身，逐级向上，到页面元素`)

### 5 requestAnimationFrame

js做动画是以定时器为核心实现，下一次的宏任务可能被上一次的宏任务堵塞。

1. 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成

2. 更加智能。 更加的在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流

3. requestAnimationFrame更像是一个独立的任务队列。 GUI渲染之前执行，但在微服务之后。

   绝对是一个异步任务

### 6 Object.is(val, val2)

> 略微的更合理了一些

1. Object.is(valueA,valueB) 以与严格相等运算符相同的方式检查相等性的参数
2. NaN 等于另一个 NaN 值
3. Object.is() 区分 -0 和 +0

### 7 隐式转换

- 共有

  ````js
  Number()
  String()
  Boolean() // 用 !! 同理
  parseInt()
  parseFloat()
  ````

### 8 如何让 a === 1 & a === 2

```js
var a = {
    value: 0,
    valueOf :function(){
        this.value++;
    	return this.value;
	}
}
```

### 9 函数柯里化（Currying）

<<<<<<< HEAD
###### 一个函数返回一个函数这便是函数柯里化。
=======
一个函数返回一个函数这便是函数柯里化。
>>>>>>> 2f9b1cf7b276e51ea5a21d2c3ad9205851816ab6

### 10 原型链

#### 01 | 概念

````js
Person() 	  prototype  ->			Person.prototype 
        		 	 	  
Person() 	  <- constructor	    Person.prototype 

Person()	  <- constructor		person    	

person		   __proto__ ->			Person.prototype 
````

1. prototype

   废话： 构造函数 有 【prototype】属性， 即 原型对象A.protptype 

   实例对象  `__proto__` 等同于 A.prototype

2. constructor

   【实例对象】和【原型对象】有构造函数

#### 02 | 题目

1. 第一道题目

   a 是 实例对象， 故 a 有 --proto--，显然为false

   a的原型对象， 即 【--proto--】， 故为true

   ```js
   var a = {}
   var b = Object.prototype
   
   # [false, true]
   console.log([a.prototype === b, Object.getPrototypeOf(a) == b]);
   ```

2. 第二道题目

   f 为构造函数， a 为原型对象

   b 获取到 构造函数的原型对象， 故为true

   ```js
   function f() {}
   var a = f.prototype 
   var b = Object.getPrototypeOf(f); 
   
   console.log(a === b); 
   ```


### 11  作用域与作用域链

#### 作用域

- 作用域

  定义变量的区域。作用域规定了如何查找变量。

- JavaScript的作用域 是 【静态作用域】

  JavaScript 使用【词法作用域】， 即【静态作用域】，即 【词法作用域】实现了JavaSCript的作用域

  ⭐ 函数的作用域在函数定义的时候就决定了！

  ````js
  var value = 1;
  
  function foo() {
      console.log(value);
  }
  
  function bar() {
      var value = 2;
      foo();
  }
  # 若是 动态 答案便是 2 -> 但其显然不是, 因为作用域已经在函数定义时候确定下来。
  # 若是 静态 答案便是 1
  bar();
  ````

- 块级作用域

   使用let、const声明的才会有【块级作用域】

  - 为什么 let 、const 有块级作用域呢？  

    因为 作用域 的意义 就在于 服务于【变量】的访问权限的。

    目的是：  ES6的 let、const的特性的实现。

  - ES5之前只存在【全局作用域】与【函数作用域】

#### 执行上下文（栈）

> 此外这里要讲述一件事情
>
> 1. JavaScript的【解释阶段】 （JavaScript属于解释型语言）
>
>    - 词法分析
>    - 语法分析
>    - 作用域分析   （ ⭐  **作用域在定义时就确定，并且不会改变**  ）
>
> 2. JavaScript的【执行阶段】（或许你可以称呼其运行阶段）
>
>    - 创建执行上下文  （ ⭐**执行上下文在运行时确定，随时可能改变** ）
>
>      【变量对象（变量提升）】、【this】、`【作用域链】`（闭包）
>
>    - 执行函数代码
>
>    - 垃圾回收

⭐ 当遇到【可执行代码】时，便会进行【执行上下文】

- 可执行代码

  1. 类型： 【全局代码】【函数代码】【eval代码】。

  2. 执行上下文

     当遇到【可执行代码】时，便会进行【准备工作】，我们称呼其为【执行上下文】

- 执行上下文栈

  JS引擎中负责管理【执行上下文】的stack， 便是【执行上下文栈】

  1. 底栈总是【全局执行上下文】
  2. 函数的执行的开始与结束，就是入栈与出栈

- 示范

  这个概念指的是【函数提升】

  ⭐ 当开始执行， 全局【执行】上下文，这个准备工作，便包括了变量提升

  ```js
  function foo() {
      console.log('foo1');
  }
  
  foo();  // foo2
  
  function foo() {
  
      console.log('foo2');
  
  }
  
  foo(); // foo2
  ```

#### 作用域链

https://github.com/mqyqingfeng/Blog/issues/6

- 查找变量时

  1. 先从当前上下文的变量对象中查找
  2. 从上一级的执行上一份的变量对象查找，直至全局上下文。

  这种查找方式，多个执行上下文的变量对象构成的链表， 便是作用域链了

### 12 ES6的新特性

1. const 和 let

   - 不许重复声明
   - 暂时性死区

2. 解构赋值

3. 模板字符串

4. 函数拓展、箭头函数

5. 数组拓展，

   - 拓展运算符

   - 方法的拓展： 

     Array.from、findIndex、entries、includes、flat、fill

6. 对象拓展

   - 一种属性的简洁写法， let a = { foo }
   - 一种方法的简洁写法 {  hello() {} }
   - 属性名支持表达式了！
   - `Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象
   - 对象的拓展运算符 

7. 表达式的拓展

   1. 可选链

   2. 指数运算符

   3. ES2020 提供了 ?? 运算符

      ````js
      const enable = props.enabled ?? true;
      ````

8. 新的数据类型：Symbol

   新的数据结构：Set、Map

9. 异步编程

   - Promise： 异步编程的解决方案

   - Iterator和for...of
     1. Iterator为各种数据提供统一的，简便的访问接口。
     2. 供for...of用

   - Generator与 async await

     ⭐ 执行 Generator 函数会返回一个遍历器对象。

     ````js
     function* helloWorldGenerator() {
       yield 'hello';
       yield 'world';
       return 'ending';
     }
     ````

     Async await是ES2017的标准，是generator的一个语法糖。是基于协程的 Generator 函数实现的。

10. Class

11. Proxy、Reflect

    - Proxy 用于修改某些操作的默认行为
    - `Reflect`对象的方法与`Proxy`对象的方法一一对应

### 13 0.1 + 0.2 === 0.3

不等于。 

```js
0.1 + 0.2 === 0.30000000000000004
```

数字使用 Number类型表示，储遵循 `IEEE 754` 标准， 64 位双精度格式表示一个数字。

- 1 符号位，0 表示正数，1 表示负数 s
- 11 指数位（e）
- 52 尾数，小数部分（即有效数字）

而 有效的数字，双精度浮点的小数部分最多只能保留 52 位。加首位，便是53位数。

> 0.1 的二进制: 1.1001100110011001100110011001100110011001100110011010 * 2^-3
>
> 0.2的二进制:0.1100110011001100110011001100110011001100110011001101(0) * 2^-3

故 0,1 + 0.3 在进行运算时候的过程，最后结果是 0.3000000004

- 答案

  1. **进制转换*中出现了精度丢失，毕竟无限循环的二进制。

  2. **对阶运算**中精度也出现了丢失。JS 引擎对二进制进行截断，所以造成精度丢失。（故01. === 0.1）

     但0.1 + 0.2的精度的截取中恰好出现了

- 解决办法

  1. 0.1 + 0.2 - 0.3 < Number.EPSILON

     若小于极小数，那便是相等的，不过这要求你必须提前知道结果。

  2. 将他们都乘以更大的数字，避免小数层次的比较，以免出现0.1 + 0.2的现象

- 不仅仅是0.1 + 0.2

  ```js
  0.7 + 0.1 === 0.7999999999999999
  0.2 + 0.4 = 0.6000000000000001
  2.22 + 0.1 = 2.3200000000000003
  19.9 * 100 = 1989.9999999999998
  0.3 / 0.1 = 2.9999999999999996
  ```

- 建议

  1. **Math.js**库、**decimal.js**、**big.js**、

  2. toFixed() 方法使用定点表示法来格式化一个数，会对结果进行四舍五入

     一般 10 精度就可以解决一般项目情况。

     ````js
     parseFloat((1.0 - 0.9).toFixed(10)) // 结果为 0.1   
     parseFloat((0.3 / 0.1).toFixed(10)) // 结果为 3  
     parseFloat((9.7 * 100).toFixed(10)) // 结果为 970 
     parseFloat((2.22 + 0.1).toFixed(10)) // 结果为 2.32
     ````

  3. 更加复杂的方案，对加减乘除进行处理，不在考虑小数情况。

     - 先浮点数转换字符串，分隔成为整数部分和小数部分
     - 小数部分再转换为整数
     - 再转换为浮点数。

### 14 事件是如何实现的

比如dom的点击事件。都是 基于发布订阅模式。

- DOM0 级事件：  直接html 元素上绑定 on-event。仅许一个。
- DOM2 级事件： 通过 addEventListener 注册事件。 支持多个事件。
- DOM3级事件，增加了事件类型，比如 UI 事件，焦点事件，鼠标事件

### 15 new 一个函数发生了什么

1. 创建了一个对象

2. 这个对象会被执行 [[Prototype]] 连接，

   将这个新对象的 [[Prototype]] 链接到这个构造函数 prototype 所指向的对象

3. 这个新对象会绑定到函数调用的 this。

4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

   - 若返回其他的对象

     即 此new最后的返回结果是 此返回对象。

   - 不返回对象

     依旧此new创建的对象。

### 13 symbol 有什么用处

1. 一个独一无二的变量防止命名冲突

2. ES6的应用方面

   - Symbol作为key时， 不会被常规的遍历方法遍历到。

     Object.getOwnPropertySymbols 只有它可以，故可以模拟私有变量

   - 提供遍历接口，布置了 `symbol.iterator` 的对象才可以使用 `for···of` 循环

     调用之后回返回一个遍历器对象，

     包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕

### 14 闭包

JavaScript的代码的整个执行过程分为【编译阶段】与【执行阶段】

- 编译阶段由编译器完成。
  1. 语法分析、词法分析
  2. 作用域规则确定
- 执行阶段由引擎执行（如V8），执行上下文在这个阶段创建。

而闭包便是由【执行上下文】和【执行上下文】中创建的函数构成。

### 15 讲一讲异步

1. setTimeout
2. MutationObserver / postMessage -> vue-2的nextTick实现
3. Promise、async与await、generator

### 16 不想访问原型

所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。

这个方法可以用来检测一个对象是否含有特定的自身属性，

和in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。