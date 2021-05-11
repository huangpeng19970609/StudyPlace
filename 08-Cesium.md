### 一、前言：

+ CesiumJS 是一款用于创建虚拟场景的3D地理信息平台（基于JavaScript），是一个地图可视化框架。
+ 浏览器必须支持WebGL
+ 当前最新git下载地址： https://github.com/CesiumGS/cesium
+ Cesium内提供的类真的是太多了，太多了！好在它也知道这个问题，提供了大量的实例参考。

#### 1 Cesium目录框架结构

- Source/: Cesium应用程序代码及数据
- ThirdParty/：外部依赖库，不同于Cesium的第三方库
- LICENSE.md：Cesium的License介绍
- index.html：Web首页，需要按照Cesium要求定义页面，同时添加Cesium依赖库
- server.js：基于node.js的web服务应用

#### 2  重要知识汇总

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

5. 移动当前的视觉

   ```js
   viewer.zoomTo(viewer.entities); // 移动到该 viewer的实体
   ```

6. `Entity API和Primitive API`

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

7. 

#### 3 其他

获取将在地球上渲染的图像图层的集合  

```js
var layers = viewer.scene.imageryLayers;
```

显示帧速 => 即网络频率与刷新的fps（参考王者荣耀的右上角的网络情况）

```js
viewer.scene.debugShowFramesPerSecond = true; 
```

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

#### 2、Viewer小控件

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
// 创建 Cesium球
var viewer = new Cesium.Viewer("cesiumContainer");
// 获取将在地球上渲染的图像图层的集合。
var imageryLayers = viewer.imageryLayers; 

// The viewModel tracks the state of our mini application.
var viewModel = {
  brightness: 0,
  contrast: 0,
  hue: 0,
  saturation: 0,
  gamma: 0,
};
// Convert the viewModel members into knockout observables.
// Cesium.knock能够使Cesium球体监听html控件, 从而根据控件的值实时改变一些地图属性.
Cesium.knockout.track(viewModel); // 即 监测viewModel中的属性

// Bind the viewModel to the DOM elements of the UI that call for it.
// 激活属性,将viewModel对象与html控件绑定， 可以理解为双向绑定。
var toolbar = document.getElementById("toolbar");
Cesium.knockout.applyBindings(viewModel, toolbar);

// Make the active imagery layer a subscriber of the viewModel.
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

#### 6 实例的 增、查、删、实体集变化回调事件、描述信息与选中事件

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







#### 7 3D Tiles数据集

入门（六）(七)没看懂。可以回去结合代码去观看。

> http://cesium.xin/wordpress/archives/104.html

3D Tiles用于流式传输3D内容，包括建筑物、树木和矢量数据。

`ModelMatrix`





#### 8 设置材质

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

#### 2 created a model

+ 这份代码应该从需求出发。其实是很有逻辑的。故此处顺序的是从逻辑出发。

+ 但我们写代码的时候一般都是先搭建好基础，再去写后面的。所以写的时候往往是从后往前。

  

1. 我们需要的`scene上增加一个 model`，比如 url 对应的glf是一架飞机

   ```js
   scene.primitives.add(model); 
   ```

2. `创建一个model`

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

#### 4 viewer.camera

viewer.camera提供

> `scene.screenSpaceCameraController` 根据对画布的鼠标输入来修改相机的位置和方向
>
> `model.boundingSphere.radius`模型在其局部坐标系中的边界球的半径
>
>  `camera.frustum.near`可见空间区域的大小

```js
// 获取相机
var controller = scene.screenSpaceCameraController; //

//  当前的相机视图是该模型的两倍
var r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near);

// 相机最小倍的视图 是其 模型的0.5倍 （最小缩放到此）
controller.minimumZoomDistance = r * 0.5;

var center = Cesium.Matrix4.multiplyByPoint(
  model.modelMatrix,
  model.boundingSphere.center,
  new Cesium.Cartesian3()
);

var heading = Cesium.Math.toRadians(230.0); // 转为角度
var pitch = Cesium.Math.toRadians(-20.0); // 转为角度

camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, r * 2.0));

```



### 四、 公司代码

> 目录： huitong项目中  src\components\map\cesium-map-viewer.vue



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





