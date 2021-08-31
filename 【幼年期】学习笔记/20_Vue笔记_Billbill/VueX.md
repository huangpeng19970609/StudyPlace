## 一、Vuex的概念与作用解析

### 1、什么是VueX？

官方解释： 转为Vue.js应用程序开发的状态管理模式

通俗的说：多个组件共享的变量全部存储在同一个对象中

- 那有什么信息需要我们共享呢？


1、安装 VueX 

​	npm install  vuex --save 以后项目也要运行使用！

2、router我们在router文件夹下创建index.js，而VueX我们创建名称为store文件下有index.js

```js
import Vue from 'vue'

import VueX from 'vuex'
// 安装插件
Vue.use(VueX)
// 创建对象
const store = new VrueX.Store({

	state: {
        counter: 20,
    },
    mutations: {
        
    },
    actions: {
        
    },
    getters: {
        
    },
    modules: {
        
    }

})
//导出store独享
export default store
```

3、在组价HelloWorld.vue里

```js
{{$store.state.counter}}
```

###  2、理解

VueComponent引用了State，但并不建议VueComponent直接修改State内容

VueX官方建议：

- **State   先被使用  VueComponents  再 去Actions，再去Mutations 就可以修改State了**
- 如果直接VueComponents与State修改，DevTools无法记录这个状态，不法每一步都跟踪这个状态
- DevTools配合Mutation，如果略掉Actions也是可以允许的
- 注意这个DevTools与Mutation 只能进行同步操作！若异步操作才需要在Actions下进行操作，即网络请求

### 3、使用DevTools插件

在谷歌浏览器上使用插件 Vue.js.devtools

```js
const store = new VrueX.Store({

	state: {
        counter: 20,
    },
    mutations: {
        increment(state) {
            state.counter++
        }
        decrement(state){
   			state.counter--
		}
    },
    actions: {
        
    },
    getters: {
        
    },
    modules: {
        
    }

})
```

 对应的组件绑定

```vue
<button  @click="add"/> 

<script>
	export default {
		name: 'APP',
		......
		methods: {
			add() {
                // 看一下这里的对应关系，increment对应mutations里的方法名字，必须通过commit触发
				this.$store.commit('increment')
			}
		}
	}
</script>
```

### 4、基本使用的总结

共享状态！

- 通过this.$store.state.XX 访问属性
- 通过this.$store.commit('XXXX') 修改状态

1. State 用于保存状态

   State里面的信息都是响应式的信息

2. Getters

3. Mutations

4. Action

5. Module 

### 5、State单一状态树

若是保存在多个State，管理与维护日后会很麻烦。故仅存在一个State

### 6、Getters的基本使用

我们需要从state中获取变异后的数据，比如 我们每次都需要获取 state里a的平凡

类似于单个组件的computed属性。

```js
   getters: {
       // 第一个参数未state
        powerCounter(state) {
        	return state.a * state.a
        }
       // 自动映射 ,第二个参数就是getters
       powerCounterA(state,theGetters) {
           return theGetters.powerCounter
       }
       // 动态实现
       moreAgeStu(state) {
           return function(age) {
               return state.students.filter( s => s.age > age)
           }
       }
    },
    ==================
    // 初次使用
    {{$store.getters.powerCounter}}
    // 动态使用
    {{$store.getters.modreAgeStu(20)}}
```

## 其他：修改State唯一途径就是Mutation

### 7、mutation的三种修改方式

无参数、有参数、对象

mutation的store唯一的更新方式：提交Mutation

基本使用：

```js
 mutations: {
        increment(state) {
            state.counter++
        }
    },
 ======
 this.$store.commit('increment')
```

```js
==============mutations也是可以传入参数的
<button @click="addOne(5)">+5</button>
===============
methods: {
    addOne (count) {
        // 这个参数 叫做负载参数，提交的时候递交一个参数
      this.$store.commit('addCounter',count)
    }
  }
===============
mutations: {
        increment(state, count) {
            state.counter += count
        }
    },

```

```js
==============mutations也是可以传入参数的
<button @click="addOne(5)">+5</button>
===============
methods: {
    addOne (count) {
        // 这个参数 叫做负载参数，提交的时候递交一个参数
      this.$store.commit({
          type: 'increment',
          count: count
      })
    }
  }
===============以对象方式提交！
mutations: {
        increment(state, payload) {
            state.counter += payload.count
        }
    },

```

### 8、VueX的响应式原理

1. 这样 确实 state里面的info对象有了新的键名为address，值为洛杉矶，但是并没有响应前端
2. 我们必须在Store中初始化我们所需要的属性
3. 给state添加新属性的时候要使用特定的方法

```js
在index.js中
updateInfo (state) {
	state.info['address'] = '洛杉矶'
}

```

```js
而使用这种方式，进行修改才是响应式的！
updateInfo (state) {
	Vue.set(state.info, 'address','洛杉矶')
	Vue.delete(state.info,'age')
}

```

### 9、Vuex—Mutation的常量类型

为了防止VueX的mutation的方法与Vue组件的实际提交的方法名不一致报错，官方建议

1、在store下建立mutations-types.js，

```js
让一个方法名等于 其常量，在这里方法名你想写啥就写啥，它只是个工具人
export const INCREMENT = 'increment'
```

2、那么

```js
import { INCREMENT } from './....'
methods: {
    addOne (count) {
        // 这个参数 叫做负载参数，提交的时候递交一个参数
      this.$store.commit(INCREMENT,count)
    }
  }
===============
import { INCREMENT } from './....'
mutations: {
        [INCREMENT](state, count) {
            state.counter += count
        }
```

其他：注意下两种导入导出的不同使用方式，主要区别在于大括号！

```js
如果这样导出
	export const INCREMENT = 'increment'
那么只能
    import { INCREMENT } from './....'
如果这样导出
	export default {   }
那么
	import Hello from './Hello.vue'
```

### 10、actions 异步

- 使用mutations时devtools可以很好帮助我们捕捉mutation的快照
- 如果是异步，devtools是不能很好的捕捉

看起来多此一举，实际上是必须的

```js
<button @click="addOne()">+5</button>
===============
methods: {
    addOne (count) {
        // 这个参数 叫做负载参数，提交的时候递交一个参数
      this.$store.dispatch('AAAincrement')
    }
  }
===============以对象方式提交！
mutations: {
        increment(state, payload) {
           
        }
    },
actions: {
    	AAAincrement(context) {
            setTimeout(()=> {
                context.commit('increment')
            },1000)
        }
}
```

有参数的传递:

```js
<button @click="addOne()">+5</button>
===============
methods: {
    addOne (count) {
      // 第一步，使用dispatch向action发送一个异步的请求，目标AAAincrement
      this.$store.dispatch('AAAincrement','我是一个参数')
          // 第四步，完成提交！返回处理结果
          .then(res => {
    			console.log('我们完成了提交')
          		console.log(res)  // 11111
      		})
    }
  }
===============以对象方式提交！
mutations: {
    	修改处理
        increment(state,payload) {
           ......
        }
    },
actions: {
    	AAAincrement(context, payload) {
            // 3、我们可以设置一个Promise对象，来进行发送成功,注意 返回的是一个Promise对象
            return new Promise ((resolve,reject) => {
                // 2、actions接受，并执行异步操作，但需要进行内容的更改，那需要发送给mutations
                 setTimeout(()=> {
                	context.commit('increment',payload)
                    console.log(payload)
                    // 3.1 发送成功，并传入给res参数 11111
                     resolve('11111')
            	},1000)
            })
         
        }
}
    
 this.$store.dispatch('AAAincrement','我是一个参数') 我们调用的这个返回的是一个Promise，那我们就可以直接去调用一个then了！相当于做了一次中转
```

### 11、Module

防止变得过于臃肿

因为State单一状态树，故还特地设计了modules设置了很多的模块，

```js
const modulB = {
    state: {},
    mutations: {},
	actions: {},
	getters: {},
}
const modulA = {
    ----------------------------------------------
    state: {
       name: '李四'
    },
    ----------------------------------------------
    mutations: {
        updateName(state,payload) {
            state.name = payload
        }
    },
    ----------------------------------------------
	getters: {
        fullname (state) {
            return state.name + '1111'
        },
        fullname (state,getters) {
            // getter对应我们这个模块的getters 
            return getters.fullname + ‘22222’
        }
        fullname (state,getters,rootState){
    		// 这样就可以拿到根State的State  root
    		return getters.fullname2 +rootState.counter
		}
    },
    ----------------------------------------------
     actions: {
         aUpdateName(context) {
             // 根模块下的context我们可以直接看为store
             setTimeout({() => {
                	context.commit('updateName','huangpeng') 
             	}
                 
             }，1000)
         }
     },
}
const store = new Vuex.Store({
    state: {
        name: root
    }
    moudles: {
        a: modulA,
        b: modulB
    }
})
=======================================
1、state==================================
 {{$store.state.a.name}}  
                 到时候我们这样使用就可以了！
                 注意一下！！！modules的a 最终都会到state里面的！！
2、mutations==================================
 methods: {
     // 几乎一模一样！但方法的名字千万不要重复，没有区别
     updateMethod () {
         this.$store.commint('updateName'.'李四222')
     }
 }
3、getters==================================
    //跟从前一样！
    {{$store.getters.fullname}}
4、actions=====================================
    <button @click="asyncUpdateName"></button>
	methods: {
        asyncUpdateName () {
            this.$store.dispatch('aUpdateName')
        }
    }
```

### 12、Vue-Store的抽离

可以将mutations、getters、actions抽离为独立的js文件

module抽离成一个文件夹