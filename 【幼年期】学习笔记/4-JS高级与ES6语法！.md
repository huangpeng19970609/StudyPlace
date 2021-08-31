------

[TOC]

# **JavaScript高级与ES6语法**

# 一、重新整理

| 1、类、prototype、ES5提供的新的遍历方法                      |
| ------------------------------------------------------------ |
| 2、ES6有哪些变化？  这很重要！ let、const、解构函数、箭头函数、剩余参数、模板字符串、拓展运算符 |
|                                                              |
|                                                              |
|                                                              |
|                                                              |
|                                                              |
|                                                              |
|                                                              |
|                                                              |



1、

- 类

ES6增加了类的概念（class）、 类的共有属性放到 constructor 里面， 

new 生成实例时,就会自动调用这个函数，如果我们不写这个函数,类也会自动生成这个函数

- prototype

构造函数通过原型分配的函数是所有对象所共享的。

对象都会有一个属性 __proto__ 指向构造函数的 prototype 原型对象

- ES5新的遍历方法

  ```js
   arr.forEach(function(value, index, array) {
         //参数一是:数组元素
         //参数二是:数组元素的索引
         //参数三是:当前的数组
   })
    //相当于数组遍历的 for循环 没有返回值
  -------------------------------------------------------------------
    var arr = [12, 66, 4, 88, 3, 7];
    var newArr = arr.filter(function(value, index,array) {
    	 //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
       return value >= 20;
    });
    console.log(newArr);//[66,88] //返回值是一个新数组
  --------------------------------------------------------------------
  some 查找数组中是否有满足条件的元素 
   var arr = [10, 30, 4];
   var flag = arr.some(function(value,index,array) {
      //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
       return value < 3;
    });
  ```

2、

- let 

```js
最初仅有 局部变量、全局变量、现在我们有了 let  
块级作用域，  所以我们经常在for 循环中使用let，因为值是可变的原因
不再有变量提升、不会受外界影响、

 for (let i = 0; i < 2; i++) {
     arr[i] = function () {
         console.log(i); 
     }
 }
每一次循环都会形成一个 块级作用域

arr[0]();   打印 为 0   			若是var 则都是2，因为i是全局变量，其打印的是i的全局变量
arr[1]();	打印为 1
```

- const   

```js
1、const 也具有块级作用域！！
2、声明常量时必须赋值！！并且基本类型不可以改变值，引用类型不可改变地址，即值不可以修改
```

- 解构函数

  ```js
   let person = { name: 'zhangsan', age: 20 }; 
   let { name, age } = person;
  ```

- 箭头函数，this指向就是上下文！箭头函数this指向的是被声明的作用域里面

- 剩余参数 在声明中就是剩余参数

```js
function sum (first, ...args) {
     console.log(first); // 10
     console.log(args); // [20, 30] 
 }
 sum(10, 20, 30)

----------------


let students = ['wangwu', 'zhangsan', 'lisi'];
let [s1, ...s2] = students; 
console.log(s1);  // 'wangwu' 
console.log(s2);  // ['zhangsan', 'lisi']
```

- 模板字符串

  ```js
  可以调用变量		let sayHello = `hello,my name is ${name}`;
  可以换行
  可以调用函数 		let greet = `${sayHello()} 哈哈哈哈`;
  ```

- 扩展运算符（展开语法），但使用中就是扩展运算符

  ```js
   let ary = [1, 2, 3];
   console.log(...ary);    // 1 2 3,相当于下面的代码
   
   // 方法一 
   let ary1 = [1, 2, 3];
   let ary2 = [3, 4, 5];
   let ary3 = [...ary1, ...ary2];
   // 方法二 
   ary1.push(..ary2);
  ```

- 提供了新的方法

  ```js
  [1, 2, 3].includes(4) // 判断某个数组是否包含给定的值，返回布尔值。
  let target = ary.find((item, index) => item.id == 2);//找数组里面符合条件的值，当数组中元素id等于2的查找出来，注意，只会匹配第一个
  let index = ary.findIndex((value, index) => value > 9); //用于找出第一个符合条件的数组成员的位置，如果没有找到返回-1
  ```

  

# 二、基础语法

## 1、类

```javascript
/创建类
class Star{}
new Star();
class Moon{
     construcor(){
        console.log("hello,Moon")
    }
}
/继承会继承父的属性与方法
class Star extends Moon{
    /构造器
    construcor(uname){
        /调用父的构造函数
        super();//super.say()直接调用父的方法
        console.log("hello,star!")
        this.uname = uname;
    }
	/类的方法
	say（）{
        console.log("hello!");
    }
}
/使用构造器
var name = new Star('刘德华');
console.log(name.uname);



```

## 2、对象与构造器原理

```javascript
/创建对象
new Object();
var object = {--}
function Star(uname,age){
    this.uname = uname;
    this.age = age;
}
var one = new Star('张三','18');
/静态成员、实例成员
Star.sex = '男'则sex便是静态成员，通过构造函数访问
而one.uname,one.age便是实例成员；
//构造函数都有一个prototype属性，指向着另一个对象。其prototype是一个对象，其属性与方法被构造器共享
//故不变的方法，放入原型对象中，共享一个方法
比如：
	Star.prototype.sing = function( console.log("唱歌！"));
	则所有的Star对象皆共享该sing对象
    换句话说：
    ldh._proto_ == Star.prototype 将idh这个对象和类对象相连
    //ldh看一看有没有sing方法，没有那就去_proto_这个对象里看有没有sing方法
其：
	Star.prototype原型对象包含以下：
	1、constructor：Star
    2、sing：function（）{}
	3、dance:function(){}
//则Star.prototype.constructor,Star._constructor.sing = function(){}可以实现修改
```

# 三、ES6语法规范

## 1、let与const

```JavaScript
let
1、let变量关键字  块级作用域//在当前的 {} 中才起作用，可以防止循环变量成为全局变量
2、没有变量提升，故必须先声明再使用。
3、暂时性死区（即块级作用域）
	var tmp = 123;
	if(1 == 1){ 
        //因为该区域存在了tmp，则该tmp便绑定该tmp，而此tmp没有变量提升，故会报错。跟上一级tmp毫无关系
        console.log(tmp); 
        let tmp；
    } 
  简单的面试题：
  var arr = [];
  for(var i=0; i<2; i++){
      arr[i] = function(){
          console.log(i);
      }
  }//到这一步 i为2，便是重写arr[i]的方法，将其变为 2 ；
	arr[0](); 
	arr[1]();
	//若将i = 0改为 let i = 0 呢？
	分析：arr[0] 应是 0 ， 我们调用arr[0]（）这个方法则i的值其实并不存在，因为他只作用在自己的块级，现在已无效，故重写失败，arr[0]还是0；
  ---------------------------
 const
            特点1：内存地址不可更改（值不可更改）
            特点2：也是块级作用域
            特典3：使用时候必须要赋予一个初始值
                const PI = 3.14；
```

## 2、解构赋值

```javascript
数组解构：
	let [a,b,c] = [1,2,3];
对象解构：
	let persion = {name: "xiao",age:18}
    let {name,age} = person;
	let {name:Name,age:Age} = person;
```

## 3、箭头函数

```javascript
语法 const fn = () => {----}
若无参数可以省略（），若函数内只有返回值，可以省略{}
                     //注意箭头函数的箭头指向的是函数定义位置上的上下文this
普通写法：
	function fn(arg1) { return 100}
1、箭头函数
	const fn = arg1 => 100;//只有一个参数可以省略（）
2、关于this的用法
	// 使用临时变量self
    var circle = {
    	radius: 10,
    	outerDiameter() {
    	var self = this;//这个this才是circle对象
    	var innerDiameter = function() {
            /innerDiameter函数中的this是window
            //内层函数innerDiameter并不会继承外层函数outerDiameter的this值
    		console.log(2 * self.radius);
    		};
       		 innerDiameter();
    	}
    };
   // 使用箭头函数
        var circle = {
            radius: 10,
            outerDiameter() {
            var innerDiameter = () => {
            	console.log(2 * this.radius);
            	};
            	innerDiameter();
                /内层函数innerDiameter，它本身并没有this值，其使用的this来自作用域链，来自更高层函数的作用域
                //而外层的outerDiameter是普通函数，它是有this值的，它的this值就是circle对象
            }
        };
        circle.outerDiameter(); // 打印20
 
```

## 4、剩余参数

```javascript
function sum(frist,...args){
    console.log(first);
    console.log(args);/args相当于数组，使用了剩余参数...
}
实例1：
const sum = (...arg) => {
    let total = 0;
    args.forEach(
    	item => {
            total += item
        }
    )
    return total;
}
实例2：
let arr = [1,2,3];
let [s1,...s2] = arr1; 则s2是一个数组放着 2与3

--------------------------------------------
//扩展运算符：即就是用来表示剩余参数的符号
let arr = [1,2,3]; /则 ...ary 便是123;console.log(...arg)也是123；
这种运算的方式：
	1、合并数组
    	let arr =[1,2,3];
		let arr2 = [4,5,6];
		则 let arr 3 = [...arr,...arr2];
		arr1.push(3,4);
		则arr1.push(...arr2);
	2、伪数组进化
    	var li = $('li');
		则这组li元素，[...li] 这样就变成了真正的数组，可以使用数组的方法
```

## 5、数组

```javascript
1、伪数组
	var MY = {
        "0":"零"，
        "1","一"，
        "2","二"，
        "length","3",
    }
    则 var arr = Array.from(MY);则将arr是真正的数组
    var arr = [{id:1,name:"1"},{id:2,name:"2"}]//这样此时真正的数组
2、扩展方法from
	第一个参数未伪数组，第二个参数未回调函数
	Array.from(伪数组，item => item*2);
3、扩展方法 find
	对数组进行遍历，返回当前为true的item对象
    var arr = [{id:1,name:"1"},{id:2,name:"2"}]//这样此时真正的数组
	let target = arr.find((item,index) => item.id == 2);
4、Array下的findindex
	let arr = [1,2,3,4,5,6];
	let index = arr.findindex((value,index) => value>9) 返回的是index！
5、includes是否包含？
	[1,2,3].includes(2);返回true
```

## 6、String扩展

```javascript
1、let可以定义字符串
	let name = '张三'；
2、可解析字符串的值
	let name = 'my name is ${name}';会解析该name的值
3、let可以模仿字符串换行
	let html = '<div>456</div>
    				<div>123</div>'
    //注意他不会解析该html，但如果你在其中换行，他便会换行
4、字符串可以调用函数
	let him = '123 ${fn()}';
5、字符串的新方法！
	let str = '123';
	str.startWidth('1');返回true
	str.startEnd('3');返回true
6、重组显示
	str.repeat(3);将str重复显示3次
```

7、Set数组解构

```javascript
set数组解构的特点：类似数组，成员值唯一；
const s = new Set();
const s = new Set([1,2,3,4]);
s.szie()；可以获得set数组长度
1、方法
	s.add(1);增
	s.delete（2）删除
	s.has（3）查询是否有3这个值
	s.clear()清除所有值
2、取值
s.forEach(value => {
    console.log(value);
})
```

