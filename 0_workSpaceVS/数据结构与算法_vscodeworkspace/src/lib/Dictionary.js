/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-10-30 17:55:40
 */
class Dictionary {
  constructor() {
    this.table = {};
    this.length = 0;
  }
  get(key) {
    return this.table[key] || null;
  }
  set(key, value) {
    this.table[key] = value;
    this.length++;
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.table, key);
  }
  remove(key) {
    if (this.has(key)) {
      this.length--;
      const value = this.table[key];
      delete this.table[key];
      return value;
    }
    return false;
  }
  keys() {
    return Object.keys(this.table)
  }
  values() {
    return Object.values(this.table)
  }
  clear() {
    this.table = {}
    this.length = 0;
  }
}
export {
  Dictionary
}