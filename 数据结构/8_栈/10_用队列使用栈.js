/* 
  使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作
  我使用的应该是暴力的解法,

  // 此外试一试双端队列实现栈
*/
var MyStack = function () {
  this.queue1 = [];
  this.queue2 = [];
};
/** 
 * @param {number}
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  if (this.queue2.length) {
    this.queue1.push(this.queue2.shift());
  }
  this.queue2.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  this.eachOntherChange();
  return this.queue2.shift();
};
MyStack.prototype.eachOntherChange = function () {
  if (!this.queue2.length && this.queue1.length) {
    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }
    let temp = this.queue2;
    this.queue2 = this.queue1;
    this.queue1 = temp;
  }
}
/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  this.eachOntherChange();
  return this.queue2[0];
};
/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return !this.queue1.length && !this.queue2.length;
};