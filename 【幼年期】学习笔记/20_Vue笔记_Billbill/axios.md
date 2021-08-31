## 一、

### 1、第一次使用全局实例

在main.js中

```js
这种是全局实例
import axios from 'axios'
axios({
  url: 'http://106.54.54.237:8000/home/multidata'
}).then( res => {
  console.log(res)
})
```

```js
axios.all([axios({
  url: 'http://106.54.54.237:8000/home/multidata'
}), axios({
  url: 'http://106.54.54.237:8000/home/data',
  params: {
    type: 'sell',
    page: 5
  }
})]).then( results => {
  console.log(results)
})
```

注意：axios.all里面放入的是多个请求的数组。我们可以使用

```js
})]).then(axios.spread((res1,res2)=> {
        console.log(res1)
        console.log(res2)
    }))
})
```

### 2、全局配置 baseURL

```js
axios.defaults.baseURL = 'http://106.54.54.237:8000'
```

### 3、axios独立实例！

创建一个文件，将其单独放入，

```js
import axios from 'axios'
export function request(config, success, failure) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000',
    timeout: 5000
  })
  instance(config).then(res => {
    success(res)
  }).catch(err => {
    failure(err)
  })
}
```

```js
对应调用
import { request } from './network/request'
request({
  url: '/home/multidata'
}, res => {
  console.log(res)
}, err => {
  console.log(res)
})
```

三个函数作为参数传递过去，最终只在一个函数中进行操作

### 4、封装方案为2，axios外面再包装一层Promise

```js
export default request(config) {
    return new Promise((resolve,reject) => {
        // 创建axios实例
        const instance = axios.create({
            baseURL = '......'
            timeout = 5000
        })
        // 发送网络请求
        instance(config)
        .then( res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}
```

则我们在main.js中应该这么使用

```js
request({
    url: '/home/mutidata'
}).then (res => {
    console.log(res)
}).catch( err=> {
    console.log(err)
})
```

### 5、最终方案

```js
export default request(config) {
        // 创建axios实例
        const instance = axios.create({
            baseURL = '......'
            timeout = 5000
        })
      	return instance(config)
}
```

```js
request({
    url: '/home/mutidata'
}).then (res => {
    console.log(res)
}).catch( err=> {
    console.log(err)
})
```

1. 注意下，我们request后面是有then与catch的，为什么我们可以这样写呢?

   因为我们new的instance这个东西本身返回的就是一个Promise！axios.create创建的instance是返回promise的。

### 6、拦截器



```
axios.interceptors 全局拦截器
```

```js
export default request(config) {
        // 创建axios实例
        const instance = axios.create({
            baseURL = '......'
            timeout = 5000
        })
     //请求拦截
            instance.interceptors.request.use(config => {
            // 请求成功
            console.log(config);
            // 一定要返回！不还回去请求一定是失败的！
            return config
        }, err => {
            // 请求失败
            console.log(err)
        })
    //响应拦截
        instance.interceptors.response.use(res => {
            console.log(res)
            // 一般来说 我们仅需要使用res.data，其他没啥作用
            // 必须要返回！我们返回data就可以了！！
            return res.data
        }, err = > {
            console.log(res)
        })
        
      	return instance(config)
}
```

