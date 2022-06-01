class Queue {
  constructor() {
    this._item = [];
  }
  enqueue(item) {
    this._item.push(item);
  }
  dequeue() {
    this._item.shift();
  }
  peek() {
    return this._item[0];
  }
  tail() {
    return this._item[this._item.length - 1];
  }
}