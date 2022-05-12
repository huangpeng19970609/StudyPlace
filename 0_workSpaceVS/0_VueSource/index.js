// 响应式化=> 数组
let ARRAY_METHOD = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice",
];
let array_methods = Object.create(Array.prototype);
ARRAY_METHOD.forEach((method) => {
  array_methods[method] = function () {
    // 调用原来的方法
    console.log("调用的是拦截的 " + method + " 方法");

    // 将数据进行响应式化
    for (let i = 0; i < arguments.length; i++) {
      reactify(arguments[i]);
    }

    let res = Array.prototype[method].apply(this, arguments);
    // Array.prototype[ method ].call( this, ...arguments ); // 类比
    return res;
  };
});

class JGVue {
  constructor(options) {
    this._data = options.data;
    let elm = document.querySelector(options.el); // vue 是字符串, 这里是 DOM
    this._template = elm;
    this._parent = elm.parentNode;

    reactify(this._data, this /* 将 Vue 实例传入, 折中的处理 */);
    this.mount(); // 挂载
  }
}

JGVue.prototype.mount = function () {
  // 目的: 缓存
  this.render = this.createRenderFn();
  this.mountComponent();
};
// 将虚拟 DOM 渲染到页面中: diff 算法就在里
JGVue.prototype.update = function (vnode) {
  // 简化, 直接生成 HTML DOM replaceChild 到页面中
  // 父元素.replaceChild( 新元素, 旧元素 )
  let realDOM = parseVNode(vnode);

  // debugger;
  // let _ = 0;

  this._parent.replaceChild(realDOM, document.querySelector("#root"));
  // 这个算法是不负责任的:
  // 每次会将页面中的 DOM 全部替换
};

JGVue.prototype.createRenderFn = function () {
  let ast = getVNode(this._template);
  // Vue: 将 AST + data => VNode
  // 我们: 带有坑的 VNode + data => 含有数据的 VNode
  return function render() {
    // 将 带有 坑的 VNode 转换为 待数据的 VNode
    let _tmp = combine(ast, this._data);
    return _tmp;
  };
};
JGVue.prototype.mountComponent = function () {
  // 执行 mountComponent() 函数
  let mount = () => {
    // 这里是一个函数, 函数的 this 默认是全局对象 "函数调用模式"
    this.update(this.render());
  };
  mount.call(this); // 本质应该交给 watcher 来调用, 但是还没有讲到这里

  // 为什么
  // this.update( this.render() ); // 使用发布订阅模式. 渲染和计算的行为应该交给 watcher 来完成
};

/** 虚拟 DOM 构造函数 */
class VNode {
  constructor(tag, data, value, type) {
    this.tag = tag && tag.toLowerCase();
    this.data = data;
    this.value = value;
    this.type = type;
    this.children = [];
  }

  appendChild(vnode) {
    this.children.push(vnode);
  }
}
// 生成vdom 【compiler】
function getVNode(node) {
  let nodeType = node.nodeType;
  let _vnode = null;
  if (nodeType === 1) {
    // 元素
    let nodeName = node.nodeName;
    let attrs = node.attributes;
    let _attrObj = {};
    for (let i = 0; i < attrs.length; i++) {
      // attrs[ i ] 属性节点 ( nodeType == 2 )
      _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
    }
    _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);

    // 考虑 node 的子元素
    let childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      _vnode.appendChild(getVNode(childNodes[i])); // 递归
    }
  } else if (nodeType === 3) {
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
  }

  return _vnode;
}
/** 将虚拟 DOM 转换成真正的 DOM */
function parseVNode(vnode) {
  // 创建 真实的 DOM
  let type = vnode.type;
  let _node = null;
  if (type === 3) {
    return document.createTextNode(vnode.value); // 创建文本节点
  } else if (type === 1) {
    _node = document.createElement(vnode.tag);

    // 属性
    let data = vnode.data; // 现在这个 data 是键值对
    Object.keys(data).forEach((key) => {
      let attrName = key;
      let attrValue = data[key];
      _node.setAttribute(attrName, attrValue);
    });

    // 子元素
    let children = vnode.children;
    children.forEach((subvnode) => {
      _node.appendChild(parseVNode(subvnode)); // 递归转换子元素 ( 虚拟 DOM )
    });

    return _node;
  }
}
/** 将 带有 坑的 Vnode 与数据 data 结合, 得到 填充数据的 VNode: 模拟 AST -> VNode */
function combine(vnode, data) {
  let _type = vnode.type;
  let _data = vnode.data;
  let _value = vnode.value;
  let _tag = vnode.tag;
  let _children = vnode.children;
  let rkuohao = /\{\{(.+?)\}\}/g;
  let _vnode = null;

  if (_type === 3) {
    // 文本节点

    // 对文本处理
    _value = _value.replace(rkuohao, function (_, g) {
      return getValueByPath(data, g.trim()); // 除了 get 读取器
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

// 1. 初始化
let app = new JGVue({
  el: "#root",
  data: {
    name: "张三",
    age: 19,
    gender: "难",
    datas: [
      { info: "好难" },
      { info: "太难" },
      { info: "真的难么?" },
      { info: "练习一下" },
    ],
  },
});

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

// 简化后的版本
function defineReactive(target, key, value, enumerable) {
  // 折中处理后, this 就是 Vue 实例
  let that = this;

  // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
  if (typeof value === "object" && value != null && !Array.isArray(value)) {
    // 是非数组的引用类型
    reactify(value); // 递归
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      console.log(`读取 ${key} 属性`); // 额外
      return value;
    },
    set(newVal) {
      console.log(`设置 ${key} 属性为: ${newVal}`); // 额外

      value = newVal;

      // 模板刷新 ( 这现在是假的, 只是演示 )
      // vue 实例??? watcher 就不会有这个问题
      that.mountComponent();
    },
  });
}

// 将对象 o 响应式化
function reactify(o, vm) {
  let keys = Object.keys(o);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]; // 属性名
    let value = o[key];
    if (Array.isArray(value)) {
      // 数组
      value.__proto__ = array_methods; // 数组就响应式了
      for (let j = 0; j < value.length; j++) {
        reactify(value[j], vm); // 递归
      }
    } else {
      // 对象或值类型
      defineReactive.call(vm, o, key, value, true);
    }
  }
}

console.log(app);
