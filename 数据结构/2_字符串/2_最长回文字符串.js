/**
 * @param {string} s
 * @return {string}
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 问题: 难点在于 字符串中如何寻找最长的回文子串?
 *       单纯的穷举的代价极其高
 */

// 暴力解法 => 列举所有子串
var longestPalindrome = function (s) {
  let ans = ''
  let max = 0
  let len = s.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i + 1; j++) {
      let _s = s.substring(i, j);
      if (isPalindromic(_s) && _s.length > max) {
        ans = _s;
        max = Math.max(max, ans.length);
      }
    }
  }
  return ans;
};
function isPalindromic(s) {
  let len = s.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (s[i] !== s[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

console.log(
  longestPalindrome('babad')
);