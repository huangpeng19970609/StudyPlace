/* 
  在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内
  。数组中某些数字是重复的，但不知道有几个数字重复了，
  也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
 
  如果输入长度为7的数组{2,3,1,0,2,5,3}，
  那么对应的输出是第一个重复的数字2。
*/
// 时间复杂度 O(n)
var findRepeatNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let value = nums[i];
    if (nums[value] === nums[i]) return value;
    // 交换
    let temp = nums[value];
    nums[value] = nums[i];
    nums[i] = temp;
  }
};
// 但
var findRepeatNumber = function (nums) {
  let i = 0;
  // 原地交换
  while (i < nums.length) {
    let value = nums[i];

    // 他被放入到了理所应当的位置
    if (value === i) {
      i++;
      continue;
    }
    if (nums[value] === nums[i]) return nums[i];
    nums[i] = nums[value];
    nums[value] = value;
  }
};
