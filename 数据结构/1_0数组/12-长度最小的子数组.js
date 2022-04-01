/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-16 23:02:49
 */
/* 
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组
*/
var minSubArrayLen = function (target, nums) {
  let count = nums.length;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        if (j - i === count) count = j - i;
        continue;
      }
    }
  }
  if (count === nums.length) return 0;
  else return count + 1;
};
console.log(minSubArrayLen(2, [4, 4, 5, 3, 4, 5]));
