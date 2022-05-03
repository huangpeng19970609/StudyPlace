### vue3.0的改进

#### 01 | 性能优化

重写了虚拟DOM的实现, 提升编译模板的优化

- 现在可以进行【节点标记（PatchFlag）】，使得区分了静态节点与动态节点。

- diff算法不再需要一定遍历所有节点，而是先查看是否是一个动态节点。

  ````js
  patchFlag & PatchFlags.TEXT
  ````

#### 02 | Tree shaking support

- 未用的模块便不会被打包，拥有更多的功能，却更加mini。
  1. 编译阶段利用`ES6 Module`判断哪些模块已经加载
  2. 判断那些模块和变量未被使用或者引用，进而删除对应代码
- 即 vue3.0 做成了按需引入 （ 这也是Composition API的必然）

#### 03 |  Composition API

- 过去的 mixin不再建议使用，而Composition API更可以实现灵活且无副作用的复用代码。

- option api 也是支持使用的

- vue-3的可响应模块也可以与其他框架使用

- 而传统的OptionsAPI中， 当业务复杂时，弊大于利

  新增或者修改一个需求，就需要分别在data，methods，computed里修改

#### 04 | fragment & teleport

- fragment （多template） 

  组件支持多个template 。

- teleport（传入）

  `Teleport` 是一种能够将我们的模板移动到 `DOM` 中 `Vue app` 之外的其他位置的技术，

  就有点像哆啦A梦的“任意门”

  https://www.jianshu.com/p/1ecf5006b1ae

#### 05 | 更好的TypeScript支持

- vue-next 本身就是typescript编写的

#### 06 | 更详细的讲述

- 生命周期

  1. 生命周期要【按需引入】
  2. setup 便是围绕【beforeCreate】与【created】生命周期钩子运行的，不用显示定义。

- 多根节点 （fragment），可支持多个template

- 异步组件 （Suspense）

  允许程序在等待异步组件加载完成前渲染兜底的内容，如 loading ， 这是一种用户体验的优化。

  ```vue
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
  ```

- Teleport (任意门)

   Teleport 组件可将部分 DOM 移动到 Vue app 之外的位置。比如项目中常见的 Dialog 弹窗

  ```vue
  <button @click="dialogVisible = true">显示弹窗</button>
  
  <teleport to="body">
    <div class="dialog" v-if="dialogVisible">
      我是弹窗，我直接移动到了body标签下
    </div>
  </teleport>
  ```

- 响应式原理

  用proxy消除了 局限性

  1. 对象、数组的 增 与 删除
  2. length的变更
  3. Map、Set的支持

- VDOM

  虚拟DOM上增加 patchFlag 字段

- 事件缓存

  `cacheHandler`可在第一次渲染后缓存我们的事件。

  相比于 Vue2 无需每次渲染都传递一个新函数。加一个 click 事件

- Diff算法优化

  patchFlag 帮助 diff 时区分静态节点，以及不同类型的动态节点。一定程度地减少节点本身及其属性的比对

- 打包优化

  tree-shaking 的支持， 故全局API现在只能作为ES模块构建的命名导出进行访问.

  Vue应用程序中未使用的 api 将从最终的捆绑包中消除，获得最佳文件大小.

  也这也是组合式API的优点。

  ```js
  import { nextTick } from 'vue';   // 显式导入
   
  nextTick(() => {
    // 一些和DOM有关的东西
  });
  ```

- Composition API

### 前言

vue文件中 对export default 的外部声明的变量是如何处理的?

为什么不会被其他vue文件捕捉到？

#### 细节

1. 原生JS开发是命令式， 而Vue是声明式

2. vue的github上的名称为 `vue-next`, 指代vue3

3. vue3的源码使用 ts 开发，请务必要学会ts，然后删除这一行！

4. 国外环境使用react 要远 大于 vue， 而国内正好相反

5. 如何更好的使用vsCode代码片段

   代码片段确实非常好用，但是其由于是json格式，导致创建一个代码块文件非常麻烦。

   File => Prefrence => User Snippests

   ⭐ 借助网站 => snippet-generator.app来帮助我们生成json文件的格式

#### vue-cli的简单机理

- vue的脚手架

  "serve": "vue-cli-service serve" => 会去node_modules => .bin文件下的vue-cli_service执行

- webpack

  "serve": "webpack serve" => .bin =>webpack

在`vue-cli-service`中其`require('../lib/Service')`其只是一个映射文件，真正位置为node_modules文件夹下的 cli-service下

更详细略。

#### Vite

> 目前三大框架并都未移植Vite下，但Vite的未来前景是非常令人期待的！
>
> webpack项目越复杂，其速度越慢，而vite的高速非常卓越

1. vite是一个基于ES模块的开发服务器，HRM快

2. 构建执行，预设rollup，生成优化后的生产资源.....

3. 试试vite, 

   - 会自动打包js文件
   - 自动补齐后缀名, 不过还是建议不省略，因为vsCode可以更好快速定位其他文件
   - 可以缓存上一次打包的未修改文件，令hrm速度快
   - ..........

4. vite像加强版本的babel, 

   - 支持ES6 + CommonJs、TreeShaking、Go的API、JS的API

   - 支持TypeScript与Jsx语法编译

   - 是一个独立的开发服务器

     比如你在浏览器请求ts文件，less文件时，若是webpack，会直接将其转为js 与 css， 而vite并不会这样。你可以看到你请求的依旧是ts文件，less文件。浏览器之所以可以识别是因为 vite 拦截了这个请求，梅开二度再转发可执行文件给与浏览器

   - 支持sourceMap、代码压缩、拓展插件等

   

5. 为什么vite那么快？！

   使用的是Go语言！ 是机器码！无需要字节码转换！

   其外ESBuild的开发不使用第三方，都是自己的。

##### vite与vue

1. vue3的初始化也略有变化, 以下做出示范

   ````js
   cnpm vue@next -D
   # createApp名称变了
   import { createApp } from 'Vue'
   import App from './App.vue'
   createApp(App).mount('#app')
   ````

2. 使用vite启动vue3脚手架需要以下

   由于是vue后缀文件

   ```js
   cnpm @vitejs/plugin-vue
   // 若你希望用jsx文件运行 => @vitejs/plugin-vue-jsx
   ```

   由于要使用plugin故需要配置文件， 新建`vite.config.js`

   ```js
   const vue = require('@/vite/plugin-vue')
   
   此外需要依赖
   cnpm install @vue/compile-sfc -D
   ```

3. vite的操作

   - npx vite build
   - npx vite preview 可以预览dist文件的页面

### 前置知识

#### 1 约定俗称-封装思想-useCounter

- 我们会抽离代码

  ````js
  // 单独的 hooks 文件夹 
  # useCounter.js
  import { ref, computed } from 'vue'
  export default function() {
  	const counter = ref(0);
      const doubleCounter = computed( () => counter.value *= 2 )
      const increment = () => counter.value++;
      return {
          counter,
          doubleCounter,
          increment
      }
  }
  ````

- 我们会加入这段逻辑

  ⭐ 不管是 data、method、还是其他其他都被闭环在同一处了，很好维护！👍

  ````js
  import userCounter from './hooks/useCounter.js'
  setup() {
      // 逻辑被闭环在了同一处
  	const { counter, doubleCounter, increment} = userCounter;
  }
  ````


### 基本语法

0. 

1. v-once

   v-pre

   v-clock

   v-bind、v-bid:class、v-bind:style

   - ⭐ v-bind也可以动态的去绑定属性

   ```js
    <div :[key] = "xxx">
   ```

   - 批量绑定属性

     ```js
     <div :bind="info" />
     
     info: {name: '1', sex: 'man' } => 即<div name="1" sex="man">
     ```

     

2. watch的写法也是支持 get、set形式，虽然少见

3. 屏蔽继承属性 => inheritArrts: false

4. 访问非prop注入的所有attribute

   ````js
   this.$attrs.class
   ````

5. inject 与provide

   ```js
   provide() {
       // 只有这样写才可以访问到this实例！
       return {
           name: this.myName
       }
   }
   ```

6. 动态组件

   使用【keep-alive】 其额外有属性 include、exclude、max

7. 你可以通过 this.$el获取当前组件的根元素

### 新的语法

#### vue3已移除的语法

1.  vue3移除了 $children属性
2. vue3移除了事件总线， on、off

#### emits属性

- 你可以视作起为emit的注册属性， 若你不注册此属性固然也可以！

  你应与 【setup】使用，而不要使用vue2的旧语法
  
- emits的作用

  1. 一种管理理念，我提前在告诉你本组件中emit类型的方法，告知与其父的联系
  2. emits若为对象，提供了一种emit的发射限制，这在某些情况下 极其好用！
  
  ````js
  # 写法一
  export default {
      emits: ['add', 'sub']
  }
  # 写法二
  export default {
      emits: {
          add: null,
          addN: payload => {console.log(payload)}
          // 限制 emit!
          addS: (num1, num2, num3) => { return num1 === num2 === num3 }
      }
  }
  ````

#### computed

> vue3额外提供了一个computed方法可以实现响应
>
> 比如 computed 与 provide的联合使用， 本来provide是不会令子组件响应式的改变的！

```js
import { computed } from 'vue'
export default {
   provide () {
    	return {
        	computed( () => this.name )
    	}
   }
}
```

#### mitt第三方库

> 由于Vue3启用了 om、emit、off这类事件
>
> 若你想在 vue3继续使用 之前的bug总线功能，请使用mitt库

```js
import mitt from 'mitt';
const bus = mitt();
export default bus
```

#### 异步组件

- vue2的异步组件 => 如此处理后其打包文件会被分包处理

  ````js
  import("xxx").then(() => {});
  ````

- vue3提供新的api拓展了此功能

  `defineAsyncComponent`  

  ```js
  import { defineAsyncComponent } from 'vue'
  
  # 函数形式，其返回值为一个Promise
  const AsyncComponent = defineAsyncComponent(
  	() => import("xxx")
  )
  
  # 对象 具体更多的配置请自行查询官方API
  const AsyncComponent = defineAsyncComponent(
  	loader: () => import('xxx'),
      loadingComponent: Loading,
      ...........
  )
  ```

- 异步组件与Suspense

  Vue3内置一个特别的组件，其利用插槽进行了异步组件的展示。

  ```html
  <suspense>
  	
      <template #default>   
          <async-cmp></async-cmp>   
      </template>
      # 若是在加载中 或 加载失败
      <template #fallback>  
          <my-loading></my-loading>
      </template>
  </suspense>
  ```

#### transition（vue2）

> 对于vue2 与 vue3的transition的区别到底是什么我不太清楚，不过在此处重新学习一下 transition
>
> - 原理: 是在恰当的时机进行增删类名, 此步骤transition帮你做
>   1. 目标元素是否需要使用动画？ 
>   2. 存在对应的钩子函数回调吗？若存在则回调

##### 例子

- template模板代码

  1. 使用transition来包裹对应组件或元素
  2. transition组件添加相应的配置属性

  ```html
  <template>
  	<transition name="why">
  		<div>xxxxxxxx</div>
  	</transition>
  </template>
  ```

- ⭐ css代码

  ```js
  .xxx-enter-from, .xxx.leave-to {
      opacity: 0
  }
  .xxx-enter-to, .why-leave-from {
      opacity: 1
  }
  .why-enter-active, .why-leave-active {
      transition: opcity 2s ease;
  }
  ```

> 六种状态会被自动的添加， 而对应的类名便是对应的 `name` 属性
>
> ⭐ 若不起名称，则名称默认为v-enter-from 此类

##### animation

> 搭配animation进行更好看的动画

```js
.why-enter-acitve {
    animation: bounce 1s ease;
}
.why-leave-active {
    animation: bounce 1s ease reverse
}
@keyframes bounce {
    0%: { transition: scale(0) }
    50%: 1.2
    100%: 1
}
```

1. 若同时设置时，你应该额外的添加属性

   且此时会看谁的动画时间更长

   ```js
   <tansition name=“why” type="animation">
   ```

##### 模式

开启mode， 那么会在 元素渲染期间产生更好看的动画效果

- appear 属性会令其进入初始化的时候也会有渲染的动画出现

```js
<transition mode="in-out" appear>
    <h1 v-if
    <h2 v-else
	<component :is="curCmp"
```

##### animation.css库的使用

```js
import "animation.css"

bounceInUp便是此css提供的帧动画

.why-enter-active {
    animation: bounceInUp 1s ease-in reverse;
}
```

##### 自定义类名

- 自定义的优先级更高

```js
:enter-active-class = "animation__animated animation__rebubberBound"
```

##### transion的JS钩子函数

> css动画总是不够灵活
>
> 我们可以借用gasp这个库进行快捷的动画开发

```js
<tansition @enter=“enter” @levae="leave">
```

配合gasp使用

```js
enter(el, done) {
    gasp.from(el, {
        scale: 0,
        x: 200,
        // 回调，防止立即执行
        onComplete done
    })
},
    
leave(el, done) {
    gasp.to(el, 
```

##### transition-group

> 批量动画

```js
<transition-group tag="p" name="why">
    <span v-for .....>
```

赋予更好看的transition特效

```js
.why-enter-from, {
    opacity: 0,
    transition: translateX(30px)
}
.why-enter-to {}
// 这是为了让动画移动的时候更加的漂亮，暂时脱离文档流
.why-leave-active {
    position: absolute;
}
```

##### 交替动画

```js
<div v-for = xxxx :date-index="index"

enter(elm done) {
    gasp.to(el, {
        opcity: 1,
        height: "1.rem",
        onComplete: done,
        // 此时就可以是实现一个个的淡出又淡入！
        delay: el.dateset.index * 0.5
    })
}
```

#### mixins(vue2)

> vue2都支持mixins的使用，其目的是为了抽离组件重复的逻辑与代码
>
> 其minxins本质是一个对象，也支持数组多个传递，`此可以包含组件的任何选项`。
>
> 有extends也类似与实现如此效果，略。建议还是minxins

例如

```js
# 此可以包含组件的任何选项`
mixins: [
    {
        data: {
            name: 'me',
        },
        computed: {},
        watch: {},
        methods: {}
    }
]
```

此外需要注意若mixins的选项与当前组件选项属性冲突，遵循以下规则

1. 若data，以当前组件优先
2. 若生命周期， 会将生命周期变成数组调用，即两个生命周期都会先后执行
3. 对象类型(methods， computed，directives)的此类都会被合并，并以当前组件优先

> 全局合并

其下每一个组件都会被混入！

```js
	Vue.mixin({
      created() {
        console.log('全局混入的钩子函数');
      }
    })
```

 

### ⭐ Component API

> vue2是一种options API, 即使用选项的时候来实现一个组件
>
> vue3建议你使用Composition API【前端的模式应该会慢慢转向Component API】

`optionsAPI`

1. `特点`   

​	对应的属性编写对应的功能模块

2. 弊端

   ​      对应功能被拆分到各块，伴随项目的庞大会导致可读性极差。

   ⭐ 逻辑关注点列表增大， 同一个功能的逻辑拆分的很分散， 尤其对于并不是开发此组件的人来说 

`Composition`

> 有什么办法将同一个逻辑里的代码收集到一起呢？ 
>
> setup
>
> setup是组件的另一个选项，但其可以帮我们`替代之前所编写的大部分其他选项`。如methods, computed， watch, data, 生命周期函数等

#### 01 setup

1. `setup 内不绑定this，它不会指向组件的实例（虽然是在组件实例创建后）`，

   setup调用发生在 data、property、methods被解析之前，故你无法在setUp中获取他们，也无意义。

   ````js
   setUpComponent(instance) {
       const { setup } = Component;
       // 兼容性处理 f=> data()
       if (setUp) {
       }
   }
   ````
   
   
   
2. setUp不会主动的帮你响应式

3. 那你可以使用setUp的返回值去替代大部分选项

##### setup的参数

1.  props

   - props是一个 Proxy 对象。
   - props定义类型还是如往常一样定义，不过可以在setup中直接获取到

   ````js
   # 获取传递给我的参数, 父组件传递来的
   export default {
       setup (props, context) {
           console.log(props)
       }
   }
   ````

2. 【context】，即 setupContext

   - context.attrs: 所有非prop的attribute都可以获取到

     ````js
     <cmp id="123456" class="123456"
     ````

   - context.slots

     这个方法很少去使用，因为我们很少会获取插槽（除非我们主动来render）

     ````vue
     <home>
     	<template #default>
         	<h2>
                 哈哈哈哈
             </h2>
         </template>
     </home>
     ````

   - context.emit

     相当于传统的 this.emit， 现在你应该使用这个context.emit来发送事件

##### setup的返回值的作用

> 这很像 React的用法！ 你可以返回数据，返回方法

- setup的返回值可以在template中使用, 若 data 与 setup同时存在，使用 setup

- `可以使用setUp的返回值替代 data 选项`

  但在 `setUp 中返回对象并不会自动的帮你自动响应式！`

````js
# 
export default {
    let counter = 100;
    const increment = () => {
        counter++;
    }
	return {
        counter,
        increment
    }
}
````

##### setup中使用ref

⭐ ref不需要加冒号，vue会特殊进行处理

```js
<div ref="title"></div>
# vue2
this.$refs['me']
# vue3
setup() {
	const title = ref(null);
    watchEffect( ()=> {
        # watchEffect立刻执行一次, 且 ref 是在挂载后才能获得
    	console.log(title)  // null => dom元素
    })
    return {
        title
    }
}

```

#### 02 Reactive API

##### 1 Reactive 

> 我们使用 setUp 后返回后数据并不会自动的响应式，这与data()声明不同
>
> - 能用ref的时候尽量去使用ref

````js
import { reactive } from 'vue';
export default {
    setup() {
        const state = reactive({
            count++;
        })
        return {
            # 此时 便会数据劫持 proxy => state.count 变成响应式的
            state
        }
    }
}
````

- 实现机理
  1. 存在 Proxy - state，会劫持其 get 与 set
  2. template存在 state.counter的使用， 故存在deps
  3. 一旦修改 state.counter 便取出其 deps收集的所有依赖，再次重新执行所有依赖
- ⭐注意事项
  1. Reactive api 要求我们传入的类型 应该是【数组】、【对象】 



##### 2 Reactive判断

1. isProxy： 

   是否是代理?， 是否由 reactive、readonly创建的proxy

2. isReactive：

    是否是响应式代理？， 是否由 reactive创建的响应式代理

   - 若代理由readonly创建，但包裹了reactive创建的另一个代理依旧为true

3. isReadonly

   是否由readonly创建的只读代理

4. toRaw

   返回reactive 或 readonly 代理的原始对象 （请慎用，多处影响同一对象）

5. shallowReactive （ shallowReadOnly）

   - 浅层的reactive （readonnly）

   创建一个响应式代理，只跟踪自身property的响应式 （自读）。不深层。

#### 03 Ref API

>  Reactive api 要求我们传入的类型 应该是【数组】、【对象】，
>
> 但有时候你希望仅仅是特例类型的处理，也没有一种办法只对【基本类型】的进行响应式呢？
>
> ref => reference 响应式的引用

- counter为ref(100)

  counter 便是 一个 ref的对象，按理应该使用 counter.value 来显示值。

  但若在 template中使用， vue会自动帮你会解包，自动获取 counter.value！ \

- setup中，并不会帮你 ref 自动解包，想要你自己解包。

```js
import { ref }  from 'vue';
export default {
    setup() {
        let counter = ref(100);
        const increment = () => {
            counter.value++;
        }
        return {
            counter;
        }
    }
}
```

1. ref 的解包只是浅层解包

   - 此时 {{ info.counter }} 并不会自动解包， 只能浅层解包！
   - 因为 info 不是 ref， info只是一个普通的js对象

   ```js
   setup() {
      	const info = {
       	counter: ref(100),
   	}
       return info;
   }	
   
   ```

2. 实现解包

   - 此时 info.counter可以自动解包！

     即 最外层包裹是reactive会帮你解包

   - 我们并不建议你如此做，vue之所以可以如此做仅是做了单独的判断。了解即可。

   ````js
   const info = reactive({
       counter: ref(100);
   })
   ````
   
3. 当传递给子组件的时候， 其值若为ref，则子组件依旧可以 逆向修改值

   - 但实际中，我们并不希望子组件去修改我们父组件的值，设计准则。

   - 实际中，我们应该 子 传递 父事件，通过事件在父祖件中修改其值。

     ````js
     故 在传递其子值的时候，使用
     	readonly
     ````

##### 1 toRefs

> 什么时候使用？ 当你相对一个 reactive对象的所有属性都解构出来 ref的时候！

- 从当前 reactive对象解构出来，相当于赋值操作，故 并非是 Proxy 的劫持，不会双向绑定

- 此时你应该使用 toRefs, 自动将其属性转为 ref

  toRefs将reactive返回对象属性中的所有属性都转为 ref！

- ⭐ 且 age 改变会 触发 name 的改变！ 相当于 建立了 属性之间的链接。

````js
import { toRefs } from 'vue'
# 这种情况下 name、age 并非是响应式
export default {
    setup() {
        let { name, age } = toRefs(reacitve({name: '1', age: 19}));
        return {
            name,
            age
        }
    }
}
````

##### 2 toRef

- 若你不需要将对象所有属性转为 refs， 你可以如此只转化其中一个属性

```js
let  name  = toRef(info, 'name');
```

##### 3 unref

- 场景

  ```js
  # 是 ref取value 否则直接取值
  import {  isRef } from 'vue';
  val = isRef(val) ? val.value : val
  ```

- 当你想获取ref对象的value的时候，你也可以使用 unref方法

  ```js
  # vue贴心的提供了语法糖
  import { unref } from 'vue'
  val = unref(val);
  ```

##### 4 ref判断

1. isRef

   - 判断是一个ref 

2. shallowRef

   -  ref

     ```js
     # info 是一个 ref对象， 此时如此修改必然会触发其 dep
     info.value.name = 'james'
     ```

   - 创建一个浅层的

     我希望 只有 ref最外层对象变更才触发更新

   ````js
   export default {
       setup() {
           const info = shallowRef({name: 'hp'});
           const changeInfo = () => {
               # 此时页面不会刷新
               info.value.name = 'james'
       		# 但我希望仅是 info 自身改变才触发响应式
               info = {name: 'hello'}
           }
           return {
        		 info,
           }
       }
   }
   ````

3. triggerRef

   - 手动去触发 和 shallowRef的副作用

   ```js
   triggerRef(info) => 手动去触发其强制刷新, 可视作 shallowRef 来触发的刷新
   ```

4. customRef

   - 自定义的ref， 极少用

     自定义ref，自定义跟踪与触发更新以控制

   - 要求:

     创建工程函数，函数接受 track、trigger函数作为参数， 并返回 携带get 与 set的对象

   - debounce 防抖示范

     1. 由于 频发的触发收集的deps数组（副作用）导致页面不断的刷新，故我们应该做一个节流 
   
     ````vue
     <template>
     	<input v-model="value"/>
     </template>
     <script>
         import { ref } from 'vue'
         import { useDebounceRef } from 'xxxx.js';
         export default {
             setup() {
                 let value = useDebounceRef(0);
                 return {
                     value
                 }
             }
         }
     </script>
     
     ````
     
     2. 函数依赖
     
        useDebounceRef.js
        
        ```js
        import { customRef } from 'vue'
        export default function (value){
            let timer = null;
            return customRef( (track, trigger) => {
             	return {
                    get() {
                        // 只要访问, 便收集依赖  
                        track();
                    	return value;
                    }
                    set(newValue) {
                        clearTimeout(timer);
                        timer = setTimeout(()=> {
                            value = newValue;
                        	trigger();
                        }, 1000)
                    }
                }
            })
        }
        ```
        
        
   
   



#### 04 readonly API

vue3 不仅提供ref、reacive，也提供了readonly

1. readonly返回原生对象的只读代理， 它依然基于 Proxy ，但其 set方法被劫持，使其不能修改

````js
本质如此
const infoProxy = new Proxy(info, {
    get(target, key) { return target[key] }
    set() { warning('不可修改!') }
})

import { readonly } from 'vue';
export default {
    const info = readonly({name: 'me'});
	info.name = '1000';
}
````



#### 05 生命钩子函数 API

示范

- onXXXX

- ⭐ 若你有 beforeCreated、created生命周期希望进行的函数操作

  您应该在 setup中直接执行，这是等价的含义。

  因为 setup本身就会在beforeCreated、created中执行。

  ````js
  import { onMounted, onUpdated, onUnmounted } from 'vue';
  export default {
      setup() {
          onMounted( ()=> {} )
          onUpdated( ()=> {} )
          onUnmounted( ()=> {} )
      }
  }
  ````



#### provide/inject

```js
import { provide } from 'vue'; provide('name', name);
import { inject } from 'vue'; const name = inject('name', name) // 获取到

# 实际开发中 尽量不让子组件来修改
import { provide, readonly } from 'vue'; 
provide('name', readonly(name));
```

#### computed

```js
import { computed, ref } from 'vue';

const firstName = ref('me');
const last = ref('last')
# 方式一 返回 ComputedRef 本质就是 ref
const fullName = computed( ()=> firstName.value + " " + last.value)

# 方式二
const fullName_2 = computed({
    get: () => firstName.value + " " +last.value,
    set(val) {
        const name = nameValue.split(" ");
        firstName.value = name[0];
        firstName.value = name[1];
    }
})

return {
    fullName,
    fullName_2
}  
```

#### watch

- 手动去指定侦听的数据源

- 完全等同普通watch， 略。惰性,  不管如何都会赋值于getter


##### 1 监听属性

```js
import { watch } from 'vue'
 export default {
     setup() {
         # 监听属性 传入一个get函数
         watch(() => info.name, (newValue, oldValue) => {});
         # 监听对象属性
         	
     }
 }

```

##### 2 reactive

获取的oldValue、newValue都是 reactive对象，而不是其对应属性的值

````js
const info = reactive({});
watch(info, (newVal, oldVal) => {})

# 如何直接获取属性
watch( ()=>{
    # 普通对象, 进入isFunction分支, 经过处理获取其返回的结果，为一个普通的对象
	return {...info}
}, (newValue) => {
    //是一个普通的对象
})
````

##### 3 ref

获取的值是其ref.value值本身

源码中帮你处理了ref，并将其返回其值

```js
const info = ref(100);
```

##### 4 侦听多个数据源

源码: 遍历了数组

```js
watch([info, name], (newValue, oldValue) => {
   # 值为对应的两个值，都会获取到 
});

# 返回值变成一个普通的对象
watch([() => ({...info}), name], (newValue, oldValue) => {
});
```

#####   deep\immediat      

- 若是传入一个普通的对象你应该使用deep

  ```js
  watch( ()=> ({...info}, (newVal) => {
  	console.log(newVal)
  }, {
      deep: true,
      # 立即执行
      immediate: true
  })
  ```

- 若是可响应对象，其支持自动深度监听



 

#### watchEffect

- 自动收集`响应式数据`的依赖

  立即执行，相当于 immediate，此时寻找所有响应式的依赖

  ````js
  import { watchEffect, ref } from 'vue';
  export default {
  	import {  watchEffect } from 'vue'
  	setUp() {
          const name = ref(0);
          # 立刻执行一次，此时会立刻去查找对应的deps，
          # 并将此处的函数加入进 对应依赖（name）的deps
          # 故其默认进来的时候其必须被调用一次，
          const stop = watchEffect( ()=> {
      		console.log("name", name.value)   
      	})
          stop();
      }
  }
  ````

- 停止侦听

  其提供了关闭监听的功能，即再某些情况下你希望停止监听。

  其返回的是 watch的函数

- 清除副作用

  每次监听都发送网络请求，我们希望每一次触发清除上一次网络请求

  - onValidate： 当副作用重新执行，或是 关闭watch时 | 组件被销毁时

  ```js
  const stop = watchEffect( (onValidate) =>{
      const timer = setTimeout();
  	onValidate(()=> {
      	# 在这个函数内清除额外的副作用
          clearTimout(timer;)
      });
  })
  ```
  
- 指定mounted时 的 `执行时机`

  ```js
  watchEffect(()=> {
      console.log('xxx')
  }, {
      flush: 'post'
  })
  ```


### 高阶语法



#### h函数

> 【了解即可】
>
> vue推荐大多数情况下使用【模板】创建HTML，但若你想使用完全的JS代码来编写代码
>
> 你可以考虑使用 【h函数】
>
> - template 通过render编译  => VNode 组合树结构 => 虚拟DOM => 真实Dom
>
>   故 我们可以自己编写 createVNode函数，以生成VNode

1. h函数

   是用于创建vnode的一个函数

   - 更为准确的名字应该为 createVNode函数，但简化称呼其 为 h函数

2. 如何使用?

   - 第一个参数： HTML标签名字、组件

   - 第二个参数： props, 属性对象， 若无应传 null

     第三个参数:    字符串、数组（存在其他子元素、子组件，嵌套）、对象

3. 演练

   - 正常开发并不会如此，只是演示render函数的使用,

   ````js
   export default {
       data() {
           return {
               counter: 0
           }
       },
       render() {
       	return h("div", {class: 'app'}, [
               h("h2", null, `当前计数${this.counter}`),
               h("button", onClick: ()=> this.counter++)
           ])
       }
   }
   ````

   - 使用setUp替代render函数

     ```js
     import { h } from 'vue'
     export default {
         setup() {
             const counter = ref(0);
             return () => {
                 return h("div", {class: 'app'}, [
                 	h("h2", null, `当前计数${counter.value}`),
                 	h("button", onClick: ()=> counter.value++, "+1")
             	])
             }
         }
     }
     ```

   - 结合插槽、组件去使用高阶函数【h】

     ````js
     // App.vue
     import { h } from 'vue'
     import Hello from './Hello.vue'
     export default {
         setup() {
             const counter = ref(0);
             return () => {
                 return h(Hello, {message: 'app'}, {
                     # default对应的是函数 default 插槽
                     # props便是 {name: 'coderwhy'}
                     default: props => h(
                     	"span", 
                     	null, 
                     	"app传入HelloWorld中内容" + props.name
                     )
                 })
             }
         }
     }
     // Hello.vue
     import { h } from 'vue'
     export default {
     	render() {
             return h("div", null, [
                 h("h2", null, "i am hello"),
                 this.$slots.default ? this.$slots.default({name: 'coderwhy'}) : '',
             ])
         }
     }
     ````

####  JSX

> 如h函数版，我们手动编写VNode，这种可读性真的是太差了！
>
> 我们能否有一个适中的方案解决这个问题呢？又有js的灵活也有模板的阅读性

- 这便是 jsx语法

  ```jsx
  render() {
      const counter = 0;
      return ( 
          <div>
              <HelloWorld>
              	{ {default: props => <button>我是插槽按钮</button> } }
              </HelloWorld>
              { counter }
          </div>
      )
  }
  ```

babel配置

> vue-next脚手架似乎已经默认支持了 jsx, 

- 安装 npm install @vue/babel-plugin-jsx -D

- 配置插件

  babel-config.js

  ```js
  module.exports = {
      presets: [
          ' @vue/cli-plugin-babel/preset'
      ]
  }
  ```


#### 自定义指令

> 在某些情况下对DOM元素进行底层的操作需要使用自定义指令
>
> 1. 自定义局部
>
> 2. 自定义全局
>
>    指令提供了以下的生命周期回调

- 示范

  1. 不使用指令实现

     ````js
     <input ref=“input” />
     setup() {
         const input = ref(null)
         onMounted(() => {
             input.value.focus();
         });
     }
     ````

  2. 使用指令

     ```js
     <input v-foucs />
     export default {
     	directives: {
             focus: {
                 # 核心
                 mounted(el, bingdings, vnode, preVnode) {
                     el.focus();
                 }
             }
         }
     }
     ```

  3. 全局注册

     任何一处即可 <input v-foucs />

     ```js
     app.directive("focus", {
        mounted(el, bingdings, vnode, preVnode) {
            el.focus();
        }
     })
     ```

##### 生命周期

- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

##### bingding

bingding可获取

````js
# 可以传递参数
v-why.aaaa.bbb =“'my name'""
# 
created(el, bingding) {
	bingding 
}
````

1. 修饰符 - modife

   binding.modify

   - 即 aaaa 为 true,  bbb 也为true

2. 当前绑定的值-value

   bindging.value 变为 my name

##### 示范: 

使用自定ti义指令自动转换时间戳

1. 自动将 【timestamp】 转换为 一个 被格式化的内容

   过去我们会依赖computed、methods处理，现在我们可以更加简洁了

   ```js
   <h2 v-format-time>{{timestamp}}</h2>
   ```

2. 我们可以这样的模块化

   我们将 app 导入过来，以完成我们的注册操作！bingo！

   ```js
   format.js
   export default function(app) {
       let formatString = 'YYYY-MM-DD';
       app.directive('format-time', {
           created(el, bingdings) {
               # 若通过指令传递其他时间格式
               if (bingdings.value) {
                   formatString = bingdings.value
               }
           },
           mounted(el) {
               const textContent = el.textContent;
              	const timestamp = parseInt(textContent);
               # 模拟
               el.textContent = textContent.format(formatString); // 即可
           }
       })
   }
   ```
   

#### teleport

1. 一般而言，组件挂载形成组件嵌套从而有组件树
2. 某些情况，不挂载组件，而挂载于某个元素，甚至说挂载至【`#app`】之外的其他位置，而非此组件树上。
3. teleport便是Vue提供的这种内置的组件。teleport 心灵传输、远距离传输。
   - to 目标元素
   - disabled 是否禁用teleport功能

举例

```js
# 根元素下
<div id="app"/>
<div id="hp"/>

# xxx.vue
<template>
	<div class="app">
        # 在这里
        <teleport to="#hp">
            ......组件、元素同理

		<teleport to="#hp">
            ......组件、元素同理
```

- 若同时存在多个，则合并

- 将会脱离原本的app的树组件，一般而言我们实际的开发并不会如此去做。

  当你真的有如此的需求的时候， 你应该使用的 【插件安装】形式, App.use这样更简单，后续再提。   

  ````js
  this.$message.info('xxxx')
  ````

#### Vue插件

> 当我们向全局添加功能时，会使用插件的模式 ，此有两种编写模式
>
> 1. 对象类型：
>
>    对象，但必须包含install函数，此函数将在安装插件时执行
>
> 2. 函数
>
>    此函数将会在安装插件时执行

#### 1 插件提供的功能

- 添加全局属性、方法
- 添加全局资源，如指令、过滤器、过渡等
- 通过全局mixin添加组件选项
- 添加库，提供自己的API以综合以上功能。

#### 2 插件示范

插件注册

````js
# main.js
import pluginObject from './plugin/plugin_object.js';
const app = createApp(App);
// 内部会回调此对象或函数, 并传递参数app
app.use(pluginObject); 
````

插件编写

```js
# plugin_object.js
export default {
    install(app) {
        console.log(app)
        // 添加全局属性 => this.$name 便可直接访问
        app.config.globalProperties.name = 'coderwhy';
        // 
    }
}
```

1. 全局属性

   ```js
    app.config.globalProperties.name = 'coderwhy';
   
   # vue2中你可以通过此便可以直接访问到
    this.$name
   
   # vue3中略微复杂
    import { getCurrentInstance } from 'vue';
    export default {
        setup() {
            // 当前组件的实例
            const instance = getCurrentInstance();
            // 通过访问全局属性便可以获取
            instance.appContent.config.globalProperties.name
        }
    }
   ```


#### 3 vue-源码

##### 01| 为什么使用虚拟DOM

1. 真实元素节点的抽象为虚拟节点，目的是为了后续操作。

   - diff、clone若直接进行操作DOM会有限制，例如clone会克隆全部，diff算法比较问题。
   - JS对象来表达非常多的逻辑，远比DOM操作更加方便。
   - 回流性能问题，虚拟DOM可以尽量减少回流渲染，故提高性能

2. 跨平台。

   你总是可以将虚拟DOM渲染成你想要的节点！Vue是支持你开发属于你自己的渲染器的.

   这便是中间件-虚拟层带来的好处。

##### 02|虚拟DOM渲染过程

1. template => AST

2. render function

   template经过compile变为 render函数。（后续会调用这个render函数）

3. VNode

   后续调用 render函数（h函数）时生成虚拟节点

4. DOM

   通过渲染器变成真实节点。（不同渲染器不同结果，这里仅讨论DOM渲染器）

##### 03| compiler

关于render函数的获得。

1. compiler + runtime

2. runtime-only

   若使用如此，便必须使用工具来编译。

   例vue脚手架，需vue-loader， 而vue-loader也需要@vue/compiler-sfc库， 将其转为 VNode

##### 04| Vue源码

> Vue源码包含三大核心， 三大模块协同工作。
>
> 编译、响应、渲染

1. Compiler模块： 编译模板系统

   - compiler-core
   - compiler-dom

2. RunTime模块： 运行时模块。

   此模块核心 交付于 renderer模块去渲染。故也称呼为其Renderer模块，真正渲染模块。

   虚拟节点 => 真实DOM此阶段， 最终在界面上显示。

   - runtime-core
   - runtime-dom
   - runtime-test

3. Reactively模块： 响应式系统

   不管是data()、setup、reactive、ref的数据，数据改变后有diff算法=> patch，打patch（补丁）。

   - reactivity

### vue-router

> 什么是路由?
>
> - 架构网络时候，需要路由器、交换机。路由器是映射ip地址与真实电脑的mac地址。
> - 路由器维护映射表。映射表决定数据流向。
>
> 为什么SPA大行其道？
>
> - 因为现在路由由前端控制，前端之所以可以实现路由，抛弃JSP、asp、php
> - 便是因为仅存在index.html一个页面。通过动态渲染而模拟出路由。再也不需要再次请求第二个html页面。
> - 后端仅需要提供API即可，前端有 组件 - 路径 的映射关系

URL-hash => location.hash来改变href => 页面不刷新，但有 # 号】

更多的route请看我以前的vue2的笔记。

#### 01 hash

监听hash的改变，渲染对应组件

#### 02 history

h5增加History方法， 提供了改变URL而不刷新页面的方法。

#### 03 路由

> 二十三节的路由

1. 路由是支持插槽的

2. 二十三节有讲到动态的实现路由、动态的删除路由

3. 动态路由导航守卫 

   - 登录时候保存 token入localStorage

     若存在token入首页。

   - 你可以去官方查看完整的路由导航解析流程

4. historyApiFallback

   > 为什么vue-cli本身就不会有这个问题呢？
   >
   > 答： vue脚手架使用的是webpack， 自动配置了historyApiFallback为true。
   >
   > ​	     其自动帮我们返回了index.html

   此处也属于webpack的知识

   - 输入域名后，进行DNS解析，根据IP地址，到达服务器目标位置，以获取静态资源返回于前端。

   - 解析静态资源渲染页面, 我们的前端route代码会帮助我们进行重定向。⭐ 这种重定向是前端在完成

   - 但是用户刷新页面 home/message ， 此时浏览器依据ip地址/路径去 ngnix 去询问服务区。

     一般情况下，后端不会有此种对应的后端资源。故用户刷新会导致404的问题。

     解决办法

     1. ngnix进行方案处理，进行路径处理。进行配置

     2.  第一种方案已经可以解决。但仍存在一个问题。但我们启动本地服务器的时候，本地服务器资源并不支持这种配置，我们希望可以模拟这种返回效果！

        

### 源码探究

- 渲染系统模块

- 可响应系统模块

- 应用程序入口 => createApp

- compiler 略，比较复杂，略。

  @vue/compiler-sfc实现。用户浏览器无此代码，仅是部署时候执行的插件。相当于一个编译器。

#### 01 | 渲染系统

> - h函数， 返回VNode
> - mount函数，VNode挂载至DOM
> - patch函数，对比VNode

0. 主页

    ````js
    const vnode = h('div', {class: 'why'}, [
        h("h2", null, '我是h'),
        h("button", null, '+1')
    ])
    
    // mount
    mount(vnode, document.querySelector('#app'))
    
    // create a new vnode
    const vnode1 = h('h2', {class: 'hp'}, 'hehehe');
    patch(vnode, vnode1)
    ````

1. h函数

   第一步使用 h函数创建VNode

   ```js
   # renderer.js
   const h = (tag, props, children) => {
       return {
           tag,
           props,
           children
       }
   }
   
   ```

2. mount函数

   第二步 将虚拟DOM挂载至页面上

   ````js
   const mount = (vnode, container) => {
       // 1. vnode => element, 并添加属性el保留真实DOM
       const el = vnode.el =document.createElement(vnode.tag);
       // 2. 处理 props
   	if (vnode.props) {
           for(const key in vnode.props) {
               const value = vnode.props[key];
               // 处理事件
               if( key.startsWith("on") ) {
                   el.addEventListener(key.slice(2).toLowerCase(), value);
               } 
               // 处理普通属性
               else {
                   el.setAttribute(key, value);
               }
           }
       }
       // 3. 处理 children 仅考虑字符串、数组
       if (vnode.children) {
           if (typeof vnode.children === 'string') {
               el.textContent = vnode.children;
           }
           else {
               vnode.children.forEach(item => {
                   mount(item, el);
               })	
           }
       }
       //
       container.appendChild(el)
   }
   ````

3. patch

    ```js
    const patch = (n1, n2) => {
        if (n1.tag !== n2.tag) {
            const n1ElParent = n1.el.parentElement;
            n1ElParent.removeChild(n1.el);
            mount(n2, n1ElParent);
        }
        // 若类型相同
        else {
        	const el = n2.el = n1.el;
            // 2 处理props
            const oldProps = n1.props || {}
            const newProps = n2.props || {}
            // 2.1 
          	for (const key in newProps) {
                const oldValue = oldProps[key];
                const newValue = newProps[key];
                if (newValue !== oldValue) {
                   if( key.startsWith("on") ) {
                    	el.addEventListener(key.slice(2).toLowerCase(), newValue);
                    } 
                    // 处理普通属性
                    else {
                        el.setAttribute(key, newValue);
                    }
                }
            }
            // 2.2 删除旧的props
            for (const key in oldProps) {
                // 若不存在
                if (!(key in newProps)) {
                    if( key.startsWith("on") ) {
                      	// 移除事件需要value
                    	el.removeEventListener(key.slice(2).toLowerCase(), newValue);
                    } 
                    // 处理普通属性
                    else {
                        el.removeAttribute(key);
                    }
                }
            }
            // 处理children
            const oldChildren = n1.children || [];
            const newCildren = n2.children || [];
            # 我们不考虑对象，太复杂
            if (typeof newChildren === 'string') {
                el.innerHTML = newChildren;
            }
            // 数组
            else {
                if (typeof oldChildren === 'string') {
                    el.innerHTML = '';
                    newChildren.forEach(item => {
                       mount(item, el) 
                    });
                }
                else {
                    const cmmonLength = Math.min(oldChildren.length, newCildren.length);
                	// 相同节点patch操作
                    for (let i = 0; i< cmmonLength; i++) {
                        patch(oldChildren[i], newChildren[i])
                    }
                    // 若 new > lod
                    if (newCildren.length > oldChildren.length) {
                        newCildren.slice(oldChildren.length).forEach(item => {
                           mount(item, el); 
                        });
                    }
                    // 若 new < old
                    if (newCildren.length < oldChildren.length) {
                        oldChildren.slice(newCildren.length).forEach(item => {
                            el.removeChild(item.el);
                        })
                    }
                }
            }
        }
    }
    ```

####    02 可响应实现

````js
class Dep {
    constructor() {
        this.subscribers = new Set(); // 集合
    }
    depend() {
        # activeEffect的意义
        if (activeEffect) {
            this.subscribers.add(activeEffect)
        }
    }
    notify() {
        this.subscribers.forEach(effect => {
            effect();
        })
    }
}
let activeEffect = null;
const dep = new Dep();
function watchEffect(effect) {
    activeEffect = effect;
    dep.depend();
    activeEffect null;
}

const info = { counter: 0, count: 0 }
watchEffect(function() {
    console.log(info.counter++);
})

````

- 优化： 按理 不同的属性应该有不同的依赖

  ````js
  // 数据改变，dep触发notify
  info.counter++; dep['counter'].notify();
  // 按理来说
  info.count++; dep['info'].notify();
  
  # 依赖不应该随便收集, 应该有不同的收集方式
  dep1(info.counter) subscribers
  dep2(info.name) subscribers
  dep3(foo.height) subscribers
  # 我们应该有数据结构管理
  const targetMap = new Map();
  targetMap['info'] = new Map(info); // 其中保存其所有 info相关的订阅者
  info这个Map的子属性再各自收集 subscribe 这里可以独立触发依赖
  ````

- 实现如上优化

  1. 我们必须实现数据劫持，才可以实现依赖收集. 

     以 vue2的实现为例

     - 劫持数据以实现自动的收集依赖
     - 数据劫持也实现了自动的 notify
     - 使用targetMap去管理deps以实现我们预期。

     ```js
     // 用weakmap 
     /*
     	Map其key是字符串
     	WeakMap其key是一个对象，其引用是弱引用，
     		目的是更好的销毁， weakMap存变量保证其内部属性也会被销毁
     */
     const targetMap = new WeakMap();
     
     function getDep(target, key) {
         let depsMap = targetMap.get(target)
         // 1. 若不存在
         if (!depsMap) {
             depsMap = new Map();
             targetMap.set(target, depsMap);
         }
         // 2. 取出具体dep对象
         let dep = depsMap.get(target);
         if (!dep) {
             dep = new Dep();
             depsMap.set(key, dep);
         }
         return dep;
     }
     
     function reactive(raw) {
         Object.keys(raw).forEach(key => {
           const dep = new Dep();
           let value = raw[key];
           Object.defineProperty(raw, key, {
               get() {
                   dep.depend();
               },
               set(newValue) {
                   if (value !== newValue) {
                     value = newValue;
                   	dep.notify();
                   }
               }
           })  
         })
        	return raw; 
     }
     const info = reactive({counter: 100});
     info.counter = 100;
     ```

  2. vue3的实现-`Proxy`

     - defineProperty劫持对象的属性，若新增属性需要再次调用。

       而Proxy`劫持的是整个对象`，不需要特殊处理👍

     - 使用defineProperty修改原来的对象，修改原有的obj会触发拦截

       而使用proxy，必须修改代理对象（Proxy）才会触发拦截。故往往你需要再对原对象处理。

     - 观察的类型Proxy更多【不止劫持set、get】

       1. has

           在使用in的时候 has的操作符， 可劫持has

       2. deleteProperty

          delete操作， 可劫持has

     ```js
     function reactive(raw) {
         return Proxy(raw, {
             get(target, key, receiver) {
                 const dep = getDep(target, key);
                 dep.depend();
                 // return Reflect(target, key);
                 // 由于是代理对象 故不会导致死循环依赖 即死循环触发其get
                 return target[key];
             },
             set(target, key, newValue) {
             	const dep = getDep(target, key);
                 target[key] = newValue;
                 dep.notify();
             }
         });
     }
     ```

#### 03|createApp

````js
function createApp(rootComponent) {
    return {
        mount(selector) {
        	const container = document.querySelector(selector);
            let isMounted = false;
            let oldVNode;
            // mount
             watchEffect(function() {
                if (!isMounted) {
                    oldVNode = oldmount(rootComponent.render());
                    mount(oldVNode, container)
                    isMounted = true
                }
                else {
                    const newVNode = rootComponent.render();
                    patch(oldVNode, newVNode)
                    oldVNode = newVNode;
                }
             })
            
        }
    }
}
````

#### 04 跟着老师探究路线

第二十节视频， 具体源码略，不想看。

> npm管理 => package.json查看【scripts】
>
> - 老师推荐插件 => 使用bookmarks阅读源码
>
>   crtl + 

````js
1. 下载vue源码
2. 在 packages/vue/example创建文件夹demo/index.html 引入‘../../dist/vue.global.js’
3. 请使用以下代码编写

<template id="my-app">
    <div>
    	{{msg}}
		<button @click="change"
		
# 来试试setup也可以！
const App = {
    template: '#my-app',
    data() {
        return {
            msg: ''
        }
    },
    methods: {
        change() {
            this.msg = '1000'
        }
    }
}
# 起源
const app = Vue.createApp(App)
app.mount('#app');
````

1. createApp

   - runtime-dom中的index.ts

   - ensureRenderer => 

     createRenderer

     runtime-core/render.ts文件 baseCreateRenderer 进入庞大的渲染器函数、

     ````js
     // 返回一个渲染器对象，其中包含createApp
     return {
         render,
         hydrate,
         // ⭐ 
         createApp: createAppAPI(render, hydrate)
     }
     ````

#### 05 模板更新

由源码可知。

- h函数本质便是创建createVNode, 进行 patchElement => 生成真实DOM

- with语法

```js
const info = { name: 'me' }
with(info) {
    # 便可以自动获取到name， 使用with的好处
    console.log(name)
}
```

render函数

```js
// 作用域提升_1
const _hoisted_1 
const _hoisted_2
return function render(_ctx, _cache) {
    with(_ctx) {
        return (openBlock(), _createBlock(_Fragement, null), [
            _hoisted_1,
            _hoisted_2,
            _createdVNode(...),
            _createdVNode(...)
        ], 64)
    }
}
```

1. 何时执行 render函数?

   初次挂载时会触发。

   vue中更新是组件级别的，一旦data数据变化，整个组件重新渲染便会触发 => renderComponentRoot

2. 为什么 _hoisted_1、_hoisted_2是放在 render 函数外部的

   因为 hoisted_1、hoisted_2可能是不变的。render更新不代表两个静态节点变化。故作用域提升。

3. 存在静态节点，即那些肯定不会变化的节点。但diff时候如何区分静、动节点呢？

   ⭐ openBlock方法 => blockTree

   render执行时， 执行openBlock

   - 创建数组、有可能修改的节点，放入此数组中，此数组中包含可能会改变的VNode
   - 进行diff算法的时候会比较此dynamci数组的算法 => 此处代码在vnode中

#### 06 生命周期

created、beforeCreated是直接调用的，与其他生命周期是不同的。

beforeCreated 是调用组件之前吗？不准确，只能说顺口。

1. 如何保证子组件也挂载的时候，组件再去触发created？

#### 07 setup、data()同时存在

setup生效.

此时的proxy为

````js
ctx、setupState、data、props...
````

- ctx

  computed（计算属性）放置于 ctx中

  methods也放置于ctx中

- setupState

  获取setup的返回值结果。

- data、props顾名思义

而 setup的优先级更高的原因：

- template使用数据的优先级的问题
- template使用的数据，并非是setup覆盖了data， 他们其实是共存的。只不过是优先级的问题。

### 项目感悟

> 以coderwhy老师出现的项目代码作为感触，总结代码中出现的新的含义，进而打开Vue3的大门。
>
> 见其知义即可。

1. 手动导入element-plus组件

2. 全局注册

   ````js
   // 只是interface
   import { App } from 'vue' 
   
   app: App
   app.config.globalProperties
   ````

3. import type

   此处已在ts讲解中展开了

   ```js
   import type { RouteRecordRaw } from 'vue-router'
   ```

4. vue-router与vuex

   vue-router的使用出现了略微的不同，请参考.感触vue-next的带来的改变。

   vue-router-next版本  https://next.router.vuejs.org/zh/

   vuex-next版本 https://next.vuex.vuejs.org/zh/

   注：vue-x的其实并没有太大的改变，仅是支持了ts【TypeScript支持】

   https://next.vuex.vuejs.org/zh/guide/typescript-support.html#usestore-%E7%BB%84%E5%90%88%E5%BC%8F%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E

5. defineComponent

   vue总是会导入 defineComponent
   
   - 返回的值具有一个合成类型的构造函数，用于手动渲染函数、 TSX 和 IDE 工具支持
   - 给与组件正确的参数类型推断
   
   ````js
   import { defineComponent, computed } from 'vue';
   export default defineComponent({...})
   ````
   
   1. 本质：   {} 就变成了 defineComponent 的参数，故可进行类型的推导。
   2. 更加详细的解释： https://juejin.cn/post/6994617648596123679
   
   
   
   

