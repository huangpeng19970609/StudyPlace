/* 
  给定一个排序数组和一个目标值，
  在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
  请必须使用时间复杂度为 O(log n) 的算法。
  
  输入: nums = [1,3,5,6], target = 5
  输出: 2
  二分查找 经典查询一个值（此外二分查找还有一处经典的寻找区间）
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let index = -1;
  while (left <= right) {
    index = Math.floor((left + right) / 2);
    let value = nums[index];
    if (value === target) return index;
    else if (target > value) left = index + 1;
    else if (target < value) right = index - 1;
  }
  return left;
};
console.log(
  searchInsert([1, 3, 5, 6], 2)
);