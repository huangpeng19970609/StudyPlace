### 一、前言：

+ CesiumJS 是一款用于创建虚拟场景的3D地理信息平台（基于JavaScript），是一个地图可视化框架。

+ 浏览器必须支持WebGL

+ 当前最新git下载地址： https://github.com/CesiumGS/cesium

+ Cesium内提供的类真的是太多了，太多了！好在它也知道这个问题，提供了大量的实例参考。

+ 今天是5月12号，看ceisum的第四天，记录下： 

  官网的英语文档是最好的入门教程！可以去找下对应的中文文档。不过它一定是要是官网的翻译！

+ 

#### 1 Cesium目录框架结构

- Source/: Cesium应用程序代码及数据
- ThirdParty/：外部依赖库，不同于Cesium的第三方库
- LICENSE.md：Cesium的License介绍
- index.html：Web首页，需要按照Cesium要求定义页面，同时添加Cesium依赖库
- server.js：基于node.js的web服务应用

#### 2  重要知识汇总

0.  Cesium程序结构(cesiumWidget) 细分为`五部分`

   + `lock

     记录时间、三维场景的动态展示，需要clock来确定某帧内容

   + container:   domId

   + canvas:    在container上构建的Canvas对象（即这个宇宙）

   + `【screenSpaceEventHandler 】`为 Canvas对象上的鼠标交互事件的封装

   + secne  承载三维场景的对象

   ---

> 【对`scene`进行细致的划分】

+ globe

  __surface(QuadtreePrimitive)

+ `primitives`自定义图元组  （普通三维）

+ groundPrimitives` 自定义图元组 （贴地的三维）

+ 环境对象

  skyBox |  skyAtmosphere  |  sun  |  sunBloom  | moon  |  backgroudColor

  ----

> 很重要
>
> `【scene.Primitives】`可以存在下列， 即 可放置 primitives中的图元也被划分了很多的类型

 + Globe

   

 + `Model(gltf)`

   

 + ``Primitive:` 不要被名称误解，它只是图元的一种

   ```javascript
   PrimitiveCollection
   ```

   可以自定义集合体 Geoetry

   可以定义表皮的外观 Appearance

 + `Billboards | Labels | Poiints`： 注意他们add时候是需要一个先 add 一个 Collection的。整体概念。

   ````js
   BillboardCollection
   LabelCollection
   
   ````

   

	+ ViewpordQuard: 三维内容的窗体，不常用

---

1. `scene`是 Cesium虚拟场景中所有3D图形对象和状态的容器

   ```js
   故我们经常会在 实例化viewer以后，通过scene的成员进行一系列的操作。
   例子：
   var layers = viewer.scene.imageryLayers;
   var blackMarble = layers.addImageryProvider(
     new Cesium.IonImageryProvider({ assetId: 3812 })
   );
   ```

2. 如何`查询` 成员【imageryLayers】有哪些方法

   先 search "scene" 并在 members中搜索到 【imageryLayers 】其有【[ImageryLayerCollection](http://cesium.xin/cesium/cn/Documentation1.62/ImageryLayerCollection.html)】此链接。便是对此实体类的解释。

3. `Cesium.knock`能够使Cesium球体监听html控件, 从而根据控件的值实时改变一些地图属性.

4. `经纬度与世界坐标`

   >HeadingPitchRoll

   + heading指头部的左右摇摆
   + pitch指 头的上下摇摆
   + roll 以自身轴线旋转

   ```js
   
   var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
   var origin = Cesium.Cartesian3.fromDegrees(
       -123.0744619,
       44.0503706,
       height
     );
   var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
       origin,
       hpr
     );
   ```

   > **\*经纬度转换为世界坐标\***

   ```js
   1.
    Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result) 
   
   2.
    var ellipsoid=viewer.scene.globe.ellipsoid;
   
    var cartographic=Cesium.Cartographic.fromDegrees(lng,lat,alt);
   
    var cartesian3=ellipsoid.cartographicToCartesian(cartographic);
   
   ```

   > 世界坐标转换为经纬度

   ```js
   var ellipsoid=viewer.scene.globe.ellipsoid;
   
   var cartesian3=new Cesium.cartesian3(x,y,z);
   
   var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
   
   var lat=Cesium.Math.toDegrees(cartograhphic.latitude);
   
   var lng=Cesium.Math.toDegrees(cartograhpinc.longitude);
   
   var alt=cartographic.height;
   
   2.Cartographic.fromCartesian
   ```

   > 屏幕坐标和世界坐标相互转换

   ```js
   1.var pick1= new Cesium.Cartesian2(0,0); 
   
   var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick1),viewer.scene);
   
   2.Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, Cartesian3);
   ```

   

5. `Entity API和Primitive API`

   + Entity API。高级别的数据驱动的API。管理一组相关性的可视化对象,

     其底层使用Primitive API；

   + Primitive API： 面向图形开发人员的底层API。需要具有图形学编程的知识

   > Cesium提供Entity API来绘制空间数据.
   >
   > 例如点、标记、标签、线、3D模型、形状、立体形状（volume）.

   ```js
   var viewer = new Cesium.Viewer('cesiumContainer'); //创建一个查看器（Viewer widget
   //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对
   var wyoming = viewer.entities.add({  
     name : 'Wyoming',
     polygon : {
       hierarchy : Cesium.Cartesian3.fromDegreesArray([//一组地理坐
                                 -109.080842,45.002073,
                                 -105.91517,45.002073,
                                 -104.058488,44.996596,
                                 -104.053011,43.002989,
                                 -104.053011,41.003906,
                                 -105.728954,40.998429,
                                 -107.919731,41.003906,
                                 -109.04798,40.998429,
                                 -111.047063,40.998429,
                                 -111.047063,42.000709,
                                 -111.047063,44.476286,
                                 -111.05254,45.002073]),
       material : Cesium.Color.RED.withAlpha(0.5), //材
       outline : true, //是否显示轮
       outlineColor: Cesium.Color.BLACK, //轮廓的颜
       }
    }
   );
   viewer.zoomTo(wyoming);//缩放、平移视图使实体可见 
   ```

   1. `viewer.entities.add()简称为方法1`通过指定 model 的 position 和 orientation 来控制模型的位置，对模型进行精确变换的难度较大；`viewer.scene.primitives.add()简称为方法2`通过 modelMatrix 控制模型的位置和方向，可进行较为精确的模型变换。
   2. 对相机操作时`方法 1`提供了较为方便的 viewer.trackedEntity 函数；`方法 2`追踪 model 较为复杂，需要手动操作相机变换。
   3. 对模型进行缩放、变换等操作，`方法 1` 需要修改 object.id(Entity 类型) 中 model(ModelGraphics 类型) 的 scale 和 nodeTransformations；`方法 2` 可以直接修改 object.primitive(model 类型) 中的 scale 和 modelMatrix。

   两种方法本质上是相通的，`方法 1`对`方法 2`在某种程度上进行了封装。

   > 不同的是，`方法 2` 中的 id 对象为用户自定义对象，`方法 1` 中的 Entity 对象。
   >
   > 因此`方法 1`相当于首先通过 `方法 2` 中的 Cesium.Model.fromGltf() 函数建立 Model，通过该 Model 建立对应的 Entity（方法暂未尝试，因为 Entity 构造函数中的 options.model 接收的是 ModelGraphics 类型，而不是 Model 类型），将 Entity 赋予对象的 id 属性，实现双向绑定，具体的实现可能要参考 viewer.entities.add() 的源码实现。

   

#### 3 常用操作

##### 1 获取图层集合与图层 

```js
// 图层集合
var imageryLayers = viewer.scene.imageryLayers;

// 当前图层
var nightLayer = imageryLayers.get(0);

// 朝里面添加图层，也是可以通过回调获取到该图层的
var dayLayer = imageryLayers.addImageryProvider(
  new Cesium.IonImageryProvider({
    assetId: 3845,
  })
);
```

显示帧速 => 即网络频率与刷新的fps（参考王者荣耀的右上角的网络情况）

##### 2 显示帧速

```js
viewer.scene.debugShowFramesPerSecond = true; 
```

##### 3 去除底部的token提示

```js
viewer._cesiumWidget._creditContainer.style.display = "none";
```

##### 4 移动当前的照相机

当然 camera也可以做到！详情看 【官方代码】学习的camera

```js
viewer.zoomTo(viewer.entities); // 移动到该 viewer的实体
```

##### 5 时间倍速【clock】

```js
viewer.clock.multiplier = 4000;
```

#####  6 地球环境设置

```js
// 开启全球光照
viewer.scene.globe.enableLighting = true;
```



##### 7 CallbackProperty

````js
var colorProperty = new Cesium.CallbackProperty(function (
      time,
      result
    ) {
      if (pickedEntities.contains(entity)) {
        return pickColor.clone(result);
      }
      return color.clone(result);
    },
false);
````

##### 8 图形挤压为体

````js
wyoming.polygon.height = 200000;
wyoming.polygon.extrudedHeight = 250000;
````



### 二、创建Cesium Viewer

+ 任何Cesium应用程序的基础都是`Viewer`

> Hello World （省略html）

```js
var viewer = new Cesium.Viewer("cesiumContainer");
```

提供如下的功能

1. 左键拖拽 - 让相机在数字地球平面平移
2. 右键拖拽 - 放缩相机
3. 滚轮滑动 - 放缩相机
4. 中键拖拽 - 在当前地球的屏幕中间点，旋转相机

0、初次使用

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <!-- Include the CesiumJS JavaScript and CSS files -->
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.81/Build/Cesium/Cesium.js"></script>
  <link href="https://cesium.com/downloads/cesiumjs/releases/1.81/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
</head>
<body>
  <div id="cesiumContainer"></div>
  <script>
    // Your access token can be found at: https://cesium.com/ion/tokens.
    Cesium.Ion.defaultAccessToken = 'xxxxxxxx';
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain()
    });    
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation : {
        heading : Cesium.Math.toRadians(0.0),
        pitch : Cesium.Math.toRadians(-15.0),
      }
    });
  </script>
 </div>
</body>
</html>
```



#### 1、默认的Viewer自带的9个控件：

![](.\images\cesium-1.png)

1. Geocoder : 一种地理位置搜索工具，用于显示相机访问的地理位置。默认使用微软的Bing地图。
2. HomeButton : 首页位置，点击之后将视图跳转到默认视角。
3. SceneModePicker : 切换2D、3D 和 Columbus View (CV) 模式。
4. BaseLayerPicker : 选择三维数字地球的底图（imagery and terrain）。
5. NavigationHelpButton : 帮助提示，如何操作数字地球。
6. Animation :控制视窗动画的播放速度。
7. CreditsDisplay : 展示商标版权和数据源。
8. Timeline : 展示当前时间和允许用户在进度条上拖动到任何一个指定的时间。
9. FullscreenButton : 视察全屏按钮。

#### 2、Viewer一部分参数配置

中文API文档为 

http://cesium.xin/cesium/cn/Documentation1.62/Viewer.html?classFilter=viewer

内部viewer有涉及viewer所有参数的配置。

```js
通过代码来配置视窗组件，在我们初始化视窗的时候，通过配置参数添加/移除相关组件
   
var viewer = new Cesium.Viewer('cesiumContainer',{
    geocoder:false,				 //是否显示地名查找控件
    homeButton:false,			 // 右上角的 View home功能。
    sceneModePicker:false,		 //是否显示投影方式控件
    baseLayerPicker:false, 		 //是否显示图层选择控件
    navigationHelpButton:false,
    animation:false, 			 //是否显示动画控件(左下方那个)
    creditContainer:"credit",	//是否显示帮助信息控件
    timeline:false,  			//是否显示时间线控件
    fullscreenButton:false,
    vrButton:false,
    infoBox: true, 				//是否显示点击要素之后显示的信息
    // skyBox : new Cesium.SkyBox({
    //     sources : {
    //     positiveX : 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
    //     negativeX : 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
    //     positiveY : 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
    //     negativeY : 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
    //     positiveZ : 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
    //     negativeZ : 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg'
        //     }
        // })
    });
});
```

> 主要介绍 `baseLayerPicker`此参数。

`baseLayerPicker`*是否显示图层选择控件*

若设置【不可见】则需要【设置自定义图层作为默认图层】 => 这是必须的。

设置可见之后也可以更改其中的图层为自定义图层。 随便你。

> 部分的显示也可以通过如下的css代码实现隐藏。但注意【全屏按钮】设置display为none不会成功，是因为行内样式的优先级问题。

```css
      /* 不占据空间，无法点击 */
      .cesium-viewer-toolbar,             /* 右上角按钮组 */
      .cesium-viewer-animationContainer,  /* 左下角动画控件 */
      .cesium-viewer-timelineContainer,   /* 时间线 */
      .cesium-viewer-bottom               /* logo信息 */
      {
        display: none;
      }
      .cesium-viewer-fullscreenContainer  /* 全屏按钮 */
      { position: absolute; top: -999em;  }

```

#### 3 图层 

Cesium应用程序另一个关键元素是`Imagery(图层)`

瓦片图集合根据不同的投影方式映射到虚拟的三维数字地球表面。

依赖于相机指向地表的方向和距离，Cesium会去请求和渲染不同层级的图层详细信息

多种图层能够被添加、移除、排序和适应到Cesium中

> helloWorld 一个基础的添加图层的示范
>
> https://sandcastle.cesium.com/index.html?src=Imagery%20Layers.html

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  // 当前基础影像图层的视图模型
  baseLayerPicker: false,  
  // 要使用的图像提供者， 前置条件： baseLayerPicker的配置为false
  imageryProvider: Cesium.createWorldImagery({
    style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
  }),
});

/* 
  提醒： 此时该 viewer已经是一个 Cesium viewer实例了
  addImageryProvider => 使用给定的ImageryProvider创建一个新层，并将其添加到集合中
  						其 return 的是一个 新创建的图层
*/

var layers = viewer.scene.imageryLayers; // 获取将在地球上渲染的图像图层的集合。

// blackMarble便是我们生成的图层
var blackMarble = layers.addImageryProvider(
   // 使用Cesium ion REST API提供平铺的图像
   // assetId 为离子图像资产ID；
  new Cesium.IonImageryProvider({ assetId: 3812 })
);

// 我们可以给图层定义一些属性
blackMarble.alpha = 0.5; // 该层的alpha混合值

blackMarble.brightness = 2.0; // 该层的亮度

layers.addImageryProvider(
  new Cesium.SingleTileImageryProvider({
    url: "../images/Cesium_Logo_overlay.png",
    rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
  })
); 
```

####  4 图层与 knockout的互绑



> 自适应图层适应颜色
>
> https://sandcastle.cesium.com/index.html?src=Imagery%20Adjustment.html
>
> 此外也可以参考这篇csdn
>
> https://blog.csdn.net/liu844133828/article/details/82690217

```js
// 4.监听控件值的变化, 
function subscribeLayerParameter(name) {
  Cesium.knockout
    .getObservable(viewModel, name)
    .subscribe(function (newValue) {
      //value值改变后会赋值给imagelayer的相应属性
      if (imageryLayers.length > 0) {
        var layer = imageryLayers.get(0);
        layer[name] = newValue;
      }
    });
}
// 注册这些属性
subscribeLayerParameter("brightness");
subscribeLayerParameter("contrast");
subscribeLayerParameter("hue");
subscribeLayerParameter("saturation");
subscribeLayerParameter("gamma");

// Make the viewModel react to base layer changes.
function updateViewModel() {
  if (imageryLayers.length > 0) {
    // //获取当前地球影像
    var layer = imageryLayers.get(0);
    viewModel.brightness = layer.brightness;
    viewModel.contrast = layer.contrast;
    viewModel.hue = layer.hue;
    viewModel.saturation = layer.saturation;
    viewModel.gamma = layer.gamma;
  }
}
// 将图层添加到集合中时引发的事件。事件处理程序传递给已添加，并添加了索引。
imageryLayers.layerAdded.addEventListener(updateViewModel);
// 当图层更改集合中的位置时引发的事件。事件处理程序传递给被移动，移动后的新索引以及移动前的旧索引。
imageryLayers.layerRemoved.addEventListener(updateViewModel);
// 从集合中移除图层时引发的事件。事件处理程序传递给被删除，并从中删除索引。
imageryLayers.layerMoved.addEventListener(updateViewModel);

updateViewModel();
```



#### 5 添加实体

> 请参考 http://cesium.xin/wordpress/archives/102.html 底部的图形
>
> 中文API文档 http://cesium.xin/cesium/cn/Documentation1.62/Entity.html

> 1. 绘制形状, 使用entities配置实现

```js
var viewer = new Cesium.Viewer('cesiumContainer');
var redBox = viewer.entities.add({
  name : 'Red box with black outline',
  position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0), // 盒子的位置
  box : {
    dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0), // box三维
    material : Cesium.Color.RED.withAlpha(0.5),
    outline : true,
    outlineColor : Cesium.Color.BLACK
  }
});

viewer.zoomTo(viewer.entities); // 移动到该 viewer的实体
```

> 一个label的示范，具体其他的api参数请参阅对应的 实例参数

```js
label : {
    text : 'Citizens Bank Park',
    font : '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth : 2,
    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
    pixelOffset : new Cesium.Cartesian2(0, -9)
}
```

> 2. 绘制形状，使用czml实现

```js
var czml = [{
    "id" : "document",
    "name" : "box",
    "version" : "1.0"
},{
    "id" : "shape2",
    "name" : "Red box with black outline",
    "position" : {
        "cartographicDegrees" : [-107.0, 40.0, 300000.0]
    },
    "box" : {
        "dimensions" : {
            "cartesian": [400000.0, 300000.0, 500000.0]
        },
        "material" : {
            "solidColor" : {
                "color" : {
                    "rgba" : [255, 0, 0, 128]
                }
            }
        },
        "outline" : true,
        "outlineColor" : {
            "rgba" : [0, 0, 0, 255]
        }
    }
}];

var viewer = new Cesium.Viewer('cesiumContainer');
var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(dataSourcePromise);
```

#### 6 3D Tiles数据集

入门（六）(七)没看懂。可以回去结合代码去观看。

> http://cesium.xin/wordpress/archives/104.html

3D Tiles用于流式传输3D内容，包括建筑物、树木和矢量数据。

`ModelMatrix`



#### 7 设置材质

`http://cesium.xin/wordpress/archives/108.html 请参考这里的配置。

1. 构建 Cesium.Material对象来实现。

> https://sandcastle.cesium.com/?src=Materials.html&label=CZML  官方的示范
>
> http://cesium.xin/cesium/cn/Documentation1.62/Material.html?classFilter=Material 中文API

2. 通过【MaterialProperty】的来直接构建属性。

其下又有七个子类，来可以控制材质的不同显示.如下例子

```js
//方法一，构造时赋材质
var entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
  ellipse : {
    semiMinorAxis : 250000.0,
    semiMajorAxis : 400000.0,
    material : Cesium.Color.BLUE.withAlpha(0.5)//可设置不同的MaterialProperty
  }
});

//方法二，构造后赋材质
var ellipse = entity.ellipse;
ellipse.material = Cesium.Color.RED;
```

---

> 1. 颜色材质 类名为 ColorMaterialProperty
>
>    ```js
>    var ellipse = entities.ellipse;
>    ellipse.material = Cesium.Color.RED; // Cesium.Color.RED.withAlpha(0.1),
>    ---------------------------------------------------------------------------
>        
>    // 当然也可以这样, 这种情况不再累述。
>    var redBox = viewer.entities.add({
>      name: "Red box with black outline",
>      position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
>      box: {
>        dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
>        material: Cesium.Color.RED.withAlpha(0.1),
>        outline: true,
>        outlineColor: Cesium.Color.BLACK,
>      },
>    });
>    ```



> 2. 图片材质 类名为 ImageMaterialProperty
>
>    ```js
>    常用的属性 
>    	images => 可以是URL、Canvas 或 Video 
>        repeat => 代表x与y方向的重复次数
>    	color  => 颜色
>        
>    //完整的这么写
>    ellipse.material = new Cesium.ImageMaterialProperty({
>        image:'../images/cats.jpg',
>        color: Cesium.Color.BLUE,
>        repeat : new Cesium.Cartesian2(4, 4)
>    });
>    
>    //也可以简单的写成
>    ellipse.material = '../images/cats.jpg';
>    ```

> 3. 棋盘材质 类名为 Checkerboard-Material-Property
>
> ```js
> evenColor: 默认为白
> oddColor:  默认黑
> repeat: new Cesium.Cartesian2(4, 4) 重复次数
> 
> ellipse.material = new Cesium.CheckerboardMaterialProperty({
>   evenColor : Cesium.Color.WHITE,
>   oddColor : Cesium.Color.BLACK,
>   repeat : new Cesium.Cartesian2(4, 4)
> });
> 
> ```

`其他` http://cesium.xin/wordpress/archives/108.html 请参考这里的配置。





### 三、官方代码学习

```js
图层示范
https://sandcastle.cesium.com/index.html?src=Imagery%20Layers.html
```



#### 1 前言

>  `development/3D Models ` 非常典型的一个实例，其中涉及到了非常多的示范

> `knockout`本意是击打， 但这里更偏向于 `引入注目`的 toolbar的含义

上述有一个问题便是 `model`如何来的？

> 官方的`create a Model`的？

> Cesium.defaultValue
>
> ```js
> height = Cesium.defaultValue(height, 0.0);  // 返回 第一个参数或者第二个参数，仅此而已
> ```

---

#### 2  ⭐ model in primitives 

+ 这份代码应该从需求出发。其实是很有逻辑的。故此处顺序的是从逻辑出发。

+ 但我们写代码的时候一般都是先搭建好基础，再去写后面的。所以写的时候往往是从后往前。

  

1. 我们需要的`scene上增加一个 model`，比如 url 对应的glf是一架飞机

   ```js
   scene.primitives.add(model); 
   ```

2. `如何创建一个model呢？`

   Cesium提供了一个model类

   #### `Cesium.Model.fromGltf` (options) 目前我了解的到的生成model实例方法！

   > 从glTF资产创建模型。当模型准备好渲染时，即当外部二进制图像并下载着色器文件并创建WebGL资源，即可解析 [`Model＃readyPromise `](http://cesium.xin/cesium/cn/Documentation1.62/Model.html#readyPromise)。
   >
   > 该模型可以是扩展名为.gltf的传统glTF资产，也可以是扩展名为.glb的Binary glTF。

   ```js
   var tempModel = Cesium.Model.fromGltf(
   	url: url,
       modelMartrix: modelMartrix,
   )
   ```

3. 创建一个`modelMartrix`。 ``fromGltf``至少需要两个属性。 url 与 modelMartirx

   url 即 为我们的资源。"../../SampleData/models/CesiumAir/Cesium_Air.glb"

   modelMartirx参数要求 是一个 `Martirx（矩阵）	`类型的。 用于控制其位置与姿态

   ```js
   // 生成一个 HeadingPitchRoll实例
   var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
   
   // 从以度为单位的经度和纬度值返回Cartesian3位置。是Cartesian3我们需要笛卡尔坐标
   通俗点就是 此函数就是将经纬度与高度 变为了 x, y, z
   var origin = Cesium.Cartesian3.fromDegrees(
       -123.0744619,
       44.0503706,
       height
    );
   
   var modelMartrix = Cesium.Transforms.headingPitchRollToFixedFrame(
   	origin, // Cartesian 类型
       hpr		// HeadingPitchRoll类型
   );
   
   ```

4. 实际代码

```js
var viewer = new Cesium.Viewer("cesiumContainer");
var scene = viewer.scene; // 3d容器
var model; // 我们将要生成的一个 模型（实体）


var height = 5000.0;
var heading = 0.0;
var pitch = Cesium.Math.toRadians(10.0);
var roll = Cesium.Math.toRadians(-20.0);
createModel(
  "../../SampleData/models/CesiumAir/Cesium_Air.glb",
  height, heading, pitch, roll
);

function createModel(url, height, heading, pitch, roll) {
  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  var origin = Cesium.Cartesian3.fromDegrees(
    -123.0744619,
    44.0503706,
    height
  );
  var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    origin,
    hpr
  );
  scene.primitives.removeAll();
  model = scene.primitives.add(
    Cesium.Model.fromGltf({
      url: url,
      modelMatrix: modelMatrix,
      minimumPixelSize: 128,
    })
  );
}
```

> model.readyPromise

````js
model.readyPromise.then(function(model) => {
  model.Alpha = 0.5;
})

````

5. 若一个model大量重复怎么办？

   目的是 三维性能问题，这样添加三维性能不会很卡。

   > 参考sancards为 3D Models Instancing
   >
   > ModelInstanceCollection 的API请查看源码，api文档不提供将其设置为private。

   ```js
     var collection = scene.primitives.add(
       new Cesium.ModelInstanceCollection({
         url: url,
         instances: instances, // instance是一个model数组
       })
     );
   ```

6. Model子节点的控制

   3D Models Nodes Explorer

   ````js
   //  遍历其节点的所有子节点
   var options = Object.keys(model._runtime.nodesByName).map(function(nodeName) {
     return nodeName;
   });
   ````

   

#### 3 create a toolbar

```js
Cesium.knockout.track(viewModel); // => viewModel中的属性 变为观察者

var toolbar = document.getElementById("toolbar");
Cesium.knockout.applyBindings(viewModel, toolbar); // => 与dom互相绑定

// 注册事件
Cesium.knockout
  .getObservable(viewModel, "color") // 获得观察者
  .subscribe(function (newValue) {   // 
    model.color = Cesium.Color.fromAlpha(
      Cesium.Color[newValue.toUpperCase()],
      1
  );
});
// html的前提
<select data-bind="options: colors, value: color"></select>
```

#### 4 camera（相机）

可以参考这篇文档中camera的例子 https://www.cnblogs.com/cesium1/p/10062990.html

> 一些最常用的方法:

- [`Camera.setView(options)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#setView) : 立即设置相机位置和朝向。
- [`Camera.zoomIn(amount)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#zoomIn) : 沿着相机方向移动相机。
- [`Camera.zoomOut(amount)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#zoomOut) : 沿着相机方向远离
- [`Camera.flyTo(options)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#flyTo) : 创建从一个位置到另一个位置的相机飞行动画。
- [`Camera.lookAt(target, offset)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#lookAt) : 依据目标偏移来设置相机位置和朝向。
- [`Camera.move(direction, amount)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#move) : 沿着direction方向移动相机。
- [`Camera.rotate(axis, angle)`](https://cesiumjs.org/Cesium/Build/Documentation/Camera.html#rotate) : 绕着任意轴旋转相机。

viewer.camera提供

1. 相机的控制

> `scene.screenSpaceCameraController` 根据对画布的鼠标输入来修改相机的位置和方向
>
> `model.boundingSphere.radius`模型在其局部坐标系中的边界球的半径
>
>  `camera.frustum.near`可见空间区域的大小



`camera.lookAt`

```js
// 相机
var camera = viewer.camera; 
// 获取相机的控制器
var controller = scene.screenSpaceCameraController; //

//  当前的相机视图是该模型的两倍
var r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near);

// 相机最小倍的视图 是其 模型的0.5倍 （最小缩放到此）
controller.minimumZoomDistance = r * 0.5;

// 计算矩阵与 Cartesian3 的乘积 [Matrix4的矩阵、cartesian、result]
var center = Cesium.Matrix4.multiplyByPoint(
  model.modelMatrix,
  model.boundingSphere.center,
  new Cesium.Cartesian3(),	
);

var heading = Cesium.Math.toRadians(230.0); // 转为角度
var pitch = Cesium.Math.toRadians(-20.0); // 转为角度

camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, r * 2.0));
// lookAt会绑定 鼠标左键的旋转角
camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
```

2. `viewer.scene.camera.flyTo`

   + 第一个参数 [Cartesian3 ](http://cesium.xin/cesium/cn/Documentation1.62/Cartesian3.html)| [Rectangle](http://cesium.xin/cesium/cn/Documentation1.62/Rectangle.html)类型
   + orientation 包含方向和向上属性或航向，俯仰和横滚属性的对象。

   `Cesium.Cartesian3.fromRadians `从以弧度给出的经度和纬度值返回Cartesian3位置。

```js
viewer.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromRadians(
            -2.6399828792482234,
            1.0993550795541742,
            5795
          ),
          orientation: {
            heading: 3.8455,
            pitch: -0.4535,
            roll: 0.0,
          },
});
```

3. `viewer.zoomTo`viewer提供了一种相机方法

   ````js
   var heading = Cesium.Math.toRadians(90);
   var pitch = Cesium.Math.toRadians(-30);
   viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch));
   ````

   

#### 5 时间控制(Clock)

```js
// 设置时钟和时间线
viewer.clock.shouldAnimate = true; // 当viewer开启后，启动动画
viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");

viewer.clock.multiplier = 2; // 设置加速倍率
viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode(还没理解具体含义)
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环播放
viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // 设置时间的可见范围
```







#### 5.  imageryLayers（图层）



> 参考文章： https://www.cnblogs.com/fuckgiser/p/5647429.html
>
> 地图图层 若是细分便是 瓦片数据。

```JS
var viewer = new Cesium.Viewer("cesiumContainer", {
  skyBox: false, // 天空
  skyAtmosphere: false,
  contentOptions: {
    // 创建WebGL上下文的对象
    webgl: {
      // 应用程序需要使用alpha混合在其他HTML元素上方合成Cesium设置为true
      alpha: true,
    }
  }
});
// 仅在skyBox: false的时候生效, 设置背景色（天空）的颜色
viewer.scene.backgroundColor = Cesium.Color.PINK;

// 在没有可用图像时获取或设置地球的颜色
viewer.scene.globe.baseColor = Cesium.Color.PINK;
```

> 添加图层 更推荐的实例为： Imagery Layers manipulation

```js
// Add a bump layer with adjustable threshold
var singleTileLayer = layers.addImageryProvider(
  new Cesium.SingleTileImageryProvider({
    url: "../images/earthbump1k.jpg",
    rectangle: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
  })
);
singleTileLayer.colorToAlpha = new Cesium.Color(0.0, 0.0, 0.0, 1.0);
singleTileLayer.colorToAlphaThreshold = 0.1;
```

> 参考的实例为： Imagery Adjustment， 为图层的自适应颜色

```js
var imageryLayers = scene.imageryLayers;

var layer = imageryLayers.get(0); // ImageryLayerCollection.get当前的图层, 返回ImageryLayer
layer.brightness = viewMode.brightness;

顾名思义， 当图层发生变化的时候触发以下事件
imageryLayers.layerAdded.addEventListener(updateViewModel);
imageryLayers.layerRemoved.addEventListener(updateViewModel);
imageryLayers.layerMoved.addEventListener(updateViewModel);
```

####  6 切割图层 + 操作图层

>切割图层： https://sandcastle.cesium.com/index.html?src=Imagery%20Layers%20Split.html
>
>操作图层： https://sandcastle.cesium.com/index.html?src=Imagery%20Layers%20Manipulation.html

#### 7 多个图层 与 局部覆盖

> 参考实例： `Imagery Layers`

+ blackMarble是后添加的并且覆盖了整个地球， Black Marble 图层完全盖住了Esri图层, 现在我们不想让他覆盖。

  ```js
  办法1： blackMarble.alpha = 0.5; // 通过透明度。图层和Esri图层混合
  
  办法2： layers.lower(blackMarble); // 把Black Marble图层移到下面
  
  办法3： layers.lowerToBottom(blackMarble);
  ```

+ 指定某图层覆盖某一块地方`rectangle`

  ```js
  rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
  ```

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  imageryProvider: Cesium.createWorldImagery({
    style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
  }),
  baseLayerPicker: false,
});

var layers = viewer.scene.imageryLayers;
var blackMarble = layers.addImageryProvider(
  new Cesium.IonImageryProvider({ assetId: 3812 })
);

blackMarble.alpha = 0.5;

blackMarble.brightness = 2.0; // 增加亮度

// 这是一个单一图片的图层，他只会覆盖一个范围
layers.addImageryProvider(
  new Cesium.SingleTileImageryProvider({
    url: "../images/Cesium_Logo_overlay.png",
    rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
  })
); 
```





#### 9 地形 terrainProvider

> 使用地形 
>
> 地形虽然是 隶属于scene.globe下的，但是开发者为了方便使用，将其也放在scene下terrainProvider 
>
> 后续版本似乎又放在了scene.globe.terrainProvider 下

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: Cesium.IonResource.fromAssetId(3956), // 试试3957
  }),
});
```

> - [Terrain display options](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Terrain.html&label=Showcases) : 一些地形数据配置和格式
> - [Terrain exaggeration](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Terrain Exaggeration.html&label=Showcases) : 是地形间的高度差异更加的优雅艺术



#### 10 ⭐Entities(实体)

##### 1 初次使用

 [`Entity`](https://cesiumjs.org/Cesium/Build/Documentation/Entity.html)是一种对几何图形做空间和时间展示的数据对象。sandcastle 里提供了[很多简单的entity](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Box.html&label=Geometries)。

可以在实例去搜索 `geometries` 该标签页。  汉译为几何学, 提供了大量的实体类。

- [`Polygon`](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Polygon.html&label=Geometries)
- [`Polyline`](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Polyline.html&label=Geometries)
- [`Billboard`](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Billboards.html&label=Beginner)
- [`Label`](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/index.html?src=Labels.html&label=Beginner)

> 步骤 

1. 得有Cesium应用程序的基础对象 viewer.widget

2. 使用 viewer.entites.add新增一个entity。此方法也会返回当前的entity。

   此 add的参数是 【是一个符合Eneity构造函数的初始化配置对象】

3. viewer.toZoom(theEntity); // 移动到这里

```js
// 放一个卡车，并且移动过去
var modelEntity = viewer.entities.add({
    name: "milktruck",
    position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model: {
      uri:
        "../../SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",
    },
  });
 viewer.zoomTo(modelEntity);
```

##### 2. Entity集合增删改查

> 1. `增`实体

```js
//方法一
	// 1 创建实例
var entity = new Entity({
    id : 'uniqueId'
});
	// 2 在viewer上的实体集合上新增它
viewer.entities.add(entity);

// 简写
viewer.entities.add({
    id : 'uniqueId'
});

----------------------------------------
//方法二
var entity = viewer.entities.getOrCreateEntity('uniqueId');
```

> 2. `查`找实体

```js
var entity = viewer.entities.getById('uniqueId');
```

> 3. `删`

```js
//方法一，先查后删
var entity = viewer.entities.getById('uniqueId');
viewer.entities.remove(entity) 
//方法二，直接删除
viewer.entities.removeById('uniqueId')
//方法三，删除所有
viewer.entities.removeAll()
```

> 4. `变化`

```js
function onChanged(collection, added, removed, changed){
  var msg = 'Added ids';
  for(var i = 0; i < added.length; i++) {
    msg += '\n' + added[i].id;
  }
  console.log(msg);
}
viewer.entities.collectionChanged.addEventListener(onChanged);
```

> `修改描述信息`

```js
var viewer = new Cesium.Viewer('cesiumContainer');

var wyoming = viewer.entities.add({
  name : 'Wyoming',
  polygon : {
   ...............
  },
  description:'divID'//方法一
});
viewer.zoomTo(wyoming);

//方法二
wyoming.description = '\
<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="//cesiumjs.org/images/2015/02-02/Flag_of_Wyoming.svg"/>\
<p>\
  Wyoming is a state in the mountain region of the Western \
  United States.\
</p>\';
```

> `选中`
>
> 选中由 scene提供的方法来实现选中的。其提供了两个方法，且参数相同。

```js
scene.pickEntity(viewer, windowPosition);

scene.drillPickEntities(viewer, windowPosition);
```

##### 3 Entity管理





#### 11 DataSource (entities)

但entities更加复杂的怎么办呢？非常非常多的不能由我们一个个写吧？故可以通过kml文件去导入。

1. 【重点】使用KmlDataSource来从KML文件中读取点位数据。

2. 为了能在scene中使用这些载入的entity

   只有当这个promise的then回调中才可以把`KmlDataSource`添加到 [`viewer.datasources`](https://cesiumjs.org/Cesium/Build/Documentation/Viewer.html?classFilter=viewer#dataSources)。

````js
var viewer = new Cesium.Viewer("cesiumContainer");
var options = {
  camera: viewer.scene.camera,
  canvas: viewer.scene.canvas,
  clampToGround : false // 选项控制数据是否贴地,
};

var geocachePromise = Cesium.KmlDataSource.load(
  "../../SampleData/kml/facilities/facilities.kml",
  options
);
// load加载完毕
geocachePromise.then(function (dataSource) {
  // 把所有entities添加到viewer中显示
  viewer.dataSources.add(dataSource);
    
  // 获得entity列表
  var geocacheEntities = dataSource.entities.values;
  
  for (var i = 0; i < geocacheEntities.length; i++) {
     var entity = geocacheEntities[i];
     if (Cesium.defined(entity.billboard)) {
     	    // 调整垂直方向的原点，保证图标里的针尖对着地表位置 
            entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
            // 去掉文字的显示
            entity.label = undefined;
            // 设置可见距离
            entity.billboard.distanceDisplayCondition = new 			Cesium.DistanceDisplayCondition(10.0, 20000.0);
     }
  }  
});
````

我们可以对kml中的entities进行更加复杂的操作

```js
 if (Cesium.defined(entity.billboard)) {
           
            entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM; 
            entity.label = undefined; 
            entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20000.0);
            // 计算经度和纬度（角度表示）
            var cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
            var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
            var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
            // 修改描述信息 
            var description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
                '<tr><th>' + "经度" + '</th><td>' + longitude.toFixed(5) + '</td></tr>' +
                '<tr><th>' + "纬度" + '</th><td>' + latitude.toFixed(5) + '</td></tr>' +
                '</tbody></table>';
            entity.description = description;
        }
```

此处的示范复杂【无人机飞跃城市上空的高科技效果】：没有实例。

 https://www.cnblogs.com/cesium1/p/10062990.html 



#### 11 billboards | labels

> 重要解释。 
>
> primitives中数组可以放置 
>
> `globe | model | primitive | billboards/lables/points/ | viewporQuard`
>
> 我们当可以通过 scene.entities去快速的add一个billboard、label这类。
>
> entities去实现和 scene.primitives去add的效果确实是一样的。entites是高等级的数据驱动。

##### 基本示范

> 例子：development/billboards 

````js
var billboards = scene.primitives.add(
  new Cesium.BillboardCollection()
);
billboards.add({
  image: "../images/Cesium_Logo_overlay.png",
  position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
});
````

##### 创建时可以添加属性

````js
billboards.add({
    image: "../images/Cesium_Logo_overlay.png", // default: undefined
    show: true, // default
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
    eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
    scale: 2.0, // default: 1.0
    color: Cesium.Color.LIME, // default: WHITE
    rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
    alignedAxis: Cesium.Cartesian3.ZERO, // default
    width: 100, // default: undefined
    height: 25, // default: undefined
    sizeInMeters: false, // default
  });
````

##### add后也可以更改属性

````js
billboardsItem.scale = 3.0;
````

##### 设置实际大小

```js
sizeInMeters: true
```

##### ⭐Scale by viewer



`NearFarScalar`方法的四个参数

+ 参数一： 最近的距离 (near)
  参数二： 最小比例 (minScale)
  参数三： 最远距离 (far)
  参数四： 最大缩放比 （maxScale）

1. `distance的线性变化`

````js
billboards.add({
    image: "../images/facility.gif",
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
 });
````

`offset by viewer offeset`

`偏移的线性变化`

````js
 
pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
          1.0e3,
          1.0,
          1.5e6,
          0.0
 ),
````

`透明度的线性变化` => `translucencyByDistance`

```js
    	// 根据广告牌到相机的距离获取或设置广告牌的近和远半透明属性
        translucencyByDistance: new Cesium.NearFarScalar(
          1.0e3,
          1.0,
          1.5e6,
          0.1
        ),
```



##### ⭐ 设置相对点 （in reference frame）

默认的 初点是地球的中心，所以 Cartesian的三个值都很大

=> 更好的方案，通过偏移来控制它们的位置

0. 关于 `Cesium.Transforms.eastNorthUpToFixedFrame`

   一般开发与实际中我们也只会用此坐标系。即 x 朝东， y朝北。

   sandCastle也提供了一个例子示范： `LocalToFixedFrame`

   > 备注： 在之前我们的代码中，我们可以知道 要创建一个modelMartrix您应该有 postion 与 hpr。
   >
   > 但这里是通过 eastNorthToFixedFrame去生成的，那么即帮你确认了方向为 x朝向东，y朝向北这件事情。所以可以略hpr，只传position。
   >
   > 
   >
   > modelMartrix 需要方向的原因，因为你站在地球的任何一个点上，其面向东的方向都会不一样，这是一个三维的世界。
   >
   > 若是二维地图则是上北下南永远不变。

1. 第一步，设置 billboardCollection的 modelMartrix

   ```js
     var billboards = scene.primitives.add(
       new Cesium.BillboardCollection()
     );
     var center = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
     billboards.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
       center // Cartesian3 类型
     );
   ```

2. 



#####  add canvas on billboards

可以通过js创建一个canvase的dom元素，然后添加至 billboards上也是可以实现的。

配置 image为 此dom对象即可。

---

#### 11 3DTiles 略。 同上链接的示范

此处略掉，若有需要可以参考。



---

#### 12 ⭐交互(pick)

即 与 `scene`进行交互。

+ Scene.pick ：      返回窗口坐标对应的图元的第一个对象 
+ Scene.drillPick :  返回窗口坐标对应的所有对象列表
+ Globe.pick :         返回一条射线和地形的相交位置点

> `movement.endPositions` 是一个 `Cartesian2`的实例！

以下四个实例都是参考:

> http://localhost:8080/Apps/Sandcastle/index.html?src=Picking.html&label=Tutorials Picking

##### 1 地球上mouseover显示经纬度

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  selectionIndicator: false,
  infoBox: false,
});
var scene = viewer.scene;

// 1 检测当前浏览器是否支持 scene.pick功能
if (!scene.pickPositionSupported) {
  window.alert("This browser does not support pickPosition.");
}

var handler;
var entity = viewer.entities.add({
  label: {
    show: false,
    showBackground: true,
    font: "14px monospace",
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    verticalOrigin: Cesium.VerticalOrigin.TOP,
    pixelOffset: new Cesium.Cartesian2(15, 0),
  },
});
/* 
*  Mouse over the globe to see the cartographic position
*  ScreenSpaceEventHandler 
*  是一个可以添加自定义用户输入输出事件的对象
*  第二个参数为 Cesium.ScreenSpaceEventType.MOUSE_MOV
*  canvas: 用于为其创建场景的HTML canvas元素
*/
handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
// 设置要在输入事件上执行的功能。
handler.setInputAction(function (movement) {
  // pickEllipsoid 选择一个椭球或地图。返回Catesian3类型。
  var cartesian = viewer.camera.pickEllipsoid(
    movement.endPosition, // 像素的x和y坐标: Cartesian2
    scene.globe.ellipsoid // 要拾取的椭球: 地球这个椭圆体
  );

  if (cartesian) {
    // 从笛卡尔位置创建一个新的制图实例 目的是获得经度与纬度
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //
    // 经度
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
      2
    );
    // 纬度
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
      2
    );
    entity.position = cartesian;
    entity.label.show = true;
    entity.label.text =
      "Lon: " +
      ("   " + longitudeString).slice(-7) +
      "\u00B0" +
      "\nLat: " +
      ("   " + latitudeString).slice(-7) +
      "\u00B0";
  } else {
    entity.label.show = false;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
```

##### 2 billboard的高光显示

```js
Sandcastle.addToolbarButton("Pick Entity", function () {
  var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    billboard: {
      image: "../images/Cesium_Logo_overlay.png",
    },
  });

  // If the mouse is over the billboard, change its scale and color
  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    var pickedObject = scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
      entity.billboard.scale = 2.0;
      entity.billboard.color = Cesium.Color.YELLOW;
    } else {
      entity.billboard.scale = 1.0;
      entity.billboard.color = Cesium.Color.WHITE;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});

```

##### 3 drill-down-picking（一个鼠标触发了两个实体）

````js
// Move the primitive that the mouse is over to the top.
  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    // get an array of all primitives at the mouse position
    var pickedObjects = scene.drillPick(movement.endPosition);
    if (Cesium.defined(pickedObjects)) {
      //Update the collection of picked entities.
      pickedEntities.removeAll();
      for (var i = 0; i < pickedObjects.length; ++i) {
        var entity = pickedObjects[i].id;
        pickedEntities.add(entity);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
````

##### 4 小卡车上上显示固定的经纬度

````js
Sandcastle.addToolbarButton("Pick position", function () {
  var modelEntity = viewer.entities.add({
    name: "milktruck",
    position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model: {
      uri:
        "../../SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",
    },
  });
  viewer.zoomTo(modelEntity);

  var labelEntity = viewer.entities.add({
    label: {
      show: false,
      showBackground: true,
      font: "14px monospace",
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(15, 0),
    },
  });

  // Mouse over the globe to see the cartographic position
  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    var foundPosition = false;
    var scene = viewer.scene;
    // scene.mode 当前设置场景的模式
    // 其SceneMode有几种模式，MORPHING为模式变形。例如2D到3D模式变形
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      // 返回具有primitive属性的对象
      var pickedObject = scene.pick(movement.endPosition);
      if (
        scene.pickPositionSupported &&
        Cesium.defined(pickedObject) &&
        pickedObject.id === modelEntity
      ) {
        // 根据Cartesian2来获取 Cartesian3的位置
        var cartesian = viewer.scene.pickPosition(movement.endPosition);
        // defined只是判断它是否存在而已，源码如此
        if (Cesium.defined(cartesian)) {
          // Cartesian3 转为 Cartographic经纬度
          var cartographic = Cesium.Cartographic.fromCartesian(
            cartesian
          );
          var longitudeString = Cesium.Math.toDegrees(
            cartographic.longitude
          ).toFixed(2);
          var latitudeString = Cesium.Math.toDegrees(
            cartographic.latitude
          ).toFixed(2);
          var heightString = cartographic.height.toFixed(2);

          labelEntity.position = cartesian;
          labelEntity.label.show = true;
          labelEntity.label.text =
            "Lon: " +
            ("   " + longitudeString).slice(-7) +
            "\u00B0" +
            "\nLat: " +
            ("   " + latitudeString).slice(-7) +
            "\u00B0" +
            "\nAlt: " +
            ("   " + heightString).slice(-7) +
            "m";

          labelEntity.label.eyeOffset = new Cesium.Cartesian3(
            0.0,
            0.0,
            -cartographic.height *
              (scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0)
          );

          foundPosition = true;
        }
      }
    }

    if (!foundPosition) {
      labelEntity.label.show = false;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});
````

##### 5 pick到了一个 billboard对象

> 我觉得这样的写法更好理解！👇

````js
// 当鼠标移到了我们关注的图标上，修改entity 的billboard 缩放和颜色
handler.setInputAction(function(movement) {
    var pickedPrimitive = viewer.scene.pick(movement.endPosition); //primitive属性
    // 其pickedPrimitive.id就是该实体
    var pickedEntity = (Cesium.defined(pickedPrimitive)) ? pickedPrimitive.id : undefined;
    // Highlight the currently picked entity
    if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.billboard)) {
        pickedEntity.billboard.scale = 2.0;
        pickedEntity.billboard.color = Cesium.Color.ORANGERED;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

这是不完善的代码，因为光标离开的时候，并没有把高光取消。
````

##### 6 判断是一个 model

````js
if (Cesium.defined(pick) && Cesium.defined(pick.node) && Cesium.defined(pick.mesh))
````



#### 13 相机模式（追踪实体）

相机模式指的是【自由模式】与【无人机模式】

1. 无人机模式

```js
 viewer.trackedEntity = theEntites;

跟随一个entity要求position属性必须存在
```

2. 自由模式

   默认便是自由模式

   ```js
   viewer.trackedEntity = undefined;
   viewer.scene.camera.flyTo(homeCameraView); // 在切换来视图
   ```

   



---

### ？

#### 1. Animation主题

+ 首先添加一个CSS文件，并将其导入

  因为CSS实现原因，一般我们会给与 document.body.className = "cesium-lighter"

+ `viewer.animation.applyThemeChanges(); `  

  如果不执行，主题变换不完全(部分变成黑色主题，部分还是亮色主题).

#### 2 天地图提供的图层

+ 大体如下，

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.com/img_w/wmts?",
    layer: "img",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "w",
    credit: new Cesium.Credit("天地图全球影像服务"),
    maximumLevel: 18,
  }),
  baseLayerPicker: false,
});
```

#### 3 









---

### 五、 公司代码

> 目录： huitong项目中  src\components\map\cesium-map-viewer.vue
>


> 我的意见：由于笔记有限，大部分代码会被省略（很多内容应该理解，潜移默化）。
>
> 本次学习公司代码 目的是从 真正的实践代码与业务代码中明白这样一件事情——Cesium的在实际业务中如何去应用？、

#### 0 疑问

1. id名为cesiumContainer的dom内部还可以存在组件即其他dom元素， 此dom是否只是一个背景板？
2. 



#### 1. cesium-map-viewer.vue

在【mounted】进行 init 的函数操作，将Cesium实例渲染上去。

```js
1 new Viewer => 其本质是 new Cesium.Viewer 只不过我们按需导出, 也更加简洁。

2 通过 new Viewer的配置 隐藏大部分Viewer自带的控件。

并设置 baseLayerPicker 为 false, 则可以i
```





