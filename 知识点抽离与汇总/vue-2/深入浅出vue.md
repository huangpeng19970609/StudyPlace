- 渐进式

  如Vue， 可以嵌套入一个现有的服务端应用（即便它已经选定了开发框架）

- 渐进式框架

  框架分层。即 你可以只认识【视图层渲染】，但你应该认识更广拓的【长辈】。

  视图层渲染 -> 组件机制 -> 路由机制 -> 状态管理 -> 构建工具

## 一 Object的变化侦测

- 什么是？

  1. 推

     Vue。状态变化，即刻推送。

  2. 拉

     React。它只知道有状态变化了，但却不知道谁发生了变化。

  3. 对于vue

     - vue的渲染过程是声明式
     - vue的状态绑定的依赖并非是DOM节点，而是组件。即对比组件。

- 如何追踪变化？

  Object.defineProperty, 不累述

- 如何收集依赖？

  getter收集依赖，setter触发依赖。

  （  虽然我看过源码，明白其讲述，但想来作者在其后续应该也会提出解释，故才说的如此笼统？ ）


### 01 Dep 

- 解决的问题
  1. 如何收集依赖 —— 谁在用“我”？
  2. 如何派发更新 —— 通知用“我”的谁？

依赖收集在哪里?

看起来dep只是一个收集依赖，再去触发依赖的功能。

  1. getter收集依赖。 为了防止不重复收集， 其有常量维护。

  2. setter触发， 执行deps以触发收集到的依赖 -> notify 其 subs

  ````js
  class dep {
      depend() {
          // subs里添加
          if (window.target) this.addSub(window.target);
  	}
      notify () {
          subs[i].update();
      }
  }	
  ````

- 依赖的是谁？ （ window.target ）

  - ❓换句话说， 谁需要放入到依赖中
    1. 属性变化，我们要通知的对象
    2. 这个对象再负责去通知其他地方

  - ❓为什么我们不直接去通知其他地方呢

  ​		通知的地方很多，需要一个抽象类帮助我们管理。我们称呼其为watcher

### 02 | Watcher

- 作者讲述的并不是很全面
  1. 每个**「Vue组件」**实例，都至少对应一个 **「watcher」**， 该**「watcher」**中记录了该组件的**「render函数」**.
  
  2. watcher首先执行一次 render函数，过程中，会收集依赖 (自己将自己放入Dep.target中，以加入Dep)

     （在render函数中使用到的响应式数据就会记录这个watcher）
  
     （Compile的时候，订阅数据变化，将Watcher添加到订阅者中）
  
  3. 数据更新时，**「Dep」**会通知自身收集的所有Watcher，然后由各个**「Watcher」**去完成具体执行的更新操作（函数）。更新函数执行后，界面重新渲染。并且又会重新进行依赖的收集。 参考调用流程：
  
  4. props setter -> dep.notify() -> depWatcher.updte() -> nextTickWatcherRun -> 
  
     ->  render -function -->  updateComponent
  
- 更像是一个中介，数据变化以通知其他地方。

  **「Watcher」**可以理解为当数据更新时，那些需要执行的更新操作。**「代理执行对象」**
  
  ````js
  export default class Watcher {
      constructor(vm, expOrFn, cb) {
          this.vm = vm;
          this.getter = parsePath(expOrFn);
          this.cb = cb;
          this.value = this.get();
      }
      get () {
          window.target = this;
          let value = this.getter.call(this.vm, this,vm);
          window.target = undefined;
          return value;
      }
      update() {
          const oldValue = this.value;
          this.value = this.get();
          this.cb.call(this.vm, this.value, oldValue);
      }
  }
  ````

  1. 构造函数 主动将自己添加进 Dep

     主动触发 getter， 使得 Dep（收集器） 读取依赖，其subs 中加入【watcher】

  2.  如何加入依赖？

     修改【target】， 触发getter， 【targer】还原
  
     ```js
       # 为什么触发 getter 便可以收集的原因
       const getter = property && property.get;
       Object.defineProperty(obj, key, {
         enumerable: true,
         configurable: true,
         get: function reactiveGetter () {
           const value = getter ? getter.call(obj) : val
           if (Dep.target) {
             dep.depend()
             if (childOb) {
               childOb.dep.depend()
             }
             if (Array.isArray(value)) {
               dependArray(value)
             }
           }
           return value
         }
       }
     ```
     
  3. watcher
  
     Watcher属于自己可以将自己收集到 Dep，通过全局的window.target
  
     故 Watcher可以订阅到任意数据的变化。
     
  4. **Scheduler**
  
     其中，depWatcher.update() -> nextTickWatcherRun 涉及到了 待更新的watcher将自己交个scheduler去执行，放到微任务队列中执行
  
     便引出了一个问题， 
  
     - 当多个响应式数据更新时，是否有必要多次执行同一个watcher对应的更新操作？
  
       ````js
       this.obj.a = 'new a'
       this.obj.b = 'new b'
       this.obj.c = 'new c'
       this.obj.d = 'new d'
       ````
  
       显然如上的更新，其都例属于同一个watcher， 此时难道要 watchher.update() 四次吗？
  
       显然不是的， 这是加入到队列中，确保它在队列中仅存在一次。
  
       以后再将其放入微任务队列中去执行
  
  5. parsePath
  
     watcher当中可以监听 {{  a.b.c }} 这类
  
     ````js
     const bailRE = /[^\w.$]/;
     export function parsePAth(path) {
         if (bailRE.test(path)) {
             return;
         }
         const segment = path.split('.');
         return function (obj) {
             for (let i = 0; i < segment.length; i++) {
                 if (!obj) return;
                 obj = obj[segments[i]];
             }
             return obj;
         }
     }
     
     # 而 若 a.b.c.d其对应的 watcher 便加入
     this.getter = parsePAth('a.b.c.d');
     ````

### 03 | Observe

看起来 Dep、Watcher已经可以实现 【变化侦测】的本事了，但这仅是针对某一个属性（对象）

我们希望的是【递归侦测所有Key】， 而不是仅仅是一个表面的属性。

1. Observe会附加到所有的被侦测的object上，

   将其所有属性转换为 getter / setter的形式，目的是收集依赖。

   即 现在 Observe来帮你主动的做Dep的声明，

2. 在你主动触发其子属性的get的时候，触发 dep.depend

   子属性变更时，触发dep.notify()

3. 在这里你看不到watcher

   只有Watcher触发的getter才会收集依赖。

   哪个Watcher触发了getter， 就把哪个watcher 加入到 dep

   而 数据变化，便会通知所有的watcher
   
4. ❓ 为什么deps总是要保存在Observe实例中

   目的： 依赖收集器 必须既被【getter】访问到， 也该被【拦截器】访问到。

   而 getter、拦截器又都可以访问到【Observe】

此外，

Observe会对每一个侦测了变化的数据打上标记``_ob_`, 并将this（Observe）实例保存其上。

最大的目的是获取Observe其保存的依赖，从而拦截数组变化，想依赖发出通知。

### 04 | 总结

1. 通过 Observe实现了 对data的【递归侦测】，完成了 getter/ setter的转换

2. Compile时，创建对应的watche，当 触发其对应的getter， 从而将 【watcher】添加入依赖

   **「Watcher」**可以理解为当数据更新时，那些需要执行的更新操作。

3. 数据变化，触发setter， 从而 Dep中的subs[i]通知所有watcher

   watcher可能是 【视图更新】、可能是【用户自定义watch、computed】

### 05 | 追踪数组

- 拦截数组

  ````js
  class Observe {
      constructor(value) {
          if (Array.isArray(value)) {
          	value.__proto__ = arrayMethods; // 拦截原生数组方法以拓展
          }
      }
  }
  ````

  如果浏览器不支持原型修改，则直接粗暴在数组上直接挂载方法。

- observeArray

  我们总是使用其对子元素变化进行侦测。

  若是进行 push、unshift、splice方法，其也会对新增数据进行变化侦测。

### 06 | 变化侦测的api

#### vm.$watch

watch在我们的项目中，真的是太常见了

````js
Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this;
    options = options || {};
    const watcher = new Watcher(vm, expOrFn, cb, options);
    # immdediate
    if (options.immdediate) {
        cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
        watcher.teardown();
    }
}
````

- 核心： watcher

  ````js
  export default class Watcher {
      constructor(vm, expOrFn, cb) {
          this.vm = vm;
          # watch是支持函数的
          if ( typeof expOrFn === 'function') {
              this.getter = expOrFn;
          }else {
              this.getter = parsePath(expOrFn);
          }
      }
  }
  ````

#### vm.$set

- array

  使用splice

- 新增属性

  defineReactive => de.notify();

#### vm.$delete

delete target[key ] => de.notify();



## 二 虚拟DOM （patch）

### patch

1. oldNode 不存在时， 而 newNode 存在， 则将其直接插入 （初次渲染）
2. 同一节点时，更新 oldNode （patchVNode）
3. oldNode 与 newNode 并非 同一节点，则先插入新节点，再删除旧节点。

### 创建节点

初次渲染时候、非同一节点的时候，我们需要创建节点。

1. 创建节点
2. 创建元素节点（tag） || 创建注释节点 （isComments）  ||  创建文本节点 
3. 创建子节点
4. 插入parentNode

### 删除节点

非同一节点时候，需要删除节点。

删除节点，为了兼容平台，而实现了parent.removeChild类似的功能。并非直接使用。

### 更新节点

1. 静态节点不需更新， 即 无状态节点。

2. 有文本属性（text）

   若新旧节点的文本属性不同，则直接调用 setTextContent来更新视图

3. 无文本属性

   - oldNode  有子节点

     ⭐ 若不同，则更新子节点

   - oldNode  无子节点

     - 是否有文本属性？
       1. 若有清空，清空DOM文本，再添加
       2. 若无，将子节点直接添加到DOM

### 更新子节点

当 oldNode  有子节点 ， newNode也有子节点的时候，则需要进行更新子节点的操作。

故会涉及到 更新的策略。

1. 新增节点

   - 如何判断新增节点

     oldChildren中循环中未发现本次循环所指向的子节点时，便代表此节点是【新增的节点】。

   - 插入的位置是哪里

     插入位置，便是【未处理节点之前（已处理节点之后）】，以防止下一个节点也是新增节点。

2. 更新节点

   - 如何判断是更新节点？

     newNode存在于 oldNode中， 且其位置也相同。

   - 此外

     若两个相同的节点仅是位置不同的话，我们需要对其做移动操作。

3. 移动节点

   node.inserBefore。 

   - 如何知道新的移动位置呢？

     将移动的节点放于所有未处理节点之前。

4. 删除节点

   newChildren循环一次后，依旧在 oldChildren未被处理的节点，便是要被删除的节点。

### 更新子节点的优化策略

如何尽可能的避免循环 oldChildren 来查找节点，便是核心的优化方案。故这便是涉及了四种查找
