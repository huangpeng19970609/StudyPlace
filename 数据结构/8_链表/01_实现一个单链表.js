class Node {
  constructor(val) {
    this.element = val;
    this.next = null;
  }
}
var MyLinkedList = function () {
  this.head = null;
  this.count = 0;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index, isNode) {
  if (index < 0 || index >= this.count) return -1;
  if (index === 0) return isNode ? this.head : this.head.element;
  let target = this.head;
  let i = 0;
  while (i++ < index) {
    target = target.next;
  }
  return isNode ? target : target.element;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const node = new Node(val);
  if (this.count === 0) {
    this.head = node;
    this.count++;
    return true;
  } else {
    node.next = this.head;
    this.head = node;
    this.count++;
    return true;
  }
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const node = new Node(val);
  if (this.count === 0) this.head = node;
  else {
    const target = this.get(this.count - 1, true);
    target.next = node;
  }
  this.count++;
  return true;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0 || index > this.count) return false;
  if (index === 0) return this.addAtHead(val);
  // 若等于则加入末尾
  if (index === this.count) return this.addAtTail(val);
  let node = new Node(val);
  let preNode = this.get(index - 1, true);
  let target = preNode.next;
  preNode.next = node;
  node.next = target;
  this.count++;
  return true;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  let target;
  if (index < 0 || index >= this.count) return -1;
  if (index === 0) {
    target = this.head;
    this.head = target.next;
  } else {
    let preNode = this.get(index - 1, true);
    // 存在一种特殊情况, 只有head的时候, 若删除1 其 target为 null
    target = preNode.next;
    preNode.next = target.next;
  }
  this.count--;
  return target.element;
};
//
MyLinkedList.prototype.toString = function () {
  if (!this.head) return null;
  let i = 0;
  let target = this.head;
  let str = "";
  while (i < this.count && target) {
    str += target.element + "-";
    target = target.next;
  }
  return str;
};
let key = [
  "MyLinkedList",
  "addAtHead",
  "addAtHead",
  "addAtHead",
  "addAtIndex",
  "deleteAtIndex",
  "addAtHead",
  "addAtTail",
  "get",
  "addAtHead",
  "addAtIndex",
  "addAtHead",
];
let val = [[], [7], [2], [1], [3, 0], [2], [6], [4], [4], [4], [5, 0], [6]];

let list;
key.map((method, index) => {
  if (method === "MyLinkedList") {
    list = new MyLinkedList();
  } else {
    let x = method + "----" + val[index] + "-";
    console.log(x);
    list[method](...val[index]);
    console.log(list.toString());
  }
});
