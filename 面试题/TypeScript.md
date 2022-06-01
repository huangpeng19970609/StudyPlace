### 1 interface与type的区别

1. extends

   type使用【&】实现类型继承一个type的效果

   interface使用extends一个【interface】或者【type】实现继承

2. 面向类型

   interface是作为对象、函数的规范

   type则是基本类型、对象、函数都可以

3. 语法的声明

   多次声明interface会合并interface为一个

   多次声明type是被禁止的，仅许一个type

4. 你可以使用type，使用【in】映射类型

   ````typescript
   type keys = 'a' | 'b'
   type myType = {
       [key in keys]: string
   }
   # bingo
   const test: DudeType = {
     a: "Pawel",
     b: "Grzybek"
   }
   ````

### 2 泛型

> 1. 什么是泛型？
> 2. 常用泛型的名称（约定俗成）

- 什么是泛型

  函数参数的参数化，泛型是在操作函数的类型，将类型看作值，从而对类型进行编程。

- 常用泛型的名称

  T、O、K、E

- 实现

  站在ts的角度上来看，是通过传递类型<T>，从而链式的传递给后面的参数类型

