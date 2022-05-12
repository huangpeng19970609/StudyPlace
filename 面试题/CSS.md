<<<<<<< HEAD
### 1 BFC

块级格式化上下文 Block Formatting Context

> - 什么是BFC
>   
>   这一片渲染区域遵守着一套渲染规则。
>   
>   1. 隔离，元素布局不受外部影响。
>   2. 无论是块级、行级盒子都会沿着父元素排列【故它是认识浮动元素的】

1. margin溢出，导致位置改变

   你可以用 BFC的隔离性 ，（  一个元素不能同时存在于两个 BFC 中 ）再其子元素外再创建BFC

2. BFC 不可以解决margin的重叠问题

   是解决垂直margin重叠问题的方法都可以让元素具有BFC特性，。

   但是让元素具有BFC特性不一定能够解决垂直margin重叠的问题。

   （ 而是浮动元素、inline-block 元素、绝对定位元素都在触发了BFC的同时解决了重叠问题 ）

   ❗ 浮动元素、inline-block 元素、绝对定位元素的 margin 不会和垂直方向上其他元素的 margin 折叠

   （注意这里指的是上下相邻的元素）

3. BFC的区域不会与float box重叠（因为计算过程需要计算浮动流）

   即 它认得出 【浮动流】！浮动流不会高度坍塌了

4. BFC独立，不会影响外部元素

创建BFC  满足其一

1. 浮动定位、绝对定位 （absoluted、fixed）的元素

2. 表格的标题和单元格（display:  table）、行内块元素、网格元素 （grid）

   display`  为 table-caption，table-cell

3. overflow不是visible

### 2 为什么要初始化 CSS 样式

- 不同浏览器对有些标签的默认值是不同的

### 3 CSS3的新特性

1. flex布局

2. :first-of-type,nth-child

3. transition 、transform、动画 @keyframes

4. 媒体查询 @media

5. 其余特性

   ```css
   透明     rgba（255, 0, 0, 0.75）；
   圆角效果  border-radius: 5px;
   渐变色    background:linear-gradient（red, green, blue）；
   阴影     box-shadow:3px 3px 3px rgba（0, 64, 128, 0.3）；
   超出文字  text-overflow:ellipsis;
   边框背景   border-image:url（bt_blue.png） 0 10
   ```


### 4 flex为1

flex是 flex-grow、flex-shrink、flex-basis三个属性的简写。

它们都是用于 flex的子元素的。

flex默认是 0 1 auto

````css
flex: 1;

flex: 1 1 auto(0%);
````

- flex-grow

  1. flex-grow 属性决定了父元素在空间分配方向上还有剩余空间时，如何分配这些剩余空间。

  2. flex-grow 默认为0，存在剩余的空间也不会放大。

- flex-shrink

  1. flex-shrink 属性定义空间不够时各个元素如何收缩。其值默认为 1。

  2. 每个元素收缩的权重为其 flex-shrink 乘以其宽度。

  3. 例子

     父元素 500，子元素 150、200、300

     flex-shrink为 1、2、3

     - 总共超出 150px
     - 总权重为： 1* 150 + 2 * 200 + 3 * 300 = 1450

     故计算收缩

     总收缩宽度 * flex-shrink * 各自权重宽度 / 总权重宽度

     - 150 * 1 * 150 / 1450  = 15.5
     - 150 * 2 * 400 / 1450 = 41.4
     - 150 * 3 * 900 / 1450 = 93.1

     故最终宽度为

     - 150 - 15.5 = 134.5
     - 200 - 41.4 = 158.6
     - 300 - 93.1 = 206.9

- flex-basis

  指定了flex元素在主轴方向上的初始大小（属性定义了在分配多余空间之前，项目占据的主轴空间（main size））

  浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

### 5 盒模型

- 组成盒模型

  1. content-box
  2. padding-box
  3. border-box
  4. margin-box

  margin-box也是组成盒子模型，但应注意，其决定不了实际盒子模型的宽高，只是表明了占比空间。

- 标准盒模型

  块级元素和inline-block元素

  1. width、height 即 content-box
  2. padding-box
  3. border-box

  注意 margin 并不计入实际的大小，虽然影响本盒子的页面占用空间， 但其影响的仅是外部空间。

- 怪异盒模型（ie盒子模型）

  由标准盒子可知，我们设置宽度其实并非是此盒子的真正宽度，它总要额外的计算。故额外提供了一个盒子来避免这个问题。

  这样 width 就是实际此盒子的width，您不需要再关心 border、padding了

  ````css
  .box {
  	box-sizing: border-box;    
  }
  ````

  1. 可以设置 `box-sizing` 在 `<html>` 元素上，然后设置所有元素继承该属性
  2. 此时margin也视作 外部空间。这无论在何时都是统一的，这也是margin存在的意义。    

### 6 实现一些常见布局

1. 实现双栏布局 （一）

   - 左栏浮动流， 宽度固定
   - 右栏 设置 margin-left对应宽度， 使得其宽度正确

2. 实现双栏布局 （二）

   - 左侧浮动
   - 右侧 overflow： hidden 触发 BFC

3. 实现三栏布局之 圣杯布局

   - 使用 `float` 布局。
   - 两侧使用 `margin` 负值，以便和中间内容横向重叠。
   - 防止中间内容被两侧覆盖，圣杯布局用 `padding` ，双飞翼布局用 `margin` 。

   ````js
   <div id="container">
     <p class="center">我是中间</p>
     <p class="left">我是左边</p>
     <p class="right">我是右边</p>
   </div>
   ````

   CSS

   ````css
   #container {
     padding-left: 200px;
     padding-right: 150px;
     overflow: auto;
   }
   #container p {
     float: left;
   }
   .center {
     width: 100%;
     background-color: lightcoral;
   }
   .left {
     width: 200px;
     position: relative;
     left: -200px;
     margin-left: -100%;
     background-color: lightcyan;
   }
   .right {
     width: 150px;
     margin-right: -150px;
     background-color: lightgreen;
   }
   ````


### 7 清除浮动

1. 何为CSS的浮动

   容器高度为 auto， 且容器中有浮动流时候，容器的高度计算无法识别浮动流

   - height： auto

     即 顾名思义 height可以自行调整。

     这代表： 【普通流中的父元素需要依赖子元素来进行计算】

2. 如何清除浮动流

   - clear属性

     规定在元素的哪一侧不允许出现浮动元素。

     此外： 或许使用伪类元素是一个更好的方案。

     ````html
     <style>
     .clear {
         clear: both;
     }
     </style>
     
     <div class = "wraper">
         <div class = "floatL">box1 </div>
         <div class = "floatR">box2 </div>
         <br class = "clear" />
     </div>
     ````

   - 触发浮动元素父元素的 BFC 

     方法很多，略。

### 8 行内块的幽灵节点

1. **行级盒子 \**line boxes，是由好几个\**行内元素** inline boxes 组成的，正常情况下他们是下边缘对齐的
2. 如果一个line box里**没有文字、保留的空格、非0的margin或padding或border的inline元素、或其他in-flow内容（比如图片、inline-block或inline-table元素）**，且不以保留的换行符结束的话，就会被视作**高度为0的line box**。

解决办法：

1. vertical-align 值 不要设置 baseline
2. 修正line-height， （font-size的修改目的也是修改line-heihgt）

### 9 margin负值

- margin

  margin的上、左 是根据【左侧元素】【右侧元素】作为基准

  margin的下、右 是根据【元素自身】的【对应border】作为基准

- 故 margin为负值的时候

  margin-top、margin-left的负值， 会让其 自身向左移动、向上移动

  而

  margin-bottom、margin-right的负值会使用【下元素】移动。【右元素】移动。

举例子吧。

```html
    <div class="one">one</div>
    <div class="two">two</div>
```

- 给【two】设置margin-top: -50px

  【two】的margin-top的参考线为 【one】的底部。

  ​	故 【two】向上移动 50px

- 给【one】设置 margin-right: -50

  由于 right是参考自身的， 故自身整体元素都会向左移动 50px

### 10  一键换肤

1. 不同的主题定义一个对应的 CSS 选择器

   虽然是最易想到的方案， 但多套皮肤代表多套管理。代码数量也是倍数增长

2. link的不同加载的方案

   还是拥有本质上的缺陷。

3. 【CSS 变量】实现

   `body.style.setProperty(key, value)` 动态修改 `body` 上的 CSS 变量

   ```css
   .header {
     ...省略
     color: var(--theme-color);
     border-bottom: 1px solid var(--theme-boder-color);
     background-color: var(--theme-bg);
   }
   
   ```

### 11 CSS变量

声明变量：变量名前面要加两根连词线， 将其称呼为【CSS自定义属性】

```js
body {
  --foo: #7F583F;
  --logo-border-color: rebeccapurple;
  --auto-margin-top: calc(2vh + 20px);
}

:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
	
```

1. 为何要以 -- 为开头标识？

   - $foo被Sass使用了
   - @foo被Less使用了

2. 定义以后，如何读取变量？

   - `var()`函数用于读取变量
   - 第二个默认值可以读取默认值

   ```css
   a {
     color: var(--foo);
     text-decoration-color: var(--bar);
     # 变量不存在时， 使用第二个默认值
     color: var(--primary-color, #7F583F);
   }
   
   ```

3. 动态的调整CSS

   ```javascript
   document.body.style.setProperty('--primary', '#7F583F');
   document.body.style.getPropertyValue('--primary').trim();
   document.body.style.removeProperty('--primary');
   ```

### 12 :root选择器

**`:root`** 这个 CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)匹配文档树的根元素。

对于 HTML 来说，**`:root`** 表示 html元素，除了[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)更高之外，与 `html` 选择器相同.

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 42px;
}
=======
### 1 BFC

块级格式化上下文 Block Formatting Context

> - 什么是BFC
>   1. **隔离**
>   2. 浮动元素

1. margin溢出，导致位置改变

   你可以用 BFC的隔离性 ，（  一个元素不能同时存在于两个 BFC 中 ）再其子元素外再创建BFC

2. BFC 不可以解决margin的重叠问题

   是解决垂直margin重叠问题的方法都可以让元素具有BFC特性，。

   但是让元素具有BFC特性不一定能够解决垂直margin重叠的问题。

   （ 而是浮动元素、inline-block 元素、绝对定位元素都在触发了BFC的同时解决了重叠问题 ）

   ❗ 浮动元素、inline-block 元素、绝对定位元素的 margin 不会和垂直方向上其他元素的 margin 折叠

   （注意这里指的是上下相邻的元素）

3. BFC的区域不会与float box重叠（因为计算过程需要计算浮动流）

   即 它认得出 【浮动流】！浮动流不会高度坍塌了

4. BFC独立，不会影响外部元素

创建BFC  满足其一

1. 浮动定位、绝对定位 （absoluted、fixed）的元素

2. 表格的标题和单元格（display:  table）、行内块元素、网格元素 （grid）

   display`  为 table-caption，table-cell

3. overflow不是visible


注意事项

1. BFC中若再有BFC，这便是两个BFC （即**一个元素不能同时存在于两个 BFC 中**）
   1. 此外 flex布局产生的是*flex formatting context*， 是flex-layout，其内部不许浮动。

### 2 为什么要初始化 CSS 样式

- 不同浏览器对有些标签的默认值是不同的

### 3 CSS3的新特性

1. flex布局

2. :first-of-type,nth-child

3. transition 、transform、动画 @keyframes

4. 媒体查询 @media

5. 其余特性

   ```css
   透明     rgba（255, 0, 0, 0.75）；
   圆角效果  border-radius: 5px;
   渐变色    background:linear-gradient（red, green, blue）；
   阴影     box-shadow:3px 3px 3px rgba（0, 64, 128, 0.3）；
   超出文字  text-overflow:ellipsis;
   边框背景   border-image:url（bt_blue.png） 0 10
   ```


### 4 flex为1

flex是 flex-grow、flex-shrink、flex-basis三个属性的简写。

它们都是用于 flex的子元素的。

flex默认是 0 1 auto

````css
flex: 1;

flex: 1 1 auto(0%);
````

- flex-grow

  1. flex-grow 属性决定了父元素在空间分配方向上还有剩余空间时，如何分配这些剩余空间。

  2. flex-grow 默认为0，存在剩余的空间也不会放大。

- flex-shrink

  1. flex-shrink 属性定义空间不够时各个元素如何收缩。其值默认为 1。

  2. 每个元素收缩的权重为其 flex-shrink 乘以其宽度。

  3. 例子

     父元素 500，子元素 150、200、300

     flex-shrink为 1、2、3

     - 总共超出 150px
     - 总权重为： 1* 150 + 2 * 200 + 3 * 300 = 1450

     故计算收缩

     总收缩宽度 * flex-shrink * 各自权重宽度 / 总权重宽度

     - 150 * 1 * 150 / 1450  = 15.5
     - 150 * 2 * 400 / 1450 = 41.4
     - 150 * 3 * 900 / 1450 = 93.1

     故最终宽度为

     - 150 - 15.5 = 134.5
     - 200 - 41.4 = 158.6
     - 300 - 93.1 = 206.9

- flex-basis

  指定了flex元素在主轴方向上的初始大小（属性定义了在分配多余空间之前，项目占据的主轴空间（main size））

  浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

### 5 盒模型

- 组成盒模型

  1. content-box
  2. padding-box
  3. border-box
  4. margin-box

  margin-box也是组成盒子模型，但应注意，其决定不了实际盒子模型的宽高，只是表明了占比空间。

- 标准盒模型

  块级元素和inline-block元素

  1. width、height 即 content-box
  2. padding-box
  3. border-box

  注意 margin 并不计入实际的大小，虽然影响本盒子的页面占用空间， 但其影响的仅是外部空间。

- 怪异盒模型（ie盒子模型）

  由标准盒子可知，我们设置宽度其实并非是此盒子的真正宽度，它总要额外的计算。故额外提供了一个盒子来避免这个问题。

  这样 width 就是实际此盒子的width，您不需要再关心 border、padding了

  ````css
  .box {
  	box-sizing: border-box;    
  }
  ````

  1. 可以设置 `box-sizing` 在 `<html>` 元素上，然后设置所有元素继承该属性
  2. 此时margin也视作 外部空间。这无论在何时都是统一的，这也是margin存在的意义。    

### 6 实现一些常见布局

1. 实现双栏布局 （一）

   - 左栏浮动流， 宽度固定
   - 右栏 设置 margin-left对应宽度， 使得其宽度正确

2. 实现双栏布局 （二）

   - 左侧浮动
   - 右侧 overflow： hidden 触发 BFC

3. 实现三栏布局之 圣杯布局

   - 使用 `float` 布局。
   - 两侧使用 `margin` 负值，以便和中间内容横向重叠。
   - 防止中间内容被两侧覆盖，圣杯布局用 `padding` ，双飞翼布局用 `margin` 。

   ````js
   <div id="container">
     <p class="center">我是中间</p>
     <p class="left">我是左边</p>
     <p class="right">我是右边</p>
   </div>
   ````

   CSS

   ````css
   #container {
     padding-left: 200px;
     padding-right: 150px;
     overflow: auto;
   }
   #container p {
     float: left;
   }
   .center {
     width: 100%;
     background-color: lightcoral;
   }
   .left {
     width: 200px;
     position: relative;
     left: -200px;
     margin-left: -100%;
     background-color: lightcyan;
   }
   .right {
     width: 150px;
     margin-right: -150px;
     background-color: lightgreen;
   }
   ````

   

   

4. 

### 7 清除浮动

1. 何为CSS的浮动

   容器高度为 auto， 且容器中有浮动流时候，容器的高度计算无法识别浮动流

   - height： auto

     即 顾名思义 height可以自行调整。

     这代表： 【普通流中的父元素需要依赖子元素来进行计算】

2. 如何清除浮动流

   - clear属性

     规定在元素的哪一侧不允许出现浮动元素。

     此外： 或许使用伪类元素是一个更好的方案。

     ````html
     <style>
     .clear {
         clear: both;
     }
     </style>
     
     <div class = "wraper">
         <div class = "floatL">box1 </div>
         <div class = "floatR">box2 </div>
         <br class = "clear" />
     </div>
     ````

   - 触发浮动元素父元素的 BFC 

     方法很多，略。

### 8 行内块的幽灵节点

1. **行级盒子 \**line boxes，是由好几个\**行内元素** inline boxes 组成的，正常情况下他们是下边缘对齐的
2. 如果一个line box里**没有文字、保留的空格、非0的margin或padding或border的inline元素、或其他in-flow内容（比如图片、inline-block或inline-table元素）**，且不以保留的换行符结束的话，就会被视作**高度为0的line box**。

解决办法：

1. vertical-align 值 不要设置 baseline
2. 修正line-height， （font-size的修改目的也是修改line-heihgt）

### 9 margin负值

- margin

  margin的上、左 是根据【左侧元素】【右侧元素】作为基准

  margin的下、右 是根据【元素自身】的【对应border】作为基准

- 故 margin为负值的时候

  margin-top、margin-left的负值， 会让其 自身向左移动、向上移动

  而

  margin-bottom、margin-right的负值会使用【下元素】移动。【右元素】移动。

举例子吧。

```html
    <div class="one">one</div>
    <div class="two">two</div>
```

- 给【two】设置margin-top: -50px

  【two】的margin-top的参考线为 【one】的底部。

  ​	故 【two】向上移动 50px

- 给【one】设置 margin-right: -50

  由于 right是参考自身的， 故自身整体元素都会向左移动 50px

### 10  一键换肤

1. 不同的主题定义一个对应的 CSS 选择器

   虽然是最易想到的方案， 但多套皮肤代表多套管理。代码数量也是倍数增长

2. link的不同加载的方案

   还是拥有本质上的缺陷。

3. 【CSS 变量】实现

   `body.style.setProperty(key, value)` 动态修改 `body` 上的 CSS 变量

   ```css
   .header {
     ...省略
     color: var(--theme-color);
     border-bottom: 1px solid var(--theme-boder-color);
     background-color: var(--theme-bg);
   }
   
   ```

### 11 CSS变量

声明变量：变量名前面要加两根连词线， 将其称呼为【CSS自定义属性】

```js
body {
  --foo: #7F583F;
  --logo-border-color: rebeccapurple;
  --auto-margin-top: calc(2vh + 20px);
}

:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
	
```

1. 为何要以 -- 为开头标识？

   - $foo被Sass使用了
   - @foo被Less使用了

2. 定义以后，如何读取变量？

   - `var()`函数用于读取变量
   - 第二个默认值可以读取默认值

   ```css
   a {
     color: var(--foo);
     text-decoration-color: var(--bar);
     # 变量不存在时， 使用第二个默认值
     color: var(--primary-color, #7F583F);
   }
   
   ```

3. 动态的调整CSS

   ```javascript
   document.body.style.setProperty('--primary', '#7F583F');
   document.body.style.getPropertyValue('--primary').trim();
   document.body.style.removeProperty('--primary');
   ```

### 12 :root选择器

**`:root`** 这个 CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)匹配文档树的根元素。

对于 HTML 来说，**`:root`** 表示 html元素，除了[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)更高之外，与 `html` 选择器相同.

```css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 42px;
}
>>>>>>> 2f9b1cf7b276e51ea5a21d2c3ad9205851816ab6
```