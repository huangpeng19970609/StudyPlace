/* 
  对称的密码加密 加一些无关的字符
    ABBA  ->  12ABBA          4
    ABA ->  ABAKK             5
    123321  ->  51233214      4

  典型的求最长回文子串算法
*/
// 获取最长的 子问题 - 对称的子字符
const str = readline();
const dp = [];

let max = 0;
// '123456789' -> '1' -> '12' -> '123'
for (let i = 0; i < str.length; i++) {
  dp[i] = 0;
  for (let j = 0; j <= i; j++) {
    const s = str.slice(j, i + 1);
    if (check(s)) {
      dp[i] = Math.max(dp[i], s.length);
    }
  }
  max = Math.max(max, dp[i]);
}
console.log(max);

function check(str) {
  let left, right;
  // 1223
  if (str.length % 2 === 0) {
    left = Math.floor(str.length / 2) - 1;
    right = str.length / 2;
  }
  // 123
  else {
    left = Math.floor(str.length / 2);
    right = left;
  }
  while (left >= 0 && right <= str.length - 1) {
    if (str[left] !== str[right]) {
      return false;
    }
    left--;
    right++;
  }
  return true;
}
