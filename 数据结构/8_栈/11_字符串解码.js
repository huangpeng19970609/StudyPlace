/**
 * @param {string} s
 * @return {string}
 * s = "3[a2[c]]" => accaccacc
 * 数字仅代表外围
 * 字母仅代表内部
 * 一段一段的去解决它吧
 */

// 显然是一个栈结构 => 当遇到 ']'栈开始推出
var decodeString = function(s) {
  const stack = new Array();
  let num = 0;
  debugger;
  for (let item of Array.from(s)) {
      if (isNumber(item)) {
          num = num * 10 + parseInt(item);
          continue;
      }
      if ( item === '[' ) {
          stack.push(num);
          stack.push(item);
          num = 0;
          continue;
      }
      if ( item !== ']' ) {
          stack.push(item);
          continue;
      }
      // 开始处理数据
      if (item === ']') {
          let str = [];
          while(true) {
              let _item = stack.pop();
              if (_item === '[') {
                  break;
              }
              str.push(_item);
          }
          let counts = stack.pop();
          str.reverse();
          stack.push(str.join('').repeat(counts));
      }
  }
  return stack.join('');
};
function isNumber(num) {
  return !isNaN(parseInt((num)))
}

console.log(
  decodeString(
    '2[abc]3[cd]ef'
  )
);