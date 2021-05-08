### 一、前言：

+ CesiumJS 是一款用于创建虚拟场景的3D地理信息平台（基于JavaScript），是一个地图可视化框架。

+ 浏览器必须支持WebGL

### 二、入门教程

#### 0、初次使用

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



#### 1、默认的Viewer自带了一些有用的组件：

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

#### 2、Viewer一些基本的参数

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
    animation: true, //是否显示动画控件(左下方那个)
    baseLayerPicker: true, //是否显示图层选择控件
    geocoder: true, //是否显示地名查找控件
    timeline: true, //是否显示时间线控件
    sceneModePicker: true, //是否显示投影方式控件
    navigationHelpButton: false, //是否显示帮助信息控件
    infoBox: true, //是否显示点击要素之后显示的信息
});
```

> 主要介绍 `baseLayerPicker`此参数。

`baseLayerPicker`*是否显示图层选择控件*

若设置【不可见】则需要【设置自定义图层作为默认图层】 => 这是必须的。

设置可见之后也可以更改其中的图层为自定义图层。 随便你。

