/* 
  [1, 6, 2, 5, 3, 4] -> 4
  [1, 7, 2, 5, 6, 4, 3]
  
  1. 你不应该改变原序列的位置
  2. 后面的人总应该是要比前面的人高的
  3. 求最大的序列长度是多少？
*/
getHeight([1, 6, 2, 5, 3, 4]);
function getHeight(arr) {
  if (arr.length === 1) return 1;
  const dp = new Array(arr.length).fill(1);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        // ⭐ 仔细想一想为什么是 这一行
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
}
