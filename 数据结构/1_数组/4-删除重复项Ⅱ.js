/* 
  给你一个有序数组 nums
  请你 原地 删除重复出现的元素，使每个元素 最多出现两次 ，返回删除后数组的新长度。
  不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
*/
var removeDuplicates = function (arr) {
  let j = 0;
  let LIMIT_NUMBER = 2; // [0,0,0, 1, 1, 2, 2, 3, 3, 3]
  for (let i = 0; i <= arr.length - 1; i++) {
    if (j < LIMIT_NUMBER) {
      j++;
    }
    else if (arr[j - LIMIT_NUMBER] !== arr[i]) {
      arr[j] = arr[i];
      j++;
    }
  }
  return j;
};
