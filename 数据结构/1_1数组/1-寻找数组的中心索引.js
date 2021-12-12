/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let right = 0;
  let left = 0;
  nums.map(item => {
    right += item;
  })
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    right -= item;
    if (left === right) {
      return i;
    }
    left += item;
  }
  return -1;
};
// 
let arr = [1, 7, 3, 6, 5, 6];

console.log(
  pivotIndex(arr)
);
