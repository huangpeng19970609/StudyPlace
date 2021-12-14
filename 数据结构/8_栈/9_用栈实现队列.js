var MyQueue = function() {
  this.stack1 = [];
  this.stack2 = [];
};

/** 
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function(x) {
  this.stack1.push(x);
};

/**
* @return {number}
*/
MyQueue.prototype.pop = function() {
  this.fillOhterStack();
  return this.stack2.pop();
};
MyQueue.prototype.fillOhterStack = function() {
  if (this.stack2.length === 0 ) {
      while(this.stack1.length !== 0) {
          this.stack2.push(this.stack1.pop())
      }
  }
  
};
/**
* @return {number}
*/
MyQueue.prototype.peek = function() {
  this.fillOhterStack();
  let len = this.stack2.length;
  if (len) return this.stack2[len - 1]
  return false;
};

/**
* @return {boolean}
*/
MyQueue.prototype.empty = function() {
  return this.stack1.length === 0 && this.stack2.length === 0;
};

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/