/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-09-24 18:04:38
 */
function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}
Compile.prototype = {
  init: function () {
    if (!this.el) console.error("你传你🐎呢?");
    this.fragment = this.nodeToFragment(this.el);
    this.compileElement(this.fragment);
    this.el.appendChild(this.fragment);
  },
  // 1.解析模板指令，并替换模板数据，初始化视图
  nodeToFragment: function (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // appendChild() 方法从一个元素向另一个元素中移动元素
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  // 目前只考虑element元素
  compileElement: function (el) {
    var childNodes = el.childNodes;
    var self = this;

    var reg = /\{\{\s*(.*?)\s*\}\}/;
    [].slice.call(childNodes).forEach(function (node) {
      var text = node.textContent;
      if (self.isTextNode(node) && reg.test(text)) {
        // 判断是否是符合这种形式{{}}的指令
        self.compileText(node, reg.exec(text)[1]);
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node); // 继续递归遍历子节点
      }
    });
    return el;
  },
  compileText: function (node, exp) {
    console.log(exp);
    var self = this;
    var initText = this.vm[exp];
    this.updateText(node, initText); // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) {
      // 生成订阅器并绑定更新函数
      self.updateText(node, value);
    });
  },
  updateText: function (node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  },
  isTextNode: function (node) {
    return node.nodeType == 3;
  },
};
