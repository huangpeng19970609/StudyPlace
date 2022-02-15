> async函数

### 1 定义

>  async函数是Generator函数的语法糖

- 过去的写法

  1. 你希望像写同步代码那样按部就班。

     你希望不要陷入回调地狱。

     ````js
     # 异步任务
     function p() {
       return new Promise((resolve) => {
         setTimeout(() => {
           resolve("mememem");
         }, 2000);
       });
     }
     # 异步流程
     function* task() {
       yield p();
       yield p();
     }
     ````

  2. 你希望使用【自动管理流程】来执行他们， 故你必须要书写 【执行器】

     ```js
     # 自动执行函数
     function run(_task) {
       var g = _task();
       console.log(g);
       function next() {
         var result = g.next();
         if (result.done) return result.value;
         result.value.then((data) => {
           next(data);
         });
       }
       next();
     }
     # 执行
     run(task);
     ```

- 而现在 由于 async | await 的出现，你可以有这样的语法糖写法

  您不需要需要使用书写自动执行函数（执行器）， 不再需要手动的去封装

  ```js
  async function task() {
    await p();
    await p();
  }
  ```

巨大的好处！

1. Generator 函数的执行必须靠执行器， 而 async 自带了执行器
2. 更好的语义： async、await这种简洁的语法
3. 更好的适用性： await后面会帮你自动转换，而不再存在之前的thunk、promise的限制
4. async的返回值是Promise，这代表了
   - async函数可以看作多个异步操作包装成的一个 Promise命令
   - 而 await 就是 里面 可能存在的then回调

### 2 用法

```javascript
# async函数返回的是 Promise 对象
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

# 也可以写成这样
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

### 3 语法

1. `async`函数返回一个 Promise 对象

2. `async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数

   ```javascript
   async function f() {
     return 'hello world';
   }
   f().then(v => console.log(v))
   ```

3. `async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态

   即 抛出的错误对象会被`catch`方法回调函数接收到

   ```javascript
   async function f() {
     throw new Error('出错了');
   }
   
   f().then(
     v => console.log('resolve', v),
     e => console.log('reject', e)
   )
   ```

4.  Promise 对象的状态变化

   `async`函数返回的 Promise 对象，

   必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变。

   除非遇到`return`语句或者抛出错误。

5. await命令

   `await`命令后面是一个 Promise 对象， 若不是则将其返回原本值。

   - 此外特别的，若你实现了对象其自带then方法，那么会将其等同于Promise

6. reject

   `await`命令后面的 Promise 对象如果变为`reject`状态， 则会被 async函数的catch捕捉到。

   

### 4 async的实现原理

即： Generator 函数和自动执行器，包装在一个函数里。

### 5 按顺序完成异步操作

```javascript
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

### 6 顶格await

这是一个语法提案。这个提案的目的，是借用`await`解决模块异步加载的问题。

1. 目前的办法

   目前的我们的使用方案：原始模块输出一个 Promise 对象。

   但是这相当于重塑代码，且很繁琐。

   它显然不是一个好的方案。g

   ```js
   # 输出
   // awaiting.js
   let output;
   export default (async function main() {
     const dynamic = await import(someMission);
     const data = await fetch(url);
     output = someProcess(dynamic.default, data);
   })();
   export { output };
   
   # 输入
   // usage.js
   import promise, { output } from "./awaiting.js";
   
   function outputPlusValue(value) { return output + value }
   
   promise.then(() => {
     console.log(outputPlusValue(100));
     setTimeout(() => console.log(outputPlusValue(100)), 1000);
   });
   ```

2. 故 我们还在等待 【`await`命令独立使用】

   不过你要记住的是，顶层async目的是解决模块的异步加载。