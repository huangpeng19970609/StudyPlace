/**
 * @param {number} k
 * 1. 按顺序处理元素时，使用队列可能是一个很好的选择。
   2.  de 与 en 是毫无关系的独立工作

 */
var MyCircularQueue = function (k) {
  this.arr = new Array(k + 1);
  this.front = 0;
  this.tail = 0;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) {
    return false;
  } else {
    this.arr[this.tail] = value;
    this.tail = (this.tail + 1) % this.arr.length;
    return true;
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  } else {
    this.front = (this.front + 1) % this.arr.length;
    return true;
  }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.arr[this.front]
  }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    // 为什么不直接 -1是因为考虑到 最后一个位置, tail在第一位
    return this.arr[(this.tail - 1 + this.arr.length) % this.arr.length];
  }
};

/**
 * @return {boolean}
 * 重叠即为空
 */
MyCircularQueue.prototype.isEmpty = function () {
  if (this.tail === this.front) {
    return true;
  } else {
    return false;
  }
};

/**
 * @return {boolean}
 * tail为什么加1？ => 因为 tail决定插入的地方，循环考虑
 */
MyCircularQueue.prototype.isFull = function () {
  if ((this.tail + 1) % this.arr.length === this.front) {
    return true;
  } else {
    return false;
  }
};
