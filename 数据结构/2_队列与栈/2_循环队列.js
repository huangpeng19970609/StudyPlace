/**
 * @param {number} k
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

