function myPromise() {

}
myPromise.prototype.then = function (callback) {
  callback.call(this);
}
myPromise.prototype.reject = function (callback) {
  callback.call(this);
}


let p = new myPeromise(function (resolve, reject) {
  resolve('hello')
});
p.then(() => {
  console.log('执行了异步！');
});