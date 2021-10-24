

#### 1 强弱静动

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

  

  

####  2 基本类型

##### 1 number

##### 2 string

##### 3 boolean

##### 4 object

- 方式一

  ```js
  let a: object = {};
  let b: {};
  ```

- 方式二  ⭐但其实当我们指定对象的时候我们更多的希望去指定其下的属性

  ```ts
  let b: {name: string} // 指定属性，有且只有一个name属性
  
  # 在属性后加问好，表示属性是可选的
  let b: {name: string, age?: number};
  
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

  

- 函数 => 用箭头函数形式定义 函数对象的形式

  ```ts
  let f: (a: number, b: number) => number;
  d = function (a: number, b: number) {
      return a + b;
  }
  ```

##### 5 array

- 指定数组成员的类型

  ```ts
  # 元素类型后直接加 []
  let arr: string[]; // arr = ['1', '2', '3'];
      arr: number[];
      arr: any[]; // 虽然不建议你这样做
  
  # 数组泛型 Array<元素类型>
  let arr: Array<number>;
  let arr: Array<any>;
  
  ```

##### 6 字面量
- 常量的限制, 你可以认为他便是常量的限制

  ```js
  let a: 10;
  let b: "male" | "female";
  ```

#####  7any

- 相当于对此变量关闭ts检验

- 能用unknown就别用any

  ```js
  let a: any = '' || [] || {}
   
  // any类型赋值的时候给赋值任何。并令其也改变
  let s: string;
  let d: any = "any";
  s = d;
  ```

##### 8 unknown

- 未知。类似any。

- 你可将其认作做了类型校验安全的`any`

  但 赋值是不可以赋给其他类型的值，而any却可以。

  ````ts
  let e: unknown;
   
  let s :number = e; ❌ 
  ````

##### 9 void

- undefined、空值

- 多用于函数返回值类型

- 函数内不写返回值， ts认为其函数返回类型为 void

  ```js
  function sum(a: number, b: number): void {
      return a + b;    ❌ 报错
      return null; 	  ✔
      return undefined; ✔
      return;           ✔
  }
  ```

##### 10 never

- 多用于函数返回值类型

- 即便是any也不可赋予 never

- 不会有返回结果 => 即`你不可以去写 return`

  ```js
  function fn() : never {
      throw new Error('报错');
  }
  
  let n: never;
  ```

##### 11 tuple

- typle是一种ts对js的拓展

- 元组： 固定长度的数组

  ```ts
  # 长度为2，且都是string
  let tuple: [string, number];
  
  # 当你越界赋值 会采用联合类型代替 => 联合类型： 元组的类型集合
  tuple[2] = true; ❌
  tuple[2] = '1' || 100 ✔
  ```

##### 12 enum

- 枚举类型

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
  
  
  
  

- 变量示范

  ```js
  let a: number = 1000;
  let b: string = '123';
  ```

- 函数

  ```tsx
  // 函数形参限制
  function sum(a: number, b: number) {
      return a + b;
  }
  
  // 函数返回值的限制
  function sum(a: number, b: number): number | string {
      return a + b;
  }
  ```


#### 3   interface

> interface 只是为了解构数据， 对接口成员做出规范

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

#### 4 class

##### 4.1 基本使用

> 使用之前也需要对this的属性来声明

```ts
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name;
    }
    sayHi(msg:  string): void {}
}
```

##### 4.2 成员访问修饰符

> 控制访问的级别, 他们是结合ES6使用的

1. public 默认便是 public 
2. private 私有的。只有当前类可以访问。
3. protected 受保护的。 只有隶属自己的类是可以访问的。

```ts
class Person {
    public name: string
    private age: number
    protected gender: boolean
}
```

> 构造函数限制

```ts
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
```

##### 4.3 类的只读

```ts
class Student {
	private readonly name: string
}
```

##### 4.4 类与接口

> 约定子类一定要有一个成员

```ts
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
```

##### 4.5 抽象类

> 约定子类一定要有一个 此抽象类型的成员

```ts
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
```

#### 5 泛型

> 定义函数、接口或类时我们不指定类型，调用时再指定类型
>
> 目的： 最大程度复用代码

```js
# 缺点 智能创建 Array<number>类型
function createNumberArray(length: number, value: number): number[] {
    const arr = Array<number>(length).fill(value);
    return arr;
}

function createArray<T> (length: number, value: T[]) {
    const arr = Array<T>(length).fill(value)
    return arr;
}
```

#### 6 类型声明

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



#### 5 技巧

##### 自动初始类型

```js
# 初始赋值一个类型值 => 此时相当于 let a: boolean = true;
let a = true; 
# 若不去初始变量 => 此时相当于 let a: any;
let a; 
```

##### 类型断言

你可以告诉解析器 实际的变量类型。类似于 eslint的注释忽略

- 通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。

```ts
let e: unkown = '111';
let str: string = e as string;
 
# 方式一 “尖括号”语法 看起来尖括号语法更加的简洁
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

# 方式二 使用 as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

- 或许你希望用类型断言做如此事情，但这是错误的

  <img src="C:/Users/admin/AppData/Roaming/Typora/typora-user-images/image-20211024143525928.png" alt="image-20211024143525928" style="zoom: 80%;" />

- 注意

  然而，当你在 TypeScript 里使用JSX时，只有 `as`语法断言是被允许的。

##### 或、与

```ts
# 【或】
let i: string | number;
let me: 1 | 2 | 3 | 4;

# 【与】 符号
let j: string & number; //  毫无意义
let o: {name: string  } & {age: number } => o = {name: '1', age: 19}  ✔
```

##### 类型别名

````ts
let k: 1 | 2 | 3 | 4;

type myType = 1 | 2 | 3 | 4;
let k: myType;
````

##### ？符号

> 可有可无的属性

````js
let b: { 
    age?: number
};

````

#### 6  typescript其他

###### 1 ts讲述的变量声明

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



