### 01 vue3.0的改进

https://vue3js.cn/interview/vue/vue3_vue2.html#%E4%BA%8C%E3%80%81vue3%E6%96%B0%E5%A2%9E%E7%89%B9%E6%80%A7

#### 1 | 性能优化

1. 重写了虚拟DOM的实现, 提升编译模板的优化
   - 现在可以进行【节点标记（PatchFlag）】，使得区分了静态节点与动态节点。
   - diff算法不再需要一定遍历所有节点，而是先查看是否是一个动态节点。

````js
patchFlag & PatchFlags.TEXT
````

2. 事件缓存

   `cacheHandler`可在第一次渲染后缓存我们的事件。

   相比于 Vue2 无需每次渲染都传递一个新函数。加一个 click 事件

#### 2 | Tree shaking support

- 未用的模块便不会被打包，拥有更多的功能，却更加mini。
  1. 编译阶段利用`ES6 Module`判断哪些模块已经加载
  2. 判断那些模块和变量未被使用或者引用，进而删除对应代码
- 即 vue3.0 做成了按需引入 （ 这也是Composition API的必然）

#### 3 |  Composition API

1. Option API的反复横跳
2. setup 便是围绕【beforeCreate】与【created】生命周期钩子运行的，不用显示定义。
3. 而且你可以用hooks代替 原本的mixins

#### 4 | 新的组件

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

#### 5 | 更好的TypeScript支持

- vue-next 本身就是typescript编写的
- vue-2 之前采用的是 FLow.js， 现在不再使用。

#### 6 | 响应式原理的变更

用proxy消除了 局限性。 而之前必须在 data 中声明属性。

1. 对象、数组的 增 与 删除
2. length的变更
3. Map、Set的支持

#### 7 | 废弃

$on、$off、$set、$delete

v-model使用的变化

废弃过滤器

#### 8 | 插槽的合并

### 02 vue-next的设计目标

- 目标

  1. 更小
     - 移除了不常用的api  （filter、$bus($on、$off)、$destory
     - tree-shaking的优化
  2. 更快
     - diff算法的优化
     - 静态提升
     - 事件监听缓存
  3. 更友好
     - composition-api
     - typescipt的全面拥抱

- 如何实现vue-next

  1. 源码

     - 开发时模块依赖关系明确，功能明朗，以至于他们也可以独立去使用
     - 基于ts开发，实现了更好的维护

  2. 性能

     - 体积优化
     - 编译优化
     - 数据劫持优化

  3. 语法api

     composition api的逻辑复用

### 03 vue的性能提升

1. 编译阶段

   vue-2时，每一个组件便是一个Watcher实例，其依赖的数据变更，便触发setter以更新watcher，使之重新渲染。

   - diff算法优化

     

   - 静态提升

   - 事件监听缓存

   

2. 静态提升

