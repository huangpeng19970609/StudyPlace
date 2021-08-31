# 1、JQurey

| **1、Jquery中的$代表什么意思？**                             |
| ------------------------------------------------------------ |
| **2、区分JQuery与DOM**                                       |
| **3、JQuery与DOM的相互转换**                                 |
| 4、$('div').css("background","pink")这种方式让所有div都改变了，原理是什么？ |
| 5、筛选选择器                                                |
| 6、Jquery设置样式                                            |
| 7、JQ的动画效果                                              |
| 8、显示、滑动、淡入                                          |
| 9、Jquery获取本来就有的属性如何获取？如何设置属性？如何存放暂时的数据内存？ |
| 10、each方法遍历元素                                         |
| 11、绑定事件                                                 |
| 12、事件委托                                                 |
| 13、off() 、one（）、trigger（）、triggerHandler（“click”）； |
| 14、事件对象、拷贝、多库、插件使用                           |
| 15、JQuery的事件对象                                         |
| 16、JQuery获得宽度、高度方法、获得包含padding的方法，获得包含padding+border的方法 |
| 17、JQuery的获得位置方式                                     |
|                                                              |
|                                                              |
|                                                              |

**1、Jquery中的$代表什么意思？**

```javascript
JQuery是已经封装好的，JS代码的基础上的加强版
    $(function(){
        $('div').hide();
    })
这代码 等待DOM渲染结束以后再执行JS，$实际含义是JQuery，是JQuery的顶级对象
```

**2、区分JQuery与DOM**

```css
1、区别	
	DOM对象： document.querySelector('div')
	JQuery:	 $('div')  本质上还是利用$来对DOM对象进行了封装之后产生的对象
2、DOM是原生API，而JQuery只能JQuery自己的属性方法
	div.style.display = 'none';
	$('div').hide();
```

**3、JQuery与DOM的相互转换**

```javascript
我们需要相互转换，比如 video里的属性play，JQuery没有提供下我们需要使用；
1、 直接将DOM对象变成JQuery对象
    第一种--------------------------
	$('.myvideo')；
    第二种--------------------------
    var myvideo = document.quertSelector('.myvideo');
	$(myvideo);
 2、Jquery变DOM	
 	利用Jquery对象是伪数组的方式，将其变为原生API
 	$('video')[0].play();
	$('.myvideo')[0].play();
```

**4、隐式迭代**

​		通过遍历的操作给每个元素都添加上了。

**5、筛选**

```javascript
1、选择器
	$("li:first")
    $("li:last")
    $("li:eq(2)")
    $("li:odd")
    $("li:even")
2、筛选方法
	$('#myli').parent();				1、查找父级元素
    $('#myli').children("li");			2、寻找亲儿子 相当于 >
    $('#myli').find("li");				3、寻找子孙后代
    $('#myli').sibling("li");			4、寻找兄弟节点
    $('#myli').nextAll();				5、之后所有的兄弟节点
    $('#myli').prevAll();				6、之前所有的兄弟节点
    $('#myli').hasClass("protected")	7、寻找特定类，若有返回true
	$("#myli").eq(2);					8、相当对伪数组查找第三个
```

**6、设置样式**

```javascript
1、利用隐式迭代的方式实现排他思想
	$(this).css("-","-");
	$(this).sibling("button").css("--","--");
	更方便的方式：
    	$(".div").eq(index).show().siblings().hide();
2、获取当前索引号的方式实现
	var index = $(this).index();
3、样式操作
	$("div").addClass("--");
	$("div").removeClass("111");
	$("div").toggleClass("111");有则加，无则删
4、更好的修改写法
	$("this").css({
        width:400px;
        height:400px;
    })
5、原生的API 
	element.className("111")；会将其全部覆盖掉
    而JQuery是追加
```

**7、动画方法**

```css
1、以下动画方法：
	show、hide、toggle					显示
	slideDown、slideUp、slideToggle		滑动
	fadeIn、fadeOut、fadeToggle、fadeTo   淡入
	animate 自定义动画
2、自定义动画：
	animate(params,[speed],[easing],[fn])
		params 即样式属性，以对象形式传递
        实例:
$(".my").animate({
    left:50;
    top:50;
},500);
```

**8、显示、滑动、淡入**

​	**所有动画方法参数几乎一样 皆是  方法名称（[speed],[easing],[fn]）**

​	speed: 1000代表1秒内完成。可选 slow，normal、fast

​	easing：swing、linear

​	fn：代表完成时候回调的函数

```css
hover（[over],out)
over:相当于mouseenter，在over中写function就行
out相当于mouseleaver，在out中写function，代表离开时回调的函数
```

动画停止使用stop（），实现防止多次操作的任务

```javascript
$(this).children("ul").stop.sliderToggle() 一般这么写，先停止上一个方法，再进行方法
```

注意：

```css
fadeTo（[speed],opcity,[easing],[fn]）
对于opcity是必须写的，该方法代表调节透明度，取0-1的值
```

**9、Jquery获取本来就有的属性如何获取？如何设置属性？如何存放暂时的数据内存？**  

```javascript
1、获取本来便有的属性
	element.prop("属性名")；
2、修改属性
	element.attr("属性名"，"属性值");
3、存放数据
	$(this).data("uname","andy");
	注意：
    	$("this").data("index")可获取 data-index的类值，返回的是number类型
4、三种写入值的方式
	element.html("---") 相当于写入该元素
    element.text("--")修改其内容值
    element.val("123")；设置其value的值为123
```

**10、each方法遍历元素**

```css
1、隐式迭代只可以针对一类元素进行同一种操作，希望一类元素不同的操作依旧需要循环
    $("div").each(function(index,doEle){
        ----
    })
    index代表其该元素的每一个元素索引号
    doEle代表每一个DOM对象！注意非Jquery对象，所以内部使用的时候需要 $(doEle)
-------------------------------------------------------------
2、第二种循环
$.each(object,function(index,element){
    ----
})
多一个参数object，即任意对象，主要用于遍历数据，遍历对象来使用
总的来说，用于DOM时候$("div").each()
		 用于数据时候$.each(object,function(index,element))
```

11、绑定事件

```javascript
//1、第一种方式
elemen.事件名(function(){
            //事件名如 click、mouseenter、mouseleave等，与原生一致
 });
//第二种方式：
element.on("事件名称",[selector],fn){
    /selector为该元素的子元素选择器，fn为回调函数
}
//示范：
$(".header").on({
            mouseenter: function() {
                $(this).css("backgroundColor", "green");
            },
            mouseleave: function() {
                $(this).css("backgroundColor", "red");
            },
            click: function() {
                $(this).css("backgroundColor", "black")
            }
        })
 $(".header").on("mouseenter mouseleave", function {
            alert("1");
        });
```

**12、事件委托**

```javascript
/普通事件
	$('ul li').click(funtion(){-----});
/事件委托    
	$("ul").on("click","li",function(){console.log(this)})
    //这便用的是on的绑定的三个参数，实现了点击li的事件触发ul的事件,不需要全部都给li绑定事件了！
```

13、off() 、one（）、trigger（）、triggerHandler（“click”）；

```javascript
/1、off事件
$("div").off(); //解绑所有事件
$("div").off("click","li");解绑指定事件的指定元素;
/2、one绑定
$("div").one("click",function(){--})//使用one绑定方法只绑定一次
3、trigger自动触发
element.trigger("事件");则该事件会自动触发
element.trggerHandler("click")则该事件自动触发，且不会执行默认行为

```

14、JQuery的事件对象

```css
event.pageX\event.pageY
event.target//最初触发事件的DOM元素。
event.which//按键值；

2、
	event.preventDefault()阻止默认行为
event.stopPropogation()阻止冒泡
3、复制
	$.extend([false],target,object,[objectN])
	false 为浅复制，true为深复制，浅复制时候同享地址。
	将object对象复制给target对象
4、多库共存
	当$符号，多个库都在使用时候，可以使用JQuery（"div"）避免冲突
	也可以自己修改名字：
		var happy = $.noConfict();
		则可以happy("div")
```

16、获得盒子大小

```javascript
$("div").width();//普通
$("div").height();
$("div").innerWidth();//inner多了padding
$("div").innderHeight();
$("div").outerWidth();//outer多了padding+border
$("div").outerHeighth();
```

17、获得盒子位置

```javascript
1、
	$("div").offset().top();/相对于document的！跟父元素毫无关系
    $("div").offset().left();
	$("div").offset.({top:20px,left:20px})//这种方式可实现盒子的位移
    $("div").position();/获取相对于有定位的父系元素的位置
    $(window).scroll(function(){---})可以给窗体设置滚动事件
    $(document).scrollTop()获得被卷去的头部
    $(document).scrollTop(100)被全卷去100
```



