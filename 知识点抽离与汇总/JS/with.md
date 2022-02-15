> 我们总是听人说不可以在开发中使用with语句 但为什么不可以使用呢？
>
> 参考: https://swordair.com/javascript-with-statement-in-depth/

### 1 with的最初

避免冗余的对象调用

- 本质： *将代码的作用域设置到一个特定的对象中*

````js
with(foo.bar.barz) {
    x = 1;
    y = 1;
}

# 相当于
var p = foo.bar.baz;
p.x = 1;
p.y = 1;
````

### 2 with目前

strict模式里，使用with会直接报错

```js
Uncaught SyntaxError: Strict mode code may not include a with statement
```

### 3 书中的with

为什么要弃用？即便是 有更加简单的替换写法，但也不应该对它如此苛刻。

这些书本都各自提及了with。

- JavaScript权威指南

  with语句用于暂时修改作用域链

  1. *使用了with语句的JavaScript代码很难优化*
  2. *with语句中的函数定义和变量初始化可能会产生令人惊讶的、和直觉相抵触的行为*

- JavaScript高级程序设计

  with语句的作用是将代码的作用域设置到一个特定的对象中

  1. *大量使用with语句会导致性能下降，同时也会给调试代码造成困难*

- JavaScript语言精粹

  1. 性能

     with语句严重影响了JavaScript处理器的速度，*因为它阻断了变量名的词法作用域绑定*

  2. 不可预测性

### 4 为什么不要使用with语句

1. 性能问题
2. 不可预测性
3. 可维护性

### 01 | 性能问题

虽然使用with的性能确实别的慢了，但其性能的损耗是在可以接受的情况下，故性能问题并非是主要原因。

```js
var a = {a: {a: 1}};
function useWith(){
	with(a.a){
		for(var i = 0; i < 1000000; i++){
			a = i; 
		}
	}
}

var b = {b: {b: 1}};
function noWith(){
	for(var i = 0; i < 1000000; i++){
		b.b.b = i; 
	}
}

var t1 = new Date().getTime();
useWith()
alert(new Date().getTime() - t1);

var t2 = new Date().getTime();
noWith()
alert(new Date().getTime() - t2);
```

### 02 | ⭐ 不可预测性

仅仅通过标识符及其上下文，无法确定一个with中的标识符指向什么。

它强行混乱了上下文，使得程序的预测和解析变得困难。

1. with强行割裂了词法作用域， 将对象临时性地插入到了作用域链中。

   - 代码示范

     ````js
     function foo(a) {
         with(a) {
             console.log(a)
         }
     }
     // 123
     foo('123')
     // Object {}
     foo({});
     # 注意 这个对象拥有了和【函数形参】同名的属性
     // 123
     foo({a: "123"})
     ````

     这就是“令人惊讶的、和直觉相抵触的行为”的本质

     当传入的参数是带有同名a属性的a对象时，with强行访问了`a.a`

     即 【对象】被变成了作用域链。

2. 在with语句中声明的变量，并不属于with指定的参数对象

   - 按理既然在此作用域访问到的 【标识符】指的是 当前对象临时插入的作用域链

     那么我修改此【标识符】应该也是影响的是 此对象吧？

     但 事实上，他不是这样的。

     ````js
     var a = {};
     with(a) {
         x = 'xxxxx';
         var y = 'yyyy'
     }
     console.log(a.x);       // undefined
     console.log(a.y);       // undefined
     # 在with中声明的变量实际上是被添加到外层的function上的
     console.log(window.x);  // "sword"
     console.log(window.y);  // "wang"
     ````

   - 在with中声明的变量实际上是被添加到外层的function上的

     这样，就如预期了，但是却不符合你的预期了。

     ```js
     function foo(){
         with({}) { x = 'sword'; }
         console.log(x)
     }
     foo();  // "sword"
     ```

### 03 | 代码无法优化

由于 不可预测性，必然带来代码无法优化的问题。因果原因。

