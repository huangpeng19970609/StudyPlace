/* 
  给定长度为 2n 的整数数组 nums ，
  你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，
  使得从 1 到 n 的 min(ai, bi) 总和最大。
  ---------------------------------------------------------------------
  输入：nums = [1,4,3,2]
  输出：4
  解释：所有可能的分法（忽略元素顺序）为：
  1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
  2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
  3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
  所以最大总和为 4
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// 数学规律如此 既然想让下一个也是最大 那必然要排除第二大
var arrayPairSum = function (nums) {
  nums.sort((a, b) => a - b);
  console.log(nums);
  let i = 0;
  let res = 0;
  while (i < nums.length) {
    res += nums[i];
    i += 2;
  }
  return res;
};
// 倒数排序解法
arrayPairSum([1, 4, 3, 2]);
