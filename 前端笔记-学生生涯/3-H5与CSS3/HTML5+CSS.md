# HTML5+CSS



### 1、vs code中的一些小技巧

​	① 输入 ！ 即可以输出html声明

​    ②光标 定位即可选中一行。

​	③alt+shift＋↑ 就可以将该行向上复制一份。

​	④插件的安装

### 2、HTML5  语义话

​	header、nav、article、section、aside、footer

​	这些语义化标签如果在IE9中必须要转为块级标签。

​	这些标签多在移动端使用。

### 3、HTML5 媒体标签

audio媒体标签，

​	controls=“controls” 显示控制按钮，但因为不同浏览器控制按钮不同，故一般自己使用JS书写按钮

​	autoplay="autoplay",自动播放打开。

​	loop="loop"，是否循环播放

​	不同浏览器中多audio的音频格式支持是不同的，故需要引入多种格式的source src = url

### 4、HTML5 视频标签 

​	video元素类似与audio，

### 5、HTML5 表单属性

​	提供了更多的表单属性

​	

```html
1、更多种类的type选择
<input type="email"/> <!-- 其中type也可以等于 url 、date、time、week、number、tel、search-->
2、更多形式的属性帮助表单提交
<input type="email" placeholder="请输入汉字" autofocus="autofocus" autocomplete="autocomplete"/>
placeholder类似于默认值，autofocus自动聚焦，提供良好体验。autocomplete表单提交以后保留数据在input中
3、multiple多选文件提交
<input type="file" multiple="multiple"/>
```

### 6、CSS3-选择器

1、属性选择器

可以选择某属性，也可选择某属性的某值，也可以以属性的值为条件进行选择。

```css
ul li[class="li_1"] {
            color: red;
}
 ul li[class] {
            color: red;
        }
 ul li[class^="li"] {
            color: green;
        }
^= 代表的是 以该名称开头， $= 代表的是以其结尾, *=代表的是任意包含。
```

2、结构选择器。

结构选择器，叫做结构伪类选择器。结构是因为 他选择的是以为结构的为方式进行选择，伪类是说他与之前我们使用的伪类选择一样都使用了 ： 的方式来说明语法。

```css
 ul li:first-child {
            color: green;
        }
除了first-child以外，还有
last-child末元素，
nth-child（10）选择第几个。
-------------------------------------------------------------------
div span:first-of-type{
    color:red;
}
选取div中的span这类元素中的第一个。
类似的还有:
div span:last-of-type{}  
div span:nth-of-type(10)与之前的类似。
```

3、伪元素选择器

伪元素选择器

```css
：：before
：：after
1、before与after都必须要有content属性。
2、before与after所生成的都可被视为行内元素，故其是没有大小的。所以我们可以用这种方式来放置图标，在其content属性称。
```

