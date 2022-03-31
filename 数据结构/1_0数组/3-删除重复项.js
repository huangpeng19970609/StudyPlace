/* 
    【有序数组】 nums ，原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度
    不需要考虑数组中超出新长度后面的元素。
    nums = [0,0,1,1,1,2,2,3,3,4] => nums = [0,1,2,3,4,]
*/
var removeDuplicates = function (nums) {
  if (nums.length <= 1) return nums.length;
  let j = 1;
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i + 1] > nums[i]) {
      // 虽然 会发生很多次 j === i + 1 的过程 但是这没有关系
      nums[j] = nums[i + 1];
      j++;
    }
  }
  return j;
};
let arr = [1, 2, 3, 4, 4, 4, 5, 5];
