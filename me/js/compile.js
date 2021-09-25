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
  init: function() {
    if (!this.el) console.error('你传你🐎呢?');
    this.fragment = this.nodeToFragment(this.el);
    this.compileElement(this.fragment);
    this.el.appendChild(this.fragment);
  },
  // 1.解析模板指令，并替换模板数据，初始化视图
  nodeToFragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // appendChild() 方法从一个元素向另一个元素中移动元素
      fragment.appendChild(child);
      child = el.firstChild;
    }
    console.log(fragment);
    return fragment;
  },
  // 目前只考虑element元素
  compileElement: function(el) {
    var self = this;
    var 
    return el;
  },
}