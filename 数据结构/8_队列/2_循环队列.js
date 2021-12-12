/**
 * @param {number} k
 * 为何 获取队列首位不需要 %  ? => 这是因为 front 永远指向队列首位
 * 为何 获取队列尾部需要 -1? 
 *    这是因为每次 enqueue后其总是 是将要插入的下一个位置
 * 为什么获取尾部还需要加 arr.length => 这是因为 尾部若 -1 可能为负数
 * 为何判满的时候 不需要减1呢？
 *  答： 因为判断的条件是 tail + 1 是否等于 head
 *       若你要 head - 1是否等于 tail 此时也应该进行 arr.length的加上以免出现负数情况
 */
/*
  1. 你应该清楚的
*/
 var MyCircularQueue = function(k) {
  this.arr = new Array(k+1);
  this.front = 0;
  this.tail = 0;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
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
MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) {
    return false;
  } else {
    this.arr[this.front] = null;
    this.front = (this.front + 1) % this.arr.length;
    return true;
  }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.arr[this.front]
  }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.arr[(this.tail - 1 + this.arr.length) % this.arr.length];
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  if (this.tail === this.front) {
    return true;
  } else {
    return false;
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  if ((this.tail+1) % this.arr.length === this.front) {
    return true;
  } else { 
    return false;
  }
};

let queue = new MyCircularQueue(6);
queue.enQueue(0);
queue.enQueue(1);
queue.enQueue(2);
queue.enQueue(3);
queue.enQueue(4);
queue.enQueue(5);

queue.deQueue();
queue.enQueue(100);
queue.deQueue();
queue.enQueue(200);
queue.deQueue();
queue.enQueue(300);
console.log(queue);

