/* 
  输入：nums = [1,1,1,1,1], target = 3

  输出：5
  解释：一共有 5 种方法让最终目标和为 3 。
  -1 + 1 + 1 + 1 + 1 = 3
  +1 - 1 + 1 + 1 + 1 = 3
  +1 + 1 - 1 + 1 + 1 = 3
  +1 + 1 + 1 - 1 + 1 = 3
  +1 + 1 + 1 + 1 - 1 = 3
*/

// 解题一: 回溯 O(2的n次方) --------------
var findTargetSumWays = function (nums, target) {
  let count = 0;
  const dfs = function (nums, target, index, sum) {
    if (index === nums.length) {
      if (sum === target) count++;
    } else {
      dfs(nums, target, index + 1, sum + nums[index]);
      dfs(nums, target, index + 1, sum - nums[index]);
    }
  };
  dfs(nums, target, 0, 0);
  console.log(count);
  return count;
};

findTargetSumWays([1, 1, 1, 1, 1], 3);

// 记忆化 + 动态规划
