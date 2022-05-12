

### 0 vue的注意事项

#### property默认值

disbled 有时候我们希望 `disabled`不要渲染出来，

但是要给与一个默认值 ``null` `undefined` `false`

#### 8  attribute 的合并

- 绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值

- `class` 和 `style` attribute 会稍微智能一些，即两边的值会被合并起来

- 禁用继承

  ```js
  Vue.component('base-input', {
    inheritAttrs: false,
  })
  ```


#### 9 为什么我写了多个相同的组件，但是 生命周期只调用一次呢？

key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素

`解决办法`：**加上之后 key 之后 Vue 就会组件单独的重新创建**

#### 13 vue中关于import Vue from 'vue'等导入操作的解释

```js
import Vue from 'vue';
```

由于浏览器兼容性问题，通常这个语法是在 webpack 的构建流搭建的项目中执行的，那么这个语句到底做了什么呢？

在 nodejs 中，执行 `import` 就相当于执行了 `require`，

而 `require` 被调用，其实会用到 `require.resolve` 这个函数来查找包的路径

1. import Vue from 'vue 解析为 `const Vue = require('vue')`。

2. require判断 vue `是否为 nodejs 核心包`，如我们常用的：path，fs 等，是则直接导入，否则继续往下走。

3. vue 非 nodejs 核心包，判断 vue `是否未 '/' 根目录开头`，显然不是，继续往下走。

4. vue `是否为 './'、'/' 或者 '../' 开头`，显然不是，继续往下走。

5. 以上条件都不符合，`读取项目目录下 node_modules 包里的包`

   对于npm包，其require也有自己的规则，

   1. 查找 package.json 下是否定义了 main 字段，是则读取 main 字段下定义的入口
   2. 没有 package.json 文件，则读取文件夹下的 index.js 或者 index.node
   3. 如果都 package.json、index.js、index.node 都找不到，抛出错误 `Error: Cannot find module 'some-library'`

那么看一下 vue 的 package.json 文件有这么一句

（查找 package.json 下是否定义了 main 字段）

```json
{
    ...
    "main": "dist/vue.runtime.common.js",
    ...
}
 
```

```javascript
import vue from 'vue';
即
const vue = require('./node_modules/vue/dist/vue.runtime.common.js');

而 vue.runtime.common.js 文件的最后一行是：module.exports = Vue;，就正好跟我们平时使用时的 new Vue({}) 是一致的，这就是 import vue from 'vue' 的过程了。
```

#### 14 导入一个 stylesheet

@import "~@/css/headTitleSearch/headSearch.scss"; 单独引入样式

-----



### 1 v命令符

- v-text

- v-html

- v-pre

  跳过编译过程，所见即所得，不会编译

- v-html

- v-once

  仅渲染【元素】或【组件】一次

- v-model

  ```vue
  <el-input 
            :value="foo" 
            @input="foo = $event"></el-input>
  ```

  1. 更是典型的单向数据流

     - 什么是单向数据流

       子组件不能改变父组件传递给它的 `prop` 属性, 它抛出事件，通知父组件自行改变绑定的值

     - v-model

       数据向下 （:value="foo" ），事件向上 （foo = $event）

  2. 当然也是双向绑定

  3. 此外你可以自己实现v-model

     - 组件上 v-model进行配置

       ```vue
       <Son v-model="message" />
       <Son :modelValue="message" @update:modelValue="message = $event" />
       ```

     - 在其子组件上，你需要配置一个prop接受的属性 与 事件名称

     ```js
     export default defineComponent({
       props: {
         modelValue: {
           type: String
         }
       },
       emits: ['update:modelValue'],
       setup(props, { emit }) {
         const newValue = computed({
           get: () => props.modelValue,
           set: (nv) => {
             console.log(nv)
             emit('update:modelValue', nv)
           }
         })
         return {
           newValue
         }
       }
     })
     ```

     

### 3 绑定事件与修饰符

绑定事件的命令 , 简写为 @click

1. 事件参数的两种形式

```javascript
# 1 不写事件参数，则调用时候会用默认的事件参数。
@click ='handle' 或者hanlde()

# 2 写事件参数，但形参必须是$event

@click= 'handle1(100, $event)'

则
methods: {
     handle1: function(event) {
        console.log(event.target.innerHTML)            
     } 
     handle2: function(p, event) {
         console.log(p)
         console.log(event.target.innerHTML)
         this.num++;      
    }
}
# 实际效果:   打印此 event.target指的便是dom元素。
```

#### 3.1 事件修饰符

- `.stop`

  等同于JavaScript中的`event.stopPropagation()`，防止事件冒泡

- `.prevent`

  等同于JavaScript中的`event.preventDefault()`，

  防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）

- `.capture`

  与事件冒泡的方向相反，事件捕获由外到内

- `.self`

  只会触发自己范围内的事件，不包含子元素

- `.once`

  只会触发一次

- `.passive`

  passive这个修饰符会执行默认方法

  ```html
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>
  
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>
  
  <!-- 修饰符可以串联 -->
  <a v-on:click.stop.prevent="doThat"></a>
  
  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>
  
  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div v-on:click.capture="doThis">...</div>
  
  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
  ```

- `v-on:click.prevent.self` 会阻止**所有的点击**，

  而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

- <!-- 点击事件将只会触发一次 --> 

  <a v-on:click.once="doThis"></a>

#### 3.2 按键修饰符

<input v-on:keyup.13="submit">

### v-bind(数组与对象)

动态的绑定don属性，总共有三种方式

​	①绑定数组  

​		绑定数组，则是可以有多个，并无特殊，但数组中可有对象，两者结合使用。

​	②绑定对象   

​		键值对  键  指原生的属性，绑定【class】则是对应类型

​													  绑定【css】则是对应得样式名（注意驼峰规则）

​					值  指的是对应data中的对应的值。

```javascript
// 在这种情况下style对象的css样式注意要驼峰命名法
<div :style="styleObject">绑定样式对象</div>'

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<ul class="box" :class="{textColor:isColor, textSize:isSize}"></ul>

<div :style="{color:activeColor,fontSize:activeSize}">对象语法</div>

<div :class="[isActive ? activeClass : '', errorClass]"></div>

<div :class="[{ active: isActive }, errorClass]"></div>

//=========================
<div :style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

# 多重值
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
```

### 4 v-if 与 v-for

v-if的应用场景： 进行两个视图之间的切换 、元素的展示切换

- v-if 

```javascript
v-if
v-else-if
v-else

v-if 是销毁, 会有重新编译的过程
v-show 等同 display:none;   ====> 即隐藏元素，且不占位置， => 使元素脱离文档流
```

-  v-for
   1. 遍历对象 
   2. 遍历数字
   3. 遍历数组

###  6 表单内容

```html
// 冷知识
<label for="me"></label><input  id="me" />   显式索引，点击label 会自动聚焦/点击
<label for="me"><input  id="me" /> </label>  隐式索引，input包含在label中
```

#### 6.1 表单修饰符

1. v-model.number="age" => 去除数字

2. v-model.trim="age" => 去除头尾空格符

3. v-model.lazy => 将input事件变为 change事件

   ----

### 7 注册自定义指令

#### 无参数-全局

```js
<!-- 
  使用自定义的指令，只需在对用的元素中，加上'v-'的前缀形成类似于内部指令'v-if'，'v-text'的形式。 
-->
<input type="text" v-focus>
<script>
// 注意点： 
//   1、 在自定义指令中  如果以驼峰命名的方式定义 如  Vue.directive('focusA',function(){}) 
//   2、 在HTML中使用的时候 只能通过 v-focus-a 来使用 
 
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  	// 当绑定元素插入到 DOM 中。 其中 el为dom元素
  	inserted: function (el) {
    		// 聚焦元素
    		el.focus();
 	}
});
new Vue({
　　el:'#app'
});
```

####  带参数-全局

```js
<input type="text" v-color='msg'>
 <script type="text/javascript">
    /*
      自定义指令-带参数
      bind - 只调用一次，在指令第一次绑定到元素上时候调用
    */
    Vue.directive('color', {
      // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
      // el 为当前自定义指令的DOM元素  
      // binding 为自定义的函数形参   通过自定义属性传递过来的值 存在 binding.value 里面
      bind: function(el, binding){
        // console.log(binding.value.color)   // 根据指令的参数设置背景色
        el.style.backgroundColor = binding.value.color;
      }
    });
    var vm = new Vue({
      el: '#app',
      data: {
        msg: {
          color: 'blue'
        }
      }
    });
  </script>
```

#### 局部指令

```js
<input type="text" v-color='msg'>
<input type="text" v-focus>
 <script type="text/javascript">
    /*
      自定义指令-局部指令
    */
    var vm = new Vue({
      el: '#app',
      data: {
        msg: {
          color: 'red'
        }
      },
   	  //局部指令，需要定义在  directives 的选项
      directives: {
        color: {
          bind: function(el, binding){
            el.style.backgroundColor = binding.value.color;
          }
        },
        focus: {
          inserted: function(el) {
            el.focus();
          }
        }
      }
    })
  </script>
```

#### 指令的 动态参数与修饰符

- 从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数

  ```js
  # 1
  	如果你的 Vue 实例有一个 data property attributeName，
      其值为 "href"，那么这个绑定将等价于 v-bind:href
  #2 
  	动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除	  绑定。任何其它非字符串类型的值都将会触发一个警告。
  #3 
  	在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，
      还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：
      
  
  <a v-bind:[attributeName]="url"> ... </a>
  ```

- 修饰符

  1. prevent

  ```js
  # 1 prevent
  <form v-on:submit.prevent="onSubmit">...</form>   => event.preventDefault()
  
  
  ```

  



----

### 8  计算属性 computed

- 理解【属性】
- 计算属性缓存的特性

```js
<div>
    {{ sexAndName }} // 使用计算属性更加清晰
</div>

计算属性 【属性】
computed: {
    sexAndName: function() {
        return this.sex + '' + this.name;
    },
},
```

- 计算属性传参（利用`闭包传参`）

  ```js
  :data="levelColor(item, itemName, blablaParams)"
  
    computed: {
      // 利用闭包传参
      levelColor(data) {
        return (data) => {
          return 'pink';
        }
      }
    },
  ```
  
- 为何叫【计算属性】, 与methods的实际区别

  1. 多次调用这个计算属性，实际上开头执行一次，其余都是依赖缓存，提高性能。而method会执行多次 
  2. 减少了在data中的声明变量，现在只在computed对应的属性中单独去定义，简化代码， 比如total 

  ```javascript
  {{total}}
  {{total}}
  data: {
      books: [
          { id: 1, price: 100 },
          { id: 1, price: 100 },
          { id: 1, price: 100 }, 
      ],   
  },
  computed: {
  	total: function() {
          let total = 0;
          for(let	i = 0; i < books.length; i++ ) {
              total += books[i].price;
          }
          return total;
      }
  }, 
  ```

- 注意 上面的写法其实是一个语法糖写法，默认使用的是get方法, 是一个只读属性

```javascript
computed: {
	total: {
        // 99%的情况我们都不会来写set方法
        set: function(newValue) {
        	this.price1 = 1000;
        },
        get: function() {
            var total = this.price1 + this.price2;
            return total;
        }
    }
},
```

---

### 9 侦听器 watch

1. watch响应数据的变化,， watch监听一定是data已经存在的数据

```javascript
var vm=new Vue({
    data:{
        num:  1,
        obj: {
            num: 1
        }
    },
    watch:{
        num(val, oldVal){//普通的watch监听
            console.log("num: "+val, oldVal);
        },
        //深度监听，可监听到对象、数组的变化, 这种监听方法 是 监听这个对象里的所有内容
        obj:{
            handler(val, oldVal){
                console.log("obj.num: " + val.c, oldVal.c);
            },
            deep:true,
            immediate: true,
        },
        // 监听固定的对象的一个值
        "obj.num"(val, oldVal){//普通的watch监听
            console.log("num: "+val, oldVal);
        },
    },
    computed: {
        objNum: function() {
            return this.obj.num;
        }
    }
})
```

----

### 10 过滤器（vue3已废弃）

###  11 生命周期

- created    =======>    data与methods可以使用， 但是dom结构没有初始化
- mounted =======>    el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子
- updated =======>:    由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
- destroyed  =====>      实例销毁后调用

### 12 组件

#### 1 - is与 keeplive

- ​	`is`

   解除html的语法对于li的限制，模板分离写法不会遇到这种问题。

  ```html
  <ul><li is="my-component"></li></ul>
  ```

- 动态切换组件

  component， vue提供了一种组件，这个组件可以通过is来动态的切换组件
  
  ```html
  <component :is="组件名"></component>
  ```


- `keep-alive` 实现了同步组件

  keep-alive也是vue提供的组件, 其传参形式很多。可以查阅资料。
  
  生命周期： 
  
  - `	activated`在 keep-alive 组件激活时调用
    `deactivated`在 keep-alive 组件停用时调用
  
  包含在 keep-alive 中创建的组件，`会多出两个生命周期的钩子`: activated 与 deactivated,
  
  `承担原来 created 钩子函数中获取数据的任务`
  
  PS: 路由中的meta也可以去控制什么样的路由该被缓存。
  
  ```html
  <!-- 失活的组件将会被缓存！防止重复渲染dom-->
  <keep-alive
      :exclude="/a|b/"
      :include="includedComponents"
    >
    <component :is="currentTabComponent"></component>
  </keep-alive>
  ```

#### 3- 依赖注入

​	我们可以把依赖注入看做一部分`大范围有效的props`

1. 弥补获取父辈实例方法的不足又再次提供了一种方式

2. 警告： 并非响应式！

3. 逻辑混乱警告！




#### 5- 父子同步数据（update）

```js
	this.$emit("update:date", 2);  子组件

	父组件中调用的子组件
	<Son1 :date.sync="date"></Son1>

	这个写法是上面的替代品 默认组件内部触发 update:count 规定写法
	<Son1 :date="date" @update:date="val=>date=val"></Son1> 
//即强制将 子组件数据同步到父组件
因为有@update的存在，故 父会强制也同步子的数据，实现了父子平等
子中有props，父中@监听，这是双向的
```

依旧看不懂请看下面这个简单的示范

```js
<template>
  <div id="father">
    <div>
       我是父组件
      <son
        :wisdom.sync="wisdom"
        :magic.sync="magic"
        :attack.sync="attack"
        :defense.sync="defense">
      </son>
      <p>智力： {{ wisdom }}</p>
      <p>膜法： {{ magic }}</p>
      <p>攻击： {{ attack }}</p>
      <p>防御： {{ defense }}</p>
    </div>
  </div>
</template>
 
<script>
import son from './son.vue'
export default {
  data: function () {
    return {
      wisdom: 90,
      magic: 160,
      attack: 100,
      defense: 80
    }
  },
  components: {
    son: son
  }
}

</script>
```

子组件

```js
<template>
  <div>
    <p>我是子组件</p>
    <p>智力： {{ wisdom }}</p>
    <p>膜法： {{ magic }}</p>
    <p>攻击： {{ attack }}</p>
    <p>防御： {{ defense }}</p>
    <button @click="increment('wisdom')">增加智力</button>
    <button @click="increment('magic')">增加膜法</button>
    <button @click="increment('attack')">增加攻击</button>
    <button @click="increment('defense')">增加防御</button>
  </div>
</template>
 
<script>
export default {
  props: {
    wisdom: Number,
    magic: Number,
    attack: Number,
    defense: Number
  },

  methods: {
    increment (dataName) {
      let newValue = this[dataName] + 1
      this.$emit(`update:${dataName}`, newValue)
    }
  }
}
</script>
```

#### 7- props几种形式

- 也可以接收函数

```js
# 数组形式
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']

# { [string]: Type }
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
#  { [string]: {type: T, default: () => [] } }
    tabsData: {
      default: function() {
        return [];
      },
      type: Array
    }
# { [string]: {type: T, default: () => {} } }
	propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
```

`官方建议 当我们需要在子组件中改变props`

2. 使用这个 prop 的值来定义一个计算属性，不违背单向数据流

   ```js
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```


### 13 组件间通讯方式

#### 01 | 属性

- $refs
- $root 、$parent  、$children  

#### 02 | props / $emit

- props

  儿子组件通过`props`接受父组件传过来的值

- $emit

  子组件通过触自身的方法来触发`$emit`方法,

  再触发父组件的方法,通过`回调传参`的方式将修改的内容传递给父组件

#### 03 | inject / provide

允许一个祖先组件向其所有子孙后代注入一个依赖.

- provide

  ```js
  //父组件:
  provide: { //provide 是一个对象,提供一个属性或方法
    foo: '这是 foo',
    fooMethod:()=>{
      console.log('父组件 fooMethod 被调用')
    }
  },
  ```

- inject

  ```js
  // 子或者孙子组件
  inject: ['foo','fooMethod'],
  mounted() {
    this.fooMethod()
    console.log(this.foo)
  }
  ```

#### 04 | attrs / listeners

- attrs 

  1. `attrs` 获取子传父中未在 props 定义的值。

  2. 利用这一特性， 配合`v-bind`可以将属性【$attrs】继续向下传递()

  3. 组件中使用了`props` 就会将属性从当前 `attrs`移除掉

     ```vue
     // 父组件
     <home width="80" height="80"/>
     
     // 子组件
     props: {
       width: {
         type: String,
         default: ''
       }
     },
     # 由于width已被定义,故$attrs只能获取到height
     mounted() {
       console.log(this.$attrs) 
     }
     ```

  4. 不想在页面上显示传递来的 Attrs

     ```js
     inheritAttrs: false
     ```

- listeners

  `$listeners`批量向下传入方法

  ```js
  # 父组件
  <home @change="change"/>
  
  #子组件  配合v-on可以将方法继续向下传递
  <grandson1 v-bind="$attrs" v-on="$listeners"></grandson1>
  
  mounted() {
    console.log(this.$listeners.change()) //即可拿到 change 事件
  }
  ```

  1. 孙子组件就可【  $listeners.click  】 调用方法。

#### 05 | vuex

你总是有办法在SPA应用中规避vueX的使用。

除非 你真的需要去【派发业务】以 一个页面的数据改变，来通知另一个存在的页面的事件。

而SPA应用，是Single Page Application。

#### 06 | v-model

一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件

````js
model: {
    prop: 'checked',
    event: 'change'
},
props: {
	checked: Boolean
}
````

#### 07 | $bus（废弃）

> 实质就是创建一个vue实例，通过一个空的vue实例作为桥梁实现vue组件间的通信

```js
# 多级通信
1 创建eventBus.js， 就两行
	import Vue from 'vue'
	export default new Vue()

2 在需要通信的同级组件中分别引入eventBus.js文件
	import bus from '../eventBus.js'

3 page1.vue中，通过$emit将事件和参数传递给page2.vue
	price(newPrice){
         bus.$emit('priceChange', newPrice,this.count) 
	}

4 在page2.vue 中，通过$on接收接收参数和相应事件
    bus.$on("priceChange", (price, count) => {
        this.balance = this.totalMoney - price * count;
    });
```

### 14 插槽（有<slot>是组件，  template是调用）

`2.6.0版本中， v-slot命令取代了slot与slot-scope， 这两个命令还保存着`

- 组件的最大特性就是复用性，而用好插槽能大大提高组件的可复用能力

- 父级模板里的所有内容都是在父级作用域中编译的；

  子模板里的所有内容都是在子作用域中编译的。

#### 匿名插槽

1. 组件标签中嵌套的内容会替换掉slot  如果不传值 则使用 slot 中的默认值

```html
    <template>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <slot>404</slot>
    </template>

------------------------------------------------------------------------------
<alert-box>你好呀！</alert-box> 	=> 展示 1 2 3 你好呀
-----------------------------------------------------------------------------
<alert-box>						   => 展示 1 2 3 hello!
    <p>hello!</p>
</alert-box>
------------------------------------------------------------------------------
<alert-box></alert-box>			   => 展示 1 2 3 404
```

#### 具名插槽

- 具有名字的插槽  ,配合`template`(2.5版本之前必须要写)！

- 使用 <slot> 中的 "name" 属性绑定元素

- 通过slot属性来指定, 这个slot的值必须和下面slot组件得name值对应上

  如果没有匹配到 则放到匿名的插槽中

```html
# 思考以下结果
<slot>左</slot>           	
<slot>中</slot>				
<slot>右</slot>				

<cpn>0</cpn>  						=> 000
<cpn></cpn> 						=> 左中右
-----------------------------------------------------------------

<slot name="left">左</slot>   |   
<slot name="center">中</slot> | 	 
<slot name="right">右</slot>	 |	 
<slot>默认</slot>				 |
------------------------------------------------------------------
示范： 
<cpn></cpn> 						=>  左中右默认

<cpn>[hello]</cpn>					=>  左中右[hello]

<cpn>								=>  [左边]中右
    <div slot="left">
        [左边]
    </div>
</cpn>
```

####  作用域插槽

- 父组件对子组件加工处理
- 既可以复用子组件的slot，又可以使slot内容不一致
- 内容由子组件决定，而利用作用域插槽改变显示内容

```html
  <div id="app">
    <!-- 
		1、当我们希望li 的样式由外部使用组件的地方定义，因为可能有多种地方要使用该组件，
		但样式希望不一样 这个时候我们需要使用作用域插槽 
	-->  
      <!-- 2、 
			通过template取得传过来的 info
			父组件中使用了<template>元素,而且包含scope="slotProps",
			slotProps在这里只是临时变量  ，子组件的数据通过slot-scope属性传递到了父组件
			slotProps是我们的插槽对象，slotProps.info 就是我们绑定的info
		---> 	
    <fruit-list :list='list'>//父组件传递给子组件
          <template slot-scope='slotProps'>
          <!--  -->
        <strong v-if='slotProps.info.id==3' class="current">
            {{slotProps.info.name}}		         
         </strong>
        <span v-else>{{slotProps.info.name}}</span>
      </template>
    </fruit-list>
  </div>
_______________________________________________________________________________________
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      作用域插槽
    */
      //这个组件是独立存在的！没list怎么办，让父组件从主组件那里拿！
    Vue.component('fruit-list', {
      props: ['list'],
      template: `
        <div>
          <li :key='item.id' v-for='item in list'>
			###  3、 在子组件模板中,<slot>元素上有一个类似props传递数据给组件的写法msg="xxx",
			###   插槽可以提供一个默认内容，如果如果父组件没有为这个插槽提供了内容，会显示默认的内容。
					如果父组件为这个插槽提供了内容，则默认的内容会被替换掉
            <slot :info='item'>{{item.name}}</slot>
          </li>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        list: [{
          id: 1,
          name: 'apple'
        },{
          id: 2,
          name: 'orange'
        },{
          id: 3,
          name: 'banana'
        }]
      }
    });
  </script>
</body>
</html>

```

####  v-slot

1. 任何没有被包裹在带有 `v-slot` 的 ` 中的内容都会被视为默认插槽的内容。
2. **`v-slot` **

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
</base-layout>

组件内
<slot name="header"></slot>
```

--------------

## vue工程化

### 1 搭建项目

#### 1.2 only与compiler区别 

1. 创建脚手架

   ① 使用 `vue init webpack runtimecompiler`创建脚手架

   ② 使用 `vue init webpack runtimeonly`创建脚手架

2. ###### 区别：

   - 首先我们要知道 Vue的运行过程是什么？

     1. 对于 runtimecompiler而言

        `template` => `ast` => `render` => `vm` => `真实DOM`

        ```js
        1 template 【被解析】以后 会生成 抽象语法数(abstract syntax)
        2 ast 在被【编译】后会生成一个render函数
        3 通过这个render函数 我们可以生成一个 虚拟DOM树， virtual dom
        4 再将virtual dom 转为 真实dom
        ```

     2. 对于 runtimeonly

        与之相比， 便是 减少了编译的过程， 即 `render` =>  `vm `  => `真实dom`

   ```js
   首先要说的是， 高端人士 使用 runtimeonly 来初始化项目
   
   1
   	在于main.js处的不同
   	1 对于	runtimeonly
       	new Vue({
           	el: '#app',
               render: h => return h(App);
   			// 但你得导入 App吧！这是废话
           });
           
   	2 对 runtimecompiler👇
       	new Vue({
               el: '#app',
               template: '<APP/>',
           	components: {App},
           })
   
   2 	这便是 render对象函数的意义！
   	我们可以对 runtimecompiler 进行对应改写
   		new Vue({
               el: '#app',
   			render: function(createElement) {
                   return createElement(
                   	'h2',
                       {class: "class-1",}
                       ['hello. world!!']
                   );
               }
           })
   	等同于
       	<div id="#app">
               <h2 class="class-1">
               	hello. world!!
               </h2>
           </div>
   -------------------------------------------------------------------------
   	同理， 通过 render 继续去渲染 虚拟dom
       new Vue({
               el: '#app',
   			render: function(createElement) {
                   return createElement(
                   	'h2',
                       {class: "class-1",}
                       [
                           'hello. world!!', 
                       	createElement('button', ['按钮'])
                       ]
                   );
               }          
      })
   ------------------------------------------------------------------------
   我们使用 ES6的导入时候， 对应的组件的格式会
   所以 const cpn = {
   	template: <div></div>,
   	data() {
           return {
               
           }
       }
   }
   对应的!
   	render: createElement => return cpn;
   ```


#### 1.3 who parses template?

1. 既然 render 替换了 runtimeCompiler的写法形式， 

   对于render而言那存在template `岂不是还是需要将template 转 为 ast ？`

   毕竟 cpn 对象种 还有 template呢。

   ```js
   答: 
   	并非我们想象得这样，其 render是不包含 template的！
       可以打印一下， 在【编译过后】  console.log(App);
   	你会发现其无 tempate, 反而多了 render这个函数！
   ```

2. 由第一个问题导致第二个问题

   那 传入的template是谁做了 template => ast => render 呢？

   ```js
   答： 
   	vue-loader
   	vue-template-compiler
   	这个开发时候的依赖， 将template 转为了 render函数！
   ```

#### 1.4 $mount

```js
		new Vue({
            // el: '#app',
			render: function(createElement) {
                return createElement(
                	'h2',
                    {class: "class-1",}
                    ['hello. world!!']
                );
            }
        }).$mount('#app')
        等价于 el: '#app',  几乎没有区别！
```

---

### 2 配置去哪里了？

- 查看package.json中的`devDependecies` 有`@vue/cli-serve`来管理插件

  并且隐藏了大量的配置，若我们想更改配置怎么办呢？

- node小知识： 

  package.json中版本中有`^`这个符号代表其是模糊版本，具体版本可以参考【打包】以后的的版本

- 在配置中

  【vue】与【vue-template-compiler】的版本需要一一对应。至少对于vue3是这样的。

  

#### 1  如何在当前项目查看？

- 对应项目有 node_moudles 下 有 @vue

```js
@vue 
	=> cli-serve目录
	=> webpack.config.js  
		const Service = require('./lib/Service')
		会发现这个文件引用了同级lib文件夹下的webpack目录下的 Service.js

    => 而 最终在service.js
		你会发现其引用了各类config的配置
    const fs = require('fs')
    const path = require('path')
    const debug = require('debug')
    const merge = require('webpack-merge')
    const Config = require('webpack-chain')
    const PluginAPI = require('./PluginAPI')

```

#### 2 修改配置?

在项目的根目录下创建 `vue-config.js`这个文件

- 注意 这里会与 `默认配置` 合并

```js
module.exports = {

}
```



#### 3 使用 vue-ui

- 其实我们也可以使用 vue-ui创建一个项目

```js
#1 
输入命令`vue ui`    
    => 打开项目管理器 
    => 导入我们对应的项目
	=> 在项目仪表盘中 => 查看插件 (查看依赖 | 查看项目配置)
#2
	我们可以在【项目配置】中修改webpack配置
    

```

### 3 vue-router

1. 路由是： 【路径】 与 【组件】的`映射`
2. `路径的改变 `即是 `组件的改变`！
3. 常见的跳转方式

```js
1 更改hash\
2 h5新增了history模式，与其一系列方法，以pushState为例
	# http://192.168.1.11:8080/
	location.hash="home"  			 =>  # http://192.168.1.11:8080/#home
	history.pushState({}, '', 'home') => # http://192.168.1.11:8080/home
    
	1 pushState
	2 replaceState
	3 go
```

#### 1 初始化

```js
#1 安装
	npm install vue-router --save    // 运行时候依旧需要依赖，故是 --save
#2 
	导入路由对象，调用 Vue.use(Vue.Router);
#3 
	创建【路由实例】， 传入路由映射配置
#4
	在Vue实例中【挂载】创建的router实例
    
步骤：
    在 根目录下，src目录下创建文件夹【router】目录，创建【index.js】来配置路由

# router目录中的index.js
------------------------------------------------------------------------------
import VueRouter from 'vue-router';
import Vue 		 from 'vue';
Vue.use(VueRouter); 			// 1 导入路由对象，调用 Vue.use(Vue.Router);
const routes = [];  			// 2 路由映射配置
const router = new VueRouter({	// 3 创建【路由实例】
    routers,
})
export default router;

# main.js 入口文件
------------------------------------------------------------------------------
import router from './router'; // 语法，若是导入的是一个目录，则自动寻找idnex.js文件
......
new Vue({
   el: '#app',
   router,						// 4 在Vue实例中【挂载】创建的router实例
   render: h => h(App);			
});
```

#### 2 呈现

- 创建对应组件，并且对应修改router实例的routes对象
  1. `router-link`最终会被渲染成一个a标签
  2. `router-view`会被对应的组件替代, 可以视作 `占位符`
  3. 路由切换时候， router-view挂载组件改变， 其余内容不变。
  4. `path` 即前端路由，指向对应组件 to <--> path <--> component 映射关系

```js
#router目录下的index.js
const routes  = [{ path: '/home',component: Home, }];

# 入口App.vue
  <div id="app">
    <router-link to="/home">home</router-link>
    <router-link to="/about"> about</router-link>
    <router-view></router-view>
  </div>
```

1. `history模式`

   hash => histroy

   vue-router默认是进行hash跳转的，希望使用history模式跳转

   ```js
   对应router实例中添加
   	mode: 'history'
   ```

2. `<router-link>组件附带的一些属性`

   - 使用replace标签即 改用 history.replaceState模式，而不是history.pushState

   - router-link-active

     使用该标签，当路由匹配成功，会对应修改其 router-link上的class

     默认是 router-link-active, 当然可以通过 router-link-active ="active"来更改

     也可以统一在router实例上配置， `linkActiveClass = "active"`来统一修改

   ```js
   #属性名  					#解释                            #实例
   to						  用于指定跳转的路径					to="/home"	
   tag						  指定router-link以何种形式渲染		tag="button"
   replace					  不留下history记录				   replace就可
   router-link-active		  给当前活动路由标签添加样式			
   ```

3. 使用代码跳转，而非router-link中的to属性跳转

   `push` 与 `replace`

   注意： `this` 指当前组件， vue-router在所有当前组件都添加了一个`$router`属性

   ```js
   this.$router.push('/home')
   this.$router.replace('/about')
   ```

#### 3 动态路由

-  `path`配置的参数 与 `this.$route.params.userId`是映射关系
- `router`可以认为是 我们创建的router实例， 里面包含所有路由。
- `route`可以看作是router实例当中， 当前活跃的路由。

```js
routes 
#1 在配置时候添加参数
	{
		path: '/user/:userId'
		component: User,
	}

App.vue
#2 在传入时候添加参数
	<router-link to="'/user/' + userId"></router-link>
   
# 3 调用 打印这个参数
	在对应得活动组件， User中
	console.log(this.$route.params.userId)
```

#### 4 路由懒加载

- 打包(构建应用时) => Js目录下的文件其实是巨大的，

  1 因为都是集中在bundle,hs来打包，这样会影响页面加载。

  2 所以 将 不同的路由映射的组件 切割成不同的代码块。

  3 当路由被访问时候，在加载对应的组件（包中对应的js代码）

- 实现

  ```js
  const User = () => import('../components/user')
  .......
  {
  	path: 'user',
  	component: User,
  }
  ```

- 番外(关于打包这件事)，这里记的并不详细

  ```js
  打包文件有
  	mainifest.xxx.js	=> 为打包代码做底层支撑， 比如(ES6的语法， commonJs等)
  	app.xxx.js			=> 主代码
  	vendor.xxx.js		=> 第三方插件(比如 vue, vue-router， axios)
  默认有这三个，可能当前webpack打包又变了
  	若使用路由懒加载后， 对应有几个懒加载组件，打包后便会多出来几个js文件
  ```

#### 5 嵌套路由

1. 在`routes`，路由配置中 配置对应的子路由
2. 在其入口路由对应得组件中，使用router-view与router-view
3. 当然你可以在里面配置默认路由，不再累述。

```js
#1 配置子路由
{
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: HomeNews,
      },
      {
        path: '/home/message',
        component: HomeMessage,
      }
    ]
  },
# 2 home.vue这个其 入口路由对应的组件
<template>
  <div>
    hello! home!
    <router-link to="/home/news">news</router-link>
    <router-link to="/home/message">message</router-link>
    
    <router-view></router-view>
  </div>
</template>
```

#### 6 传递参数

1. `params` , 参考 `动态路由`， 通过路由来传参

2. `query`

   传递时候，`使用query的key`作为传递方式，形式上与类似url传参

   传递后形成的路径： `/router？id=123`

   ```js
   # 传参
   <router-link
   	:to ="{
   		path: 'profile',
           query: {
               name: 'why',
               age: '18',
           }
   	}"
   />
   # 调用,对应组件中
      console.log(this.$route.query);
   -------------------------------------------------------------------------
   URL的组成
   #例：https：//host：80/路径？查询
   协议(scheme) + 
   + 主机（服务器地址）
   + 端口(都存在端口， 不过默认是80时候可以省略) 
   + 查询（query）
   
   ```

   

