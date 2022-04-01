/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-09-24 17:28:08
 */
/*
      1. Observe时添加 => dep.addSub(watcher);
      2. 
      Watcher有Compile过程出现, 其代表的是AST中的一个个坑位
     */
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  // 将自己添加到订阅器的操作
  this.value = this.get();
}
Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function () {
    Dep.target = this; // 缓存自己
    var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己

    return value;
  },
};
