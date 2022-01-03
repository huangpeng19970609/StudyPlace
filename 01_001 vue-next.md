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

#### proxy

1. 

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

##### 1 setup的参数

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

##### 2 setup的返回值的作用

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

#### 02 Reactive API

##### 1 Reactive 

> 我们使用 setUp 后返回后数据并不会自动的响应式，这与data()声明不同

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

   - 创建工程函数，函数接受 track、trigger函数作为参数， 并返回 携带get 与 set的对象

   - debounce 防抖示范

     1. 由于 频发的触发收集的deps数组（副作用）导致页面不断的刷新，故我们应该做一个节流 

     ````vue
     <template>
     	<input v-model="value"/>
     </template>
     <script>
         import { ref } from 'vue'
         export default {
             setup() {
                 let value = ref(0);
                 return {
                     value
                 }
             }
         }
     </script>
     
     ````

     2. 函数依赖

        ```js
        import { customRef } from 'vue'
        export default function (value){
            return customRef( (track, trigger) => {
             	return {
                    get() {
                        // 收集依赖  
                        track(); 
                    	return value;
                    }
                    set(newValue) {
                    	value = 
                    }
                }
            })
        }
        ```

        

   



#### 04 readonly

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

#### 05 1

###  Component API 的相关判断

> 有这些api，这些的使用多存在于编写专业的插件库存在。

1. 

