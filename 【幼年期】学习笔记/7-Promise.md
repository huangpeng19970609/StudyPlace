## 1、前后端的交互

- ​    JQuery的ajax侧重于DOM操作，有自己的缺陷。
- ​	故有了fetch、axious，两种调用接口的方式。
- ​    URL地址：**schema：//host :// port / path ? query # fragment**
  - schema为协议，host为域名，port为端口号，query是查询参数，fragment用于定位页面
- Restful形式的URL：
  - GET查、POST增、DELETE删、PUT更新

## 2、Promise

- console.dir(Promise)
- console.log(type of Promise)    ===> 是一个function 
- 本意为承诺，避免回调地狱、更简洁的异步操作

​	JS异步调用：①定时任务 ②Ajax ③事件函数   多次异步调用不稳定，且需要嵌套依赖

![](D:\WEB Study\前端笔记\images\4.png)

```javascript
1、实例化Promise对象，构造函数中传递函数，该函数用于处理异步
	resolve、rejcet失败，通过p.then获得结果
```

​	而Promise解决调用嵌套，提供更简洁的API，Promise承诺异步。

![](D:\WEB Study\前端笔记\images\5.png)

## 3、JQuery的Ajax示范

```javascript
/index.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 处理静态资源
app.use(express.static('public'))
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// 路由
app.get('/data', (req, res) => {
  res.send('Hello World!')
})

// 启动监听
app.listen(3000, () => {
  console.log('running...')
})
```

```javascript
<script>
        var ret ;
        $.ajax({
            url:'http://localhost:3000/data',
            success:function(data){
                //ajax异步，这里的data并没有给ret
                ret = data;
                console.log(data);
            },
        });
        //异步,故打印undefined，这里拿不到 ajax的data值！所以我们需要Promise！
        console.log(ret);
</script>
```

## 4、第一个Promise

```javascript
 <script>
        //resolve与reject这两个参数皆是方法
        var p = new Promise(function(resolve,reject){
            //定时器是一个简单的异步任务
            setTimeout(function(){
                var flag = false;
                if(flag) {
                    resolve('正常情况');//成功时调用resolve
                }else{
                    reject('出错了');//失败时调用reject
                }
            },1000);
        });
		//变成了线性结构！
        p.then(function(data){
            //接收正常情况下数据
            console.log(data);
        },function(info){
            //接收出错情况下数据
            console.log(info);
        });
    </script>
```

## 5、实际应用 Promise处理Ajax请求

```javascript
/index.js 中有了多个路由的时候
app.get('/data1', (req, res) => {
  res.send('Hello World!')
})
app.get('/data2', (req, res) => {
  res.send('Hello World22!')
})
app.get('/data3', (req, res) => {
  res.send('Hello World33!')
})
```

```javascript
<script>
        function queryData(url){
            var p = new Promise(function(resolve,reject){
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(xhr.readyState != 4 ){
                        return;
                    }
                    if(xhr.readyState == 4 &&  xhr.status == 200){
                        resolve(xhr.responseText);
                    }else{
                        reject('错误信息');
                    }
                }
                xhr.open('get',url);
                xhr.send(null);
            });
    		//最终都会返回一个promise实例对象
            return p;
        }
        // queryData('http://localhost:3000/data').then(function(data){
        //     console.log(data);
        // },function(info){
        //     console.log(info);
        // })
//线性风格，不再回调地狱
        queryData('http://localhost:3000/data1')
        .then(function(data){
            console.log(data);
            return queryData('http://localhost:3000/data2')
        })
        .then(function(data){
            console.log(data);
            return queryData('http://localhost:3000/data3')
        })
        .then(function(data){
            console.log(data);  
        })
    </script>
```

![](D:\WEB Study\前端笔记\images\5 (2).png)

## 6、Promise返回

![](D:\WEB Study\前端笔记\images\6.png)

比如 我们之前一个例子，不断的去then，就是因为我们返回了p这个promise实例对象！

![](D:\WEB Study\前端笔记\images\7.png)

- console.log(data) 即打印 hello
- resolve（123） 会给下一个then 的data数据123值
- 

## 7、Promise常见的API

- p.then() 获得异步任务的正确结果
- p.catch() 获得异常信息
- p.finally() 	成功与否都会执行

![](D:\WEB Study\前端笔记\images\8.png)

实例：

![](D:\WEB Study\前端笔记\images\9.png)

![](D:\WEB Study\前端笔记\images\10.png)

每一个p1，p2，p3代表的是promise对象。

## 8、fetch概述

更加简单的数据获取方式，相当于xhr的升级版本。基于Promise实现

```javascript
fetch(url).then(fn2)
		  .then(fn3)
		  .........
		  .catch(fn)
实例应用
 <script>
        fetch('http://localhost:3000/fdata').then(function(data){
            //这个text方法属于fetch的一部分！
            //想拿数据对象.该text返回一个promise实例对象，用于获取后台的数据
            //下一个then拿到真正的数据
            return data.text();
        }).then(function(data){
            console.log(data);
        });
</script>
/index.js
app.get('/fdata', (req, res) => {
  res.send('Hello World!')
})
```

### fetch的get请求参数

![](D:\WEB Study\前端笔记\images\11.png)

```javascript
/传统
fetch('http://localhost:3000/fdata?id=123')
// 路由   
app.get('/fdata', (req, res) => {
  res.send('Hello World!' + req.query.id)
})
```

```javascript
/Restful提供的get加参数的方式
//  :id    fdata/123   req.params.id
fetch('http://localhost:3000/fdata/123').
app.get('/fdata/:id', (req, res) => {
  res.send('Hello World!' + req.params.id)
})
//若是delete，直接app.delete便好。
```

### POST请求的参数传递

​	使用post需要额外的设置methods 为 post  （本来methods默认为get的），

​	需要设置body，与headers。

简而言之，post请求提交了一个请求体的对象。

​	![](D:\WEB Study\前端笔记\images\12.png)

![](D:\WEB Study\前端笔记\images\13.png)

**		设置JSON格式请求体发送：**

![](D:\WEB Study\前端笔记\images\14.png)

```javascript
使用json必须在index.js中提前写好中间件处理json数据
// 处理参数
app.use(bodyParser.json());
```

### PUT提交参数数据，更改method就好了

![](D:\WEB Study\前端笔记\images\15.png)

![](D:\WEB Study\前端笔记\images\16.png)

**一个接收JSON的实例：**

```javascript
app.get('/fdata', (req, res) => {
  res.json({
      uname: '李四',
      number: 123,
  });
})
<script>
    /其实如果依旧使用data.text();其返回的只是一个键值对的字符串，并非是对象了，我们没法解析，但我们可以使用一种方式，var obj = JSON.parse(data);便可以将其转为json格式
        fetch('http://localhost:3000/fdata/123').then(function(data){
            //这个text方法属于fetch的一部分！
            //想拿数据对象.该text返回一个promise实例对象，用于获取后台的数据
            //下一个then拿到真正的数据
            return data.json();
        }).then(function(data){
            //则我们拿到JSON这个对象了，对齐解析便好！
            console.log(data.uname);
        });
</script>
```

## 9、☆☆☆axious调用接口，比fetch更加强大！

```javascript
/这里获取数据的方式 通过ret.data获得的，属于axios一部分 ，可以打印ret看一看
axios.get('http://localhost:3000/data').then(function(ret){
            console.log(ret.data)
 })
```

### axious的常用的API

1. get
2. post
3. put
4. delete

### 1、get传递参数

```javascript
/1、url直接传参,通过url传递 id=1000
axious.get('http://localhost:3000/data?id=1000').then(function(ret){
            console.log(ret.data);
});
	//对应的路由
app.get('/data', (req, res) => {
  res.send('你好，axious'+ req.query.id);
});
/2、restful传递参数格式 data/id
 axious.get('http://localhost:3000/data/id').then(function(ret){
            console.log(ret.data);
 });
//对应的路由
app.get('/data/:id', (req, res) => {
  res.send('你好，axious'+ req.params.id);
});
/3、axios提供的传参方式！这种方式很好使用。
 axios.get('http://localhost:3000/data',{
            params: {
                id: 10000,
            }
        }).then(function(ret){
            console.log(ret);//这里是前端页面控制台才能显示的
            console.log(ret.data);
        });
//对应路由,直接访问路由，路由会打印的内容
app.get('/data', (req, res) => {
  res.send('你好，123axious'+ req.query.id);
}) 
```

### 2、delete方式与get差不多

### 3、axios的post请求传参方式

```javascript
/1、通过选项传递参数。注意post请求方式！
 axios.post('http://localhost:3000/data',{
     	/提交的是json数据，，后台需要支持json
            uname: '123123',
            pwd: 'hp1234',
       }).then(function(ret){
            console.log(ret.data);
       });
//对应路由：
app.post('/data', (req, res) => {
  res.send('你好，axious'+ req.body.uname + req.body.pwd);/是body！
});
/2、通过URLSearchParam传递参数
 <script>
      var params = new URLSearchParams();
      params.append('uname','张三');
      params.append('pwd','j123');
      axios.post('http://localhost:3000/data',params).then(function(ret){
            console.log(ret.data);
      });
</script>
//对应路由：
app.post('/data', (req, res) => {
  res.send('你好，axious'+ req.body.uname + req.body.pwd);/是body！
});
```

### 4、put请求方式

```javascript
 axios.put('http://localhost:3000/data/123',{
          uname: 'lisi',
          pwd:'p123',
      }).then(function(ret){
            console.log(ret.data);
      });
app.put('/data/:id', (req, res) => {
  res.send('你好，axious'+ req.body.uname + req.body.pwd + req.params.id);
}) 
```

### 5、axios的响应参数

```javascript
app.get('/data', (req, res) => {
  res.json({
      uname: '李四',
      paw: '牌23',
  });
}) 
//对应的页面：
axios.get('http://localhost:3000/data',{
      }).then(function(ret){
            console.log(ret.data);
            console.log(ret.data.uname);
      });
```

### 6、axios的全局配置

```javascript
 <script>
      //1、配置请求的基准URL,请求只需要写data就好了
      axios.defaults.baseURL = 'http://localhost:3000/';
      //2、配置请求头信息,则会多一个请求体信息 mytoken ：hello,但跨越的话需要路由配置
      axios.defaults.headers['mytoken'] = 'hello';
      axios.get('data',{
      }).then(function(ret){
            console.log(ret.data);
            console.log(ret.data.uname);
      });
    </script>
//我们的跨域操作
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'mytoken');
  next();
});
```

### 7、axos拦截器

![](D:\WEB Study\前端笔记\images\17.png)

```javascript
/请求拦截器 
<script>
      axios.interceptors.request.use(function(config){
        config.headers.mytoken = '你好';
    // res.header('Access-Control-Allow-Headers', 'mytoken'); 跨越！
        return config;
      },function(err){
          console.log(err);
      });
      axios.get('http://locaohost:3000/data').then(function(ret){
        console.log(ret);
      });
 <script>
```

![](D:\WEB Study\前端笔记\images\18.png)



```javascript
/响应拦截器
<script>
      axios.interceptors.response.use(function(res){
          //res对象与config都是同一类型的对象
          //响应拦截器中的res就是 其 axios中间件 的ret参数，通过这样操作，直接让ret代表了data
        var data = res.data; 
        return data;
      },function(err){
          console.log(err);
      });
      axios.get('http://locaohost:3000/data').then(function(ret){
        //现在ret就是 “Hello，world”,即原本的ret.data
        console.log(ret);
      });
    </script>
```

## 10、接口调用 async/await用法

![](D:\WEB Study\前端笔记\images\19.png)

![](D:\WEB Study\前端笔记\images\20.png)

![](D:\WEB Study\前端笔记\images\21.png)

```javascript
/ 使用await就可以得到异步的结果！特别神奇！
<script>
      axios.defaults.baseURL = 'http://localhost:3000';
      async function queryData() {
        //编写顺序便是执行的顺序！
        var info = await axios.get('async1');//必须加await才可以获得异步的结果 
        var ret  = await axios.get('async2?info='+info.data);
        return ret.data;
      }
      queryData().then(function(data){
        console.log(data);
      });
    </script>
// 路由
app.get('/async1', (req,res) => {
  res.send('hello');
});
app.get('/async2', (req, res) => {
  if(req.query.info == 'hello'){
    res.send('world');
  }else{
    res.send('err');
  }
})
```

## 11、实际开发：

### 1、数据加载 

​	响应加载器、async/awiat方式

```javascript
/先使用响应拦截器，任何响应都将其返回其内的数据
axios.interceptors.response.use(function(res){
      return res.data;
    }, function(error){
      console.log(error)
    });
/则该Vue实例对象的Methods属性的方法：直接一句话就可以解决了,不需要ret.data再赋值了
queryData: async function(){
          // 调用后台接口获取图书列表数据
          // var ret = await axios.get('books');
          // this.books = ret.data;

          this.books = await axios.get('books');
        }
```

### 2、添加图书



























