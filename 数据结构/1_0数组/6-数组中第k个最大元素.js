/*
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-11-14 15:20:58
 */
function mergeSort(nums) {
  let len = nums.length;
  if (len <= 1) return nums;
  let middle = Math.floor(len / 2);
  let left = mergeSort(nums.slice(0, middle));
  let right = mergeSort(nums.slice(middle));
  return nums = merge(left, right);
}

function merge(left, right) {
  let i = 0;
  let j = 0;
  let arr = [];
  while (i < left.length && j < right.length) {
    if (left[i] > right[j]) {
      arr.push(left[i++]);
    } else {
      arr.push(right[j++]);
    }
  }
  // left没放完
  if (i < left.length) {
    return arr.concat(left.slice(i));
  } else return arr.concat(right.slice(j));
}

var findKthLargest = function (nums, k) {
  nums = mergeSort(nums);
  k = k - 1;
  let j = 1;
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i + 1] < nums[i]) {
      nums[j] = nums[i + 1];
      j++;
    }
  }
  return nums[k];
};

const arr = [1, 2, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 9, 10];
console.log(
  findKthLargest(arr, 4)
);