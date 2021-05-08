### 一、helloWorld

> 初次使用，以创建一张地图来解释。

```js
1. 引入对应的css 与 js不再累述
<link rel="stylesheet" href="https://js.arcgis.com/4.19/esri/themes/light/main.css">
<script src="https://js.arcgis.com/4.19/"></script>

2. 给与 要被绑定的盒子 以宽高

3. 正式调用对应的 【api】以实现。
require(["esri/config", "esri/Map", "esri/views/MapView"], function (
  esriConfig,
  Map,
  MapView
) {
  esriConfig.apiKey =
    "AAPK467c9cb52f824819bc6a7727706079f7dQZBbs3LPniJWWJmRj9CUZbRrbRRNT-UeG5wFwY91QG02JW6BdzhF-CS71T78kMb";
  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });
  const view = new MapView({
    map: map,
    center: [-118.805, 34.027], // Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv" // Div element
  });
});
```

1. `require`

   是【dojo】提供的一个全局函数。遵循AMD规范。require是模块化方法的一种，本质是JavaScript模块加载器。这里引入的js也是如此，太细节的内容略。

   + 【参数解释】

     第一个参数是数组用于加载的模块。

     第二个参数是回调函数。`注意前后加载的顺序一定要一致`

     ```js
     require(["esri/config", "esri/Map", "esri/views/MapView"], function (
       esriConfig,
       Map,
       MapView
     )
     他们是一一对应的关系， 第一个是【esri/config】那么回调参数的第一个也应该是【esriConfig】
     ```

     其他: 如``dojo/domReady!`有感叹号标识，代表其为插件。此插件的作用是，当Html的dom加载完毕后在执行此函数

2. `new MapView`的实例配置的那些属性

   

3. 

