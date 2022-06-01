### Reflect的好

> Reflect目的与Proxy的目的相同，都是为了更好的操作对象。
>
> ⭐ 您可以理解成  Object 的操作符的替代品！加强版！
>

1.  将Object的对象一些属于语言内部的方法，未来将放于 【Reflect】对象上。

   即为了以后更好的区分，语言层面的方法、属性将维护于 Reflect，而不是Object

2. 修改 【Object】其方法的返回结果，令其更加合理

   即 优化了一些操作，令其更加合理。

   `````js
   # 无法定义属性时，会抛出一个错误, 有时需要 try catch 来回避这一情况
   Object.defineProperty(target, property, attributes);
   
   # 无法定义属性时，返回 false
   Reflect.defineProperty(target, property, attributes)
   `````

3. 令 Object 的操作都变成函数行为。

   更加让其符合 JavaScript的开发模式。

   ````js
   # 过去
   'assign' in Object // true
   
   # 现在
   Reflect.has(Object, 'assign')
   ````

   附表：javascript对象运算符

   | 运算符     | 运算符含义                                        |
   | ---------- | ------------------------------------------------- |
   | in         | 判断左侧运算数是否为右侧运算数的成员              |
   | instanceof | 判断对象是否属于某个类或构造函数                  |
   | new        | 根据构造函数创建一个新的对象，并初始化该对象      |
   | delete     | 删除指定对象的属性，数组元素或变量                |
   | .及[]      | 存取对象和数组元素，如果把key赋值为变量, 只能用[] |
   | ()         | 函数调用，改变运算符优先级等                      |

4. 总是与Proxy对象上的方法一一对应。

   ⭐ 你总可以在`Reflect`上获取默认行为。

   我猜想：原本Reflect目标就是分离Object的语言层面的方法，只不过为了兼容，故没有办法去删除Object

   ​				历史遗留语言操作方法，故总是一一对应的。

   且不管你的Proxy如何去修改其代理方法，Reflect还是可以获取到最初的默认行为

   ```js
   # 确保完成原有的行为，然后再部署额外的功能。
   Proxy(target, {
     set: function(target, name, value, receiver) {
       var success = Reflect.set(target, name, value, receiver);
       if (success) {
         console.log('property ' + name + ' on ' + target + ' set to ' + value);
       }
       return success;
     }
   });
   ```

   您也总是可以内部调用处出其对应的基本操作

   ````js
   var loggedObj = new Proxy(obj, {
     get(target, name) {
       return Reflect.get(target, name);
     },
     deleteProperty(target, name) {
       return Reflect.deleteProperty(target, name);
     },
     has(target, name) {
       return Reflect.has(target, name);
     }
   });
   ````

5. 有一些操作更加简洁了

   ```js
   Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
   # 新的写法
   Reflect.apply(Math.floor, undefined, [1.75]) // 1
   ```

### Reflect的静态方法

> ⭐ 请记住 总是 target、name、value、receiver
>
> 当然伴随不同的方法，其也会不同，不过大概如此如此即可。

### apply

> Reflect.apply(target, thisArg, args)

````js
Reflect.apply     方法等同于   Function.prototype.apply.call(func, thisArg, args)
````

故

````js
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
````

### construct

> Reflect.construct(target, args)

`````js
Reflect.construct 方法等同于 new target(...args)

function Greeting(name) {
  this.name = name;
}
// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
`````

### get

> Reflect.get(target, name, receiver)

1. 若无其属性 => undefined

2. 若属性

   有 部署了【读取函数 getter】则读取函数的【this】绑定【receiver】

   且传入了第三个参数为对象，若你不传则不会更改其this的指向。

   这也是第三个参数的用处： 更改其this的绑定。

   ````js
   var myObject = {
     foo: 1,
     bar: 2,
     get baz() {
       # 其this为 receiver 
       return this.foo + this.bar;
     },
   };
   
   #
   var myReceiverObject = {
     foo: 4,
     bar: 4,
   };
   Reflect.get(myObject, 'baz', myReceiverObject) // 8
   ````

### set

>  Reflect.set(target, name, value, receiver)

同理，其属性部署了【setter】，同理 【receiver】为第四个参数，若传入则会更改其this指向。

````js
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

# 与 Proxy
let handler = {
  # 拦截代理
  set(target, key, value, receiver) {
    # 完成赋值 
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    Reflect.defineProperty(target, key, attribute);
  }
};
let obj = new Proxy(p, handler);
obj.a = 'A';
````

### defineProperty

> defineProperty(target, name, desc)

````js
function MyDate() {
  /*…*/
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
````

### deleteProperty

> deleteProperty(target, name)

````js
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
````

### has 

> Reflect.has(target, name)

这个操作符 对应是 `【in】`

````js
var myObject = {
  foo: 1,
};
// 旧写法
'foo' in myObject // true
// 新写法
Reflect.has(myObject, 'foo') // true
````

### ownKeys

> Reflect.ownKeys(target)
>
> `Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

`````js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
`````



### isExtensible

> Reflect.isExtensible(target)
>
> `Reflect.isExtensible`方法对应`Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展。

````js
const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true
````

### preventExtensions

> Reflect.preventExtensions(target)
>
> `Reflect.preventExtensions`对应`Object.preventExtensions`方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

`````js
var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true
`````



### getOwnPropertyDescriptor

> Reflect.getOwnPropertyDescriptor(target, name)

````js
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
````



### getPrototypeOf

> Reflect.getPrototypeOf(target)
>
> 1. `Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性
>
> 2. 如果参数不是对象，`Object.getPrototypeOf`会将这个参数转为对象，然后再运行，
>
>    而`Reflect.getPrototypeOf`会报错

````js
const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
````

### setPrototypeOf

> Reflect.setPrototypeOf(target, prototype)
>
> 1. 设置原型

```js
const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);

myObj.length // 0
```

