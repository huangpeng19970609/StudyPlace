/* 
  验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写
  => 故数据预处理非常重要
  验证回文字符串
    1. 正则+reverse
    2. 双指针
    3. 栈
*/

console.log(isPalindrome("11111111"));

// 1. 正则 + recerse  -------------------------------------
var isPalindrome = function (s) {
  let str = s.toLowerCase().match(/[0-9a-z]+/g);
  if (!str) return true;
  str = str.join("");
  // reverse会直接修改原数组
  let otherStr = str.split("").reverse().join("");
  if (str === otherStr) return true;
  else return false;
};

function isValid(s) {
  return (s >= "a" && s <= "z") || (s >= "0" && s <= "9");
}
// 2. 双指针 ----------------------------------------------
var isPalindrome = function (s) {
  let str = s.toLowerCase();
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (!isValid(s[i])) {
      i++;
      continue;
    }
    if (!isValid(s[j])) {
      j--;
      continue;
    }
    if (s[i] === s[j]) {
      i++;
      j--;
    } else {
      return false;
    }
  }
  return true;
};
