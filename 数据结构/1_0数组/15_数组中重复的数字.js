/* 
  在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内
  。数组中某些数字是重复的，但不知道有几个数字重复了，
  也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
 
  如果输入长度为7的数组{2,3,1,0,2,5,3}，
  那么对应的输出是第一个重复的数字2。
*/
// 方法一：排序 + 判断重复

//
var findRepeatNumber = function (nums) {
  let i = 0;
  while (i <= nums.length - 1) {
    const value = nums[i];
    // 1 若其在正确的位置 指针移动
    if (value === i) {
      i++;
      continue;
    }
    // 2 若其相同 则代表重复
    if (nums[i] === nums[value]) return nums[i];
    // 3 若其不相同 那便移动 （由于我们的限制, i 总是在顺序的移动的 i++）
    [nums[i], nums[value]] = [nums[value], nums[i]];
  }
  return -1;
};

console.log(findRepeatNumber([3, 4, 2, 0, 0, 1]));
