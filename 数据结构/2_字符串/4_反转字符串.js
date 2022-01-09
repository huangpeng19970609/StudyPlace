
/* 
  输入：s = ["h","e","l","l","o"]
  输出：["o","l","l","e","h"]
*/
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let i = 0;
  let j = s.length - 1;
  while (i <= j) {
    if (s[i] === s[j]) {
      i++;
      j--;
      continue;
    }
    [s[i], s[j]] = [s[j], s[i]];
    i++;
    j--;
  }
};

let s = ["h", "e", "l", "l", "o"]
reverseString(s);
console.log(s);
