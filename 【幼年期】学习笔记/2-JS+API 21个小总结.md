[TOC]

# 1、JavaScript+API

| 1、JS语言运行在客户端，是一种脚本语言（不需要编译，只需解释执行），浏览器分为为两部分？ |
| ------------------------------------------------------------ |
| 2、JS分为三部分，哪三部分？                                  |
| 3、JS中存在哪些数据类型？                                    |
| 4、JS中有哪些内置对象？                                      |
| 5、ECMAScript、DOM、BOM、API的关系                           |
| 6、获取元素的方式有哪些？                                    |
| 7、一些常见的基础事件                                        |
| 8、更改元素的内容由 ele.innerHTML()、element.innerText()两者的区别是什么 |
| 9、原生API添加、获得与移除属性值                             |
| 10、以data开头的自定义属性有一种通过data获取全部data开头的方式 |
| 11、节点                                                     |
| 12、三种动态创建元素的区别                                   |
| 13、总结API中的DOM的核心                                     |
| 14、DOM注册事件的方式                                        |
| 15、window由 document、location、navigation、screen、history组成，window一些常用 |
| 16、JS执行队列、H5提出同步异步、                             |
| 17、location、navigator、history                             |
| 18、PC端特效 offset、client、scroll 偏移、可视、滚动         |
| 19、mouseenter 与 mouseover的区别                            |
| 20、事件对象                                                 |
| 21、移动端特效                                               |
| 22、函数有一个内置对象名为 arguments                         |
| 23、JS的执行过程                                             |
| 24、创建变量有哪几种方式？                                   |
| 25、新的遍历方式                                             |

## 1-1、回答：

**1、JS执行步骤：**

​	渲染引擎：内核解析CSS与HTML

​	JS引擎：读取JS代码并解释

-----------------

**2、JS分为三部分，哪三部分？**

​	ECMAScript语法+DOM页面文档对象模型+BOM游览器对象模型

-------------

**3、JS中存在哪些数据类型？**

​	①简单类型：Number、Boolean、String、Undefined、NULL 、Symbol

​	②复杂类型：Object

​	      数字类型中：NaN代表非数字，可使用isNaN（）方法判断是否是非数字

​	      String类型中：使用	\n 换行、\t 缩进一个tab、\b 空格、\\ \即\ 

​	注意null是我们主动给的值，而undefined是声明以后却没有给值导致的。

----

**4、JS中有哪些内置对象？**

​	答：String、Date、Math、Array对象

​		**Math:**

​                    	Math.floor()、Math.ceil()、Math.max()、Math.min()、Math.abs()

​	                    Math.round()是获得一个0-1的随机值。

​	 	 **Data**

​						Data是一个构造函数，必须声明才可以使用，var time = new Date();

​						time.getMonth()、getDate（）、getDay（）、getHours()、getMinutes（）、**getSeconds（）**

​						得到月份、得到日期、得到星期几、得到当前小时、分、秒。

​						注意 月份与星期的取值是0到11、0到6

​		  **Array：**

​					push（参数1，参数2,....）可以在该数组后面添加多个元素

​					pop()删除最后一个元素

​					sort() 对元素进行排序

​					revers()将元素颠倒

**5、ECMAScript、DOM、BOM、API的关系**



JS由 ECMAScript与API 组成，

API是一种开发的接口，API由BOM+DOM组成,。DOM是页面文档模型、BOM是浏览器对象模型。

DOM简单来说一个页面便是一个文档，每一个标签都是一个元素，元素组成了文档，其中将标签、文本、属性、注释都可以看为是节点。



**6、获取元素的方式有哪些？**  

```javascript

1、通过ID名称与标签名获得，了解即可。
	document.getElementByID("XXX");
	document.getElementByTagName("p");
2、html5提供更简单的方式,通过选择器获得最方便
	document.getElementByClassName("类名");
	document.querySelector('选择器');
	document.querySelectorAll('选择器')

```



**7、一些常见的基础事件**

```js

btn.onclick = function(){
	除了最简单的点击事件以外，有如下事件
    鼠标事件 、 焦点 、鼠标触发
	onclick、onmouseover、onmouseout、onfocus、onblur、   onmouseup、onmousedown
	点击事件、鼠标经过时间、	鼠标离开、获得焦点、失去焦点、、鼠标弹起触发、鼠标按下时触发
}

```



**8、更改元素的内容由 ele.innerHTML()、element.innerText()两者的区别是什么**

innerText(“<a></a>”)不会识别html中的元素，不会帮我们转换。并且innerText获值时会去除空格与换行元素，不认识

而innerHTML（）可以帮我们转换。一般我们使用html比较多。而innerHTML会保留其空格换行元素。

**9、原生API添加、获得与移除属性值**

```CSS
element.getAttribute('属性')；
element.属性名
element.setAttribute('属性'，'值')；
element.removeAttribute('属性')；
```

**10、div.dataset.index 获取div标签中属性名是以为data开头的，并且应是data-index属性名的。**

如果是data-list-name ，则应div.dataset.listName 遵循驼峰命名法。注意这个dataset是一个集合！

**11、**

​	**了解便好，nodeType、nodeName、nodeValue**

对于元素节点 nodeType为 1，属性节点nodeType为2，文本节点nodeType为3.

node.parentNode;获得离node最近的父节点

node.childNodes；获得离node所有的子节点（包括换行文本）

node.childNodes[ i ].nodeType 当子节点的nodeType为1时，才是我们需要的元素节

实际使用： ul.children[ 0 ] , ul.children[ ul.children.length-1 ]

```javascript
父节点：
	node.parentNode         
									var erweima = document.querySelector('.erweima');
									console.log(erweima.parentNode);
子节点：
	node.childeNodes
	node.firstChilde       node.firstElementChild
	node.lastEleChild	   node.lastElementChild
	node.children[0] 获取第一个元素节点
    node,children[node.children.length-1] 获取最后一个元素节点

兄弟节点
	node.nextSibling 其包括文本节点与元素节点   node.nexElementSibling
	node.previousSibling 		node.previosElementSibling
	
创建节点:
	document.createElement('TagName');


添加节点:
	node.appendChild(child); 添加父节点
	node.appendTo(parendNode) 

删除节点：
	node.removeChild(child)
复制节点：
	ul.children[0].cloneNode（）;浅复制，不复制标签内的内容
	ul.children[0].cloneNode（true）;深复制
	
```

**12、三种动态创建元素的区别**

```CSS
document.write();			内容流，文档执行完毕后再调用会导致页面重绘的问题。
element.innerHTML();		写入DOM流，不管何时采用数组时候效率是最高的
document.createElement();	结构会更加清楚，但效率比innerHTML低

```

13、DOM的核心

```CSS
创建：
	document.write()、element.innerHTML()、document.createElement()
增加：
	document.appendChild()、insertBefore
删：
	document.removeChild();
查：
	DOM：document.getElementID\getElementByTagName 不建议古老方式
	H5：querySelector\querySelectorAll
	节点：parentNode\children\previousSibling\nextElementSibling
属性操作:
	setAttribute、getAttribute、removeAttribute
鼠标事件：
	btn.onclick = function(){
	除了最简单的点击事件以外，有如下事件
	onclick、onmouseover、  onmouseout、onfocus、 onblur、  onmouseover、onmouseup、   onmousedown
	点击事件、鼠标经过时间、	鼠标离开、  获得焦点、 失去焦点、鼠标移动触发、  鼠标弹起触发、鼠标按下时触发
}
```

14、DOM注册事件

```CSS
相比较 btn.onclick = function(){}只能注册唯一的事件
方法的监听的方式可以注册多个监听器
btns[0].addEventLister('click',function(){})
```

15、window

BOM包含着DOM，其中对于DOM来说顶级文档对象是document

```CSS
1、窗口加载事件（使用该事件就可以将JS写在上面等待加载）
	window.addEventListener("load",function(){});
2、使用该方法，即DOM加载完毕便可以使用其JS（即使CSS加载不成功也可以执行JS方法，速度比load快）
	document.addEvenetListener("DOMContentLoaded",function(){});
3、窗体大小(一旦窗体发生变化，便会触发该事件)
	window.onresize = function(){}
	window.addEventListener("resize",function(){});
	我们常使用window.innerWidth获得当前窗口大小
4、两种计数器
	window.setTimeout(fn,[毫米数])、window.setInterval(fn,毫秒数)
	window可省略
5、停止调用该计时器 
	window.clearTimeout(计时器名称)
	window.clearInterval(计时器名称)
```

16、

> ```css
> 1、最初的JS的执行队列:单线程的，H5帮JS提出同步与异步的概念
> 2、同步与异步
> 	同步任务：主程序执行栈
> 	异步任务：JS的异步通过回调函数实现（放入任务队列） 比如click\resize\load\error\setInterval\setTimeout
> 3、执行过程
> 	一、先执行同步任务
> 	二、遇到回调函数，将回调函数放入 异步进程处理
> 	三、若“回调函数”被触发（点击时间被点击），则放入任务队列
> 4、总结
> 		
> 	JS主程序执行栈      ----->       	 	   异步进程处理
> 		↓								      ↓
> 	主程序执行完毕以后查询“任务队列”			当该任务被触发时
> 	循环查询，若有即调用		←--->	    	放入“任务队列”
> 								
> ```

17、location、navigator、history

```css
location（该窗体的当前url定位）
	location.href() 获得该页面url
	location.assign() 跳转到一个页面
	location.replace() 替换该页面,无历史记录
	location.reload()重载该页面
navigator（游览器对象）
	user-agent属性，返回user-agent头信息
history:
	history.back();
	history.forward();
	history.go(1/-1)1代表前进一个，-1代表后退一个
```

​		18、PC端特效

```css
1、offset
	偏移（比较父元素的偏移），故会会包含其边框视为一个整体
	element.offsetParent 返回带有定位的父元素
	element.offsetTop 	 返回上偏移（以有定位的父元素为准）
	element.offsetLeft 	 返回左偏移(父元素到该子元素的左偏移，跨越了border-left)
	element.offsetWidth  返回宽度(含边框的)，注意一下这个特点，style的宽度是不含边框的
	element.offsetHeight 返回高度（含边框的）
2、client
	便是可视区域，内部区域。内部区域的左边即使边框左，内部区域的宽度即使内部宽度（不含边框）
	element.clientTop
	element.clientLeft	 即border-left的值
	element.clientWidth  不含边框的
	element.clientHegiht 不含边框的
3、scroll
	element.scrollTop		被卷去的头部
	element.scrollLeft		被卷曲的左边部分
	element.scrollWidth		真正内容宽度
	element.scrollHeight	真正内容高度（包括你超出的部分，未卷去的但超出）
4、实际应用
	当我们想知道一个页面头部被卷曲多少时，应使用
		winodw.pageYOffset
	实际使用需记住以下：
		offset:		offsetTop 	offsetLeft 用来获取元素的位置
		client:		clientWidth clientHeight 来获取实际元素的大小
		scroll:		scrollTop				 获取滚动元素实际滚到哪里
```

19、mousenter 与 mouseover 的区别

​	mouseover： 自身以及子盒子都会触发（虽子盒没有事件，但触发子盒时，子盒冒泡到父盒子上）

​	mouseenter： 仅自身会触发，不会冒泡而触发

20、事件对象

```css
div.addEventListener('click',function(e){
    e.target	 返回触发目标
    e.type		 返回事件类型
    e.stoppropogation 停止传播
})
事件委托实例，给父节点加一个事件监听，利用冒泡的原理影响每一节点
	var ul = document.querySelector('#myul');
ul.addEventListener('click',function(e){
   e.target.style.bgcolor = 'pink'; 
});
3、鼠标事件对象
	e.clientX,e.clientY	相对于可视区的鼠标位置（就是当前窗口）
	e.pageX.e.pageY   	相对于文档页面的X坐标
4、键盘事件
	onkeyup			松开触发
	onkeydown		按下触发
	onkeypress		按下触发（但不是识别相关的功能键）
	注意顺便：先按下触发keydown再keypress最后是onkeyup
5、键盘事件的对象
	e.keyCode 有相对应的ASCII码值，其中keyPress能区别大小写，其余不可区分。比如a是97，A是65
6、注意：
	一般会使用keyup触发事件，毕竟当按下时候触发文本其实并没有本写入到里面。
```

21、移动端特效

```CSS
1、三个事件
    touchstart 触摸事件
    touchmove  移动事件
    touchend   移开事件
2、事件对象
	TouchEvent有三个属性：
			touches			所有触摸列表
			targetTouches	当前触摸该Dom元素的手指列表
			changedTouches	状态发生变化改变的手指列表

```

22、

当不确定有多少个参数传递的时候，可以用 arguments 来获取

所有函数都内置了一个 arguments 对象，arguments 对象中存储了传递的所有实参。arguments展示形式是一个伪数组，因此可以进行遍历。

伪数组： 不具有数组的 push , pop 等方法，按索引方式储存数据

23、JS执行过程分为 预解析、代码执行

- 代码执行前，浏览器会先将var 、funcrtion声明的变量在内存中提前申明与定义。
- 代码执行：从上到下执行。

注意： 预解析 也可以叫做变量提升、函数提升。

​	为什么叫做变量提升呢？变量的声明会提升到当前作用域最上方，仅提升声明，不提升赋值。

24、创建变量有哪几种方式？

- ​	花括号、普通的方式
- Object， var a = new Object()
- 使用构造函数方式创建

```js
构造函数约定首字母大写、**不需要 return 返回结果**、**必须用 new 来调用构造函数**。
function 构造函数名(形参1,形参2,形参3) {
     this.属性名1 = 参数1;
     this.属性名2 = 参数2;
     this.属性名3 = 参数3;
     this.方法名 = 函数体;
}
```

25、

```js
for (var k in obj) {
    console.log(k);      // 这里的 k 是属性名
    console.log(obj[k]); // 这里的 obj[k] 是属性值
}
```



# 2、API

|                                                              |
| ------------------------------------------------------------ |
| 1、Array内置对象的方法，字符串如何变为数组？                 |
| 2、节点与元素                                                |
| 3、对元素的属性进行修改的方式？样式修改呢？直接添加事件(写onmouseover全称)？原生添加属性、移除属性、获得 |
| 4、每一个节点都拥有三个属性，哪三个？熟记原生的节点（ 父、子(首、末)、兄、获得、增加、复制） |
| 5、节点的 父、子、兄、创建、删除、复制、添加                 |
| 6、创建元素的三个方法                                        |
| 7、请解释下DOM的事件流                                       |
| 8、如何打印事件对象，说一些他的属性                          |
| 9、鼠标事件对象（获取鼠标位置的三种方式）                    |
| 10、三种常见的 键盘触发事件                                  |

------

1、

```js
var arr = new Array()

push增 pop 删

查询
a.indexOf("2") 查询数组a是否包含 2 ， 若是查到返回位置，若是没有返回 -1
取个数
a.charAt(index) 查找第index个位置上的内容

合并字符串
concat(str1, str2) 连接多个数组

切割str
substr(start, length) 从start开始，拿length个
也是切割，但是根据 start与end切割
slice（star，end）
字符串每一个都用 / 分开，并且再合并一个新的数组
str.split（'/'）
```

2、

​	DOM即document

​	节点： 网页上所有内容，DOM树上所有内容（标签、属性、文本、注释）都用node表示

​	标签节点： 网页中的标签即叫做 元素节点。我们简称了元素

3、

获取元素节点，元素节点 . 属性名

元素对象.属性名 = 值

元素对象 . className = ""  这种方式是覆盖

```js
var img = document.getElementByClassName("myimg")
img.src = "XXXXX"
img.style.width = "250px"
img.className = "myStyle"
img.onouseover = funciton() {} // 这种方式也可以
img.setAttribute("index", "1")	// 添加属性
img.removeAttribute("index")	// 
img.getAttribute（"index"） 	   //获取自定义属性
```

4、

- nodeType \   nodeName \  nodeValue
- nodeType 有1、2、3    对应 元素  属性    文本   三个节点类型，我们一般操作元素节点

一般我们获得都是元素节点，若是想看到节点的详细属性 可以使用console.dir就可以了。

辅助记忆： 

1父节点、

2子节点有获取节点（所有、第一个、最后一个）分为两种 节点与元素

3兄弟节点

4创建节点

5添加节点

6删除节点

```js
1父节点
		parentNode
----------------------------------------------- 
2子节点：
ul.childNodes 
ul.children 
										再细分,这个
                                   ul.firstChild、ul.lastChild	包含了所有节点，不方便
								   ul.firstElementChild、ul.lastElementChild  IE9以上支持
实际开发的办法:	ul.children[0] \ ul.children[ul.children.length - 1]
----------------------------------------------
3兄弟节点
nextSibling			nextElementSibling
previousSibling		previousElementSibling
----------------------------------------------
4
document.createElement('tagName')
-----------------------------------
5
node.appendChild(child)  将childe添加到node上
insertBefore同理
----------------
6删除节点
node.removeChild() 
-----------------
 7复制节点
 括号为true 深拷贝 复制标签复制里面的内容，false不复制内容
    var lili = ul.children[0].cloneNode(true);
    ul.appendChild(lili);
```

6、

```js
document.createElement				结构清晰，但效率不高
element.innerHTML					写入某一个DOM节点，不会刷新效率好
document.write() 					写入页面流，导致重绘
```

7、DOM事件流

DOM下的元素都是嵌套关系的，我们点击一个div，会触发body的点击事件，再出发 html的点击事件

冒泡： 逐级向上传播给DOM顶层的元素事件

捕获：相反

而当下浏览器会经历  先捕获、 当前目标阶段 、 再 冒泡。  这个便是DOM的事件流

但是JS代码只可以执行其中的一个阶段，click事件与attachEvent事件只会冒泡

addEventListener 第三给参数如果你写的话，true就是捕获，默认为false为冒泡

8、事件对象

```js
		var div = document.querySelector('div');
        div.onclick = function(e) {
                // 事件对象
                e = e || window.event;
                console.log(e);
            // 若是触发事件冒泡，this 与 targe可能不一样，因为this的关系，targe永远一样
        }
```

- e.target  事件出发对象
- e.preventDefault()
- e.stopPropagation()

9、记住page、client、screen

```js
<script>
        // 鼠标事件对象 MouseEvent
        document.addEventListener('click', function(e) {
            // 1. client 鼠标在可视区的x和y坐标
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('---------------------');

            // 2. page 鼠标在页面文档的x和y坐标
            console.log(e.pageX);
            console.log(e.pageY);
            console.log('---------------------');

            // 3. screen 鼠标在电脑屏幕的x和y坐标
            console.log(e.screenX);
            console.log(e.screenY);

        })
    </script>
```

10、

根据触发顺序 为 onkeydown    onkeypress      onkeyup

onkeydow按下时触发， onkeypress按下时触发（不识别功能键）  onkeyup松开出发

该事件有事件属性，e.KeyCode ,返回按键的ASCII码值。

------

# 3、BOM

| 1、什么是BOM，顶级元素，bom有哪些对象          |
| ---------------------------------------------- |
| 2、说一下window的常见事件(有两个常用)          |
| 3、两种定时器                                  |
| 4、this的指向                                  |
| 5、location的作用，不要求细分,常用方法有哪些？ |
| 6、navigator是什么？有一个属性呢？             |
| 7、JS的执行机制                                |
| 8、元素偏移量                                  |
|                                                |
|                                                |

1、

- BOM对象模型，顶级元素为Window，核心对象也是window， BOM的标准由浏览器厂商确定

  JS为ECMA、DOM为W3C，BOM没有标准,

- bom可以简单说就window，window下有 document、location 、 navigation、 screen 、history

- 定义在JS全局的变量与函数，都会成为window的属性与方法，但我们调用时可以省略window.比如之前的 window.alert("123")  window.prompt() 都是省略了window

2、

有了window.onload以后就可以把script写在最上面了

```js
window.onload = function() {}
window.addEventListener("load" ,function() {} )
	如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间, 交互效果就不能实现，必然影响用户的体验，此时用 DOMContentLoaded 事件比较合适
 
    是调整窗口大小加载事件,  当触发时就调用的处理函数。我们经常利用这个事件完成响应式布局
    window.onresize 
```

3\

- 可省略 window.setTimeout的window
- setInterval
- clearTimeout(timer);

```js
 var btn = document.querySelector('button');
		// 开启定时器
        var timer = setTimeout(function() {
            console.log('爆炸了');
        }, 5000);
		// 给按钮注册单击事件
        btn.addEventListener('click', function() {
            // 停止定时器
            clearTimeout(timer);
        })
```

4、

全局作用域或者普通函数中this指向全局对象window（注意定时器里面的this指向window）

方法调用中谁调用this指向谁（最经典的就是构造器），构造函数中this指向构造函数的实例

5、

- window提供location对象，通过location可以获得url任意一个参数，具体不记了

```js
protocol :// host[:port] /path   /[?query] #frament
获取他
location.host
location.pathName
location.search 返回参数 重点
location.href 返回URL 这是重点
location.hash
-------------------
location.assign() 相当于重定向页面
location.replace() 替换，无历史
location.reload(true) 强制刷新 
```

6、navigation是浏览器信息，window.navigation.userAgent就可以获得头部信息

​		history为浏览器纪录，history     

- back()
- forward()
- go(1)  go(-1)

7、

- 同步任务都在主线程执行，形成了执行栈
- 异步任务 是通过 回调函数实现，而回调函数都会被放入 任务队列中

1. 在JS主线程中，执行栈正常执行同步任务，遇到异步任务放入 异步API中进行加载处理，异步任务完毕都放入任务队列中
2. 一旦同步任务执行完毕，执行栈就会重复查询任务队列，获取执行，这便是事件循环。

8、

- offset

相对于父元素的偏移位置

```js
element.offsetTop 								相对于有定位的父元素的上偏移、Left
element.offsetWidth/offsetHeight 				包括了padding+border+width/height

三点注意:
offsetWidth 不能赋值、 不带px单位、		包含了padding+border
```

- client

  获得元素可视区域的相关信息

  element.clientTop

  element.clientLeft

  element.clientWidth/Height

- scroll

  获得被卷去的区域、其width是实际的，不包含border+padding

9、

