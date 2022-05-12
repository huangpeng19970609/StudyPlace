/* 
  给定一个二进制数组， 计算其中最大连续 1 的个数。
示例：
输入：[1,1,0,1,1,1]
输出：3
解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
*/
var findMaxConsecutiveOnes = function (nums) {
  var max = 0,
    sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      sum += 1;
    } else sum = 0;
    if (max < sum) max = sum;
  }
  return max;
};

console.log(findMaxConsecutiveOnes([0, , 0, 1, 1]));
