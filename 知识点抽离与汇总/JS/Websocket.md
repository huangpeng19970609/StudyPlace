#### 

### 二、websockes

请先明确如下信息

> 1、出现：HTML5 时出现WebSocket .
>
> 2、定义： 一种在单个 TCP 连接上进行全双工通讯的协议  => 单个tcp连接! 
>
> 3、目的：客户端和服务器之间的数据交换变得更加简单。 允许服务端主动向客户端推送数据
>
> 4、实际开发的效果:
>
> ​		在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连		接，并进行双向数据传输
>
> Socket 是传输控制层协议，WebSocket 是`应用层协议`。



#### 1、出现的背景

​	大多数的网站 希望可以实时的推送一些信息的时候，采用的都是`Ajax轮询`即特定的时间间隔来请求接口， 发送http请求，返回数据。

​	显而易见的缺点是

1. 浏览器需要不断的向服务发送请求（这是必然的, 并非是缺点），但请求返回的信息总会携带较长的头部。而`真正有效的数据只是一部分` => `带宽的浪费`\

2. 由1也会引起实时性的问题

   ​	![](images/websockets-1.png)

---

#### 2、 初次使用

其实例对象有只读属性 -**readyState** 表示连接状态，可以是以下值：

- 0 - 表示连接尚未建立。
- 1 - 表示连接已建立，可以进行通信。
- 2 - 表示连接正在进行关闭。
- 3 - 表示连接已经关闭或者连接不能打开。

有以下的事件

| open    | Socket.onopen    | 连接建立时触发             |
| ------- | ---------------- | -------------------------- |
| message | Socket.onmessage | 客户端接收服务端数据时触发 |
| error   | Socket.onerror   | 通信发生错误时触发         |
| close   | Socket.onclose   | 连接关闭时触发             |

> 当然有人已经封装好了一套开源的js代码  -- Stomp.js

````js
var Socket = new WebSocket(url, [protocol] );

// 可以使用 Stomp框架来帮助你完成操作
this.ws = new WebSocket("ws://10.1.41.55:15674/ws");
this.client = Stomp.over(this.ws);
````





#### 3、基于Stomp的实现

关于 更加复杂的Stomp 请查看这篇文章或其他文章

https://www.cnblogs.com/goloving/p/10746378.html

```js
      // 定义连接成功回调函数
      const on_connect = (x) => {
        //data.body是接收到的数据
        this.client.subscribe("/exchange/FanoutDemandExchange", (data) => {
          if (this.client !== null) {
            const msg = data.body;
            this.$notify({
              title: "有新的需求！",
              // dangerouslyUseHTMLString: true,
              message: msg,
              position: "bottom-right",
            });
          } else {
            this.ws.close();
          }
        });
      };

      // 定义错误时回调函数
      const on_error = function () {
        console.log("error");
      };

      // 连接RabbitMQ
      this.client.connect("root", "hzp123456", on_connect, on_error, "/");
```

### 三、Stomp

　STOMP即Simple (or Streaming) Text Orientated Messaging Protocol，简单(流)文本定向消息协议，它提供了一个可互操作的连接格式，允许STOMP客户端与任意STOMP消息代理（Broker）进行交互。STOMP协议由于设计简单，易于开发客户端，因此在多种语言和多种平台上得到广泛地应用。

#### 1、创建`STOMP`客户端

1、在web浏览器中使用普通的Web Socket

　　STOMP javascript 客户端会使用`ws://`的URL与STOMP 服务端进行交互。

　　为了创建一个STOMP客户端js对象，你需要使用`Stomp.client(url)`，而这个URL连接着服务端的WebSocket的代理

```js
var url = "ws://localhost:61614/stomp";
var client = Stomp.client(url);
```

`　　Stomp.client(url, protocols)`也可以用来覆盖默认的`subprotocols`。第二个参数可以是一个字符串或一个字符串数组去指定多个`subprotocols`。

2、在web浏览器中使用定制的WebSocket

　　浏览器提供了不同的WebSocket的协议，一些老的浏览器不支持WebSocket的脚本或者使用别的名字。默认下，`stomp.js`会使用浏览器原生的`WebSocket class`去创建WebSocket。

　　但是利用`Stomp.over(ws)`这个方法可以使用其他类型的WebSockets。这个方法得到一个满足WebSocket定义的对象。

　　例如，可以使用由`SockJS`实现的Websocket。

　　如果使用原生的Websockets就使用`Stomp.client(url)`，如果需要使用其他类型的Websocket（例如由SockJS包装的Websocket）就使用`Stomp.over(ws)`。除了初始化有差别，Stomp API在这两种方式下是相同的。

3、在`node.js`程序中

　　通过`stompjs npm package`同样也可以在`node.js`程序中使用这个库。

　　`npm install stompjs`

　　在node.js `app`中，`require`这个模块：`var Stomp = require('stompjs');`

　　为了与建立在TCP socket的STOMP-broker连接，使用`Stomp.overTCP(host, port)`方法。

```js
var client = Stomp.overTCP('localhost', 61613);
```

　　为了与建立在Web Socket的STOMP broker连接，使用`Stomp.overWS(url)`方法。

```js
var client = Stomp.overWS('ws://localhost:61614/stomp');
```

　　除了初始化不同，无论是浏览器还是node.js环境下，Stomp API都是相同的。

#### 2、链接服务端

　　一旦Stomp 客户端建立了，必须调用它的`connect()`方法去连接Stomp服务端进行验证。这个方法需要两个参数，用户的登录和密码凭证。这种情况下，客户端会使用Websocket打开连接，并发送一个`CONNECT frame`。

　　这个连接是异步进行的：你不能保证当这个方法返回时是有效连接的。为了知道连接的结果，你需要一个回调函数。

```js
var connect_callback = function() {
    // called back after the client is connected and authenticated to the STOMP server
};
```

　　但是如果连接失败会发生什么呢？

　　`connect()`方法接受一个可选的参数(`error_callback`)，当客户端不能连接上服务端时，这个回调函数`error_callback`会被调用，该函数的参数为对应的错误对象。

```js
var error_callback = function(error) {
    // display the error's message header:
    alert(error.headers.message);
};
```

　　在大多数情况下，`connect()`方法可接受不同数量的参数来提供简单的API：

```js
client.connect(login, passcode, connectCallback);
client.connect(login, passcode, connectCallback, errorCallback);
client.connect(login, passcode, connectCallback, errorCallback, host);
```

`　　login`和`passcode`是strings，`connectCallback`和`errorCallback`则是functions。（有些brokers（代理）还需要传递一个`host`（String类型）参数。）

　　如果你需要附加一个`headers`头部，`connect`方法还接受其他两种形式的参数：

```js
client.connect(headers, connectCallback);
client.connect(headers, connectCallback, errorCallback);
```

`　　header`是`map`形式，`connectCallback`和`errorCallback`为functions。

　　需要注意：如果你使用上述这种方式，你需要自行在`headers`添加`login`、`passcode`（甚至`host`）：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```js
var headers = {
    login: 'mylogin',
    passcode: 'mypasscode',
    // additional header
    'client-id': 'my-client-id'
};
client.connect(headers, connectCallback);
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　断开连接时，调用`disconnect`方法，这个方法也是异步的，当断开成功后会接收一个额外的回调函数的参数。如下所示。

```js
client.disconnect(function() {
    alert("See you next time!");
};
```

　　当客户端与服务端断开连接，就不会再发送或接收消息了。

#### 3、Heart-beating

　　如果STOMP broker(代理)接收STOMP 1.1版本的帧，`heart-beating`是默认启用的。

　　`heart-beating`也就是频率，`incoming`是接收频率，`outgoing`是发送频率。通过改变`incoming`和`outgoing`可以更改客户端的`heart-beating`(默认为10000ms)：

```js
client.heartbeat.outgoing = 20000; 
// client will send heartbeats every 20000ms
client.heartbeat.incoming = 0;
// client does not want to receive heartbeats
// from the server
```

`　　heart-beating`是利用`window.setInterval()`去规律地发送`heart-beats`或者检查服务端的`heart-beats`。

#### 4、发送消息

　　当客户端与服务端连接成功后，可以调用`send()`来发送STOMP消息。这个方法必须有一个参数，用来描述对应的STOMP的目的地。另外可以有两个可选的参数：`headers`，`object`类型包含额外的信息头部；`body`，一个String类型的参数。

```js
client.send("/queue/test", {priority: 9}, "Hello, STOMP");
// client会发送一个STOMP发送帧给/queue/test，这个帧包含一个设置了priority为9的header和内容为“Hello, STOMP”的body。
　　client.send(destination, {}, body);
```

　　如果你想发送一个有`body`的信息，也必须传递`headers`参数。如果没有`headers`需要传递，那么就传`{}`即可。

#### 5、订阅（Subscribe）和接收（receive）消息

　　为了在浏览器中接收消息，STOMP客户端必须先订阅一个目的地`destination`。

　　你可以使用`subscribe()`去订阅。这个方法有2个必需的参数：目的地(`destination`)，回调函数(`callback`)；还有一个可选的参数`headers`。其中`destination`是String类型，对应目的地，回调函数是伴随着一个参数的`function`类型。

```js
var subscription = client.subscribe("/queue/test", callback);
```

`　　subscribe()`方法返回一个`object`，这个`object`包含一个`id`属性，对应这个这个客户端的订阅ID。

　　而`unsubscribe()`可以用来取消客户端对这个目的地`destination`的订阅。

　　默认情况下，如果没有在`headers`额外添加，这个库会默认构建一个独一无二的`ID`。在传递`headers`这个参数时，可以使用你自己的`ID`。

```js
var mysubid = '...';
var subscription = client.subscribe(destination, callback, { id: mysubid });
```

　　这个客户端会向服务端发送一个STOMP订阅帧（`SUBSCRIBE frame`）并注册回调事件。每次服务端向客户端发送消息时，客户端都会轮流调用回调函数，参数为对应消息的STOMP帧对象（`Frame object`）。

`　　subscribe()`方法，接受一个可选的`headers`参数用来标识附加的头部。

```js
var headers = {ack: 'client', 'selector': "location = 'Europe'"};
client.subscribe("/queue/test", message_callback, headers);
```

　　这个客户端指定了它会确认接收的信息，只接收符合这个`selector : location = 'Europe'`的消息。

　　如果想让客户端订阅多个目的地，你可以在接收所有信息的时候调用相同的回调函数：

```js
onmessage = function(message) {
    // called every time the client receives a message
}
var sub1 = client.subscribe("queue/test", onmessage);
var sub2 = client.subscribe("queue/another", onmessage)
```

　　如果要中止接收消息，客户端可以在`subscribe()`返回的`object`对象调用`unsubscribe()`来结束接收。

```js
var subscription = client.subscribe(...);
...
subscription.unsubscribe();
```

#### 6、支持JSON

　　STOMP消息的`body`必须为字符串。如果你需要发送/接收`JSON`对象，你可以使用`JSON.stringify()`和`JSON.parse()`去转换JSON对象。

#### 7、Acknowledgment(确认)

　　默认情况，在消息发送给客户端之前，服务端会自动确认（`acknowledged`）。

　　客户端可以选择通过订阅一个目的地时设置一个`ack header`为`client`或`client-individual`来处理消息确认。

　　在下面这个例子，客户端必须调用`message.ack()`来通知服务端它已经接收了消息。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```js
var subscription = client.subscribe("/queue/test",
    function(message) {
        // do something with the message
        ...
        // and acknowledge it
        message.ack();
    },
    {ack: 'client'}
);
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

`　　ack()`接受`headers`参数用来附加确认消息。例如，将消息作为事务(transaction)的一部分，当要求接收消息时其实代理（broker）已经将`ACK STOMP frame`处理了。

```js
var tx = client.begin();
message.ack({ transaction: tx.id, receipt: 'my-receipt' });
tx.commit();
```

`　　nack()`也可以用来通知STOMP 1.1.brokers（代理）：客户端不能消费这个消息。与`ack()`方法的参数相同。

#### 8、事务(Transactions)

　　可以在将消息的发送和确认接收放在一个事务中。

　　客户端调用自身的`begin()`方法就可以开始启动事务了，`begin()`有一个可选的参数`transaction`，一个唯一的可标识事务的字符串。如果没有传递这个参数，那么库会自动构建一个。这个方法会返回一个object。这个对象有一个`id`属性对应这个事务的ID，还有两个方法：

　　`commit()`提交事务

　　`abort()`中止事务

　　在一个事务中，客户端可以在发送/接受消息时指定transaction id来设置transaction。

```js
// start the transaction
var tx = client.begin();
// send the message in a transaction
client.send("/queue/test", {transaction: tx.id}, "message in a transaction");
// commit the transaction to effectively send the message
tx.commit();
```

　　如果你在调用`send()`方法发送消息的时候忘记添加transction header，那么这不会称为事务的一部分，这个消息会直接发送，不会等到事务完成后才发送。

```js
var txid = "unique_transaction_identifier";
// start the transaction
var tx = client.begin();
// oops! send the message outside the transaction
client.send("/queue/test", {}, "I thought I was in a transaction!");
tx.abort(); // Too late! the message has been sent
```

#### 9、调试

　　有一些测试代码能有助于你知道库发送或接收的是什么，从而来调试程序。

　　客户端可以将其`debug`属性设置为一个函数，传递一个字符串参数去观察库所有的debug语句。默认情况，debug消息会被记录在在浏览器的控制台。

```js
client.debug = function(str) {
    // append the debug log to a #debug div somewhere in the page using JQuery:
    $("#debug").append(str + "\n");
};
```

#### 10、使用情况

1、var error_callback = function(error) {
　　第一次连接失败和连接后断开连接都会调用这个函数
};

2、关闭控制台调试数据：设置`client.debug = null` 就可以，stompjs会去检测debug是否是函数，不是函数就不会调用输出



