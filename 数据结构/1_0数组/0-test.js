/* 
  给定一个二进制数组， 计算其中最大连续 1 的个数。
示例：
输入：[1,1,0,1,1,1]
输出：3
解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
*/
function findMaxConsecutiveOnes(nums) {
  let count = 0;
  let max = 0;
  for (let i = 0; i < nums.length + 1; i++) {
    if (nums[i] === 1) count++;
    else {
      max = Math.max(max, count);
      count = 0;
    }
  }
  return max;
}

console.log(findMaxConsecutiveOnes([0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1]));
