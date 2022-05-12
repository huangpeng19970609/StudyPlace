> Generator 函数

### 0 归纳总结

1. Generator 函数是什么？

   - 本质： 遍历器对象生成函数。
   - 你也可以： 是一种可以暂停执行的函数（上下文、next、yield、状态机）

   - 目的：异步变成解决方案（不在此章节讲述）。

2. 本章重点强调是的它的另一个特点【状态机】（这也是异步编程解决方案的基石）

3. 任意一个对象的`Symbol.iterator`实现了遍历器对象生成函数，都可以使用【for...of】

   Generator 函数便是一个遍历器对象生成函数

4. throw、return、next的本质：使用不同的语句替换`yield`表达式

5. 你可以使用next 传参，修改 yield表达式的返回值，从而进行修改内部的【generator函数】

6. yield*  是 Generator 函数中 for...of 的语法糖

7. Generator 函数与与普通构造函数的不同之处

   - Generator 其返回的是遍历器对象，普通构造函数（new）返回的是this
   - Generator 可以暂停执行，暂时退出堆与栈，冻结当前状态⭐

8. generator是一个半协程机制，不完全实现。

   Generator 函数的调用者，才能将程序的执行权还给 Generator 函数，而不是任何函数都可以做到。

9. generator应用

   1. 状态机：控制流管理
   2. 处理数据： Iterator 接口
   3. 异步操作的同步表达（按部就班）

---

### 1 Generator 

1. ⭐ Generator 函数是 ES6 提供的一种异步编程解决方案，但似乎后来未使用？

2. Generator 函数有多种理解角度

   - 语法上，Generator 函数是一个状态机，封装了多个内部状态
   - 运行时，执行 Generator 函数会返回一个遍历器对象，返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态
   - 形式上，Generator 函数是一个普通函数，但其有两个特征

3. Generator 函数特征

   - `function`关键字与函数名之间有一个【星号】

     ```js
     # 建议使用此种，虽然ES6未严格要求
     function* foo(x, y) { ··· }
     ```

   - 函数体内部使用`yield`表达式， 义不同的内部状态（`yield`在英语里的意思就是“产出”）

   - 这更像是一个暂缓执行函数，你必须调用next才将其执行

     ```js
     let f = foo(); // 实际上并不执行
     ```

     

4. Generator 函数

   - 三个状态

     内部有两个`yield`表达式（`hello`和`world`），故即该函数有三个状态：hello，world 和 return 语句（结束执行）

     ````js
     function* helloWorldGenerator() {
       yield 'hello';
       yield 'world';
       return 'ending';
     }
     ````

   - 调用它

     调用 Generator 函数后，该函数并不执行，返回一个内部状态的指针对象（即遍历器对象【Iterator】）

     ```js
     var hw = helloWorldGenerator();
     ```

     Generator 函数是分段执行的。调用遍历器对象的`next`方法，使得指针移向下一个状态。

     ```js
     hw.next()
     // { value: 'hello', done: false }
     
     hw.next()
     // { value: 'world', done: false }
     
     hw.next()
     // { value: 'ending', done: true }
     
     hw.next()
     // { value: undefined, done: true }
     ```

     1. `yield`表达式是暂停执行的标记，而`next`方法可以恢复执行

     2. 一直执行到`return`语句（如果没有`return`语句，就执行到函数结束）

        其 遍历器返回的值，便是其return 的值。

   - 总结
     1. 调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
     2. 以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的对象。
     3. `value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。

### 2 yield表达式

- 认识yield
  1. Generator 函数返回的遍历器对象， 调用`next`方法才会遍历下一个内部状态
  2. 【yield】提供了一种可以暂停执行的函数，遇到【yield】就暂停执行后面的操作
  3. 但遇到【return】时也会结束。
- yield与return 的区别
  1. 不同点： 你可以执行多个yield，但只能执行一次return
  2. 相同点： 他们都是返回紧跟在语句后面的那个表达式的值
  3. 不同点： `yield`表达式只能用在 Generator 函数里面

### 3 与 Iterator 接口的关系

关于迭代器

> 1. 任意对象的【Symbol.iterator】属性，其等同于自己的【遍历器生成函数】。调用此函数便会返回该对象的一个遍历器对象。
>
> 2. 执行 Generator 函数会返回一个遍历器对象
>
> 综上两条，⭐ 【Generator 函数】便是【遍历器生成函数】
>
> 故我们提起【迭代器】的时候总是会将【Generator函数】也提及

1. 让一个对象拥有迭代属性

   ```js
   const myIterable  = {}
   myIterable[Symbol.iteraotr] = function* me() {
       yield 1;
       yield 2;
       yield 3;
   }
   [...myIterable] // [1, 2, 3]
   
   # 但
   function* foo() {
     yield 1;
     yield 2;
     yield 3;
     yield 4;
     yield 5;
     // 请注意: 6不在 for...of循环中
     return 6;
   }
   # 遍历器对象
   for (let v of foo()) {
     console.log(v);
   }
   // 1 2 3 4 5
   ```

2. Generator 函数执行后，返回一个遍历器对象。

   此遍历器对象的`Symbol.iterator`属性便是自身。

   ```js
   function* gen(){
     // some code
   }
   var g = gen();
   g[Symbol.iterator]() === g
   ```

3. 场景： 使用 Generator 函数来迭代属性、与值吧！

   ```js
   function* objectEntries(obj) {
       const propKeys = Reflect.ownKeys(obj)
       for (let prop of propKeys) {
           yield [prop, obj[propKeys]]
       }
   }
   const obj = {name: '1'}
   for (let [key, value] of objectEntries(obj)) {
       console.log(key, value)
   }
   ```

4. 场景： 更加符合遍历一个对象的场景

   Generator 函数加到对象的`Symbol.iterator`

   ````js
   # Uncaught TypeError: Reflect.ownKeys called on non-object
   # 故我们使用了 Object.keys
   function* objectEntries() {
     let propKeys = Object.keys(this);
     for (let propKey of propKeys) {
       yield [propKey, this[propKey]];
     }
   }
   
   let jane = { first: 'Jane', last: 'Doe' };
   
   jane[Symbol.iterator] = objectEntries;
   ````

5. 此外，一旦你可以实现一个迭代器函数，那么就代表

   1. for of
   2. 拓展运算符
   3. 解构赋值
   4. Array.from

   以上的方法你都可以使用迭代器函数进行自己的处理

   ```js
   function* generator() { yield 1; yield 2; }
   # 1
   [...generator()] // (2) [1, 2]
   # 2
   let [c, d] = generator(); // c: 1, d:2
   # 3
   Array.from(numbers()) // [1, 2]
   # 4
   for (let n of numbers()) {
     console.log(n)
   }
   ```

### 4 throw

> Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在【函数体外】抛出错误，然后在 Generator 函数体内捕获.
>
> 将使用一些例子去讲述 throw
>
> 1. 你真的有必要纠结throw的规则吗？



#### 01 | 仅可捕获throw一次

```js
var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获', e)
    }
}

var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
}catch(e) {
    console.log('外部捕获', e)
}
// 内部捕获 a
// 外部捕获 b
```

1. 抛出的第一个错误

   第一个错误被 Generator 函数体内的`catch`语句捕获

2. 抛出的第二个错误

   由于已经被捕获到，故不会再捕捉到这个错误了，故其抛出了 Generator 函数体，被catch捕获到。

注意事项

- 上面代码的错误，是用遍历器对象的`throw`方法抛出的，而不是用`throw`命令抛出的

#### 02 | throw

不要混淆遍历器对象的`throw`方法和全局的`throw`命令

1. 全局下的throw

   函数体外的`catch`语句块，捕获了抛出的`a`错误以后，就不会再继续`try`代码块里面剩余的语句了

   ````js
   try {
     throw new Error('a');
     throw new Error('b');
   } catch (e) {
     console.log('外部捕获', e);
   }
   // 外部捕获 [Error: a]
   ````

2. Generator 函数内部没有部署`try...catch`代码块

   没有部署`try...catch`代码块，所以抛出的错误直接被外部`catch`代码块捕获

   ````js
   var g = function* () {
     while (true) {
       yield;
       console.log('内部捕获', e);
     }
   };
   
   var i = g();
   i.next();
   
   try {
     i.throw('a');
     i.throw('b');
   } catch (e) {
     console.log('外部捕获', e);
   }
   // 外部捕获 a
   ````

3. 内部和外部都没有部署， 直接报错

   ````js
   var gen = function* gen(){
     yield console.log('hello');
     yield console.log('world');
   }
   
   var g = gen();
   g.next();
   g.throw();
   // hello
   // Uncaught undefined
   ````

4. `throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法。

   - 第一次执行`next`方法，等同于启动执行 Generator 函数的内部代码

   - 若连第一次next方法都没有执行，即 Generator 函数从来没有执行，故也不可能其被内部捕获的状态

     故`throw`方法抛错只可能抛出在函数外部

   ```javascript
   function* gen() {
     try {
       yield 1;
     } catch (e) {
       console.log('内部捕获');
     }
   }
   
   var g = gen();
   g.throw(1);
   // Uncaught 1
   ```

5. `throw`方法被捕获以后，会附带执行下一条`yield`表达式

   即 内部捕获到throw时，也会帮你执行一次next！

   即 遍历器的`throw`方法抛出的错误，不影响下一次遍历

   ```javascript
   var gen = function* gen(){
     try {
       yield console.log('a');
     } catch (e) {
       // ...
     }
     yield console.log('b');
     yield console.log('c');
   }
   
   var g = gen();
   g.next() // a
   g.throw() // b
   g.next() // c
   ```

6. Generator 函数体内抛出的错误，也可以被函数体外的`catch`捕获。

   之前我们总是在证明： Generator 函数体外抛出的错误，可以在函数体内捕获，其实反之亦可。

   ```js
   function* foo() {
     var x = yield 3;
     var y = x.toUpperCase();
     yield y;
   }
   
   var it = foo();
   it.next(); // { value:3, done:false }
   
   try {
     it.next(42);
   } catch (err) {
     console.log(err);
   }
   ```

#### 03 | 题目

```javascript
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
```

答案:

```js
starting generator
第一次运行next方法 { value: 1, done: false }
throwing an exception
捕捉错误 { value: 1, done: false }
第三次运行next方法 { value: undefined, done: true }
caller done
```

### 5 return()

generator函数返回的遍历器对象，其有return方法，可以给定返回的值，并终止Generator函数

````js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
let f = gen();
f.next();
f.return('1111')
````

### 6 next、throw、return

- 共同点

  让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式

- 特点

  1. `next()`是将`yield`表达式替换成一个值

     ```js
     const g = function* (x, y) {
       let result = yield x + y;
       return result;
     };
     
     const gen = g(1, 2);
     # 相当于将 let result = yield x + y
     # 替换成 let result = 1;
     gen.next(); // Object {value: 3, done: false}
     gen.next(1); // Object {value: 1, done: true}
     ```

     

  2. `throw()`是将`yield`表达式替换成一个`throw`语句

     ```javascript
     相当于将 let result = yield x + y
     替换成   let result = throw(new Error('出错了'));
     
     gen.throw(new Error('出错了')); // Uncaught Error: 出错了
     ```

  3. `return()`是将`yield`表达式替换成一个`return`语句

     ````js
     gen.return(2); // Object {value: 2, done: true}
     // 相当于将 let result = yield x + y
     // 替换成 let result = return 2;
     ````

### 7 yield* 表达式

如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历.

⭐ 【yield*】只是 for of 写法的替代者。

````js
function* foo() {
    yield 'a';
    yield 'b';
}
function* bar() {
    yield 'x';
    for (let x of foo()) {
        console.log(i);
    }
    yield 'y';
}

# 您需要手动的遍历另一个迭代器
for (let v of bar()){
  console.log(v); // x a b y
}
````

1. 故为了简化嵌套迭代的这种写法，ES6提供了一种新的【yield*】表达式。

   ```javascript
   function* bar() {
     yield 'x';
     yield* foo();
     yield 'y';
   }
   ```

   

### 8 对象属性 Generator 函数

```javascript
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```

### 9 Generator 的this 

1. 这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的`prototype`对象上的方法。

   如预期一样。

```javascript
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

2. 与构造函数不同的是，构造器函数总是返回的是遍历器对象，而不是this对象

   ````js
   function* g() {
     this.a = 11;
   }
   
   let obj = g();
   obj.next();
   # 故你取不到 this.a 
   obj.a // undefined
   ````

### ⭐ 10 状态机

> generator的意义

1. 理解状态函数

   clock每一次的执行都会改变 ticking

   ````js
   var ticking = true;
   var clock = function() {
     if (ticking) console.log('Tick!');
     else console.log('Tock!');
     ticking = !ticking;
   }
   ````

   如果我们使用 genraotr函数来写

   ```js
   function* clock () {
       while (true) {
           console.log('open')
           yield true;
           console.log('close')
           yield false;
       }
   }
   ```

2. 【优点】不需要额外的外部变量 （它本身就包含了一个状态信息）

   - 更符合函数式编程的思想

   - 更安全（状态不会被非法篡改

### 11 Generator 与 协程

1. 何为协程

   一种程序运行的方式。协程既可以用单线程实现，也可以用多线程实现。

   - 通过【一种特殊的子例程】（模拟多任务）也可以实现出【协程】
   - 多线程： 是特殊的线程（多线程）

2. **协程与子例程**

   - 传统的【子例程】

     以【子例程】来实现。一般而言，使用【先进后出】的执行方式。

     但通过使用【特殊的子例程形式】也可以实现出协程。

   - 协程

     协程有这些特点。

     1. 多个线程（单线程情况下，即多个函数）可以并行执行。

        但只有一个线程【函数】处于正在运行的状态。

     2. 多个线程下，正在运行的线程可以进入暂停状态，交由另一个线程（或函数）获得执行权

   - 从实现角度

     1. 子例程只使用一个栈（stack），单任务。
     2. 协程是同时存在多个栈，但只有一个栈是在运行状态。即多任务。

3. **协程与普通线程的差异**

   综上所述： 协程适合用于多任务运行的环境。

   - 差异

     1. 【协程】可以控制执行权。【普通线程】是抢先式的，由运行环境决定。
     2. 同一时间可以有多个线程处于运行状态（比如操作系统），但是运行的协程只能有一个。

   - 代表了什么

     如 JavaScript是单线程语言（只有一个调用栈），引入协程以后，每个任务可以保持自己的调用栈。

     故 JavaScript是多任务运行（函数保存在堆中）、单调用栈执行（顶栈即是运行环境）的运行环境。

4. Generator 函数是什么？

   Generator 函数被称为“半协程”（semi-coroutine），

   它并不可以让暂停的协程继续执行，仅能控制执行权、暂停函数的执行。

### 12 Generator 与上下文 

1. JavaScript 代码运行时，会产生一个全局的上下文环境。我们称呼为【运行环境】

   其包含了当前所有的变量和对象.

2. 执行【函数】、【块级代码块】时，在当前上下文环境的上层，产生一个函数运行的上下文。

   从而形成一个上下文环境的堆栈。

3. 如此反复，执行完毕出栈，直到所有代码执行完成，堆栈清空。

⭐ 而Generaotr也是这样吗？

1. Generator 函数并不遵循【上下文】环境。

2. 遇到`yield`命令， 便【退出堆栈】，但是并不消失（里面的所有变量和对象会冻结在当前状态）、

   等待【next】命令，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行

   ```js
   function* gen() {
     yield 1;
     return 2;
   }
   
   let g = gen();
   
   console.log(
     # gen的上下文会加入堆栈， 遇到 yield退出堆栈。内部状态冻结。
     g.next().value,
     # gen上下文重新加入堆栈, 变成当前的上下文.
     g.next().value,
   );
   ```

### 13 应用： 暂停函数执行

#### 01 | 异步的实现

- 加载动画

  优点： 按部就班

  ```js
  function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
  }
  var loader = loadUI();
  // 加载UI
  loader.next()
  // 卸载UI
  loader.next()
  ```

- Ajax的回调

  ```javascript
  function* main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
      console.log(resp.value);
  }
  
  function request(url) {
    makeAjaxCall(url, function(response){
      it.next(response);
    });
  }
  
  var it = main();
  it.next();
  ```

- 读取文本文件

  ```js
  function* numbers() {
    let file = new FileReader("numbers.txt");
    try {
      while(!file.eof) {
        yield parseInt(file.readLine(), 10);
      }
    } finally {
      file.close();
    }
  }
  ```

#### 02 | 控制流的管理

- 控制流（根据某个状态决定是否要继续下一步的执行）

  ⭐ 我们强调是控制流程的执行。

  ```js
  # 或者是 step1 => step2 => step3 => step4 这种控制流的关系描述
  step1(function (value1) {
    step2(value1, function(value2) {
      step3(value2, function(value3) {
        step4(value3, function(value4) {
          // Do something with value4
        });
      });
    });
  });
  
  # Promise改写
  Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) {
      // Do something with value4
    }, function (error) {
      // Handle any error from step1 through step4
    })
    .done();
  }
  ```

- 使用 Generator的优化

  ⭐ 这里没有判断异步的执行，故必须保证所有的代码必须都是同步的。

  我们只是在控制 是否应该执行下一步这种状态的前进。即【管理控制流】

  ````js
  # Generator 函数可以进一步改善代码运行流程
  function* longRunningTask(value1) {
    try {
      var value2 = yield step1(value1);
      var value3 = yield step2(value2);
      var value4 = yield step3(value3);
      var value5 = yield step4(value4);
      // Do something with value4
    } catch (e) {
      // Handle any error from step1 through step4
    }
  }
  
  scheduler(longRunningTask(initialValue));
  function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
      task.value = taskObj.value
      scheduler(task);
    }
  }
  ````

- 更常见的管理方案

  ```js
  let steps = [step1Func, step2Func, step3Func];
  
  function* iterateSteps(steps){
    for (var i=0; i< steps.length; i++){
      var step = steps[i];
      yield step();
    }
  }
  ```

#### 03 | 部署 Iterator 接口

利用 Generator 函数，可以在任意对象上部署 Iterator 接口.

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}
```
