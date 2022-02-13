> https://zhuanlan.zhihu.com/p/58428287\



## 阮一峰

Promise 是异步编程的一种解决方案。

> 你应该注意的信息

### 1、promise

- promise的状态一旦更改，就不会就不会改变
- 对象的状态不受外界影响
- promise一旦新建无法中止。

`Promise`对象是一个构造函数

或许你可以将 resolved 叫做为 fullfilled， 但也应该记住 pending、fulfilled、rejected

### 2 一些细节

- 调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行

  故 建议你 

  宏任务执行完毕，再微任务

  ```js
  new Promise((resolve, reject) => {
    # return resolve(2)
    resolve(2);
    console.log(1);
  }).then(r => {
    console.log(r);
  });
  ```

- promise的`链式调用`

- promise的`catch`

  我们总是建议使用catch，

  1.  因为catch不仅仅可捕获到  promise的状态为 【rejected】，

     更是可以 捕获到 其then方法中的【运行错误】

  2. Promise 对象抛出的错误不会传递到外层代码， 即不会阻碍外部代码的正常执行。这相当于自带了try...catch

- Promise.`all`

  Promise.all的参数不一定是 promise 的数组。它可以是任何一个对象，但这个对象的的迭代器生成函数的结果必须每一项都是 promise实例。

  1. 任何一项变成了 rejected， 其promise若有catch则优先此catch回调，否非 走 Promise.all的catch回调。
  2. 全部变成了 fullfiled， 其才会fufilled， 并调用then

- Promise.`race `与 Promise.`any`

  race 与 any 类似于Promise.all

  1. race 讲就是的 谁率先改变状态（无论是rejected还是resolved）

  2. any 讲究的是 任意一个fulfilled， 就执行回调then

     但要注意的是 既然any遵守这种规则，就代表Promise.any必须所有promise变为 rejected 才会rejected

- `Promise.resolve`

  1. Promise实例

  2. thenable对象

     若其期待then函数，其then函数携带回调函数，那么率先执行 此 then函数。

     若其对应的回调函数（第一个回调函数）执行，则 状态对应变更。

  3. 非 thenable对象、非对象、不携带参数

     立刻变为 resolved

  此外 Proemise.rejected立刻返回一个状态值 为 rejected的函数

## 手动实现一个Promise

### 01 | 功能实现

- 思路

  1. new Promise的时候其中的异步任务应该就要立刻去执行，
     - 此时我们在内部埋下一个resolve回调函数，来触发then提供的那些callback
  2. then是同步执行的代码
     - then只是添加一个回调事件而已。
     -  “resolve”来触发callback事件
  3. 支持多次 then， 故callbacks是数组
  4. then方法返回 this的目的是支持多次的then的链式调用

- 缺陷

  若 resolve是同步代码，即顺序执行，此时resolve立刻执行的情况callback为空数组

```ts
class myPromise {
  callbacks: Array<Function> = [];
  constructor(fn: Function) {
    fn(this._resolve.call(this));
  }
  _resolve() {
    this.callbacks.forEach(fn => fn());
  }
  then(fn: Function) {
    this.callbacks.push(fn);
    return this;
  }
}

let p = new myPromise((resolve: Function) => {
  setTimeout(() => {
    resolve('!!!')
  }, 1000);
})

p.then((res: any) => {
  console.log(res);
})
```

### 02 | 修复-同步任务的问题

似乎强行让其变为异步事件确实解决了这个问题

```js
  _resolve() {
    setTimeout(()=> {
        this.callbacks.forEach(fn => fn());
    })
  }
```

但来看看这个

- then3无法打印
- 原因:
  1. 我们设置了resolve的执行方案是必须在所有then的同步加入以后再去执行这个微任务
  2. new Promise时
     - 我们resolve立刻执行，但由于是微任务被我们延后
     - 我们又加入了一个微任务的定时器去添加then方法
  3. 结果
     - resolve微任务先执行
     - 定时器中的then后执行，此时才加入callbacks

```js
let p = new Promise(resolve => {
    console.log('同步执行');
    resolve('同步执行');
}).then(tip => {
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});

setTimeout(() => {
    p.then(tip => {
        console.log('then3', tip);
    })
});
```

- 好像无论无何都解决不掉这个问题了，总是有这些宏微任务不符合预期。

### 03 状态机制

- Promise {<pending>}
- Promise {<fulfilled>: ' i am success'}
- Promise {<rejected>: ' i am failed'}

此外明确声明

1. pending 可以转化为 fulfilled 或 rejected 并且只能转化一次

````js
//极简的实现+链式调用+延迟机制+状态
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        if (this.state === 'pending') {//在resolve之前，跟之前逻辑一样，添加到callbacks中
            this.callbacks.push(onFulfilled);
        } else {//在resolve之后，直接执行回调，返回结果了
            onFulfilled(this.value);
        }
        return this;
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(fn => fn(value));
    }
}
````

