/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-21 22:43:00
 */
var dailyTemperatures = function (temperatures) {
  let stack = [];
  let list = new Array(temperatures.length);
  for (let i = 0; i < temperatures.length; i++) {
    let val = temperatures[i];
    // 若大于栈顶 退栈
    let peek = temperatures[temperatures.length - 1];
    while (stack.length && val > peek) {
      let index = stack.pop();
      list[index] = i - index;
      peek = temperatures[index];
    }
    stack.push(i);
  }
  return list;
};
console.log(
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
);