class VNode {
  constructor(tag, data, value, type) {
    this.tag = tag;
    this.data = data;
    this.value = value;
    this.type = type;
    this.children = [];
  }
  appendChild(node) {
    this.children.push(node);
  }
}

// 目前使用 html模板 模拟 静态语法 生成 ast
function getNode(node) {
  const nodeType = node.nodeType;
  let _vnode = null;
  // 元素
  if (nodeType === 1) {
    let nodeName = node.tagName.toLocaleLowerCase();
    let attrs = node.attributes,
      _attrObj = {},
      length = attrs.length;
    while (length--) {
      _attrObj[attrs[length].nodeName] = attrs[length].nodeValue;
    }
    _vnode = new VNode(nodeName, _attrObj, null, nodeType);
    let len = node.childNodes.length;
    if (len) {
      let i = -1;
      while (i++ < len - 1) {
        let _node = getNode(node.childNodes[i]);
        _vnode.appendChild(_node);
      }
    }
    return _vnode;
  }
  if (nodeType === 3) {
    return new VNode(null, null, node.nodeValue, nodeType);
  }
  
}

function parseNode(vnode) {
  let dom = null;
  if (vnode.type === 1) {
    dom = document.createElement(vnode.tag);
    for (const key in vnode.data) {
      if (Object.hasOwnProperty.call(vnode.data, key)) {
        dom.setAttribute(key, vnode.data[key]);
      }
    }
    if (vnode.children) {
      let array = vnode.children;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(element);
        dom.appendChild(parseNode(element));
      }
      
    } 
  }
  else if (vnode.type === 3) {
    dom = document.createTextNode(  vnode.value)
  }
  return dom;
}
let compile = getNode;
export {
  VNode,
  getNode, 
  parseNode,
  compile 
};
