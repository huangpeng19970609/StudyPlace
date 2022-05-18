### 0 自问

1. vueX
2. vue组件传递方式
3. 父组件监听子组件的生命周期
4. 浏览器的dom解析过程， 为什么说vdom更快？
5. vue可以探测数据变化，为什么还需要VDOM的diff算法？
6. VDOM的意义是什么？ （回流重绘）
7. Vue双向绑定原理
8. scoped 与 module
9. 

### 1 vueX

> vuex的store有State、 Getter、Mutation 、Action、 Module五种属性\

1. **state** 为单一状态树
2. **getters** 类似vue的计算属性，主要用来过滤一些数据
3. **mutation** 更改store中state状态的唯一方法就是提交mutation
4. **action**  异步操作数据， view 层通过 store.dispath 来分发 action

### 2 vue传值方式

1. 依赖注入 provide / inject => **一个祖先组件向其所有子孙后代注入一个依赖**

2. `$attrs`/`$listeners` => **跨级组件之间的通讯变得更简单** 

   一个负责收纳属性，一个负责收纳事件。$attrs存在了父元素但未被prop所识别。配合 inheritAttrs: false 来使用。

   ```js
<child-com1
         :foo="foo"
      :boo="boo"
         :coo="coo"
         :doo="doo"
         title="前端工匠"
   ></child-com1>
   
   
   在 child-com1 中再引用这些
    <child-com2 v-bind="$attrs"></child-com2>
    可获取  this.$attrs
   
   childCom2.vue
    props: {
       coo: String,
       title: String
     }
   
    this.$listeners.two()
   ```
   
   - 关于 listener
   
     ```js
    <child 
         :foo="foo" 
      :bar="bar"
         @one.native="triggerOne"
         @two="triggerTwo">
     </child>
     
     则再child里 this.$listeners.two(); => 便可以访问到 triggerTwo
     # v-on="$listeners" 一级级的往下传递，子子孙孙无穷尽也！
     ```
   
     
   
3. bus通信。

4. 父子传值 props / $emit

5. vuex

6. `$parent` / `$children`与 `ref`

7. 插槽

### 3 父组件监听子组件的生命周期

1. @hook对应的生命周期即可

   ```html
   <Child @hook:mounted="doSomething" ></Child>
   ```

2. 对应声明周期 $emit即可

### 4 虚拟DOM

#### 01 | 真实DOM的解析过程

创建DOM树 => 创建StyleRules => 创建Render树 => 布局Laypit => 绘制Painting

1. 创建DOM树: 用HTML分析器，分析HTML元素，**构建一颗DOM树**
2. StyleRules:  用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表
3. 将DOM树和样式表，关联起来，构建一颗Render树
4. 有了Render树，浏览器开始布局。为每个Render树上的节点确定一个在显示屏上出现的精确坐标。
5. Render树和节点显示坐标都有了，就调用每个节点**paint方法，把它们绘制**

#### 02 | 为什么虚拟DOM快？

- 虚拟DOM是真实DOM的一层抽象数据（AST）

  1. 虚拟DOM更快？

     - 占用了更多的内存， 以内存换取原本操作DOM的操作。Javascript 操作 Javascript 对象自然是快。

       但你不能说比整个过程都比【直接操作DOM】快。

     - 正数再小也不可能比零还小，  Virtual DOM 仍然需要调用 DOM API 去生成真实的 DOM。

  2. 多次修改可以规避成一次修改。最终再一次性渲染出最终的实体dom

     - ⭐ 这是优化了JavasCript的执行速度， 而非 reflow / repaint的性能


- VDOM的优点

  - 实现跨平台，服务端渲染

    只要有 JS 引擎就能运行在任何地方运行。

  - 提供一个性能还算不错 Dom 更新策略，

    有 diff 算法，可以减少没必要的 DOM 操作

  - 为了框架的实现而存在。

#### 03 | 关于源码

https://segmentfault.com/a/1190000008291645

#### 04 | Vue通过数据劫持可以进准探测数据变化，为什么还需要虚拟DOM进行diff检测差异？

如果给每个属性都添加watcher用于更新的话，会产生大量的watcher从而降低性能

所以vue采用了组件级的watcher配合diff来检测差异。

⭐ vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入diff才能精确找到 发生变化的地方

#### 05 | VDOM真的减少了回流和重绘吗？

- 支撑的观点

  1. DOM 操作会先改变 Virtual DOM， 所以一些无效改变就不会调用到DOM的API

     如 文本 A 修改为 B ，然后再修改为 A

  2. Virtual DOM 调用 `patch` 方法批量操作 DOM ，不会导致过程中出现无意义的回流和重绘

- 无效回流与重绘

  1. **多次的DOM的API的调用不会触发多次的回流与重绘**

     ⭐ 事实上，Javascript 线程和 UI 线程是互斥的，故执行期间不可能触发回流与重绘。

     浏览器的渲染本身机制决定回流与渲染，而不是DOM API的调用。

     简而言之：

     ❗**无论你在一次事件循环中调用多少次的 DOM API ，浏览器也只会触发一次回流与重绘（如果需要），并且如果多次调用并没有修改 DOM 状态，那么回流与重绘一次都不会发生**。

  2. **批量操作并不能减少回流与重绘**

     依旧是【Javascript 单线程引擎且与 UI 线程互斥】这个理由。无论你在一次事件循环中调用多少次的 DOM API ，浏览器也只会触发一次回流与重绘。


#### 06 | 总结 

1. 操作VDOM很快，但这并不是它的优势。

2. Virtual DOM 可以避免频繁操作 DOM ，但与有效减少回流和重绘次数无关。

3. Virtual DOM 有跨平台优势

   跨平台是 Javascript 的优势，而不是VDOM的优势

4. VDOM的真正优点

   - **其抽象能力和常驻内存的特性**
   - **让框架能更容易实现更强大的 diff 算法，缺点是增加了框架复杂度，也占用了更多的内存**

### 5 源码之Vue 双向绑定原理

https://www.cnblogs.com/hanguidong/p/9533139.html

![image-20220518150038987](../images/image-20220518150038987.png)

1. 观察者 Observer 

   正因为 Observe，所以可以实现数据劫持，在初始getter时（Compile阶段），将Wachter依赖收集至Dep.

   正因为 Observe，所以可以实现数据改动，触发setter中的Dep， Dep去notify其中收集的Wachter（订阅者）的update，以触发其Watcher其update方法。

2. Compile

   对于Wachter， 初始getter时（Compile阶段），将Wachter依赖收集至Dep。

3. Wachter (订阅者)

   即连接 Observer 和 Compile 的桥梁， 存储对应回调事件，从而实现双绑。

   Vue 内部再通过 diff 算法，patch 相应的更新完成对订阅者视图的改变。

   （此外 Compile也是初始化视图的手段，Watcher强调的是更新）

   ```js
   # 注意此处是极其精细化的处理，真实开发其用的是diff算法来更新。
   Watcher.prototype = {
       update: function() {
           this.get();
           this.node[this.type] = this.value; // 订阅者执行相应操作
       },
       // 获取data的属性值
       get: function() {
           console.log(1)
           this.value = this.vm[this.name]; //触发相应属性的get
       }
   }
   ```

4. Dep

   vue响应式属性都要经过Object.defineProperty()

   - 为每个属性分配一个订阅者集合的管理数组dep
   - 编译的时候在该属性的数组dep中添加订阅者
   - v-model会添加一个订阅者，{{}}也会，v-bind也会，只要用到该属性的指令理论上都会
   - 触发该属性的set方法，在set方法内通知订阅者数组dep，订阅者数组循环调用各订阅者的update方法更新视图

   ```js
   	Object.defineProperty(obj, key, {
                get: function() {
                       if(Dep.target) {
                           dep.addSub(Dep.target);
                       }
                       return val;
                },
                set: function (newVal) {
                       if(newVal === val) return;
                       val = newVal;
                       dep.notify();
                }
          })
   ```

### 6 computed与watch实现机理

1. computed

   - 当模板中的某个值需要通过一个或多个数据计算得到时，就可以使用计算属性.

   - 计算属性的本质是属性，当访问到其 【计算属性】时，才会触发getter再依赖收集。

     当触发内部状态的任一setter时，computed会重新计算（当然内部是响应数据）

2. watch

   属性主要是监听某个值发生变化后，对新值去进行逻辑处理

   ```js
   #1 initWatch
   	初始化watch
   #2 this.$watch
   	触发对应的getter，令watcher加入到dep
   #3 new Watcher
   	若是 render-watcher，此时实例化render-wachter
   #4 vm._render
   	触发对应的getter，以让dep收集到此watcher
   ```

### 7 vue的nextTick

ick 即指的是微任务！与微任务进行了联动！

nextTick的主要目的就是为了让你获取到更新后的dom元素。

实现

1. Promise.then

2. MutationsObserve 

   - 由于IOS存在bug， 已于2.5版本废弃。

   主动去监听与修改textNode节点的内容，以便于事件加入到微任务中

3. setImmdiate => 通过宏任务去调用微任务process.nextTick

   - vue2.5废弃MutationsObserve 的代替品

   Node.js提供的`setImmediate()`函数

   事件循环的当前迭代中执行传递给`process.nextTick()`函数

4. MessageChannel 宏任务

   - setTimeout 是有最小延迟时间的， 5 层以上的定时器嵌套会导致至少 4ms 的延迟
   - `无延迟的定时器！`

5. setTimeout宏任务

### 8 scoped与module

#### 01 | scoped

其实现插件： PostCss

1. 给每一个html的dom节点添加不重复的data属性
2. 在每句css选择器的末尾，添加属性选择器 (特指data)， 来私有化选择器。

```html
<div data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
</div>

<style>
.button-warp[data-v-2311c06a]{
    display: inline-block;
}
</style>
```

#### 02 | module原理

module是一种替代 scoped的方案。了解即可。

赋予组件特定的类名， 不产生副作用也能达到私有化样式的效果（默认配置为文件名称）

1. template使用的示范

   ```vue
   <template>
     <p :class="$style.red">
       This should be red
     </p>
   </template>
   
   <style module>
   .red {color: red;}
   </style>
   ```

2. js

   - 深层子组件也可以获取到了
   - script中也能拿到css module

   ```js
   mounted () {
       console.log(this.$style)
       // { border: "App_border_y_ncl",titleColor: "red" }
   }
   ```

### 9 vue的use

是Vue作为插件给全局添加的功能。它要求你是一个对象，且拥有install方法，以此实现更加复杂的功能。

- vue.component
- vue.mixins
- ...

### 10 对vue的理解

- MVVM  （VM是V -> M单项数据的中间层，也实现双向绑定）
- 组件化
- 指令系统 -> 作用于DOM
- 与react的区别
  1. react一直推崇单向数据流，以至于redux的实现并非在react的考虑范围内
  2. vue使用的响应式数据
  3. diff算法不同。react是【diff队列保存哪些更新的dom】，vue是双指针【对比比较，再更新】。

### 11 源码之v-if 与 v-show

v-if 的注意事项

1. 与key结合使用，可以服用已有元素。
2. 配合组件使用，会触发组件生命周期函数
3. 与transition使用，根据transition触发过渡动画效果

v-show

1. 仅在修改其元素的display （v-show时也会判断有无transition属性而触发动画）

### 12 源码之Vue实例的挂载过程

1. 实例化属性合并 （extends、mixins属性混入）
2. 生命周期标识符的初始化、组件事件系统的初始化
3. beforeCreate，并初始化组件依赖注入内容（inject）
4. 初始化initState （initProps、initMethods、initData、computed、初始化watch）
5. created触发
6. 编译并挂载模板
   - template -> AST -> render函数 -> 挂载至DOM
   - 调用beforeMount，定义updateComponents方法
   - 当前vue组件实例化Watcher
     1. updateComponents调用render函数，以生成vnode
     2. 调用当前的vm._patch_根据vnode生成真实DOM，移除old-node
     3. 触发mounted

### 加快

### 

### reactive 与 ref的区别

### vue3.0的改进

#### 01 | 性能优化

1. 重写了虚拟DOM的实现, 提升编译模板的优化
   - 现在可以进行【节点标记（PatchFlag）】，使得区分了静态节点与动态节点。
   - diff算法不再需要一定遍历所有节点，而是先查看是否是一个动态节点。

````js
patchFlag & PatchFlags.TEXT
````

2. 事件缓存

   `cacheHandler`可在第一次渲染后缓存我们的事件。

   相比于 Vue2 无需每次渲染都传递一个新函数。加一个 click 事件

#### 02 | Tree shaking support

- 未用的模块便不会被打包，拥有更多的功能，却更加mini。
  1. 编译阶段利用`ES6 Module`判断哪些模块已经加载
  2. 判断那些模块和变量未被使用或者引用，进而删除对应代码
- 即 vue3.0 做成了按需引入 （ 这也是Composition API的必然）

#### 03 |  Composition API

1. Option API的反复横跳
2. setup 便是围绕【beforeCreate】与【created】生命周期钩子运行的，不用显示定义。
3. 而且你可以用hooks代替 原本的mixins

#### 04 | 新的组件

- fragment （多template） 

  组件支持多个template 。

- teleport（传入）

  `Teleport` 是一种能够将我们的模板移动到 `DOM` 中 `Vue app` 之外的其他位置的技术，

  就有点像哆啦A梦的“任意门”

  https://www.jianshu.com/p/1ecf5006b1ae

  ```js
  <button @click="dialogVisible = true">显示弹窗</button>
  
  <teleport to="body">
    <div class="dialog" v-if="dialogVisible">
      我是弹窗，我直接移动到了body标签下
    </div>
  </teleport>
  ```

- Suspense

  允许程序在等待异步组件加载完成前渲染兜底的内容，如 loading ， 这是一种用户体验的优化。

  ````vue
  <tempalte>
    <suspense>
      <!- 默认插槽 ->  
      <template #default>
        <List />
      </template>
      <!- 加载插槽 ->  
      <template #fallback>
        <div>
          Loading...
        </div>
      </template>
    </suspense>
  </template>
  ````

#### 05 | 更好的TypeScript支持

- vue-next 本身就是typescript编写的
- vue-2 之前采用的是 FLow.js， 现在不再使用。

#### 06 | 响应式原理的变更

用proxy消除了 局限性。 而之前必须在 data 中声明属性。

1. 对象、数组的 增 与 删除
2. length的变更
3. Map、Set的支持

#### 07 | 废弃

$on、$off、$set、$delete

v-model使用的变化

#### 08 | 插槽的合并