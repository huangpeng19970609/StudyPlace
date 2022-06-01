var CQueue = function () {
  this.stack = [];
  this._stack = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack.push(value);
  return null;
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this._stack.length !== 0) {
    return this._stack.pop();
  }
  if (!this.stack.length) return -1;
  while (this.stack.length) {
    this._stack.push(this.stack.pop());
  }
  return this._stack.pop();
};
let queue = new CQueue();
queue.appendTail(1);
queue.appendTail(2);
queue.appendTail(3);
queue.appendTail(4);
queue.deleteHead();
console.log(queue);
queue.deleteHead();
console.log(queue);
queue.deleteHead();
queue.appendTail(4);
console.log(queue);
