## Flex layout
#### 1 <span style="color: red">justify-content</span> 控制主轴
   >解释: 将flex元素和主轴以某方向对齐；

   > 主轴的判断依赖 <span style="color: red"> flex-direction </span>属性。

值|解释
:-|:-|
flex-start (default) | 对齐方向: 轴始(默认)
flex-end| 对齐方向: 轴末
center|对齐方向： 居中
space-between|对齐方向: 两端对齐,且间隔相等.(即首与末元素有无间隔)
space-around | 对齐方向: 环绕对齐,间隔相等.(即首与末元素有间隔)
---



#### 2 <span style="color: red">align-items</span> 控制 交叉轴（元素角度。items）

  > align-items属性定义 *项目* 在交叉轴上如何对齐。

  >解释： align-items属性定位元素在交叉轴上（侧轴）上如何对齐

  >侧轴的判别也依赖与 flex-direction

值|解释
:-|:-|
flex-start|对齐方式: start
flex-end| 对齐方式: end
center | 居中, 即子项的高度中线与flex交叉轴中线重合
baseline | 交叉轴的对齐方式，现在该由每个元素的第一行文字基线控制。保持基线对齐。
stretch | 交叉轴的默认对齐方式: 若无对应宽或高，则每个元素对应填充交叉轴。
---



#### 3  <span style="color: red">flex-direction</span> 控制轴方向

>决定主轴的的方向

值|解释
:-|:-|
row|以行左为主轴
row-reverse|以行末为主轴
column|以列为主轴，自上而下
column-reverse|以列为主轴，但自下而上
---



#### 4 <span style="color: red">flex-wrap</span> 控制主轴换行规则

> 1 若多个元素都在同一轴上，且元素本身宽度大于父元素宽度，按理应该自动换行。但是flex-wrap的默认属性为nowrap，故会对这些元素进行缩放的操作，让其可以放在同一行上。

值|解释
:-|:-|
nowrap|flex-wrap的默认值,不换行
wrap|换行
wrap-reverse | 翻转换行. 顾名思义
---



#### 5<span style="color: red"> align-content</span>控制交叉轴的对齐方向（flex容器角度， 故为content）

> align-content属性定义了 *多根轴线*  的对齐方式

> align-content 与 justify-content属性一样，且多了一个 stretch(默认的)

> 在flex容器子项只有一行时，align-content属性是不起作用的

值|解释
:-|:-|
flex-start (default) | 对齐方向: 轴始(默认)
flex-end| 对齐方向: 轴末
center|对齐方向： 居中
space-between|对齐方向: 两端对齐,且间隔相等.(即首与末元素有无间隔)
space-around | 对齐方向: 环绕对齐,间隔相等.(即首与末元素有间隔)
stretch（默认值）| 轴线占满整个交叉轴。
---



#### 6 <span style="color: red"> flex 元素属性</span>

1. order
>order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  ```css
    order: <integer>;
  ```
2. flex-grow
>flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  ```css
    flex-grow: <number>; /* default 0 */
  ```
3. flex-shrink
>flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```
4. flex-basis
>flex-basis属性定义了在分配多余空间之前，每个元素占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

>它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
5. flex
   
   > flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

  > 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
  > 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

   ```js
      flex: 1; === flex: 1 1 0; // flex-grow, flex-shrink 和 flex-basis
   ```
6. align-self
   >align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

   ```css
    .item {
      align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
   ```



#### 7 <span style="color: red">align-items</span> 与 <span style="color: red">align-content</span>的区别

##### 1 若存在多行,且flex容器没有自己的高度
1. align-items设置align-item为center情况下
>各行的子项都在各自行上居中对齐（各行的高度由高度最高的子项决定，flex容器的高度为所有行的高度最高的子项高度之和）。

2. align-content设置align-content: center的情况下
   结论：与初始状态一样，align-content: center并没有起作用，
  >因为此时是以所有子项作为一个整体，而flex容器并没有指定高度（flex容器的高度即为子项整体的最大高度），所以flex容器在交叉轴上没有多余的空间，那么子项整体自然而然也就没有在交叉轴上对齐的说法了。

##### 2 若存在多行， flex容器设置高度

1.   align-items设置align-item为center情况下与之前没有变化


2. 居中了。并且是以flex容器的 交叉轴的中线作为居中条件 

   >在flex容器指定高度并且子项为多行时，align-content: center是将子项作为一个整体，然后这个整体在flex容器的交叉轴上居中对齐的


##### 3 总结
+ align-items属性是针对单独的每一个flex子项起作用，它的基本单位是每一个子项，在所有情况下都有效果（当然要看具体的属性值）。

+ align-content属性是将flex子项作为一个整体起作用，它的基本单位是子项构成的行，只在两种情况下有效果：
  1. 子项多行且flex容器高度固定 
  2. 子项单行，flex容器高度固定且设置了flex-wrap:wrap;