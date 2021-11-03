import { VNode, compile } from "../virtualDom/index";

Vue.prototype.mount = function () {
  this.render = this.createRenderFn();
  this.mountComponent();
};
Vue.prototype.mountComponent = function () {
  // 执行 mountComponent() 函数
  let mount = () => {
    this.update(this.render());
    console.log(this.render());
  };
  mount.call(this); // 本质应该交给 watcher 来调用, 但是还没有讲到这里
};
Vue.prototype.createRenderFn = function () {
  let ast = compile(this._template);
  // Vue: 将 AST + data => VNode
  // 我们: 带有坑的 VNode + data => 含有数据的 VNode
  return function render() {
    // 将 带有 坑的 VNode 转换为 待数据的 VNode
    let _tmp = combine(ast, this._data);
    return _tmp;
  };
};

/** 将 带有 坑的 Vnode 与数据 data 结合, 得到 填充数据的 VNode: 模拟 AST -> VNode */
function combine(vnode, data) {
  let _type = vnode.type;
  let _data = vnode.data;
  let _value = vnode.value;
  let _tag = vnode.tag;
  let _children = vnode.children;

  let _vnode = null;

  if (_type === 3) {
    // 文本节点

    // 对文本处理
    _value = _value.replace(rkuohao, function (_, g) {
      return getValueByPath(data, g.trim());
    });

    _vnode = new VNode(_tag, _data, _value, _type);
  } else if (_type === 1) {
    // 元素节点
    _vnode = new VNode(_tag, _data, _value, _type);
    _children.forEach((_subvnode) =>
      _vnode.appendChild(combine(_subvnode, data))
    );
  }

  return _vnode;
}

let o = {
  el: "app",
  data: {
    test: "$TEST",
    hello: "$HELLO",
    object: {
      param: "黄鹏",
    },
    a: {
      b: { c: "ccccccccc" },
    },
  },
};
new Vue(o);

/** 根据路径 访问对象成员 */
function getValueByPath(obj, path) {
  let paths = path.split("."); // [ xxx, yyy, zzz ]
  let res = obj;
  let prop;
  while ((prop = paths.shift())) {
    res = res[prop];
  }
  return res;
}
function Vue(options) {
  this._data = options.data;
  this._template = document.querySelector(options.el);
  this.mount(); // 挂载
}
