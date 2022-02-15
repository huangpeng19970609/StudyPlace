### vueX

> vuex的store有State、 Getter、Mutation 、Action、 Module五种属性\

1. **state** 为单一状态树
2. **getters** 类似vue的计算属性，主要用来过滤一些数据
3. **mutation** 更改store中state状态的唯一方法就是提交mutation
4. **action**  异步操作数据， view 层通过 store.dispath 来分发 action

如何共享？

1. vuexinit混淆进Vue的beforeCreacte钩子

   beforeCreate的时候注册了store， 若为根元素可直接获取，否则从parent上取store

### vue传值方式

1. 依赖注入 provide / inject => **一个祖先组件向其所有子孙后代注入一个依赖**

2. `$attrs`/`$listeners` => **跨级组件之间的通讯变得更简单** 

   一个负责收纳属性，一个负责收纳事件

   $attrs存在了父元素但未被prop所识别。

   你应该配合 inheritAttrs: false 来使用！

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

     

3. bus通信， vue3已废弃

4. 父子传值 props / $emit

5. vuex

6. `$parent` / `$children`与 `ref`

7. 插槽

### 父组件监听子组件的生命周期

1. @hook对应的生命周期即可

   ```js
   <Child @hook:mounted="doSomething" ></Child>
   ```

2. 对应声明周期 $emit即可



### 虚拟DOM

#### 1 真实DOM的解析过程

创建DOM树 => 创建StyleRules => 创建Render树 => 布局Laypit => 绘制Painting

1. 创建DOM树: 用HTML分析器，分析HTML元素，**构建一颗DOM树**
2. StyleRules:  用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表
3. 将DOM树和样式表，关联起来，构建一颗Render树
4. 有了Render树，浏览器开始布局。为每个Render树上的节点确定一个在显示屏上出现的精确坐标。
5. Render树和节点显示坐标都有了，就调用每个节点**paint方法，把它们绘制**

#### 2 为什么虚拟DOM快？

1. 为什么真实DOM慢?

   答：JS操作DOM时。浏览器会从构建DOM树开始从头到尾执行一遍流程。即便你还有9次更新，这9次更新也会重复这步骤。不会缓存之前的任何结果。

2. 虚拟DOM的好处

   为什么一次性更快呢 ?  => 因为预先操作JS对象更加快！

   若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象`一次性attch到DOM树上`

3. VDOM的真正意义

   vdom 的真正意义是为了实现跨平台，服务端渲染，以及提供一个性能还算不错 Dom 更新策略。

   Diff算法只是为了虚拟DOM比较替换效率更高，通过Diff算法得到diff算法结果数据表

   **DOM** **fragment**来操作dom是原本就是有的功能，只不过现在帮你进行打包操作了！

#### 3 关于源码

https://segmentfault.com/a/1190000008291645

#### 4 Vue通过数据劫持可以进准探测数据变化，为什么还需要虚拟DOM进行diff检测差异？

如果给每个属性都添加watcher用于更新的话，会产生大量的watcher从而降低性能

所以vue采用了组件级的watcher配合diff来检测差异。

⭐ vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入diff才能精确找到 发生变化的地方

### Vue 双向绑定原理

> 当数据发生变化时，触发 Observer 中 setter 方法，
>
> 立即调用 Dep.notify(),Dep 这个数组开始遍历所有的订阅者，并调用其 update 方法，
>
> Vue 内部再通过 diff 算法，patch 相应的更新完成对订阅者视图的改变

1. 数据监听器 Observer 

   数据劫持， 初始getter时进行依赖收集至Wachter中的Dep， 

   若进行改动，触发setter中的Wachter的Dep的notify

2. Compile

   在对VNODE进行解析的时候，即触发getter进行依赖收集

3. Wachter

   即连接 Observer 和 Compile 的桥梁， 存储对应回调事件，从而实现双绑。

### Vue的响应式

> 此与绑定原理异曲同工

1. 任何一个 Vue Component 都有一个与之对应的 Watcher 实例
2. data会被劫持与代理
3. getter 方法会被调用, 此时 Vue 会去记录此 Vue component 所依赖的所有 data。(这一过程被称为依赖收集)
4. data 被改动时（主要是用户操作）, 即被写, setter 方法会被调用, 此时 Vue 会去通知所有依赖于此 data 的组件去调用他们的 render 函数进行更新

### computed与watch实现机理

> wachter机制



### vue的nextTick

ick 即指的是微任务！与微任务进行了联动！

nextTick的主要目的就是为了`让你获取到更新后的dom元素`, 不过在此时也保证了dom肯定存在

> 一处误区
>
> 虽然UI渲染也是一个宏任务，但DOM的修改是一个同步的任务！故vue在实现的时候其实也考虑到了此点，
>
> vue的dom操作是微任务，之后再进行UI渲染，减少了ui的渲染性能。

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

### scoped与module

#### 01 | scoped

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



