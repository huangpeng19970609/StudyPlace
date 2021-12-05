## 01 | 标准引用

### 类型

- ECMAScript 语言类型

  1. ECMAScript 语言类型 是 ECMAScript 程序员使用 ECMAScript 语言直接操作的值对应的类型。

  2. ECMAScript 语言类型包括 未定义 （Undefined）、 空值 （Null）、 布尔值（Boolean）、 字符串 （String）、 数值 （Number）、 对象 （Object）

-  规范类型

  1. 规范类型包括 `引用` 、 列表 、 完结 、 属性描述式 、 属性标示 、

     `词法环境`（Lexical Environment）、 环境纪录（Environment Record）

  2. 这些值不能存成对象的变量或是 ECMAScript 语言变量的值

### 规范类型的引用类型

- 描述 【delete】、【typeof】、【赋值运算符】的行为
- 结构
  1. base
  2. referencedName 引用名称
  3. 严格引用标识  （ use strict）

### 左值与右值

- 左值  【表达式返回一个标准引用】 

  1. delete x， 这类运算符时

  2. typeof x， type运算符时

  3. 属性存取符 obj.x 

  4. 属性赋值符 x = 1

  5. 单值表达式 （一般叫做变量名） 例如 【x】 是一个引用

     例如 delete x中的x 是单值表达式

     x = x 中的左x 是单值表达式

     而 obj.x 中的 x 是标识符， 其不是单值表达式，其通过 . 运算符

     具体应看语句。

- 右值  【表达式返回一个值（GetValue）】

- 例子

  ```js
  x = x; // ref = GetValue(ref)
  
  var x = x // 不涉及 左值与右值。 仅是简单的初始化在内存操作
  
  # 为何会改变this呢 => 因为 右值赋予了 左值
  obj = { f: function() { return this === obj } };
  (a = obj.f)();
  
  # 例子
  
  
  ```
  

### x = obj.foo

1. 右操作是`obj.foo`，它的引用是obj.foo整体，这包括“obj这个对象”的信息——这称为“引用（规范类型）”；
2. 右侧表达式的值是GetValue(obj.foo)
3. `x = obj.foo` 其结果是`x`变成了函数foo，那么它就是右侧操作数的“值”，而不是右操作数“obj.foo”的全部信息
4. (obj.foo) 此时强行运算得到的是 其 引用

````js
obj = {
    foo() {
        console.log(this === obj)
    }
}
# 分组运算得到了操作数的“引用（全部的信息） [这一对括号称为“分组运算符（也有称着强制运算符的）”]
(obj.foo)(); // true => 
x = obj.foo; x(); // false
````

### delete

> delete 操作语句 是`删除一个表达式、引用类型的结果`

- 若 x 不存在会怎么样？

  delete x、typeof x 而 左值计算，并不会进行GetValue

  但 console.log(x) 却会报错， 其原因是 右值操作， 进行 GetValue

## 02 | 词法声明

var x = y = 100： 声明语句与语法改变了JavaScript语言核心性质

### 6种声明方式

⭐ 声明的共性： var let const 仅是这三种

> 这些声明方式的意义 => JS的静态语义
>
> - 通过静态分析可以发现那些声明的标识符
> - 标识符的 变量/常量 一定在代码执行前已在作用域

1. let ： 声明变量 x。不可在赋值之前读。

   - 访问它之所以会抛出异常（Exception），不是因为它不存在，而是因为这个标识符被拒绝访问了

2. const

3. var： 

   在赋值之前可读取到 undefined 值。

4. function x

    声明变量 x。该变量指向一个函数。

   函数是按 `varDecls 的规则`声明的

5. class x

   声明变量 x。该变量指向一个类（该类的作用域内部是处理严格模式的.

   类的内部是处于严格模式中，它的`名字是按 let `来处理的

6. import

   入标识符并作为常量（可以有多种声明标识符的模式和方法）

   import 导入的名字则是按 `const `的规则来处理的

关于 let、const

1. var：

   “变量声明（varDelcs）”

   JavaScript 是允许访问还没有绑定值的var所声明的标识符的。

   - 原因

     JavaScript 环境在创建一个“变量名（varName in varDecls）”后，会为它初始化绑定一个 undefined 值.

     

2. let、const

   “词法声明（lexicalDecls）”

   JavaScript 拒绝访问还没有绑定值的let/const标识符而已。

### 环境

- 现在的 JavaScript 环境仍然是通过将全局对象初始化为这样的一个全局闭包来实现的

- 变量名列表（varNames）

  1. ECMAScript 规定在这个全局对象之外再维护一个变量名列表（varNames）
  2. 所有在静态语法分析期或在 eval() 中使用var声明的变量名就被放在这个列表中
  3. 这个变量名列表中的变量是“直接声明的变量”，不能使用delete删除

  ```js
  var a = 100; delete a; 不可删除
  
  x = 200; delete x; 可以删除 => 因为 其没有被 var 声明
  
  eval('var b = 300'); 可以删除 （eval真正实现的特别之处还是可以删除的）
  ```

### var x = y = 100

- y = 100 声明了一个全局变量 y， 
  1. y 可以供删除。
  2. y = 100 其是一个表达式，其返回结果为 100
- x = 100 
  1. 此 【100】是 y = 100 表达式的返回值
  2. 且因为 var x = 100 故是初始绑定， 不涉及左右赋值

#### 思考题: 严格来说， 为何声明不是语句?

1. 声明发生编译期
   - 这是js静态化的特性的体现
   - 维护变量表
2. 语句发生在执行期。
3. 若声明的时候全都没有初始化，那 编译器就可以完全执行。

### 别人的疑问

1. 为什么有这种结果

   - 函数创建的时候标识符x和y就被创建了

   - 编译期时无论是let、var 其都被加入了变量名列表中

   - 在前的环境上下文有【y】, 且是用 var 声明的， 故打印为 undefined

     let x 由于缺省值，直接抛出异常（词法环境）

   - 函数实例、函数闭包，都不过是“静态词法解析结果

   ````js
   var y = "outer";
   
   function f() {
   	console.log(y); // undefined
   
   	console.log(x); // throw a Exception
   
   	let x = 100;
   
   	var y = 100;
   	...
   }
   f()
   ````

   

2.  编译阶段

   按道理来说编译阶段 会 发现 b 吗？

   - 如果“创建”是指静态语义中的一个“函数”，那么确实是创建了的。

     ⭐——但它还没有“绑定”到一个闭包的执行上下文中

   ````js
   function a() {
   	function b() {}
   }
   ````

   

## 03 | 表达式的运算

> 我们常说的表达式的运算是从左至右计算的。
>
> 但运算符的顺序并不是从左至右。比如”=“，加减乘除

### 引言

```js
var a = {n:1};
a.x = a = {n:2};
alert(a.x); // --> undefined
```

、

1. 语法静态分析也不许你这样做

   var a.x 是错误的原因是 若在声明语句， 等于号左边不能是表达式，而此时 a.x便是表达式

### 表达式

> 您需要关注“变量作为表达式是什么，以及这样的表达式如何求值（以得到变量）”



一个例子

````js
w = x + y * z
````

- 计算顺序

  先计算子表达式w 再计算 x、y、z， 之后 y * z 再加 x，再将其值给表达式 w 所指 的 变量或属性

第二个例子

````js
b * c
````

- 计算顺序

  1. 将b理解为单值表达式，求值并得到GetValue(evalute('b'))；

  2. 将c理解为单值表达式，求值并得到GetValue(evalute('c'))；

  3. 将上述两个值理解为求积表达式’*'的两个操作数

     ````js
     evalute('*', GetValue(evalute('b')), GetValue(evalute('c')))
     ````

第三个我们的例子

```js
var x = y = 100;

a.x = a = { n: 2 }
```

- 表达式

  1. 第一行的 x 是 标识符， y 是 表达式， 100 是表达式。 y = 100 是赋值表达式。
  2. 第二行 a.x 是表达式， a = { n : 2 } 是赋值表达式， a、{ n = 2 } 当然也是表达式

- 您应该区分出来

  1. 第一行仅一次赋值表达式运算外加一次值绑定操作。
  2. 第二行才是连续两次的赋值表达式。

- 第二行

  总是从左 至 右 计算的。

  1. a.x 
     - 计算单值表达式a， 获取a的引用
     - ”.“运算的右操作数，遇到右侧的x理解为一个标识符。
     - 计算a.x 的表达式结果。得a.x是引用。

### a.x = a = { n: 2 }

````js
var a = { n: 1 }
a.x = a = { n: 2 }
#1
a.x = a 
````

1. 至左到右

   a.x 是一个引用， 其引用保存计算过程的信息，其中就包括 a， 以备后续的this来使用。

   ```js
   a = {
       n: 1
   }
   ```

   

2. a = { n : 2 }

   - 覆盖原始变量a， 这将导致一个新的变量 a 的出现， 并覆盖掉原有的a
   - 但最左侧的 a.x 是我们最开始的计算，其中有a。
     1. 引用传递的过程中，最左侧计算过程信息的a丢失，同时 a.x 也被丢失
     2. 导致 第二次 a.x 毫无意义。因为变量 a 已被丢失。

   但由于 a.x 表达式结果 result 其是一个引用，且其保存了a。

   故此时这个a。这个结果也非常的符合预期。

   ```js
   # 我们单纯看最左侧的 a.x计算过程信息的 【a】
   a = {
       n: 1,
       x: {
           n: 2
       }
   }
   # 但最终 undefined的原因 是因为 a 在从左至右的计算过程中， a 在引用传递丢失了，故此a被丢弃
   # 这在下一行打印语句便可以体现出来。
   ```

   > “a.x”置值的行为总是可能存在“某种执行效果”，而与“a”对象是否被覆盖或丢弃无关。
   >
   > ⭐ a 即便是被废弃掉了也可以执行下去。
   >
   > 在第二次赋值后，因为“变量a过去的值”那个对象已经不再被任何变量持有，所以它已经无法被访问到了，它“跑丢了”。

- 总结

  简单来说 就是ref的a跑丢了，但赋值也不会报错。

关于一些细节

1. a.x = ...，那么它就是作为“引用”来使用，这样就可以访问到`x`这个属性，并置值；
2. a.x 如果它在后续运算中被作为rhs，例如console.log(a.x)，那么它就会被GetValue()取值（并作为值来使用）
3. a.x整体被作为“一个操作数”，它的用法与它被使用的位置是有关的。但是“得到它（亦即是对a.x这个表达式求Result）”的过程并没有什么不同。

## 04 | 函数表达式、函数定义

>  export default function() {}：你无法导出一个匿名函数表达式

### export

JavaScript 语言的设计上, export 导出“名字和值”, 名字与值其实也是我们模块的全部内容了

⭐ export 语法其实就分为两大类而已

1. 导出“（声明的）名字”
2. 导出“值” 所谓值即表达式

````js
# 导出名字
export <let/const/var> x ...;
export function x()
export class x
export { x, y, z }
export { x as y, ...};
export { x as default, ... };
// 导出“（其它模块的）名字”
export ... from ...;

# 导出值
export default <express>
````

- 合法的

  ````js
  export default 2; // as state of the module, etc.\
  export default "some messages"; // data or information
  # 由于javascript中对象也是一个单值表达式
  故
  export default {}
  ````

- 提问： export function() {} 导出一个匿名函数是导出值还是导出名字呢?

### export 的处理逻辑

- export如何导出名字？为什么只根据名字就可以导出？

  1. 导出一个名字
  2. 为上述名字绑定一个值

  ⭐ 这个步骤 犹如 var x  = 100； 进行了值的绑定

- 导入的逻辑

  > JavaScript 是依赖 import 来形成依赖树的，与 export 无关

  1. 按照当前语法在当前模块声明名字
  2. 添加一个当前模块被目标模块的依赖项

⭐ 处理 export/import 语句的全程，没有表达式被执行 => 这也是为什么说其静态化的原因

### 导出名字与导出值的差异

- 有个问题出现了， 既然export其并不会执行任何表达式。

  那么当你导出一个匿名函数的时候，这个函数仅有 default 这个特殊的名称

  ```js
  # 导入导出阶段 express完全不执行
  export default <expression>
  ```

- 在静态装配阶段，名字“default”只是被初始化为一个“单次绑定的、未初始化的标识符”

  ```js
  # 假设上便是如此
  export default function() {}
  
  import var default = function() {}
  ```

- 具名函数作为表达式值的时候，名字在块级作用域无意义

  ```js
  var x = function aaa() {}
  # 此时 aaa 不会在当前作用域登记为名称的
  ```

### 总结

1. 函数声明

   fn 是一个由函数声明创建的函数

   ```js
   function fn() {}
   
   function () {} ❌ // function 是一个函数声明， 其声明需要名称
   ```

2. 函数定义

   - my 是一个由函数定义创建的函数

   ````js
   # 此时函数 my.name 为 'fn'
   var my = function fn() {} // 右值作为单值表达式,其函数名无意义
   
   # 此时函数 my.name 为 ‘name’
   var my = function () {}

3. 函数表达式

   ```js
   # 这是一个匿名函数的表达式
   (function() {})
   ```

4. export default

   ````js
   #1 导出匿名函数，default被映射到import的名称， 等同于 匿名函数定义
   export default function (){}
   #2 导出具名函数, named 被映射到import的名称， 等同于具名函数定义
   export default function named() {}
   ````

## 05 | 

> for (let x of [1,2,3]) ...：for循环并不比使用函数递归节省开销

