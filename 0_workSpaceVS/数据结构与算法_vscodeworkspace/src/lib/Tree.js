/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-23 23:17:44
 */
// 辅助节点 依靠key
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
// 这便实现了一个树的结构！
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  // 向树插入一个新键
  insert(key) {
    if (!this.root) this.root = new Node(key);
    else this.insertNode(this.root, key);
  }
  // 
  insertNode(node, key) {
    // 新节点小于当前节点, 则应放置左侧子节点
    if (key < node) {
      if (!node.left) node.left = new Node(key);
      else this.insert(node.left, key);
    }
    else {
      if (!node.right) node.right = new Node(key);
      else this.insertNode(node.right, key);
    }
  }
  // 中序遍历--------------------
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  // 先序排序
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // 后续排序
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
}
