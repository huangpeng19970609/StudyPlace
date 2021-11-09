/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-09 09:31:28
 */
// 去除连续重复的指定
function removeDuplicates(nums, k) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (j < k || nums[j - k] != nums[i]) {
      nums[j] = nums[i];
      j++;
    }
  }
  return j;
}
let arr = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4]
let length = removeDuplicates(
  arr,
  2
)
console.log(arr);
console.log(length);