### 一、前言：

+ CesiumJS 是一款用于创建虚拟场景的3D地理信息平台（基于JavaScript），是一个地图可视化框架。
+ 浏览器必须支持WebGL
+ 当前最新git下载地址： https://github.com/CesiumGS/cesium

#### 1 Cesium目录框架结构

- Source/: Cesium应用程序代码及数据
- ThirdParty/：外部依赖库，不同于Cesium的第三方库
- LICENSE.md：Cesium的License介绍
- index.html：Web首页，需要按照Cesium要求定义页面，同时添加Cesium依赖库
- server.js：基于node.js的web服务应用

#### 2  一些重要知识汇总

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

6. 

#### 3 快速查询的自定义表格

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
    homeButton:false,
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

####  4 图层 knockout



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