/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-09-24 17:06:50
 */
function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    console.log(this);
    let self = this;
    Object.keys(data).map(function (key) {
      self.defineReactive(data, key, data[key]);
    });
  },
  defineReactive: function (data, key, val) {
    // 初次响应式的同事进行一次dep
    var dep = new Dep();
    // 同时对本身进行响应式s
    var childObj = observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function reactiveGetter() {
        // 我不太明白为什么会要如此处理, 为什么每一个dep中都要有Dep.target
        // 我并没有看到每一次动态更改Dep.target的过程
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function reactiveSetter() {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify();
      },
    });
  },
};

function observe(value, vm) {
  if (!value || typeof value !== "object") {
    return;
  }
  return new Observer(value);
}

// 订阅器
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach((sub) => {
      sub.update();
    });
  },
};
Dep.target = null;
