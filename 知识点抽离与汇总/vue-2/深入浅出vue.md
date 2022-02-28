- 渐进式

  如Vue， 可以嵌套入一个现有的服务端应用（即便它已经选定了开发框架）

- 渐进式框架

  框架分层。即 你可以只认识【视图层渲染】，但你应该认识更广拓的【长辈】。

  视图层渲染 -> 组件机制 -> 路由机制 -> 状态管理 -> 构建工具

### 变化侦测

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


#### 01 Dep 

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

#### 02 | Watcher

- 作者讲述的并不是很全面
  1. 每个**「Vue组件」**实例，都至少对应一个 **「watcher」**， 该**「watcher」**中记录了该组件的**「render函数」**
  2. watcher首先执行一次 render函数，过程中，会收集依赖（在render函数中使用到的响应式数据就会记录这个watcher）
  3. 数据更新时，**「Dep」**会通知自身收集的所有Watcher，然后由各个**「Watcher」**去完成具体执行的更新操作（函数）。更新函数执行后，界面重新渲染。并且又会重新进行依赖的收集。 参考调用流程：

- 更像是一个中介，数据变化以通知其他地方。

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

#### 03 | Observe

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

#### 04 | 总结

1. 通过 Observe实现了 对data的【递归侦测】，完成了 getter/ setter的转换

2. 【外界】通过watcher读取数据， 触发其对应的getter， 从而将 【watcher】添加入依赖

   **「Watcher」**可以理解为当数据更新时，那些需要执行的更新操作。

3. 数据变化，触发setter， 从而 Dep中的subs[i]通知所有watcher

   watcher可能是 【视图更新】、可能是【用户自定义watch、computed】



