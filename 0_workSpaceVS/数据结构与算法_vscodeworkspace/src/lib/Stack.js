<<<<<<< HEAD
/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-10-30 18:44:44
 */
class Stack {
  constructor() {
      this._items = [];
  }
  push(item) {
      this._items.push(item);
  }
  pop(item) {
      return this._items.pop(item)
  }
  peek () { return this._item[this._item.length - 1] }
  size () { return this._item.length }
  clear() { this._item = [] }
  toString() {
    return this._items.join(',')
  }
}
export {
  Stack
=======
/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-10-30 18:44:44
 */
class Stack {
  constructor() {
      this._items = [];
  }
  push(item) {
      this._items.push(item);
  }
  pop(item) {
      return this._items.pop(item)
  }
  peek () { return this._item[this._item.length - 1] }
  size () { return this._item.length }
  clear() { this._item = [] }
  toString() {
    return this._items.join(',')
  }
}
export {
  Stack
>>>>>>> 2f9b1cf7b276e51ea5a21d2c3ad9205851816ab6
}