/**
 * initialize your data structure here.
 * 时间复杂度 O(1)O(1) ： push(), pop(), top(), min() 四个函数的时间复杂度均为常数级别。
 */
function peek(arr) {
  return arr[arr.length - 1];
}
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  // 若 辅助栈为空、或 插入的值比辅助栈栈顶还小
  if (
    this.minStack.length === 0 ||
    x <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  // 为什么我们可以这样做？ 因为栈的限制保证了我们 pop minStack的正确性
  if (this.stack.pop() === peek(this.minStack)) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return peek(this.stack);
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return peek(this.minStack);
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
