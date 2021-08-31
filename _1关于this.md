> 参阅文章： https://mp.weixin.qq.com/s/hYm0JgBI25grNG_2sCRlTA
>
> 作者: coderwhy

#### 1为什么要有this?

- 维护角度 => 避免更改变量名称后出现的尬尴

  ```js
  var obj = {
    name: 'me',
    running: function() {
   	# 万一 obj名称改变了怎么办？
      console.log(obj.name + " running");
    },
  }
  ```

- 简洁与复用

  各个场景中，核心： 以一种便捷的方式引用对象

#### 2 this是什么?

> 函数被调用时创建【执行上下文】，this作为  【执行上下文】的一个属性

#### 3 this绑定规则

❗ 箭头函数 不适用 this的绑定规则！

> 两条基本准则   
>
> 1. ⭐ this是在运行时被绑定的    
>
> 2. ⭐ 调用方式、调用的位置 决定了this

##### 3.1 默认绑定

- 作为一个独立函数调用时，函数中的this`指向全局对象`（window）

> 独立函数： 函数没有被绑定到某个对象上进行调用

```js
foo();

// 如下的【链式函数】调用 仍属于 【独立函数调用】
outer() {
	foo();
}

// 如下的将【函数作为参数】，传入到另一个函数中
outer(foo); => 在 outer函数内部再执行foo函数， foo的this不变 
```

##### 3.2 隐式绑定

- 它的调用位置中，是通过某个对象发起的函数调用， 则this 就指向此对象。

  ```js
  #1
  obj.foo();
  
  #2 依旧是 obj1调用
  obj2.obj1.foo();
  
  #3 this是在运行时决定this, 可视作 【独立函数】 => 默认调用
  var bar = obj1.foo;
  bar();
  ```

- 隐式绑定的前提

  1. 该函数必须在调用的`对象内部`有一个对函数的引用

     > 虽是废话，但有必要强调。
     >
     > 毕竟没有这样的引用，在进行调用时，会报找不到该函数的错误。

  <img src="images/image-20210831002358056.png" style="zoom:67%;" />

- 很多情况下， 默认绑定都可以看作是 window调用

  但不能单纯就以调用位置与调用者就做出判断，毕竟确实存在单独调用的情况！

  我们的单独调用是站在 对象的角度，而非API调用的角度上。

##### 3.3 显示绑定	

>  为什么要有显示绑定 ?
>
> 答： 因为要摆脱限制。 
>
> - 不希望在 **对象内部** 包含这个函数的引用， 同时又希望在这个对象上进行强制调用。

故我们使用

- call和apply方法， 在调用这个函数时，会将this绑定到这个传入的对象上。
- 我们明确的绑定了this指向的对象，所以称之为 **显示绑定**。

```js
foo.call(window); // window
foo.call(123); // Number对象
Function.prototype.bind // 实例 与 类 的方法调用的区别，无所谓
```

#### 4 常见的内置函数规则

1. 这些特别的规则是由JavaScr的内置函数带来，即源码。
2. 也可能是 第三方库内部会帮助我们执行；
3. 内置函数规则无法判断，经验决定。

##### 4.1 setTimeout

如 setTimeout、setInterval这类, this总是指向的是 winodw

原因： 

- setTimeout源码的内部调用有关

  setTimeout内部是通过apply进行绑定的this对象，并且绑定的是全局对象

```js
setTimeout(function() {
  console.log(this); // window
}, 1000);
```

##### 4.2 forEach

关于高阶函数的forEach, 

> xxx.forEach 的语法感觉很像 将this指向了 xxx，但实际上并非如此。

- 原因：　这是因为默认情况下传入的函数是自动调用函数（默认绑定）

```js
var names = ["abc", "cba", "nba"];
names.forEach(function(item) {
  console.log(this); // 三次window
});
```

- forEach提供了一个参数！

  我们可以改变每次回调该函数的this指向

  ```js
  var names = ["abc", "cba", "nba"];
  var obj = {name: "why"};
  names.forEach(function(item) {
    console.log(this); // 三次obj对象
  }, obj);
  ```

##### 4.3 元素事件

> 为什么this指向的是 元素
>
> 答： 这是因为在发生点击时，执行传入的回调函数被调用时，会将box对象绑定到该函数中

```js
var box = document.querySelector(".box");
box.onclick = function() {
  console.log(this); // box对象
}
```

##### 4.4 new的绑定

