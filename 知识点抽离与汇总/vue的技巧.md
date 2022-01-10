https://segmentfault.com/a/1190000020620972

### 动态加载文件夹内模块

> webpack依赖的node提供的方法
>
> - require.context
>   1. directory：说明需要检索的目录
>   2. useSubdirectories：是否检索子目录
>   3. regExp: 匹配文件的正则表达式,一般是文件名

- 例子一  批量获取某文件夹下所有的文件

  ```js
  const context = require.context(
    "/public/images/radar/maptime",
    false,
    /\.png$/
  );
  let imagesArr = [];
  context.keys().forEach((item) => {
    imagesArr.push(item.replace(/^\.\//, ""));
  });
  ```

- 例子二 批量导入vue文件

  ````js
  const path = require('path')
  const files = require.context('@/components/home', false, /\.vue$/)
  const modules = {}
  files.keys().forEach(key => {
    const name = path.basename(key, '.vue')
    modules[name] = files(key).default || files(key)
  })
  components:modules
  ````

### props的校验

```js
props:{
 inpVal:{
  type:Number, //传入值限定类型
  default:200,  //默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
  required: true, //是否必传
  validator:(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
 }
```

### $attrs和$listeners

- 【$attrs】

  