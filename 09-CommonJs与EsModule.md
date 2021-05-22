### 1 ESModule

> 1. ESMoudule是按`引用`导出的， 导入的值是`不可修改`的
> 2. 只可在编译时且在头部。

#### 导出

1. 单个导出

   ```js
   export const name;
   export const fn = () => {};
   ```

2. 混合导出

   > `一个模块，只能有一个default`

   ```js
   # 这不是导出一个对象，是放置要导出的变量的引用列表
   export { name, fn };     
   
   # 导出一个对象
   export default { num3 };
   
   # 导出时, 可以给变量起别名
   export {
   	name as fName
   }
   
   ```

#### 导入

1. 单独导入

   ````js
   import { name, age } from './index.js'
   
   import { name as lName } from '';
   
   import * as all from './index.js'
   
   import lsh from '';
   ````

2. 混合导入

   + 若变量名使用default 那么必须要使用as （default是保留字）

   ```js
   import msg, {name, age} from './index.js'
   
   import { default as all, name, age } from './index.js'
   ```

   

### 2 CommonJs

> 1. 基于Node环境使用！
> 2. 浏览器是不识别` module` 与 `require`的
> 3. 按值引用，你可以去修改其引入的值,但会导致之前导出的单值引用被覆盖

#### 导出

不建议省略`module`的写法 => 因为 module的存在标识了他是CommonJS

````js
exports = {}; // 省略写法

module.exports.name = xxx; // 不省略 module的写法
````



#### 导入

````js
let a = require('./index.js')
````

