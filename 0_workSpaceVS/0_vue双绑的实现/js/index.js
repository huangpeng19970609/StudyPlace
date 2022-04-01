/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-09-24 17:48:12
 */
function Vue(options) {
  var selft = this;
  this.vm = this;
  this.data = options.data;
  // 数据代理
  Object.keys(this.data).forEach(function (key) {
    selft.proxyKeys(key);
  });
  observe(this.data);
  new Compile(options.el, this.vm);
  return this;
}
Vue.prototype = {
  proxyKeys: function (key) {
    var self = this; // 指向调用者
    Object.defineProperty(self, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return self.data[key];
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal;
      },
    });
  },
};
