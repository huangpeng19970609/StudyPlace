/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-21 22:21:23
 */
/* 
    {[]} => true
    ([)] => false
    注: 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，
    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
*/
var isValid = function (str) {
  let s;
  let stack = [];
  let left = {
    '{': '}',
    '(': ')',
    '[': ']'
  }
  let right = {
    '}': '{',
    ')': '(',
    ']': '[',
  }
  for (let i = 0; i < str.length; i++) {
    s = str[i];
    if (left[s]) {
      stack.push(s);
      continue;
    }
    else if(right[s]) {
      if (right[s] === stack.pop()) {
        continue;
      } 
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  if (stack.length) return false;
  return true;
};
console.log(isValid('{[]}()[]{}'));