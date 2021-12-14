> 参阅文章： https://mp.weixin.qq.com/s/hYm0JgBI25grNG_2sCRlTA
>
> 作者: coderwhy

### 1为什么要有this?

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

### 2 this是什么?

> 函数被调用时创建【执行上下文】，this作为  【执行上下文】的一个属性

### 3 this绑定规则

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

- 注 `传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则。

### 4 常见的内置函数规则

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

这其实与 new 关键字 本身语法有关系，

- 1.创建一个全新的对象；
- 2.这个新对象会被执行Prototype连接；
- 3.这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
- 4.如果函数没有返回其他对象，表达式会返回这个新对象；

```js
// 创建Person
function Person(name) {
  console.log(this); // Person {}
  this.name = name; // Person {name: "why"}
}

var p = new Person("why");
console.log(p);
```

##### 4.5 规则优先级

1. 默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this

2. 显示绑定优先级高于隐式绑定

   ```js
   # 根据隐式绑定， this => obj1， 但存在显示绑定 => obj2
   obj1.foo.call(obj2);
   ```

3. new绑定优先级高于隐式绑定

   - 那 new 与 显示绑定的关系呢？ 

     语法限制： 你不可对一个 constructor 使用 new， 所以不存在谁的优先级更高

   - 但可以这样

     ```js
     var bar = foo.bind(obj);
     
     var test = new bar(); // this 指向的是 test, 还是new 生效 
     ```

##### 4.6 其他

1. 如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则

   ```js
   foo.call(obj); // obj对象
   foo.call(null); // window
   foo.call(undefined); // window
   
   var bar = foo.bind(null);
   bar(); // window
   ```

2. 间接函数引用

   >  原因： 因为是函数的地址传递， 故此时并不会涉及到对象的引用，相当于 单独函数调用 => 默认绑定

   ```js
   obj1.foo(); // obj1对象
   (obj2.foo = obj1.foo)();  // window
   ```

### 5 箭头函数

> 特地讲述 箭头函数
>
> 1. 再次重申：  箭头函数那么this引用会从`上层作用域`中`找到`对应的`this`
>
>    找寻this！ 找寻上层作用的this！而不是上层作用域！ 

- 箭头函数 无视四类规则， 箭头函数那么this引用就会从上层作用域中找到对应的this

  ❗ 请分清， 箭头函数是寻找上一级！外层的，而非本级！

- 箭头函数并不绑定this对象

```js
var obj = {
  data: [],
  getData: function() {
    setTimeout(() => {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      this.data.push(...res);
    }, 1000);
  }
}

obj.getData();

```

1. getData作为声明函数， 在 getData中 其存在this， 隐式调用， 故 getData函数的上下文中存在this，
   且this指向为obj

2. 若将 getData也该为箭头函数呢？

   答： 此时getData作为箭头函数， 不存在this的指向， 故在getData函数中无法找到this， 故再次寻访上级作用域， 如此找寻到 window！

### 6 面试题

#### 6.1. 面试题一

```js
var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  var sss = person.sayName;
  sss(); 
  person.sayName(); 
  (person.sayName)(); 
  (b = person.sayName)(); 
}
sayName();
```

这道面试题非常简单，无非就是绕一下，希望把面试者绕晕：

```js
function sayName() {
  var sss = person.sayName;
  // 独立函数调用，没有和任何对象关联
  sss(); // window
  // 关联
  person.sayName(); // person
  (person.sayName)(); // person
  (b = person.sayName)(); // window
}
```

#### 6.2. 面试题二

```js
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

person1.foo1(); 
person1.foo1.call(person2); 

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);
```

下面是代码解析：

```js
// 隐式绑定，肯定是person1
person1.foo1(); // person1
// 隐式绑定和显示绑定的结合，显示绑定生效，所以是person2
person1.foo1.call(person2); // person2

// foo2()是一个箭头函数，不适用所有的规则
person1.foo2() // window
// foo2依然是箭头函数，不适用于显示绑定的规则
person1.foo2.call(person2) // window

// 获取到foo3，但是调用位置是全局作用于下，所以是默认绑定window
person1.foo3()() // window
// foo3显示绑定到person2中
// 但是拿到的返回函数依然是在全局下调用，所以依然是window
person1.foo3.call(person2)() // window
// 拿到foo3返回的函数，通过显示绑定到person2中，所以是person2
person1.foo3().call(person2) // person2

// foo4()的函数返回的是一个箭头函数
// 箭头函数的执行找上层作用域，是person1
person1.foo4()() // person1
// foo4()显示绑定到person2中，并且返回一个箭头函数
// 箭头函数找上层作用域，是person2
person1.foo4.call(person2)() // person2
// foo4返回的是箭头函数，箭头函数只看上层作用域
person1.foo4().call(person2) // person1
```

#### 6.3. 面试题三

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1()
person1.foo1.call(person2)

person1.foo2()
person1.foo2.call(person2)

person1.foo3()()
person1.foo3.call(person2)()
person1.foo3().call(person2)

person1.foo4()()
person1.foo4.call(person2)()
person1.foo4().call(person2)
```

下面是代码解析：

```js
// 隐式绑定
person1.foo1() // peron1
// 显示绑定优先级大于隐式绑定
person1.foo1.call(person2) // person2

// foo是一个箭头函数，会找上层作用域中的this，那么就是person1
person1.foo2() // person1
// foo是一个箭头函数，使用call调用不会影响this的绑定，和上面一样向上层查找
person1.foo2.call(person2) // person1

// 调用位置是全局直接调用，所以依然是window（默认绑定）
person1.foo3()() // window
// 最终还是拿到了foo3返回的函数，在全局直接调用（默认绑定）
person1.foo3.call(person2)() // window
// 拿到foo3返回的函数后，通过call绑定到person2中进行了调用
person1.foo3().call(person2) // person2

// foo4返回了箭头函数，和自身绑定没有关系，上层找到person1
person1.foo4()() // person1
// foo4调用时绑定了person2，返回的函数是箭头函数，调用时，找到了上层绑定的person2
person1.foo4.call(person2)() // person2
// foo4调用返回的箭头函数，和call调用没有关系，找到上层的person1
person1.foo4().call(person2) // person1
```

#### 6.4. 面试题四

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()
person1.obj.foo1.call(person2)()
person1.obj.foo1().call(person2)

person1.obj.foo2()()
person1.obj.foo2.call(person2)()
person1.obj.foo2().call(person2)
```

下面是代码解析：

```js
// obj.foo1()返回一个函数
// 这个函数在全局作用于下直接执行（默认绑定）
person1.obj.foo1()() // window
// 最终还是拿到一个返回的函数（虽然多了一步call的绑定）
// 这个函数在全局作用于下直接执行（默认绑定）
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

// 拿到foo2()的返回值，是一个箭头函数
// 箭头函数在执行时找上层作用域下的this，就是obj
person1.obj.foo2()() // obj
// foo2()的返回值，依然是箭头函数，但是在执行foo2时绑定了person2
// 箭头函数在执行时找上层作用域下的this，找到的是person2
person1.obj.foo2.call(person2)() // person2
// foo2()的返回值，依然是箭头函数
// 箭头函数通过call调用是不会绑定this，所以找上层作用域下的this是obj
person1.obj.foo2().call(person2) // obj
```
