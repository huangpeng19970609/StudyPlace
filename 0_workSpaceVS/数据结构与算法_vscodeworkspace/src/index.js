/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-22 09:13:26
 */
debugger;
var dailyTemperatures = function (temperatures) {
  let stack = [];
  let list = new Array(temperatures.length);
  for (let i = 0; i < temperatures.length; i++) {
    let val = temperatures[i];
    // 若大于栈顶 退栈
    let peek;
    while (stack.length && val > (peek = temperatures[getStackPeek(stack)])) {
      let index = stack.pop();
      list[index] = i - index;
      peek = temperatures[getStackPeek(stack)];
    }
    stack.push(i);
  }
  if (stack.length) {
    for (let i = 0; i < stack.length; i++) {
      list[stack[i]] = 0;
    }
  }
  return list;
  function getStackPeek(stack) {
    return stack[stack.length - 1];
  }
};
// [1,1,4,2,1,1,0,0]
console.log(
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
);
