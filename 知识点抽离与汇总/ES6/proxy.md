### Proxy

> ⭐ 定义:   用于定义基本操作的自定义行为

````js
const proxy = new Proxy(target, handle);
````

### target & handle

- target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理
- handler 一个通常以函数作为属性的对象，用来定制拦截行为

#### handle

> Proxy的定义为 定义【基本操作】的自定义行为。故 hanle便是贯彻【`基本操作`】的地方。
>
> 我的理解： 您不需要特别的记忆这些，仅需要知道【基本操作】从而延申他们。

| 方法                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| handler.has()            | 【 in 操作符】的捕捉器。                                     |
| handler.get()            | 【属性读取操作】的捕捉器。                                   |
| handler.set()            | 【属性设置操作】的捕捉器。                                   |
| handler.deleteProperty() | 【delete 操作符】的捕捉器。                                  |
| handler.ownKeys()        | 【Object.getOwnPropertyNames 方法】和【 Object.getOwnPropertySymbols 方法】           的捕捉器。 |
| handler.apply()          | 【函数调用操作】的捕捉器。                                   |
| handler.construct()      | 【new 操作符的捕捉器】                                       |

#### handler.get

仅以handle.get作为示范，其余方法大同小异。

授受三个参数 `get(target, propKey, ?receiver)`

- target 目标对象
- propkey 属性名
- receiver Proxy 实例本身

````js
const obj = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
})
````

- 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
- 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined

### 可撤消的Proxy

1. proxy`有一个唯一的静态方法，`Proxy.revocable(target, handler)

   ```js
   const target = { name: 'vuejs'}
   const {proxy, revoke} = Proxy.revocable(target, handler)
   proxy.name // 正常取值输出 vuejs
   revoke() // 取值完成对proxy进行封闭，撤消代理
   proxy.name // TypeError: Revoked
   ```

2. `Proxy.revocable()`方法可以用来创建一个可撤销的代理对象,该方法的返回值是一个对象，其结构为： `{"proxy": proxy, "revoke": revoke}`
   - proxy 表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler) 创建的代理对象没什么不同，只是它可以被撤销掉。
   - revoke 撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那

### 应用场景

#### 校验器

- 使用`Proxy`实现一个逻辑分离的数据格式验证器

#### 私有属性

- 使用Proxy轻松实现私有属性拦截

  ````js
  const proxy = new Proxy(target, {
    get(target, propkey, proxy){
      if(propkey[0] === '_'){
        throw Error(`${propkey} is restricted`)
      }
      return Reflect.get(target, propkey, proxy)
    },
    set(target, propkey, value, proxy){
      if(propkey[0] === '_'){
        throw Error(`${propkey} is restricted`)
      }
      return Reflect.set(target, propkey, value, proxy)
    }
  })
  ````

### vue-next & proxy

> 为什么vue-next选择使用 Proxy重构？

那必须来认识他们。

#### Object.defineProperty

> 一个**对象上**定义一个**新属性**，或者修改一个对象的现有属性，并返回此对象。
>
> 敲黑板:【一个对象】【一个新属性】【现有属性】

`````js
Object.defineProperty(obj, prop, descriptor)

# 1
Object.defineProperty(obj, "a", {
  value : 1,
  writable : false, // 是否可写 
  configurable : false, // 是否可配置
  enumerable : false // 是否可枚举
})

# 2
const obj = {};
Object.defineProperty(obj, 'a', {
  set(val) {
    console.log(`开始设置新值: ${val}`)
  },
  get() { 
    console.log(`开始读取属性`)
    return 1; 
  },
  writable : true
})
`````

1. 对**对象上的属性**做操作，而非对象本身。

   - Vue 不能检测以下数组的变动， 当你利用索引直接设置一个数组项时，并不会触发双绑。

     ⭐ 敲黑板，这并非说是 Object.defineProperty做不到，而是Vue无法牺牲性能做到。

2. 新增一个索引，确实是 Object.defineProperty做不到的事情。

#### proxy的好处

1. 能观察的类型比 `defineProperty` 更丰富
2. `Object.definedProperty` 是劫持对象的属性，新增元素需要再次 `definedProperty`。而 `Proxy` 劫持的是整个对象，不需要做特殊处理
3. 使用 `defineProperty` 时，我们修改原来的 `obj` 对象就可以触发拦截，而使用 `proxy`，就必须修改代理对象，即 `Proxy` 的实例才可以触发拦截

