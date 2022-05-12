> JavaScript 语言的执行环境是“单线程”的, 【异步编程】显得尤为重要。
>
> 我们讲述的 generator 目的是为了讲述 async、await的语法糖。

### 0 总结

1. generator实现了按部就班的异步任务，是一种协程的方案。
2. 认识thunk函数，实现按名传值。
3. thunk与generator

### 1 传统的异步方案

- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

⭐而 Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。

### 2 基本概念

#### 01 | 异步

- 何为同步？

  连续的执行就叫做同步。由于连续执行，故不可以插入其他任务。

- 何为异步

  不连续的执行，就叫做异步。两段执行的任务任务。即先执行第一段，再回调第二段。

#### 02 | 回调函数

我们将第二段任务的执行称呼为【回调函数（callback）】

#### 03 | Promise

- 诞生原因

  解决“回调函数地狱”的问题。允许将回调函数的嵌套，改成链式调用。

- 弊端

  代码冗余，任何任务总是需要Promise来包裹。导致语义模糊。

故有没有更好的解决方案呢？ 这便是 generator函数

### 3 generator

更好的异步编程解决方案。

#### 01 | 协程

何为协程？是一种多任务的解决方案，多个线程互相协作，完成异步任务。

具体协程概念我们已介绍完毕，generator是半协程，只能由generator函数其本身控制其执行权。

```js
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```

- yield 便是 异步两个阶段的分界线的体现。

#### 02 | 协程的实现

> Generator 函数是协程在 ES6 的实现：最大特点就是可以交出函数的执行权（即暂停执行）

整个 Generator 函数就是一个封装的异步任务， 或是 异步任务的容器。

yield便是代表需要暂定的地方

```js
function* gen() {
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

#### 03 | Generator 函数的数据交换和错误处理

Generator 函数可以暂停执行和恢复执行, 因为它要封装异步函数。

函数体内外的数据交换和错误处理机制也是一个完美的异步编程的解决方案。

1. 数据交换

   - 使用 next 方法调用，可向generator内部传参
   - 使用 next 方法调用， generator 可以向外部传递数据

   ```js
   function* gen(x){
     var y = yield x + 2;
     return y;
   }
   
   var g = gen(1);
   g.next() // { value: 3, done: false }
   g.next(2) // { value: 2, done: true }
   ```

2. 捕获异常

   内部还可以部署错误处理代码，捕获函数体外抛出的错误，这代表着非凡的意义

   - 出错的代码与处理错误的代码，实现了时间和空间上的分离

   ```javascript
   function* gen(x){
     try {
       var y = yield x + 2;
     } catch (e){
       console.log(e);
     }
     return y;
   }
   
   var g = gen(1);
   g.next();
   # 此处代码回被 try、catch捕获到
   g.throw('出错了');
   ```

3. 异步任务的封装

   ```javascript
   var fetch = require('node-fetch');
   
   function* gen(){
     var url = 'https://api.github.com/users/github';
     var result = yield fetch(url);
     console.log(result.bio);
   }
   ```

   调用他们

   ```js
   var g = gen();
   # 第一阶段
   var result = g.next();
   
   # 第二阶段 由于 fetch是 Promise对象
   result.value.then(function(data){
     return data.json();
   }).then(function(data){
     g.next(data);
   });
   ```

   显然有一处缺点： 异步操作是简洁了，但流程管理不方便。即何时执行第一阶段、何时执行第二阶段不不方便管理的，毕竟是独立开了。

### 4 Thunk

Thunk 函数是自动执行 Generator 函数的一种方法。

#### 01 | 参数的求值策略

> Thunk 函数的诞生， 计算机学家争论 函数参数到底应在何时求值？（编译器）
>
> 没有绝对的好与坏。

1. 传值调用

   进入函数体之前，就计算`x + 5`的值（等于 6），再将这个值传入函数`f` 

   C语言便采用这种方案。

   

   ```js
   # 6 * 2
   funtion sum(x) {
       return x * 2;
   }
   ```

2. 传名调用

   直接将表达式`x + 5`传入函数体，只在用到它的时候求值。

   ```js
   # ( x + 5 ) * 2
   funtion sum(x) {
       return x * 2;
   }
   ```

   而 Thunk函数便是实现 【传名调用的解决方案】

#### 02 | Thunk函数

```js
function f(m) {
  return m * 2;
}

f(x + 5);

# 等价于
var thunk = function () {
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
}

f(x + 5);
```

这是编译器实现的方案，类似于使用了一个临时函数，调用时，再执行这个临时函数以求参数表达式。

Thunk 函数的定义： 【临时函数】 替代 【参数】， 以实现【传名调用】，目的略微提高性能。

#### 03 | JavaScript 与 thunk

1. JavaScript 是按值传递，其讲述的便是这种事情。

   ```js
   // 正常版本的readFile（多参数版本）
   fs.readFile(fileName, callback);
   ```

2. 你可以在 【JavaScript 】中实现 thunk函数，这是一件非常容易的事情。

   ````js
   // Thunk版本的readFile（单参数版本）
   var Thunk = function (fileName) {
   
     return function (callback) {
       return fs.readFile(fileName, callback);
     };
   };
   ````

   使用Thunk函数。

   ❗ 我们替换的不可能是表达式，而是多参数的函数。将其替换成一个只接受回调函数作为参数的单参数函数。

   ```js
   var readFileThunk = Thunk(fileName);
   readFileThunk(callback);
   ```

   ❓为什么

   1. 传参必然会触发表达式求值，故无法规避，但函数声明是可以实现的。

      我们的目的只是要获得一个按名传递的函数，仅此而已， 仅有函数参数才符合我们的按名传递的要求。

      ```js
      # 这是通用的 thunk函数封装器。
      const Thunk = function(fn) {
        return function (...args) {
          return function (callback) {
            return fn.call(this, ...args, callback);
          }
        };
      };
      ```

   2. 在JS中，为什么我们将 【只接受回调函数作为参数的单参数函数】称作为 【Thunk】函数？

      ```js
      return function (callback) {...}
      ```

      - thunk遵循 按名传递， 而仅在 函数名称传递的时候是遵循这个规则的

      - 一旦涉及的参数传递，它就不能是一个 按名传递。

      - 故我们目的就是实现一个 【Thunk函数】，实现的过程只是一种手段，

        不管怎么样，即便是多此一举，违背了JS语言本身的特性，但我们就是实现了，毋庸置疑。

   3. Thunk有啥用？

      答： 确实没用。但Thunk 函数现在可以用于 Generator 函数的自动流程管理，其很好用！

### 5 流程管理

#### 01 | Generator的流程管理

- 异步

  ```javascript
  var fs = require('fs');
  var thunkify = require('thunkify');
  var readFileThunk = thunkify(fs.readFile);
  
  var gen = function* (){
    # 执行权移出Generator 
    var r1 = yield readFileThunk('/etc/fstab');
    console.log(r1.toString());
    # 执行权移出Generator 
    var r2 = yield readFileThunk('/etc/shells');
    console.log(r2.toString());
  };
  ```

- 异步调用

  1. 变量g是 Generator 函数的内部指针， 表示目前执行到哪一步
  2. next  是 【Generator】将其 执行权 再次给与的过程。
  3. yield 是 【Generator】控制冻结的状态，移出generator的执行权。

  ```javascript
  # Generator 函数的内部指针
  var g = gen();
  # 执行权
  var r1 = g.next();
  r1.value(function (err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
      if (err) throw err;
      g.next(data);
    });
  });
  ```

#### 02 | Thunk 的自动流程管理

- hunk函数来实现
  1. 一定需要一种回调函数来实现next的调用（这与按名传递不谋而合）
  2. 不一定要thunk函数实现，即便是普通的回调函数也是可以实现的。使用thunk更像是一种约定俗成的方案，有利于代码的良好维护性。
  3. 自动执行的关键在于 如何控制执行权。Promise、回调函数都可以做到如此。

而 Thunk函数的意义到底是什么呢？

```javascript
# 传入参数为 generator函数 （遍历器对象生成函数）
function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    # 如果没结束，就将next函数再传入 Thunk 函数
    result.value(next);
  }
  next();
}

function* g() {
  // ...
}

run(g);
```

这样会怎么样呢？

```javascript
var g = function* (){
  var f1 = yield readFileThunk('fileA');
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};
run(g);
```

1. 函数`g`封装了`n`个异步的读取文件操作
2. 只要执行`run`函数，这些操作就会自动完成

解释

```javascript
# result.value是什么？ 是 yield 语句的返回结果
result.value(next);

# 第二个问题：yield 语句的返回结果 是什么？是 readFileThunk('fileA'); 
yield  readFileThunk('fileA'); 

# readFileThunk 是一个函数, 其最终是 function (callback) {...}
// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    # result.value 的函数体
    return fs.readFile(fileName, callback);
  };
};
var readFileThunk = Thunk(fileName);

# 故 会触发 fs.readFile
# fs.readFile 是Node环境提供，其会自动的执行callback
# 而 callback 就是我们的下一步
result.value(next);
  result.value =>  return function (callback) { return fs.readFile(fileName, callback); }

```

#### 03 | co模块

用于 Generator 函数的自动执行。TJ Holowaychuk 于 2013 年 6 月发布的一个小工具。

```js
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

co(gen);
```

之前讨论过，如何实现自动流程模块

1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权
2. Promise 对象。将异步操作包装成 Promise 对象，用`then`方法交回执行权

而CO模块

 	1. co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。

2. 故使用 co 的前提条件是，Generator 函数的`yield`命令后面，只能是 Thunk 函数或 Promise 对象。

#### 04 | Promise对象的自动执行

1. 封装

   ```js
   var fs = require('fs');
   
   # 封装异步任务
   var readFile = function (fileName){
     return new Promise(function (resolve, reject){
       fs.readFile(fileName, function(error, data){
         if (error) return reject(error);
         resolve(data);
       });
     });
   };
   # 流程管理
   var gen = function* (){
     var f1 = yield readFile('/etc/fstab');
     var f2 = yield readFile('/etc/shells');
     console.log(f1.toString());
     console.log(f2.toString());
   };
   
   # 手动
   var g = gen();
   g.next().value.then(function(data){
     g.next(data).value.then(function(data){
       g.next(data);
     });
   });
   ```

2. 自动调用

   ```js
   function run(gen){
     var g = gen();
     function next(data){
       var result = g.next(data);
       if (result.done) return result.value;
       result.value.then(function(data){
         next(data);
       });
     }
   
     next();
   }
   
   run(gen);
   
   
   ```

