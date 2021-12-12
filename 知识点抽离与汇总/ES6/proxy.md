>
>
>proxy
>
>1. Proxy 实际上重载（overload）了点运算符:
>
>   用自己的定义覆盖了语言的原始定义
>
>2. 

### 语法

1. 示范

   ```js
   let obj1 = new Proxy({}, {
     get: function (target, propKey, receiver) {
       return Reflect.get(target, propKey, receiver)
     },
     set: function (target, propKey, value, receiver) {
       return Reflect.set(target, propKey, value, receiver)
     }
   });
   ```

2. Proxy实例

   - 参数一： 所要拦截的目标对象
   - 参数而： 定制拦截的行为





