> 前言
>
> 每一样的新技术出现必然是之前技术的痛点。TS的出现也是如此，为了解决类型检测。
>
> 1. ts是js的超集. 始于JS，归于JS
> 2. ts紧随ECMAScript，故支持es6、7、8
> 3. 不仅支持类型约束， 并且语法拓展（枚举类型 + 元组类型 + ...）
> 4. 更加的高效
>    - 静态验证准确， 类型让你【洞察组件接口】与【js库行为】更加便捷
>      - 使用更高效的开发工具、操作方式

## 0 环境

### 01|使用ts-node

- npm install ts-node -g

  依赖包安装: npm install tslib @types/node -g

- tsc-node xxxx

  执行代码

### 02| webpack    

```js
# 创建项目描述文件 - node
npm init
# 安装webpack
npm install webpack webpack-cli -D
```

创建webpack.config.js

````js
const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: path.resolve(__dirname, "./dist"),
    filename: 'bundle.js'
}
````

#### an appropriate loader-ts

you need an appropriate loader to handle this ts file

使用模块化，请配置其对应的loader， 而loader的`自动转换依赖`tsscript

1. loader 

   任何非 js 文件都必须被预先处理转换为 js 代码，才可以参与打包。

   loader（加载器）就是这样一个代码转换器。

2. typescript

   ⭐ 你可以理解为 ts-loader 便是自动执行 typescript的钥匙。

   ts-loader 会调用 typescript（所以本地项目需要安装 typescript），

   然后 typescript 运行的时候会去读取本地的 tsconfig.json 文件.

```js
# npm install ts-loader typescript -D

module.exports = {
    entry: './src/main.js',
    output: path.resolve(__dirname, "./dist"),
    filename: 'bundle.js',
    module: {
        rules: [
            {
                test: '/\.ts$/',
                loader: 'ts-loader'
            }
        ]
    }
}
```

#### error - tsconfig.json

依旧报错，你需要tsconfig.json

you need  tsconfig.json to parsing, 自动生成ts配置

```js
# tsc init
```

#### cannot end with '.ts'

- 由于 tsc init 生成的配置文件其要求我们不许写后缀名
- 故我们需要额外进行extendsion的配置

cannot end with '.ts' extendsion  => cannot resolve './math'

```js
# 请额外配置ts
resolve: {
    extendsion: ['.ts']
}
```

#### npm run build

每一次的 npm run build很麻烦，故应使用 本地服务

```js
# webpack-dev-serve
npm install webpack-dev-server -D
# 配置命令 package.json
"scripts": {
    "serve": "webpack serve"
}

# 安装插件
npm install html-webpack-plugin -D
# 配置模板
plugins: [
    new HtmlWebpackPlugin({
        template: './index.html'
    })
]
# 由于我们使用插件其也必然包含相关的文件，extendsion 不仅仅只有ts、js
resolve: {
    extendsion: ['.ts', '.js', '.cjs', '.json']
}
npm run server ✔
```

### 03 | ts-lint

```js
npm install tslint -g
tslint --init
```

### 04 | 库

默认情况下，ts已经有了很多类型

当安装ts时，便会自动帮我们安装一些库。例如

- Math、Date

- DOM API

  

## 1 强弱静动

> 【类型安全角度】 分为强类型与弱类型
>
> 【类型检查角度】分为静态类型与动态类型
>
> 两者毫无关系， 勿要混淆。

-  强类型 与 弱类型 

  1. 强类型： 不允许任意的类型的转换
  2. 弱类型： 允许任意的类型转换

- 静态类型 与 动态类型

  1. 动态类型： 允许类型的动态转换
  2. 静态类型





##  2 数据类型

### 00| 前言

1. 【类型注解】即 :[数据类型]

   ```js
   // 有时候会说 在 js的基础上增加了【类型注解】
   声明标识 标识符 :数据类型 = 赋值;
       let     a :number  = 10;
   ```

2. 数据类型的大小写

   ```js
   # 小写
   let age: number = 100;
   # 大写
   let age: Number = 100;
   ```

   - 大写时为JavaScript中字符串包装类型
   - 小写时为TypeScript中字符串类型

3. 类型推断 => 默认类型注解

   ```js
   let foo = 100;
   foo = '100' ❌ error
   ```

### 01 | number、string与boolean

模板字符串等同于字符串。

### 02 | null、undefined

null 仅是 null 一个值，仅能赋值null

```js
# 开发情况这样几乎没有意义
let n1: null = null; 
let n2: undefined = undefined;

# 此时ts自动帮我们类型推断为【any】
let n1 = null;
```

- ts对 null、undefined 两种缺省值的体现也是鄙夷的

### 03 | symbol

```js
const title1 = Symbol("title");
const title2 = Symbol("title");
const info = {
    [title1]: 'me',
    [title2]: 'you',
}
```

### 04 | ⭐ object

- 方式一

  ```js
  let a: object = {};
  let b: {};
  ```

  1. 这种方案存在问题 => 你可以使用【as】进行类型断言

     ```ts
     const info: object = {
         name: 'me'
     }
     
     # ❌ 静态解析 'name' does not exist on type 'object'
     console.log(info.name)
     ```

- 方式二  ⭐但其实当我们指定对象的时候我们更多的希望去指定其下的属性

  ```ts
  # 案例一
  function Point(point: {x: number, y: number}) {
      console.log(point.x);
      console.log(point.y);
  }
  # 案例二
  let b: {name: string} // 指定属性，有且只有一个name属性
  ```

- 可选类型

  ```js
  # 在属性后加问好，表示属性是可选的
  let b: {name: string, age?: number};
  ```

- 【键】的数据类型， 此处也是控制下标类型

  ```ts
  # 拓展: 属性值为string，且是任意类型
  let c: { name: string, [propName: string]: any }
  c = { name: '1', b: 1, c: 1 }
  ```

- 解构赋值

  ```js
  # 解构赋值给与 解构属性新的名称 => 与常见的ts语法开始混乱
  let {a: newName1 , b: newName } = o;
  
  # 故此处你应该如此
  let {a, b}: {a: string, b: number} = o;
  
  # 似乎变得混乱起来了
  function keepWholeObject( wholeObject: { a: string, b?: number } ) {
      let { a, b = 1001 } = wholeObject;
  }
  ```
  
- 索引类型

  ````typescript
  type indexType = {
    [index: number] : string;
  }
  let o: indexType = {
    1: '1'
  }
  ````


### 05 | array

- 类型注解: type annotation, 请给与数组指定`泛型`。

- 指定数组成员的类型

  但由于开发时存在  <div> 这类尖括号故有时候出现babel的编译问题。
  故应使用方式一【元素类型后加[]】， 不建议使用【尖括号形式】。

  【尖括号】即使用【泛型类】的方式并不是推荐， 这并非是两种写法，而是两种语法。

  ```ts
   # ⭐ => 写法一: 元素类型后直接加 []
  	let arr: string[]; // arr = ['1', '2', '3'];
      	arr: number[];
      	arr: any[];
  
  # 不建议 => 写法二: Array<元素类型> => 使用【泛型类】的方式来使用！但开发不建议
  	let arr: Array<number>;
  	let arr: Array<any>;
  ```

### 06 | 字面量
- 常量的限制, 你可以认为他便是常量的限制

  ```js
  let b: "male" | "female";
  ```
  
- 字面量类型的意义

  ````js
  const align = 'left' | 'right' | 'center';
  
  const icon = 'arrow' | 'rectangle' | 'default';
  ````

- 字面量类型的推导

  ```typescript
  type Methods = 'GET' | 'POST';
  function request(url: string, method: Method) {}
  
  # 此时推导 options.method为string类型
  const options = {
      url: 'xxx',
      method: 'POST'
  }
  request(options.url, options.method )
  ```
  
  1. 解决办法
  
     优先第一
  
     ````typescript
     type Request = {
         url: string,
         method: Method
     }
     const options: Request = {
         url: 'xxx',
         method: 'POST'
     }
     ````
  
  2. 解决办法-2
  
     类型断言 => 推荐你这么干！
  
     ```js
     request(options.url, options.method as Method)	
     ```
  
  3. 官方有专门提出
  
     method 相当于 就是 POST类型，即立刻转为字面量类型
  
     `````js
     const options = {
         url: 'xxx',
         method: 'POST'
     } as const
     `````
  
     

###  07 | any

- 相当于对此变量关闭ts检验， 应用场景： 不希望进行类型断言时。

- 能用unknown就别用any。

  ```js
  let a: any = '' || [] || {}
   
  // any类型赋值的时候给赋值任何。并令其也改变
  let s: string;
  let d: any = "any";
  s = d;
  ```

### 08 | unknown

- 未知。类似any。

  ```js
  # 当然可以用 any 但更建议 unknown
  let result: unknown;
  if (flag) {
  	result = foo();
  }
  else result = bar();
  ```

- 你可将其认作做了类型校验安全的`any`

  仅唯一区别:  unknown 赋值是不可以赋给其他类型的值

  ````ts
  let unknown_me: unknown;
   
  let s :number = unknown_me; ❌ 
  ````

### 09 | void

- undefined、null

- 多用于函数返回值类型

- 函数内不写返回值， ts认为其函数返回类型为 void

  ```js
  function sum(a: number, b: number): void {
      return a + b;    ❌ 报错
      return null; 	  ✔
      return undefined; ✔
      return;           ✔
  }
  # 类型推断为 void
  function sum() {}
  ```

### 10 | never

- 多用于函数返回值类型

  即便是any也不可赋予 never

- 永远不会有返回结果  =>  即`你不可以去写 return`

  ```js
  function fn() : never {
      throw new Error('报错');
  }
  function fn() {
      while(true) {}
  }
  
  let n: never;
  ```
  
- 【never】的应用场景

  请注意此时 并没有对 boolean类型进行处理，但你擅自添加了一个类型参数又不处理其。

  ```js
  function hanldeMsg(msg: string | number | boolean) {
  	switch(typeof msg) {
          case "string":
              break;
          case "number":
              break;
          default: 
              # 作用: 不许你擅自添加额外判断，想办法告知你
              # 因为 never 绝不会被赋值， 故此时编译报错
              const check: never = msg;
      }
  }
  ```

### 11 | tuple 元组

tuple是一种ts对js的拓展  

1. 固定长度的数组

2. 多种元素的组合， 并可确定每个下标的的数据类型

   ```js
   # 指定类型
   let tuple: [string, number] = ['string', 10000];
   
   # 当你【越界赋值】时会采用【联合类型】代替 => 联合类型:元组的类型集合
   tuple[2] = true; ❌
   tuple[2] = '1' || 100 ✔
   ```

3. 作用场景

   ```js
   # 数组的弊端
   const info: any[] = ['1', 2, 'ni', true]
   # 你无法保证 info[0]必然是字符串
   const name = info[0].length;
   ```

### 12 | enum

- 枚举类型 => 为数不多的 ts特有类型

- Gender.Male：阅读性大大提高

  ```js
  # 默认情况下，从0开始为元素编号
  enum Color {
    Red,
    Green
  }
  # 你也可以手动的指定成员的数值
  Enum Gender{
      Male = 0,
      Female = 1
  }
  # 若你给予数字，则以数字为初始值。你不需要给另外手动指定
  # 若是其他类型，必须每一个类型都给与手动指定
  
  let i: { name: string, gender: Gender };
  i = {
      name: 'me',
      gender: Gender.Male
  }
  ```

### 13 | 函数类型

1. 函数类型

   - void返回任何类型都可以

   ```typescript
   # 这并非是箭头函数 而是函数类型声明
   type Foo = () => void;
   function callbackTest(fn: Foo) {
       fn();
   }
   callbackTest( ()=> { console.log('1') } )
   
   # 示范一
   const add: (num1, number2) => void = (num1: number, num2: number2) {
       return num1 + num2;
   }
   # 抽离出来
   type AddType = (num1: number, num2: number2) => number;
   const add: AddType = (num1: number, num2: number2) {
       return num1 + num2;
   }
   ```

2. 可选类型必须写在必选类型之后！

   - 必传 => 有默认值 => 可选参数

   ````typescript
   function foo_1(y: number, x?:number,) {}
   
   
   function foo_2(y: number, x:number | undefined,) {}
   # 虽然本质, 你必须显示的传递一个undefined进来
   foo(aa, undefined)
   ````

   

3. 函数形参类型 | 函数返回值类型声明

   - 函数返回值，若你想明确返回类型时再类型声明。

     通常情况可以不写，毕竟可以 type infer, 但便于理解的角度上或许你应该明确返回类型

   ```typescript
   // 函数形参限制
   function sum(a: number, b: number) {
       return a + b;
   }
   
   // 函数返回值的限制
   function sum(a: number, b: number): number | string {
       return a + b;
   }
   
   # 默认参数
   function foo(x: number = 999, y: number = 100){
       return x + y;
   }
   foo(1);
   foo(undefined, 100) // 便会使用 999 + 100
   ```

4. 上下文函数类型

   - 此时可以不需要给其函数参数不给予类型声明，因为可以从 【上下文环境】中推导出来

   ```ts
   arr.forEach(item => {
       console.log(item)
   });
   ```

   第二个示范

   ```typescript
   function calc(n1: number, n2: number, fn: (num1: number1, num2: number) => number) {
       return fn(n1, n2);
   }
   calc(20, 30, (n1, n2) => n1 + n2);
   calc(20, 30, (n1, n2) => n1 * n2);
   ```

5. 剩余参数

   ````typescript
   function sum(num1, ...nums: number[]) {}
   ````

   

### 14 | 联合类型

从现有类型构建出新的类型。我们称呼其为联合类型.

- 使用联合类型时，请对联合类型中的情况深思熟虑。

  ```js
  function printId(id: number | string) {
      # 此时会根据上下文自动推导此时的id的类型
      if (typeof id === 'string') {
          # 根据上下文以 narrow, 缩小类型范围, 以至于符合预期编译。
          return id.toLowerCase();
      }
  }
  ```

- 类型别名

  ts 提出新的标识 【type】专门用于定义 类型别名

  ```ts
  type PointType = {
      x: Number,
      y: Number
  }
  function Point(point: PointType) {
  }
  
  ```

### 15 | 可选类型

- ?:type 便是可选类型。

- 本质： 当一个参数是可选的时候，其表示的是 【类型 | undefined】的联合类型。、

  区别在于语法编译的时候是不是一定要传 undefined => 【类型 | undefined】明确指定。

  ```js
  let b: {name: string, age?: number}; // let b = {name: '123'}
          
  function fn(msg?: string) {}; // fn();
  ```

### 16 | 交叉类型

```ts
# 【或】
let i: string | number;
let me: 1 | 2 | 3 | 4;

# 【与】 符号
let j: string & number; //  毫无意义
let o: {name: string  } & {age: number } => o = {name: '1', age: 19}  ✔
```

## 3   interface

> 1. interface 只是为了解构数据， 对接口成员做出规范。
>
> 2. 面向接口编程并不是很常用在 JS， 我们往往是面向函数式编程。
> 3. 我们常用interface 来规范对象类型

```ts
#1 示范
interface Post {
    title: string
    content?: string
    readonly readonlyComment: string // 声明后变不可以修改
}

function printPost (post: Post) {}

const obj: Post = {title: 'str', content: '1' }

#2 示范
interface Cache {
    [prop: string]: string
}
const cache: Cache: {}
```

### 3.1 索引类型

- JS知识： 即使用【number】进行索引等价于使用【string】索引

  ⭐ js没有真正的数组，数组的实现仅是通过哈希表的实现仅此而已。

  ````js
  arr[0] 即 arr['0']
  obj['0']访问原理便是与arr[0] 无差别=> 都是计算偏移量通过查找数组
  ````

  

- 0、1、2虽然是数字索引， 但会被转为字符串。 ts会将其推导为 string。

  ````typescript
  # o
  const o = {
      0: '1',
      1: '',
      2: '',
      'abc': ''
  }
  ````

- 请注意

  1. ts支持两种索引类型， number 与 string。

  ```typescript
  interface IndexType {
      [index: number]: string
  }
  const hp: IndexType = {
      0: "HTML",
      1: "HELLP"
  }
  ```

### 3.2 函数类型

- 建议还是使用 【类型别名】阅读性更好

````typescript
# 1 普通的注解
function calcFn(num1: number, num2: number, calc: (n1: number, n2: number) => number {
    return calc(number1 + number2);
})
# 2 类型声明
type CalcType = (n1: nunmber, n2: number) => number
function calcFn(num1: number, num2: number, calc: CalcType {
    return calc(number1 + number2);
})
# 3 这属于声明抽象类 是对【对象】 而不是通过interface 来定义函数类型
interface CalcFn {
    calc: (n1: number, n2: number) => numebr;
}
const info: CalcFn = {
	calc: function(n1: number, n2: numebr2) {
        return n1 + n2
    }
}
# ⭐
interface CalcFn {
    # 此处代表一个可调用的接口
    (n1: number, n2: number): number;
}
const add: CalcFn = (num1, num2) => {
    return num1 + num2;
}
function calc(num1: number, num2: number, calcFn: CalcFn) {
    return calcFn(num1, num2);
}
calc(20, 30, add)
````

### 3.3 接口的继承

实现类似【联合继承】

````typescript
interface ISwim {
    swimming: () => void
}
interface IFlyt {
    flying: () => void
}
interface IAction extends ISwim {
    
}
# 继承
const action: Iaction = {
    swimming() {}
    flying() {}
}
````

### 3.4 交叉类型

````typescript
# 联合类型
type WhyType = number | string
type Direction = "left" | "right" | "center"

# 交叉类型
interface Swim {
    swimming: () => void
}
interface Fly {
    flying: () => void
}
type Mytype_1 = Swim & Fly;

const obj: Mytype_1 {
    swimming() {},
    flying() {}
}

````

### 3.5 接口的实现

1. 继承： 只可实现单继承
2. 实现： 实现接口，类可以实现多个接口

````typescript
class Fish extends Animal implements ISwim, IEat {
    swimming() {}
    eattting() {}
}

# 当我们编写公用接口时 => 面向接口编程
// ❌ 不具有通用性 并不是只有【Fish】才会游泳
function swimAction(swimable: Fish) {
    swimable.swimming();
}
````

3. 接口

   ⭐ 使用【类】去实现【接口】，一个类是可以实现多个接口的。更具备通用性。

   `````typescript
   function swimAction(swimable: Swim) {
       swimable.swimming();
   }
   # 当我们编写公用接口时 => 面向接口编程
   class Person implements ISwim {
       swimming() {}
   }
   swimAction(new Person());
   `````

### 3.6 interface与type区别

> 若涉及的对象确实不需要拆分、合并，依旧还是建议你使用interface。
>
> 大多数情况下根据你的个人爱好。若你真的需要官方建议，那就要用【interface】吧。

1. 定义非对象类型推荐使用 【type】

2. 若定义对象类型

   - 【interface】可重复对某个接口来定义属性与方法

     ````typescript
     interface IFoo {
         name: string
     }
     interface IFoo {
     	age: number   
     }
     
     # 此时你必须要同时由 【name】 与 【string】
     const foo: Ifoo {
         name: '1',
         age: 100
     }
     ````

     1. 为什么我们要分开写【interface】呢？

        ````typescript
        interface Window {
            age: string
        }
        # 这样 window.age 才可以正常
        window.age = 19;
        ````

   - 【type】定义的是别名，而别名是不可重复的。

     ```typescript
     ❌ # duplicate type 
     type Window {}
     ```

### 3.7 擦除

> 本质上是
>
> 1. 对象【引用】的赋值
> 2. 对象【值】的赋值

请看如下的这个例子

````typescript
interface IPerson {
    name: string,
    age: number,
}
# 此处多定义 address
const person = {
    name: '1',
    age: 19,
    address: '广州'
}
# 居然编译不报错?
const p: IPerson = person;
````

1. 通常情况下，编译报错的原因

   通常情况下， 直接将【字面量赋予】赋值。

   右侧【字面量】类型推导： 便是拥有这三个属性的对象

   故 两个类型推导错误，此时编译不通过。

   ````js
   ❌ # 编译不通过
   const p: IPerson = {
       name: '1',
       age: 19,
       address: '广州'
   };
   ````

2. 为何编译不报错？

   回到我们的请看，若将给【p】类型声明【IPerson】，将 【字面量】保存于【标识符】中再赋值给p

   - 【对象引用】赋值会进行`refes`的【擦除】操作。

     ⭐ person 是一个对象类型。person 赋值于 p，即将person这个【对象引用】赋予给p【标识符】。

   - 【擦除】

     擦除掉【多余的属性】， 看你是否还是满足类型声明。

     ````typescript
     const p: IPerson = person;
     ````

3. 为何ts提供了这种【擦除】语法？

   因为剔除多余的属性，并不会导致有出乎意料的事情的发生。 

   ````typescript
   printInfo(p);
   function printInfo(p: IPerson) {
       console.log(p.address) # ❌ 不许你这么做
   }
   ````

   

## 4 class

### 4.1 基本使用

> 使用之前也需要对this的属性来声明

```ts
class Person {
    name: string
    age: number 
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    sayHi(msg:  string): void {}
}
```

- 若你的属性并不需要constructor中传参你也可以使用这种初始化方案

  ````ts
  class Person {
      name: string = 100;
      constrctor() {}
  }
  let p = new Person()
  ````

### 4.2 成员访问修饰符

> 控制访问的级别, 他们是结合ES6使用的.

#### public

public 默认便是 public 

#### private 

private 私有的。只有【类内部】与【子类】可以访问。

#### protected 

protected 受保护的。 只有【类内部】可以访问的。

````typescript
class Person {
    public name: string = '123';
    private age: number = 18;
    protected gender: boolean = true;
}
````

#### readonly

只读属性可在构造函数内赋值， 但赋值以后不可再修改

- 属性本身不可修改，但本身是对象属性，其对象属性可修改。参考【const】。

  ````typescript
  class Student {
  	private readonly name: string
      person?: Person
      constructor(name: string, person: Person) {
          name = name;
          this.person = person;
      }
  }
  # 但这样是可以修改的
  p.friend && p.friend.age = 30;
  ````



#### getter and setter

- 访问器修改。

- 请搭配【私有属性】来使用【访问器】

  ````typescript
  class Person {
      private _name;
      constructor(name) {
          this._name = name;
      }
      set name(val) {
          this._name = val;
      }
      get name() {
          return this._name;
      }
  }
  ````

#### static

- 类方法 、类属性

- 仅是静态的，代表公有的不改变的。例如所有学生都是人类。

- 可直接通过类直接访问到，无需实例。

  ````typescript
  class Student {
      static type: string = 'person';
  }
  Student.type;
  ````

- 结合static你可以实现一些特别

  ````typescript
  class Student () {
      private constructor() {
          xxxxx
      }
      static create () {
          return new Student();
      }
  }
  ❌ let s = new Student()
  ✔  let s = Student.create();
  ````

  

### 4.4 接口

> 官方意见： 你可以自由的选择，但一定要我给一个意见的话，perfer to [interface]

- 为什么要有【接口】？

  开发过程中我们通过【类型别名】来抽离, 

  ```typescript
  type IntoType = {
      name: string,
      age: number
  }
  const info: InfoType = {
      name: '1',
      age: 18
  }
  ```

- 现在，我们可以通过【interface】来替代这种手段

  ````typescript
  interface EatAndRun {
      eat (food: string): void {}
  }
  
  interface Run {
      run (distance: number): void {}
  }
  
  class Person implements Eat, Run {
      eat(food: string): void {}
  	run(distance: number): void {}
  }
  ````

  

### 4.5 抽象类

> 实际开发中，实现多态的过程中，
>
> 父类并不是总是一定要对某些方法来进行具体的实现。故抽象类便诞生了。
>
> 举例： 计算图形的面积。 图形有分各种类型。但图形本身计算面积的方法便不需要具体实现。

- 行⭐ 请注意

  1.  抽象函数的前提你是一个抽象类 （约定子类一定要有一个 此抽象类型的成员）
  2. 抽象函数不可以实例化
  3. 子类必须实现抽象函数中的抽象方法

  ````typescript
  # 动物本身就是一个抽象概念 动物
  abstract class Animal {
      eat (food: string): void {
          console.log('eat' + food)
      }
      abstract run(distance: number): void
  }
  
  class Dog extends Amnimal {
      run(distance: number): void {
          console.log('run' + distance)
      }
  }
  ````

- 为什么要有一个抽象类？

  1. 第一个场景

     makeArea函数传入类型不能保证必须有getArea其方法

     `````typescript
     # shape存在安全隐患
     function makeArea(shape: any) {
         return shape.getArea();
     }
     
     class Circle {
         r: number
         constructor(r) { this.r = r }
         getArea() {
             return this.r * this.r * 3.14;
         }
     }
     makeArea(new Circle(100));
     `````

  2. 修复场景一

     - 保证了 其传入类型 必然有【getArea方法】

       ````typescript
       function makeArea(shape: Shape) {
           return shape.getArea();
       }
       class Shape extends {
           getArea() {}
       }
       class Circle extends Shape {}
       makeArea(new Circle(100))
       ````

     - 存在缺陷: 

       ````typescript
       makeArea(new Shape())
       ````

  3. 解决缺陷 => 抽象类、抽象方法

     ````typescript
     abstract class Shape {
         abstract getArea()
     }
     # ❌ 此时不可以再这样 因为抽象类不能被New
     makeArea(new Shape())
     ````

### 4.6 继承

````typescript
class Person {
    name: string
    age: number
    studying() {
    	
    }
    constuctor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
class Student extends Person{
	studying() {
        # 若重写但又想去使用其父类 
    	super().studing();
    }
    constructor(name: string, age: number) {
        super(name, age);
    }
} 
let s = new Student('hp', 18);
````

### 4.7 多态

- 本质是 

  1. const animal1: Animal = new Dog()
  2. const animal2: Animal = new Fish()

  父类对象（类型）指向子类对象， 这便是多态的体现！

- 实际场景

  ````typescript
  # 【动物】【鱼】【狗】皆有run方法
  Dog extends Animal
  Fish extends Animal
  function makeAction(animals: Animal[]) {
      animal.forEach(item => {
      	animal.run(); 
      });
  }
  makeAction([new Dog(), new Fish()]);
  ````

## 5 ⭐ 泛型

> 定义函数、接口或类时我们不指定类型，调用时再指定类型
>
> 1. 泛型便是在外部将参数类型参数化
> 2. 并让调用者在外部以参数的形式告知我们这些参数
>
> 目的： 最大程度复用代码。
>
> - 泛型为何重要？ 因其在【函数式编程】中发挥很高的作用。

````typescript
# 缺点 智能创建 Array<number>类型
function createNumberArray(length: number, value: number): number[] {
    const arr = Array<number>(length).fill(value);
    return arr;
}

function createArray<T> (length: number, value: T[]) {
    const arr = Array<T>(length).fill(value)
    return arr;
}
````

### 01 | 何为泛型

从【软件工程】说起，软件工程希望你明确和一致的API，使得代码复用性高。

1. 例如封装函数，通过传入不同的函数参数，使得函数完成不同操作。

   ````typescript
   sum(19, 30);
   sum(30, 40, 50)
   ````

2. 函数的参数类型是否也可以参数化呢？

你当然可以使用【联合类型】来去解决这个【函数参数的参数化】，但问题在于

1. 但联合类型也是存在共性的。你总是需要单独的判断，这让代码十分的不友好。

   并且联合类型会越来越长，因为函数并非只有一个函数参数，每一个参数皆有参数类型。

2. 我们希望是【调用者】来告知我们是什么函数参数类型

故泛型即【函数的参数化】

### 02 | 邂逅

- 【Type】 可简写为 【T】

````typescript
function sum<Type>(num1: Type): Type {
	return num1;
}
````

1. 明确的传入类型

   ````typescript
   sum<number>(20, 30)
   sum<{name: string}>({name: 'hp'});
   sum<any[]>(["abc"])
   ````

2. 自动进行类型推导

   ````typescript
   // 自动推导 Type 为 59; 为字面量类型
   sum(59); 
   // 字面量类型 "111"
   sum("111")
   ````

3. 可接受多个类型

   若你希望泛型使用多个类型

   ````typescript
   function foo<T, E, O>(arg1: T, arg2: E, arg3: O) {
       
   }
   foo<number, string, Boolean>(19, "abc");
   ````

### 03 | 泛型常用的名称

这些名称是随便起的，不过约定俗称罢了。

- T 即 Type
- K 、V 即 Key、Value
- E： Element
- O：Object

### 04 | 泛型接口

> 过去在定义接口时，是否也可以使用泛型呢？

````typescript
interface IPerson<T1 = string, T2 = number> {
	name: T1
    age: T2
}
const p: IPerson<string, number> = {
    name: 'hp',
    age: 18
}

# ❌ 此时不能进行类型推导
# 除非你接口进行了默认类型赋值，否则编译不通过
const p: IPerson = {
    name: 'hp',
    age: 18
}
````

### 05 | 泛型类

````typescript
class Point<T> {
    x: T
    y: T
    z: T
    constructor(x: T, y: T, z: T) {
        this.x = x
        this.y = y
        this.z = z
    }
}

# 类型推导
p: Point<string>
const p = new Point("1.32", "2.22", "333.33")
# 你也可以明确指定
const p2 = new Point<string>("1.32", "2.22", "333.33")
# 你还可以这样！
const p3: Point<string> = new Point("1.32", "132", "1");
````

1. 那显然数组也会有这种写法

   但不建议这种写法，还是因为解析问题。

   ````typescript
   const p3: Point<string> = new Point("1.32", "132", "1");
   
   # ⭐ 但开发不推荐！
   const arr: Array<any> = new Array([1, 2, ,3])
   ````

### 06 | 泛型的类型约束

> `extends`
>
> function getLength<T extends ILength>(arg: T) {}

我们使用联合类型的时候存在缺陷，我们很难考虑到所有联合类型的情况。

故我们使用【泛型】会更加合适。

````typescript
function getLength(arg: string | number | [] | { length: number } ) {
    return arg.length;
}
# 存在缺陷
function getLength<T> (arg: T) {
    return arg.length
}
````

依旧存在问题，其不一定存在 length属性。故我们使用一种泛型约束手段来优化。

⭐ extends

````typescript
interface ILength {
    length: number;
}
function getLength<T extends ILength>(arg: T) {
    return arg.length;
}
````



## 6 类型声明

> 当前引用外部方法时候，若并非是ts版本
>
> declare 引入普通JS模块！
>
> 不过一般而言大部分都有对应的typescript模块，注这种文件只是进行类型的声明，依旧需要下载原有文件。

```js
import { camelCase } from 'loadsh';
declare function camelCase (input: string): string
const res = camelCase('heloo!');
```



## 7 类型断言

- 使用场景

  ⭐ 将一个【广泛的类型】定义成更加【具体的类型】

  你可以告诉解析器 实际的变量类型。类似于 eslint的注释忽略。

- 有时候你需要获取到一些的类型，但是ts就是无法知道其类型

  ```js
  // 此时 el 为 HTMLElement
  const el: HTMLElement = document.querySelector('#app');
  
  // 但
  <img id="app"/>
      
  # 这是 HTMLImageElement, HTMLElement的类型太过于广泛, 
  ❌  el.src = 'xxx'
  
  # 故我们需要额外的类型断言
  const el: HTMLElement = document.querySelector('#app') as HTMLImageElement;
  el.src = 'xxx'
  ```

- 通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。

  ```js
  let e: unkown = '111';
  let str: string = e as string;
  ```

### 01| 尖括号语法

```js
# 方式一 “尖括号”语法 看起来尖括号语法更加的简洁, 不过慎用尖括号
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

### 02| as语法

```js
# 方式二 使用as语句
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

# 了解即可。切勿这样做。
let str: string = 'qwert';
const num: number = ( str as any ) as number
```

### 03| class

⭐ 宽泛的类型转为更加具体的类型, 才可以使用更加具体类型的属性、方法

```typescript
class Person() {}
# 多态
class Student extends Person {
    studing() {}
}

function sayHello(p: Person) {
    // p 虽然是
    (p as Student).studing()
}
sayHello(new Student());
```

### 04| 非空类型断言

```typescript
msg?: string =>  msg: undefined | string
function printMsgLength(msg?: string) {
    # 此时代码是不予通过的
    console.log(msg.length);
}
printMsgLength('heheheheheheheheheheh')
printMsgLength()
```

- 类型缩小

  ```js
  # 类型缩小 => 排除 undefined
  function printMsgLength(msg?: string) {
      if (msg) console.log(msg.length);
  }
  ```

- 非空类型断言

  我保证了 msg 一定有值了！我向typescript保证我一定会将msg传入值！

  ```js
  function printMsgLength(msg?: string) {
  	 console.log(msg!.length);
  }
  ```


## 8 类型缩小

> 类似于 type padding === 'numbr'的判断语句, 从而改变ts的执行路径。
>
> 1. 缩小比声明时更小的类型，此为缩小
> 2. type padding === 'number' 我们称呼为【类型保护】

- 常见类型保护、缩小

  1. typeof

     ```typescript
     # 类型保护
     type IDType = number | string;
     # 类型缩小
     function printId(id: IDType) {
         if (id === 'string') {
             # 此时typescript便可以识别出你是一个string类型 并给与对应的智能提示
             id = id.toLowerCase();
         }
     }
     ```

  2. ===、!==

     ````typescript
     # 类型保护
     type Direction = "left" || "right";
     function printDirection(d: Direction) {
         # 类型缩小
         if (d === 'left') {
             # 此时明确类型为 left 类型， 而不是 Direction
             console.log(d)
         }
     }
     ````

  3. instanceof

     时间类型判断显然用instance更符合预期效果

     ````typescript
     function printTime(time: string | Date) {
         if ( time instanceof Date ) {
             return time.toUTCString();
         }
         else return time;
     }
     
     function work(p: Teacher | Student) {
         if (p instanceof Teacher) {}
     }
     ````

  4. in

     ````typescript
     type Fish = {
         # 函数类型
         swimming: () => void,
     }
     type Dog = {
         # 函数类型
         run: () => void,
     }
     
     function walk(animal: Dog | Fish) {
         if ('swimming' in Fish) {}
     }
     ````

     

  5. 等等

## 9 this、重载

### 01. this

> - this是可以被ts默认推导出来的
> - 真实开发复杂很多

- ts可推导

  ````js
  const Person = {
      name: '111',
      eat() {
          console.log(this.name);
      }
  }
  ````

- ts存在推导不出的情况

  ````typescript
  function eat() { console.log(this.name) }
  const Person = {
      eat: eat,
  }
  # 此时报错 => ts无法推导 => 存在各种调用方式
  Person.eat();
  
  # 你
  type thisType = { name: string }
  function eating(this: thisType ) {
      console.log(this.name)
  }
  Person.eat();
  ````

### 02 重载

> 1. 函数名称相同，参数个数不同
> 2. 函数名称相同，参数类型不同

你有这样的一种需求 如下

````typescript
# 这是允许的
function add(a1: number, a2: string) { return a1 + a2 };

❌ # 这是不允许的
function add(a: number | string, b: number | string) {
    return a + b
}
````

1. ts提供了一种函数的重载可以 解决如上问题

   ```typescript
   function add (num1: number, num2: number): number;
   function add (num1, string, num2: string): string;
   
   # 【实现函数】
   function add (num1: any, num2: any): any {
       return num1 + num2;
   }
   const result add(20 + 30);
   ```

2. 函数的重载中，实现的函数不能被直接调用的

   - 按理来说我们实现了一个any的函数，其传入对象也应该是可以实现的,

     但由于没有匹配到重载函数 故不可以调用【实现函数】

   ````js
   #  ❌ No overload matches this call
   add({name: '111'}, {age: 19})
   ````

3. 重载的时候，或许你应该尽量使用联合类型。

##  其他

### 01| ts讲述的变量声明

> ts中额外向我们普及了 es6 语法提供的let、const与之前的var区别。再次看看吧！
>
> 变相了告诉我们为什么 let 声明符是那么的需要。

- `const`是对`let`的一个增强，增强点： 它能阻止对一个变量再次赋值
- let、const 的*暂时性死区*

1. 有些人称此为* `var`作用域*或*函数作用域*

   - var 变量也存在变量提升的能力
   - 这种作用域规则让你多次声明同一变量也不会报错

   ````js
   # 变量 x是定义在*if语句里面*，但是我们却可以在语句的外面访问它
   function f(shouldInitialize: boolean) {
       if (shouldInitialize) {
           var x = 10;
       }
       return x;
   }
   
   f(true);  // returns '10'
   f(false); // returns 'undefined'
   ````

2. 真正的出乎意料 却又合情合理

   > 每次进入环境时，创建了变量的环境，就算作用域代码执行完毕，这个环境和捕获的变量依旧是存在的。
   >
   > var 遵循的是函数作用域。 let 是块级作用域。 
   >
   > 在 下例的 for循环中， var声明的环境只有一个， let 声明进入的环境与循环次数相同。

   - 传给`setTimeout`的每一个函数表达式实际上都引用了相同作用域里的同一个`i`。 

   ```js
   for (var i = 0; i < 10; i++) {
       setTimeout(function() { console.log(i); }, 100 * i);
   }
   
   ```

3. const

   - 即便用const声明的变量，其属性也是可以声明的
   - typescript现在是支持你对对象的属性也限制其只读了。
   - let 与 const的选择时， 也是我们代码根本思想的遵循，我们应该始终遵循`最小特权原则`

### 02 |  !! 与？？

> 并非是ts特有的，而是JS的操作符。

- !!  操作符

- ?? 操作符

  空值合并操作符， 是一个逻辑操作符。

  操作符的左侧是 null、undefined时，返回右侧操作数， 否则返回左侧操作数。

  ````typescript
  const message: string | null = null;
  const content = message ?? '默认值';
  const content = message ? message : '默认值';
  ````

- 此外既然说到 ??

  那么 可选择链你也应该要记住

  由于 可选择链的存在，这条语句不会运行中报错，而是undefined

  ````js
  window.screen.width?.asdaasd; 
  ````

### 03 | 可选链

> ES11（ES2020）提出了可选链。并非是ts提出的特性。
>
> - 可选链使用 可选链 【?.】
> - 当对象属性不存在时，会短路，返回undefined。若存在则继续执行。

- 场景

  ````typescript
  type Person {
  	name: string,
  	friend?: {
          name: string,
          age?: number,
      }
  }
  const p: Person = {
      name: 'hp'
  }
  # name必然存在, 而friend不一定存在
  console.log(
     	# compile error ❌ Object is possibly "undefined"
  	info.friend.name
      # 故使用 【非空断言】 令其编译通过 但这种办法实在愚蠢， 头疼医头而已
      # 逃过编译 运行依旧 error
      info.friend!.name
  )
  ````

- 解决办法:

  1. 土办法

     ````js
     if (info.friend) {
         console.log(info.friend.name);
     }
     if (info.friend && info.friend.age) {
         console.log(info.friend.age);
     }
     ````

  2. ⭐ 可选链

     - 既可以令其编译通过
     - 又可以让运行期不报错

     ````js
     // 若 friend 存在取 friend.name
     // 若 friend 不存在即 undefined
     console.log(info.friend?.name);
     // 可以不写, 虽然可选, 但必然是 [Object].age
     console.log(info.friend?.age);
     console.log(info.friend?.age.girlfriend?.name);
     ````



### 04 | 命名空间

> 【namespace】
>
> 一个模块的内部再进行作用域的划分，进而防止命名冲突的问题。
>
> 1. ts的模块化是在esModule的模块化之前而提出的，更多的是过去的方案
> 2. 更加建议你不去使用命名空间，而去使用不同的函数名称

示范：

````typescript
# 【export】 目的是在外部模块去使用
export namespace time {
    # 【export】在当前模块划分使用
    export function formate(time: string) {
    	return '2020'
	}
}

export namespace number {
    export function formate(num: number) {
        return 100;
    }
}
time.format('1000');
````

### 05 | 类型查找

> ⭐ TS如何知道哪些类型可用？这些类型来自于哪里？TS是如何管理他们的？
>
> 1. 内置类型声明: 安装typescript便自动伴随
> 2. 外部定义类型声明： 第三方库携带 .d.ts
> 3. 自己定义类型

1. typescript中使用其他的库

   使用 loadsh的库，编译错误且运行也会报错

   ````typescript
   import lodash from 'lodash';
   ````

2. 为什么第三方库不可使用？

   - TypeScript是否有提前声明决定这些库是否可以使用。

   例如  document.getElementByID 编译通过。

   是因为TS知道有Document类型，即而ts自带库才通过编译。而  hp.getElementById显然不可使用。

3. 为什么 有的可用？有的不可用？

   > .d.ts文件： 类型声明、类型检测。即告知typescript我们还有哪些类型。

   1. 内置类型声明

      【lib.dom.d.ts】等等。安装ts时候一起安装的。

   2. 外部定义类型声明

      【axios】其下有index.ts文件。第三库本身便有类型声明，故可使用。

      【lodash】则没有类型声明。故而无法使用。

      - 此外社区有公开库来存在类型声明文件，并不一定就在自己本身库中存放.

        https://www.typescriptlang.org/dt/search?search=

      - 比如 loadsh库，别人或官方帮其编写好了声明文件

        ````js
        npm i @types/lodash --save-dev
        ````

      - 若第三方库还是没有呢？ 自己编写。

        创建【xxxxx.d.ts】文件

        ````typescript
        # 你可以去调用 loadash.join了
        declare module 'lodash' {
            export function join(arr: any[]): void;
        }
        ````

   3. 自己定义类型

      即我们自己编写的ts文件

4. 何我们自己需要使用外部定义类型声明？

   - 当 你在【index.html】中引入了相关的 JS 文件、声明相关变量时，你应该主动声明模板

     ````typescript
     declare let whyName: string;
     declare let windowName: string; 
     ````

   - 当你引入一张文件模块时

     ````typescript
     # 某ts文件
     import img from './img/nh.jpg ';
     # 某.d.ts文件
     declare module '*.jpg'
     declare module '*.png'
     # .vue文件声明
     declare module '*.vue' {
         import { DefineComponent } from 'vue'
     }
     ````

   - 声明命名空间

     ````typescript
     declare namespace ${
         export function ajax(setting: any) {} 
     }
     $.ajax
     ````
     
     
   

### 06 | 【仅仅导入】与【导出声明】

> ts重构js的导入语法，故你可以导出类型.
>
> 本质： 仅仅是导入省略。在通常情况下，这种行为都是比较好的。但有时候会很糟糕。

- 示范

  ````typescript
  export interface Options {}
  ````

- 缺点

  有时TS会混淆导出的是【类型】还是【值】.

  ````js
  ❌ # ts编译选项也会告知我们无法编译
  import { Hello } from './hello.ts'
  export { Hello };
  ````

  TypeScript 导入省略将会去除只包含用于类型声明的导入语句

  ```typescript
  # 因仅是导入类型声明，故会被去除。
  import { SomeTypeFoo, SomeOtherTypeBar } from './module-with-side-effects';
  # 使用者将会不得不添加一条额外的声明语句，来确保有副作用
  import './module-with-side-effects';
  ```

  一个更加经典的示范，来诠释这句话

  - TS总是会省略【只包含】【类型声明】的【导入语句】，令其副作用无效。
  - 【导入省略】 仅是 【仅仅导入】

  ````typescript
  // ./service.ts
  export class Service {
  }
  # services 需要在全局在注册
  register('globalServiceId', Service);
  
  
  # 导入的Service仅是用于类型声明，故关于 【service.js】文件的全局注册代码不会被执行
  import { Service } from './service.js';
  inject('globalServiceId', function(service: Service) {
    // do stuff with Service
  });
  ````

#### 解决方案

1. import type

   ts的3.8提出来【import type】语法来强调【仅仅导入】这一个语法。

   - 仅仅导入被用于类型注解或声明的声明语句，它总是会被完全删除，因此在运行时将不会留下任何代码。
   - export type 仅仅提供一个用于类型的导出，在 TypeScript 输出文件中，它也将会被删除

2. importsNotUsedAsValues

   一个新的编译选项可告知编译器，它可以来控制没被使用的导入语句将会被如何处理。

   - `remove`，这是现在的行为 —— 丢弃这些导入语句。这仍然是默认行为，没有破坏性的更改
   - `preserve`，它将会保留所有的语句，即使是从来没有被使用。它可以保留副作用。
   - `error`，它将会保留所有的导入（与 preserve 选项相同）语句，但是当一个值的导入仅仅用于类型时将会抛出错误。如果你想确保没有意外导入任何值，这会是有用的，但是对于副作用，你仍然需要添加额外的导入语法。

