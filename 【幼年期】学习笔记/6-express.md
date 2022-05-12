# Express框架

## 1、Express的作用:

- 路由定义方式
- 对HTTP的参数可以实现简化的处理
- 提供中间件控制HTTP

## 2、中间件

接收请求、处理请求

中间件由两部分组成：一个是Express提供的方法，二是请求处理函数

```javascript
app.get('请求路径','处理函数')
//get是Express提供的方法
```

这些中间件默认是同上到下进行匹配的，遇到请求路径相同即停止。

```javascript
/当请求方式为get时候，请求路径为requeste的时候，会执行该组件，因为使用了next（）方法，即使匹配成功也会继续往下匹配。
app.get('/requeste',(req,resp,next) => {
   console.log('11');
    next();
});
/使用app.use方法，不管什么请求我都会来执行！
app.use('请求路径'，'请求函数')
```

## 3、错误中间件

错误处理中间件，只能捕获到同步代码执行出错

```javascript
/错误处理中间件，只能捕获到同步代码执行出错！
//程序抛出错误，便会自动执行错误中件！
app.get('index',(req,resp) => {
    //创建一个错误实例，并抛出
    throw new Error('index加载错误了！')；
    //当我们请求路径为index的时候，便会执行这条抛出异常，即自动执行错误处理中间件
})
//我是错误处理中间件
app.use((err,req,resp,next) => {
   res.status(500).send(err.message); 
});
```

无法自动捕获异步错误，故需要手动捕获

next方法在没有参数的时候代表将控制权给下一个中间件
        但传递了参数，就代表触发错误中间件

要注意错误处理中间件有四个参数，同步时候需要抛出，异步的时候需要next传递错误参数。

```javascript
/这是一个实例，当我们查看是否有这样的一个文件夹的的时候，我们来假设一个没有的情况
const express = require('express');
const fs = require('fs');
const app = express();//创建网站服务器！
//接收get请求
app.get('/index',(req,res,next) => {
    fs.readFile('./demo.text','utf8',(err,result) => {
        if(err == null){
            resp.send(result)
        }else{
            next(err);//没有参数的时候代表将控制权给下一个中间件
            //但传递了参数，就代表触发错误中间件
        }
    });
});
app.use((err,req,res,next) =>{
    res.status(500).send(err.message);
});
//监听端口
app.listen(3000);
cosole.log("启动成功！")
```

异步函数出现错误，如何捕获错误呢？

​	try catch可以捕获异步函数及其其他同步代码在执行过程中出现的错误，但不能是其他类型API发生的错误

```javascript
const express = require('express');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

const app = express();//创建网站服务器！
//接收get请求
app.get('/index',async (req,res,next) => {
    try {
        await readFile('./aaa.js')
    }catch (ex){
        next(ex);
    }
});
app.use((err,req,res,next) =>{
    res.status(500).send(err.message);
});
//监听端口
app.listen(3000);
console.log("启动成功！")
```

## 4、构建模块化路由

```javascript
/home/index
const express = require('express');
//创建网站服务器
const app = express();
//创建路由对象
const home = express.Router();
//将路由和请求路径进行匹配
app.use('/home',home);
//在home路由下继续创建路由
home.get('/index', () => {
    //  /home/index
    res.send('欢迎访问！');
});
```

模块化

```javascript
/home.js
    const express = require('express');
    const home = express.Router();
    home.get('/index', (req,res) => {
        res.send('欢迎来到home！')
    });
    //导出
    module.exports = home;
/admin.js
    const express = require('express');
    const admin = express.Router();
    admin.get('/index',(req,res) => {
        res.send('欢迎来到admin！');
    });
    module.exports = admin;
/主要运行的02.js
    const express = require('express');
    const app = express();

    const home = require('./route/home');
    const admin = require('./route/amin');

    app.use('/home',home);
    app.use('/admin',admin);

    app.listen(3000);
```

## 5、获取请求参数

### GET请求参数获得

​	Express框架使用req.query即可获取请求参数，框架内部会将GET参数转为对象返回

​	![](D:\WEB Study\前端笔记\images\1.png)

### POST请求参数

​	需要借助第三方的body-parser，npm install body-parser

```javascript
//进行post提交，需要再写一个带有表单的html页面，此处不写了
const express = require('express');
const bodyParser = require('body-parser');

const app = express.Router();
//extended: false使用queryString模块处理请求参数格式
//extended:true使用第三方插件qs处理请求参数格式
//拦截所有请求,并不会给req对象添加body对象，从而获得其post方式传递的参数
/为什么传递了一个方法的传递呢？调用的这个方法其返回值也是一个函数，其函数作为app.use的参数啦
app.use(bodyParser.urlencoded({extended: false}))

app.post('/add', (req,resp) => {
    res.send(req.body);
});

app.listen(3000);

```

## 6、进一步了解app.user()

```javascript
app.use(fn({a:1}));
//use函数返回值这样做的好处，我们可以传进参数
function fn (obj) {
    return function(req , res , next){
        if(obj.a == 1){
            console.log(req.url);
        }
        console.log(req.method);
        next();
    }
}
app.get('/', (req,res) => {
    res.send('ok');
});
```

## 7、路由参数

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//http://localhost:3000/index/10
app.get('/index/:id',(req,res) => {
    res.send(req.params);
});
app.listen(3000);
```

## 8、静态资源的处理

通过Express内置的express.static可以方便的托管静态文件，如img、CSS、JS等

```javascript
const express = require('express');
const path = require('path');
const app = express();
/实现静态资源访问功能
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000);
```

![](D:\WEB Study\前端笔记\images\1584876314(1).png)

## 9、模板引擎

要下载 npm install art-template express-art-template

```javascript
const express = require('express');
const path = require('path');
const app = express();

//1、告诉express框架使用什么模板引擎渲染什么后缀的模板文件
    //'arg'指模板的后缀，第二个参数是使用的模板引擎
app.engine('art',require('express-art-template'));
//2、告诉express框架模板存放的位置是什么
    //第一个参数views是固定写法，是告诉express模板存放位置。第二个是其文件夹名字
app.set('views',path.join(__dirname,'views'));
//3、告诉Express框架默认的后缀名字是什么
app.set('view engine','art');

app.get('/index',(req,res) => {
    //帮我们拼接模板路径，
    //拼接了模板后缀，
    //哪一个模板和哪一个数据拼接
    res.render('index',{
        msg: 'message!',
    });
});
app.listen(3000);
```

## 10、app.locals对象

![](D:\WEB Study\前端笔记\images\2.png)

![](D:\WEB Study\前端笔记\images\3.png)

