function requestData(promiseList = [], max = 1, callback) {
  let requestArr = [],
    i = 0;
  // 我们将请求的promise一项一项丢入到其中（递归实现），执行完毕就删除掉
  // requestArr到达上限那么我们等待请求执行，有空位在继续添加
  // 
  toFetch().then(() => Promise.all(requestArr)).then(() => {
    callback('进程结束！');
  })

  function toFetch() {
    // 递归结束
    if (i === promiseList.length) return Promise.resolve();
    let _item = promiseList[i++]();
    console.log('进程进行中');
    requestArr.push(_item);
    // 宏任务执行结束后, 微任务执行，删除对应的那个微任务
    _item.then(() => { 
      requestArr.splice(requestArr.indexOf(_item), 1)
     });
    let result = Promise.resolve();
    if (requestArr.length === max) {
      // 是否max中的一个请求已经结束了？
      result = Promise.race(requestArr);
    }
    // 若有空位继续， 若无空位等待 => then
    return result.then(() => toFetch());
  }

}



// 测试代码
const p1 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p1'))
const p2 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p2'))
const p3 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p3'))
const p4 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p4'))
const p5 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p5'))
const p6 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p6'))
const p7 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'p7'))

const ps = [p1, p2, p3, p4, p5, p6, p7]

requestData(ps, 4, (reason, value) => {
  console.log(reason || value)
})

