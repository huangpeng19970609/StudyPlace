## 类型

1. 什么是类型？

   编程语言提供的对不同内容的抽象，称呼为之类型

   - **不同类型变量占据的内存大小不同**
   - 不同类型的操作不同

2. 类型检查

   **保证对某种类型只做该类型允许的操作**称呼为【类型安全】，【保证类型安全】便是【类型检查】

   - 静态检查

     静态编译时

     1. 对声明的变量指定类型
     2. 对变量的操作要与其对应的类型相匹配
     3. ......

   - 动态检查

     动态执行时候提示

3. 需要【静态类型】们这是必然的

   大型项目的要保证【健壮性】，故需要【静态类型】们这是必然的

## TS类型编程为什么要类型体操？

1. 类型检查

   TS给与JS添加了静态类型系统，通过TS Compiler编译为JS，其编译的过程称为【类型检查】。

   这是称呼为TS为JS的超集的原因

2. 类型系统

   - 简单的类型系统

     类型不匹配则报错，故即便是整数、浮点型也是需要声明两个函数的

     ```js
     int add(int a, int b) {
         return a + b;
     }
     
     double add(double a, double b) {
         return a + b;
     }
     ```

   - 泛型的类型系统

     我们提出一种想法，是否可以给函数传入 类型的参数，让其更加灵活呢？

     声明时候把【会变化的类型】声明为一个【泛型】，在调用时再确定类型。

     ```js
     function getPropValue<T>(obj: T, key): key对应的属性值类型 {
         return obj[key];
     }
     ```

   - ### 类型编程的类型系统

     我们希望更加灵活的处理 【类型参数】。

     对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是【类型编程】

     ```js
     function getPropValue<
         T extends object,
         Key extends keyof T
     >(obj: T, key: Key): T[Key] {
         return obj[key];
     }
     ```

## 类型 & 类型运算

### 1.  类型

1. 元组

   每一个元素的长度与类型都固定的数组类型

   ```js
   type tuple = [number, string]
   ```

2. 接口

   描述函数、对象和构造器

   - 对象

     对象又可以称呼其为【索引类型】

     https://juejin.cn/book/7047524421182947366/section/7048281149034102823

     ```ts
     interface IPerson {
         name: string;
         age: number;
     }
     class Person implements IPerson {
         name: string;
         age: number;
     }
     const obj: IPerson = {
         name: 'guang',
         age: 18
     }
     ```

   - 函数

     ````ts
     interface say() {
         (name: string): string
     }
     ````

   - 构造器

     ````ts
     interface PersonConstructor {
         new (name: string, age: number): IPerson;
     }
     
     function createPerson(ctor: PersonConstructor):IPerson {
         return new ctor('guang', 18);
     }
     ````

     





































