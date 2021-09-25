import { getNode, parseNode } from './virtualDom/index.js'
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
let template = document.querySelector("#" + o.el);

let v = getNode(
  document.querySelector('#app')
)
console.log(v);
console.log(
  parseNode(v)
);

// 正则 匹配 {{}}
let reg = /\{\{(.+?)\}\}/g;

function Vue(o) {
  let data = o.data;
  let generateNode = template.cloneNode(true);
  // 更改 generateNode
  this.compile(generateNode, data);
  this.update(generateNode);
}
Vue.prototype.compile = function compile(template, data) {
  let childNodes = template.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    let nodeType = childNodes[i].nodeType;
    // 元素节点 => 继续递归
    if (nodeType === 1) {
      compile(childNodes[i], data);
    }
    // 文本节点
    else if (nodeType === 3) {
      let txt = childNodes[i].nodeValue.trim();
      if (txt) {
        // 第一个参数 匹配内容, 第二个参数是 原子组
        txt = txt.replace(reg, (_, g) => {
          let key = g.trim();
          // 柯里化
          let value = createGetValueByPath(key)(data);
          return value;
        });
        childNodes[i].nodeValue = txt;
      }
    }
  }
};
Vue.prototype.update = function update(realNode) {
  let root = document.querySelector("#app");
  root.parentNode.replaceChild(realNode, root);
};
// 仅编译一次
function createGetValueByPath(paths) {
  // 由于模板不变，利用闭包减少此行
  let props = paths.split(".");
  return function getValueByPath(data) {
    if (props.length === 1) {
      return data[props[0]];
    }
    let prop = "";
    let res = data;
    while ((prop = props.shift())) {
      res = res[prop];
    }
    return res;
  };
}

let app = new Vue(o);


