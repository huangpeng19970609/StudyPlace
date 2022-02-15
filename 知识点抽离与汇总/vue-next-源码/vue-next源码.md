> jest快速入门及实践教程？

## createApp

1. 渲染，并创建app对象。

   ````js
   const app = ensureRenderer().createApp(...args)
   ````

2. 重写mount方法

   目的是跨平台

3. 返回一个app实例

### ensureRenderer

> createRenderer函数非常庞大， vnode、diff与patch均在此方法中实现。

```js
// packages/runtime-core/src/renderer.ts
function baseCreateRenderer(
  options: RendererOptions,
  createHydrationFns?: typeof createHydrationFunctions
): any {
    // 此处省略 2000 行
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  }
}
```

【createApp】即 【createAppAPI】

生成app实例。

1. app 实例还会有 use、mixin、component、directive 等方法

   ````js
   use() {},
   mixin() {},
   component() {},
   directive() {},
   
   // mount 我们拎出来讲
   mount() {},
   unmount() {},
   ````

2. index.html 在创建好 app 后接着调用 `mount` 进行挂载，`mount` 的实现在 `createAppAPI` 内部

3. `render` 则开始 `patch` 进行渲染，`patch` 内部会进行递归渲染子节点。

## defineComponent

1. defineComponent 只是返回传递给它的对象

2. 这仅是利用了 函数的参数，目的是提供开发过程中友好的提示，这一点非常重要。

   ````js
   export default defineComponent({})
   ````

## h

[hyperscript](https://github.com/hyperhype/hyperscript)超文本标记语言

返回一个“虚拟节点” ，通常缩写为 VNode: 一个普通对象。用于手动编写render

```js
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  if (arguments.length === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}

```

### _createVNode

1. 标准化 `props` `class`
2. 给 `VNode` 打上编码标记
3. 创建Vnode
4. 标准化子节点

## nextTick

> vue-3的nextTick不再有那么多兼容问题，毕竟舍弃了IE9
>
> 定义: 加入进下一次的微任务队列。（因DOM渲染是宏任务）。
>
> 初次之外他会有两次辅助的兄弟函数，实现【job队列的去重】与【cb队列的去重】

````typescript
export function nextTick(
  this: ComponentPublicInstance | void,
  fn?: () => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
````

1. vue3直接Promise一把梭！简单粗暴！好！

#### queueJob 

job列队，有去重逻辑，保证任务的唯一性，每次调用去执行 `queueFlush`

```typescript
export function queueJob(job: Job) {
  // 去重 
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}
```

#### queuePostFlushCb

```js
 if (!isArray(cb)) {
    postFlushCbs.push(cb)
  } else {
    postFlushCbs.push(...cb)
  }
  queueFlush()
```

敲黑板:

`````typescript
const run = (effect: ReactiveEffect) => {
  ...
  # queueJob(effect)
  if (effect.options.scheduler) {
    effect.options.scheduler(effect)
  } else {
    effect()
  }
}
`````

当响应式对象发生改变后，执行 `effect` 如果有 `scheduler` 这个参数，会执行这个 `scheduler` 函数，并且把 `effect` 当做参数传入

- 官话
  1. 是一种性能策略，是一种性能优化手段，是基于JS执行机制而实现的
  2. 改变数据时不会立即触发视图， 故您应该等到下一个宏任务才可以获取到最新的DOM，此时就是nextTick的应用场景！

> 关于reactive
>
> 建议阅读的顺序
>
> - [/reactivity/reactive](https://vue3js.cn/reactivity/reactive)
> - [/reactivity/baseHandlers](https://vue3js.cn/reactivity/baseHandlers)
> - [/reactivity/effect](https://vue3js.cn/reactivity/effect)
> - [/reactivity/ref](https://vue3js.cn/reactivity/ref)
> - [/reactivity/computed](https://vue3js.cn/reactivity/computed)
>
> 

## reactive

- 定义

  接收【普通对象】，并返回其响应式代理。（代理： 其基本操作的行为）

  1. 代理对象显然不等于原始对象，故应该避免依赖原始对象，而仅仅使用代理对象

- vue & reactive

  vue 中 【reactive】的实现是通过 【proxy + effect】组合而实现。 

### 01 | createReactiveObject

`createReactiveObject` 创建 observe

- 过滤

  1. 判断是否是对象或者数组 => 故其只能传入【对象】与【数组】

  2. 判断是否是Proxy对象 => 若已是，便不处理。

  3. 判断是否proxyMap中缓存Proxy，若存在目标，则使用缓存。

  4. 携带【__v_skip】的对象不予处理， 不是白名单的对象不予处理

     ​	白名单： 'Object、Array、Map、Set、WeakMap、WeakSet

- 创建Proxy

  ````js
   const proxy = new Proxy(
      target,
      targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
   )
   proxyMap.set(target, proxy)
   return proxy;
  ````

- handlers
  1. baseHandlers 基本类型的 handlers
  2. collectionHandlers 主要针对(set、map、weakSet、weakMap)的 handlers

### 02 | BaseHandlers

都是 `mutableHandlers` 的变形版本，这里我们主要针对 `mutableHandlers` 展开

- mutableHandlers 可变处理
- readonlyHandlers 只读处理
- shallowReactiveHandlers 浅观察处理（只观察目标对象的第一层属性）
- shallowReadonlyHandlers 浅观察 && 只读处理

> 关于 mutableHandlers

一个属性的基本操作的定义便是在这里。这也是代理的执行体。

````typescript
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  # 针对 getOwnPropertyNames,  getOwnPropertySymbols, keys 的代理方法
  ownKeys
}
````

#### get & createGetter

1. if (key === ReactiveFlags.isReactive) 

   ````typescript
   import { ReactiveFlags, reactive, isReactive } from '@vue/reactivity'
   
   const obj = {
     [ReactiveFlags.skip]: true
   }
   
   const proxyObj = reactive(obj)
   # isReactive 会主动来触发这处get方法
   console.log(isReactive(proxyObj)) // false
   ````

   同理过滤    ReactiveFlags.isReadonly    |    ReactiveFlags.raw

2. 目标对象是数组并且 key 属于三个方法之一 ['includes', 'indexOf', 'lastIndexOf']

   - 对数组长度敏感的方法进行重写，已防某些情况下出现死循环。
   - 当push方法执行时，会从this中获取length，以及对length进行更新, 这样就会导致其属性的无限循环，因为们是代理对象。

   ````js
   if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
   	return Reflect.get(arrayInstrumentations, key, receiver)
   }
   ````

3. 若key为【symbol】 或是 key是【原型对象】，便直接返回，不处理。

4. 若是 【浅观察】【且不是只读】

   若是 其值结果是 【Ref】， 若是数组则 track Get， 否则直接返回值。

   ````js
   if (shallow) {
      # track Get => 收集依赖
      !isReadonly && track(target, TrackOpTypes.GET, key)
      return res
    }
   ````

5. 若您是对象，则继续对其进行代理，将其变为响应式。

#### set & createSetter

1. 若不是浅拷贝

   in shallow mode,   objects are set as-is regardless of reactive or not

   - 若其不是数组、旧的值是ref，且新的值还是一个ref，便是直接赋值操作

     ````typescript
      oldValue.value = value // 这里会触发 ref.value方法
     ````

2. 不管怎么样 => trigger

   ````typescript
   const hadKey = hasOwn(target, key)
       // 赋值
       const result = Reflect.set(target, key, value, receiver)
       // don't trigger if target is something up in the prototype chain of original
       if (target === toRaw(receiver)) {
         if (!hadKey) {
           // 如是不存在则trigger ADD
           trigger(target, TriggerOpTypes.ADD, key, value)
         } else if (hasChanged(value, oldValue)) {
           // 存在则trigger SET
           trigger(target, TriggerOpTypes.SET, key, value, oldValue)
         }
       }
   return result
   ````

#### delete & deleteProperty

1. 成功删除则调用 trigger

    trigger 为 effect 里的方法

   ````typescript
   const result = Reflect.deleteProperty(target, key)
   if (result && hadKey) {
      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
   }
   return result;
   ````

#### has

track 也为 effect 里的方法，effect 为 reactive 的核心, 后面会讲到 

````typescript
function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key)
  track(target, TrackOpTypes.HAS, key)
  return result
}
````

#### ownKeys

`````typescript
// 返回一个由目标对象自身的属性键组成的数组
function ownKeys(target: object): (string | number | symbol)[] {
  track(target, TrackOpTypes.ITERATE, ITERATE_KEY)
  return Reflect.ownKeys(target)
}
`````



### 03 | reactive & proxy

使用proxy实现的reactive的特性

1. 【代理对象】与【原始对象】不相同， 不会污染原始对象，

   所以叫【代理】对象

2. 【proxy】的嵌套对象, reactive后嵌套的属性也可以响应

   所以叫代理【对象】

3. 观察的对象的变更会同步到原始对象

   这是 vue 中的 hanlder所处理的

4. 重复观察相同的原始对象直接返回相同的proxy对象

   即重复 reactive一个对象两次，他们其实是同一个。vue源码如此处理。

5. 通过`toRaw api`可以返回被观察对象的原始对象

6. should not unwrap Ref<T>

   ````typescript
   test('should not unwrap Ref<T>', () => {
     const observedNumberRef = reactive(ref(1))
     const observedObjectRef = reactive(ref({ foo: 1 }))
   
     expect(isRef(observedNumberRef)).toBe(true)
     expect(isRef(observedObjectRef)).toBe(true)
   })
   ````

7. `markRaw` 可以给将要被观察的数据打上标记，标记原始数据不可被观察

   我的 3.0源码中似乎与文章中有所出入，并未看到。

8. 被freeze的数据不可观察

9. 有很多类型不能被观察

   这便是源码中的【白名单】干的事。

10. 你可以用计算属性来响应式

    ```js
      const a = computed(() => 1)
      // writable
      const b = computed({
        get: () => 1,
        set: () => {}
      })
      const obj = reactive({ a, b })
    ```

### 04 | shallowReactive

只为某个对象的私有（第一层）属性创建浅层的响应式代理，不会对“属性的属性”做深层次、递归地响应式代理

1. 属性的属性不会被观察

2. `shallowReactive`后的`proxy`的属性再次被`reactive`可以被观察

3. `iterating` 不能被观察

   迭代的属性显然不是一个对象，因而不管怎么样都不可以去响应式。不仅仅是shallowReactive。

   因为我们是【代理对象】

   同理 get、foreach不管何种方式，脱离对象便是脱离代理。

### 05 | effect

`effect` 作为 `reactive` 的核心，主要负责【收集依赖，更新依赖。】

1. 入口函数 【effect】=>  *const* effect = createReactiveEffect(fn, *options*)

2. createReactiveEffect

   - 我们仅讨论主要逻辑

   ````js
   	 try {
           // 开始重新收集依赖
           enableTracking()
           // 压入Stack
           effectStack.push(effect)
           // 将activeEffect当前effect 
           activeEffect = effect
           return fn(...args)
         } finally {
           // 完成后将effect弹出
           effectStack.pop()
           // 重置依赖
           resetTracking()
           // 重置activeEffect 
           activeEffect = effectStack[effectStack.length - 1]
         }
   ````

   问题来了！`effect` 是如何收集及触发依赖的呢？？？

3. 收集依赖的过程和 vue2的思路大差不差

### 05 | track

> track 收集依赖(get操作)
>
> 触发其get方法的时候会进行 track的加入。

````typescript
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  // 每个target会对应一个depsMap
  let depsMap = targetMap.get(target)
  // 判断是否直接可以找到一个depsMap
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 每个key在depsMap中对应一个dep集合
  let dep = depsMap.get(key)
  // 判断之前是否有这个集合
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    // 手机当前激活的effect作为依赖
    dep.add(activeEffect)
    # 将收集的依赖放入到activeEffect的deps中
    activeEffect.deps.push(dep)
    if (__DEV__ && activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      })
    }
  }
}
````

### 06 | trigger 

> - trigger 触发依赖(触发更新后执行监听函数之前触发)

```js
export function track(target: object, type: TrackOpTypes, key: unknown) {
  // activeEffect为空代表没有依赖，直接return
  if (!shouldTrack || activeEffect === undefined) {
    return
  }

  // targetMap 依赖管理中心，用于收集依赖和触发依赖
  // 检查targetMap中有没有当前target
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 没有则新建一个
    targetMap.set(target, (depsMap = new Map()))
  }

  // deps 来收集依赖函数，当监听的 key 值发生变化时，触发 dep 中的依赖函数
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
    // 开发环境会触发onTrack, 仅用于调试
    if (__DEV__ && activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      })
    }
  }
}
```

## ref

> ref是 reference的简写，而 ref 存在的意义是什么？为什么需要ref？
>
> 答： 
>
> 1.  `ref` 看成 `reactive` 的一个变形版本。
> 2. 目的: 解决proxy仅能传入【白名单】的问题，现在有ref就可以解决值类型的数据响应问题了！

### createRef

1. createRef

   ````typescript
   function createRef(rawValue: unknown, shallow = false) {
     if (isRef(rawValue)) {
       return rawValue
     }
     return new RefImpl(rawValue, shallow)
   }
   ````

2. RefImpl

   ````typescript
   class RefImpl<T> {
     private _value: T
   
     public readonly __v_isRef = true
   
     constructor(private _rawValue: T, public readonly _shallow = false) {
       this._value = _shallow ? _rawValue : convert(_rawValue)
     }
   
     get value() {
       track(toRaw(this), TrackOpTypes.GET, 'value')
       return this._value
     }
   
     set value(newVal) {
       if (hasChanged(toRaw(newVal), this._rawValue)) {
         this._rawValue = newVal
         this._value = this._shallow ? newVal : convert(newVal)
         trigger(toRaw(this), TriggerOpTypes.SET, 'value', newVal)
       }
     }
   }
   ````

   1. ref本质是创建 RefImpl类的实例。

   2. 若本身是ref，则直接返回ref。

   3. 若是浅观察，直接构造一个ref将其返回。

      ⭐ 浅观察的写法接近与 Vue2中观察者写法。

   4. 若不是，则构造reactive给与 _value

      ```typescript
      const convert = <T extends unknown>(val: T): T =>isObject(val) ? reactive(val) : val
      ```

   5. 如果传入 `ref` 的是一个对象，内部也会调用 `reactive` 方法进行深层响应转换

### 注意

1. 由于是通过class创建的实例，故其返回值总是带有value的一个对象。

   ````js
   ref(1).value === 1
   ````

2. 嵌套的属性可以响应, 这是因为 ref 内部处理成了reactive，不过你这么写为什么不用 reactive？买不买瓜？

   会检测传递 `ref` 的值类型 ，如果是引用类型就 `reactive` ，不是直接返回结果

   ````typescript
   ref({a: 1})
   ````

3. 传递空值也可以响应。 毕竟空值也是值，null、undefined、'' 也是值类型。

4. `ref` 在 `reactive` 中会被转换成原始值，而非 `ref`

   ```typescript
   const ref_value = ref(2);
   const obj = reactive({
       a: ref_value,
   })支持自定义 ref, 自由控制 track, trigger 时间
   ```

5. `ref` 嵌套时会自动 unwrap, 访问 b.value 相当于 b.value.value

6. `unref` 可以将 `ref` 还原成原始值

7. `shallowRef` 不会发生响应，替换掉整个对象会触发响应，因为是【浅】

8. 支持自定义 `ref`, 自由控制 `track`, `trigger` 时间

## computed

> 也归属于响应式系统的一部分

````js
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  // 如果传入是 function 说明是只读 computed
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    // 不是方法说明是自定义的 getter setter 
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  let dirty = true
  let value: T
  let computed: ComputedRef<T>

  // 创建 effect, 我们在看 effect 源码时知道了传入 lazy 代表不会立即执行，computed 表明 computed 上游依赖改变的时候，会优先 trigger runner effect, scheduler 表示 effect trigger 的时候会调用 scheduler 而不是直接调用 effect
  const runner = effect(getter, {
    lazy: true,
    // mark effect as computed so that it gets priority during trigger
    computed: true,
    scheduler: () => {
      // 在触发更新时把dirty置为true, 不会立即更新 
      if (!dirty) {
        dirty = true
        # 触发更新
        trigger(computed, TriggerOpTypes.SET, 'value')
      }
    }
  })

  // 构造一个 computed 返回
  computed = {
    __v_isRef: true,
    // expose effect so computed can be stopped
    effect: runner,
    get value() {
      // dirty为ture, get操作时，执行effect获取最新值
      // 
      if (dirty) {
        value = runner()
        dirty = false
      }
      // dirty为false, 表示值未更新，直接返回 
      track(computed, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newValue: T) {
      setter(newValue)
    }
  } as any
  return computed
}
````

## diff

https://segmentfault.com/a/1190000038654183
